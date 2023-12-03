# Test Assignment

## Introduction

- As described in the shared (`"FE_QA_assignment.pdf"` & `"testautomation-web.zib"`), there are 2 TestCases (according to the app simplicity)
- `Testcafe` has been selected as a web test automation framework using Javascript to prepare the needed scripts(s).

## Environment Needs
1.  Node.js
2.  VSCode (IDE).
3.  Testcafe
4.  Web browsers (at least Chrome)
5.  Docker (Optional).
6.  And of course internet connectivity

## How to Run the scripts
We have different ways to execute the prepared script
1.  On a local machine [OS independent]
    1. Clone the repo code to a local folder.
    2. Open the terminal in this folder.
    3. Run the below command to install all the project dependencies:

       `$ npm install`

    4. The 2 previous steps can be done from inside the VSCode.
    5. Run the command "`http-server -p 8081`" to start the webserver on port 8081 & be able to use the web app.
    6. Run the command (``npx testacafe <Browser> test``) to execute the test scripts in the `"test"` folder [where `"<Browser>"` is any of Chrome, Firefox, Edge or a mix of them].
    7. Examples of the execution command:

       `$ npx testcafe chrome test`

       `$ npx testcafe firefox test`

       `$ npx testcafe chrome, firefox test`

       `$ npx testcafe all test`
 
    8. In case it is needed to generate a report, the user can run the command (``testacafe <Browser> test --reporter html:./reports/report_$(date +"%Y-%m-%d_%H-%M-%S").html``) which will create `"<report_currentDate/Time>.html"` file in the `"reports"` folder under the project's root directory & the user can open by the preferred browser.
    9. Another way to execute the tests is to use the commands prepared in the `"package.json"` under the `"scripts"` section [This will enable the user to skip the points (4 >> 8) which include starting the web-server to start the web app & write the testcafe execution command] (Ex. `npm run test:report` or `npm run test:chrome`).

2.  On Docker
    1. Prerequists (Docker must be installed).
    2. Clone the repo.
    3. Depnding on your OS, you may need to convert the corresponding `"run_tests"` script file (`"run_tests.sh"` for Linux/Mac or `"run_tests.bat"` for Windows) into an executable file (so that we can execute it from the Terminal/CMD) (In my case, Mac OS, I used the command `chmod +x run_tests_.sh` ).
    4. In the terminal, run the command `./run_tests.sh` for Linux/Mac or `./run_tests.bat` for Windows (This should do all the steps for you starting from pulling the docker image till copying the report & screenshots folder and finally remove the container after execution).
    5. The configuration the docker image creation can be found in the `"Dockerfile"` under the project's root directory.

3.  On Github Actions
    1. The project is configured to run a ‘Github Action Workflow’ every time there is a code push (and of course this rul can be modified or it can be executed on demand).
    2. The configuration for this workflow can be found under `".github/workflows/main.yml"`.
    3. After the workflow finishes the execution, a test report is generated and published using the "GitHub Pages" under the URL (https://mmostafa886.github.io/ABN-AMRO_AutomationTask/).

## Notes
1.  There are some comments provided on the script (& on all the files) for clarification & highlighting of some points.
2.  A default configuration for all the tests (for screenshot taking & report generation) was added in the `".testcaferc.json"` in the project's root directory (which will be always applied unless overridden in the execution command).
3.  The hard coded values has been avoided as much as possible, instead JSON data files were used (These files are stored under `"./testData"` folder).
4.  To make the process of switching the environments easier, a file called `"environments.json"` file where we can change the IP part of the URL & paramertize this part of the fixture's URL (Of course depending on the where the app to be tested is publsihed [on lcoalhost or on other location]).
5.  The app to be tested is included as part of the project & starting this app is already part of the scripts of the `"package.json"`.
6.  The scripts under the `"scripts"` section of the `"package.json"` provide the follwing:
    - `"server:start" & "server:stop"` -> used whenever needed to start & stop the http server respectively (in case we need to start the app locally on the same machine used for test execution).
    - `"test:chrome" & "test:chromeheadless"` -> execute the tests on chrome headed & headless respectively.
    - `"test:ff" & "test:ffheadless"` -> execute the tests on firefox headed & headless respectively.
    - `"test:parallelmethods" & "test:paralleltests"` -> run in parallel for methods in the same test and for tests respectvely.
    - `"test:tags"` -> executing tests based on specific tags in the tests-meta.
    - `"test:ghactions"` -> to be used by GitHubActions.
7.  In case of Docker, make sure the user used during the execution has read/write privilages as we are copying folders/files from the docker container to the project folder under the host machine which requires this level of privilages.
8.  In the case of Docker-desktop, make sure of the network configuration on the host machine as it may cause connection issues (& hence script failure) if not properly configured.
9.  Although the configured Github Actions workflow runs in case of code push, we can configure it or add another workflow to run periodically and in both cases, it can be executed on demand.
10. Another branch `"optimization_trials"` is created to work on the optimizations mentioned below (If the time allows for).

## Possible Optimizations
1.  Use a more complex reporting utility (Ex. `"Allure-report"`) as it provides more insights & statistics through keeping the history.
2.  Prepare a docker image with FireFox in order for containerizing/docerizing of this type of tests.
3.  Improve the docker image by starting the `"http-server"` & execute the test both from inside the docker conatiner in order for containerizing/docerizing the whole process.

