# Aries Interoperability Information


This web site shows the current status of Aries Interoperability between Aries frameworks and agents. While
not yet included in these results, we have a working prototype for testing Aries mobile wallets using the
same tests.

The latest interoperability test results are below. Each row is a test agent, its columns
the results of tests executed in combination with other test agents.
The last column ("All Tests") shows the results of all tests run for the given test agent in any role. The link on each test
agent name provides more details about results for all test combinations for that test agent. On
that page are links to a full history of the test runs and full details on every executed test. 

The following test agents are currently supported:

- [Aries Cloud Agent Python](https://github.com/hyperledger/aries-cloudagent-python) (ACA-Py)
- [Aries Framework Go](https://github.com/hyperledger/aries-framework-go) (AF-Go)
- [Aries Framework JavaScript](https://github.com/hyperledger/aries-framework-javascript) (AFJ)
- [Aries Framework .NET](https://github.com/hyperledger/aries-framework-dotnet) (AF-.NET)
- [Findy Agent](https://github.com/findy-network/findy-agent) (Findy)
- [AriesVCX](https://github.com/hyperledger/aries-vcx) (VCX)

Want to add your Aries component to this page? You need to add a runset to the
[Aries Agent Test Harness](https://github.com/hyperledger/aries-agent-test-harness).

## Latest Interoperability Results

| Test Agent | Scope | Exceptions | ACA-Py | AF-Go | AFJ | AF-.NET | Findy | VCX | **All Tests** |
| ----- | ----- | ----- | :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| [ACA-Py](acapy.md)| AIP 1, 2 | None | 96 / 96<br>100% | 0 / 31<br>0% | 49 / 79<br>62% | 6 / 36<br>16% | 34 / 34<br>100% | 37 / 38<br>97% | **216 / 302<br>71%** |
| [AF-Go](afgo.md)| AIP 2 | None | 0 / 31<br>0% | 27 / 45<br>60% | 0 / 0<br>0% | 0 / 0<br>0% | 0 / 0<br>0% | 0 / 0<br>0% | **27 / 76<br>35%** |
| [AFJ](javascript.md)| AIP 1 | Revocation | 49 / 79<br>62% | 0 / 0<br>0% | 12 / 28<br>42% | 12 / 53<br>22% | 25 / 51<br>49% | 22 / 38<br>57% | **108 / 220<br>49%** |
| [AF-.NET](dotnet.md)| AIP 1 | Proof Proposal | 6 / 36<br>16% | 0 / 0<br>0% | 12 / 53<br>22% | 0 / 12<br>0% | 6 / 39<br>15% | 0 / 0<br>0% | **12 / 111<br>10%** |
| [Findy](findy.md)| AIP 1 | Credential Exchange | 34 / 34<br>100% | 0 / 0<br>0% | 25 / 51<br>49% | 6 / 39<br>15% | 17 / 17<br>100% | 0 / 0<br>0% | **76 / 124<br>61%** |
| [VCX](aries-vcx.md)| AIP 1 | Revocation | 37 / 38<br>97% | 0 / 0<br>0% | 22 / 38<br>57% | 0 / 0<br>0% | 0 / 0<br>0% | 17 / 20<br>85% | **76 / 96<br>79%** |

- Where the row and column are the same Test Agent, the results include only the tests where the Test Agent plays ALL of the roles (ACME, Bob, Faber and Mallory)
- The results in the "All Tests" column include tests involving the "Test Agent" in ANY of the roles.
- Wondering what the results mean? Please read the brief [introduction to Aries interoperability](aries-interop-intro.md) for some background.
- Select the "Test Agent" links to drill down into the tests being run for each Test Agent.


*Results last updated: Mon Nov 20 02:41:29 UTC 2023*

