# temp stage for anoncreds for 64-bit arm
ARG ANONCREDS_VERSION="0.1.0-dev.9"

FROM ubuntu:22.04 AS anoncreds-builder
ARG ANONCREDS_VERSION

RUN apt-get update && \
  apt-get install -y \
  build-essential \
  libssl-dev \
  pkg-config \
  git \
  curl

# Temp hack for QEMU-compatible rust
ENV SHELL "/bin/sh"
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sed 's#/proc/self/exe#$SHELL#g' | sh -s -- -y

ENV PATH=/root/.cargo/bin:$PATH
ENV RUST_BACKTRACE=1

# ASKAR
RUN curl -sOL https://github.com/hyperledger/anoncreds-rs/archive/v${ANONCREDS_VERSION}.tar.gz && \
  tar -xvf v${ANONCREDS_VERSION}.tar.gz && \
  cd ./anoncreds-rs-${ANONCREDS_VERSION} && \
  sh build.sh

# arm + amd compatible Dockerfile
FROM ghcr.io/findy-network/findy-agent-infra/indy-base:indy-1.16.ubuntu-22.04 AS indy-base

FROM ubuntu:22.04 as base

ARG ANONCREDS_VERSION

# install indy deps and files from base
RUN apt-get update && apt-get install -y libsodium23 libzmq5
COPY --from=indy-base /usr/lib/engines-1.1 /usr/lib/engines-1.1
COPY --from=indy-base /usr/lib/libcrypto.so.1.1 /usr/lib/libcrypto.so.1.1
COPY --from=indy-base /usr/lib/libssl.so.1.1 /usr/lib/libssl.so.1.1

COPY --from=indy-base /usr/include/indy /usr/include/indy
COPY --from=indy-base /usr/lib/libindy.a /usr/lib/libindy.a
COPY --from=indy-base /usr/lib/libindy.so /usr/lib/libindy.so

COPY --from=anoncreds-builder /anoncreds-rs-${ANONCREDS_VERSION}/target/release/libanoncreds.a /usr/lib/libanoncreds.a
COPY --from=anoncreds-builder /anoncreds-rs-${ANONCREDS_VERSION}/target/release/libanoncreds.d /usr/lib/libanoncreds.d
COPY --from=anoncreds-builder /anoncreds-rs-${ANONCREDS_VERSION}/target/release/libanoncreds.rlib /usr/lib/libanoncreds.rlib
COPY --from=anoncreds-builder /anoncreds-rs-${ANONCREDS_VERSION}/target/release/libanoncreds.so /usr/lib/libanoncreds.so
COPY --from=anoncreds-builder /anoncreds-rs-${ANONCREDS_VERSION} /anoncreds-rs-${ANONCREDS_VERSION}

ENV LIB_ANONCREDS_PATH /usr/lib/

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && apt-get install -y \
  software-properties-common \
  apt-transport-https \
  curl \
  # Only needed to build indy-sdk
  build-essential 

# libssl1.1 (required by libindy)
#RUN curl http://security.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1-1ubuntu2.1~18.04.21_amd64.deb -o libssl1.1.deb
#RUN dpkg -i libssl1.1.deb

# libindy
#RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88
#RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic stable"

# nodejs
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# install depdencies
RUN apt-get update -y && apt-get install -y --allow-unauthenticated \
  #    libindy \
  nodejs

# Install yarn seperately due to `no-install-recommends` to skip nodejs install 
RUN apt-get install -y --no-install-recommends yarn

FROM base as final

WORKDIR /src
ENV RUN_MODE="docker"

COPY javascript/server/package.json package.json

# Run install after copying only depdendency file
# to make use of docker layer caching
RUN yarn install

# Copy other depedencies
COPY javascript/server .
COPY javascript/ngrok-wait.sh ./ngrok-wait.sh

# For now we use ts-node. Compiling with typescript
# doesn't work because indy-sdk types are not exported
ENTRYPOINT [ "bash", "ngrok-wait.sh"]