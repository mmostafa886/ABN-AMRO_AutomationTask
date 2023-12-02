import env from "../environments.json";
import AppPage from "../pages/AppPage";
import ValidCredens from "../testData/ValidCredens.json";
const loginDataset = require("../testData/LoginCredentials.json");

/**
 * In order to be able to change the URL dynamically without the need to change it over several files, we dealt with it as input fromthe 'environments.json' file
 * This is used for several reasons:
 *    - In case we need to test over several enviornments like (development, testing, staging,.......), so we need to only change the entry in the 
 *    - In case we need to run on Docker container (taking into consideration the host network configuration, where the website is published).
 */
fixture("ABN-AMRO Login & Logout Verification").page(
  "http://"+env.url+":8081/testautomation-web/"
);
//For all the TestCases below, there were some added 'meta-tags' to enable selective execution based on these tags

//This TC is meant to fail in order to check how it will be displayed in the report
test.meta(
  "tags",
  "smoke",
  "regression"
)("Failed TC To be showed on the Report", async (t) => {
  await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
  await t
    .expect(await AppPage.getNavBarStyle())
    .contains(ValidCredens.display)
    .expect(await AppPage.homeIcon.visible)
    .ok();
  await AppPage.logOut();
  await t.expect(await AppPage.homeIcon.visible).ok();
});

//This is one of the 2 TCs mean to be executed in this fixture where we are verifying both login scenarios with valid & invalid crdentails
//The test data for this TC was parameterized & used the data provided in the 'LoginCredentials.json' file in order to follow the DDT concept (more details on README.md)
loginDataset.forEach((data) => {
  test.meta("tags", "smoke")(
    "Verify Valid & Invalid logging credentials_" + data.validity,
    async (t) => {
      await AppPage.userLogin(data.email, data.password);
      await t.expect(await AppPage.getNavBarStyle()).contains(data.display);
      if ("flex" == data.display) {
        await t.expect(await AppPage.homeIcon.visible).ok();
      } else {
        await t.expect(await AppPage.homeIcon.visible).notOk();
      }
    }
  );
});

//This TC was intentionally skipped to check how it will be displayed in the generated html report
test.skip.meta("tags", "regression")(
  "Skipped TC To be showed on the Report",
  async (t) => {
    await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
    await t
      .expect(await AppPage.getNavBarStyle())
      .contains(ValidCredens.display)
      .expect(await AppPage.homeIcon.visible)
      .ok();
    await AppPage.logOut();
    await t.expect(await AppPage.homeIcon.visible).ok();
  }
);

//This is the other TC that meant to be included in this fixture at which we are verifying the logout after a valid login
//In order to avoid hard-coded data, the test data comes from the 'ValidCredens.json' file
test.meta(
  "tags",
  "smoke",
  "regression"
)("Validate Signout", async (t) => {
  await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
  await t
    .expect(await AppPage.getNavBarStyle())
    .contains(ValidCredens.display)
    .expect(await AppPage.homeIcon.visible)
    .ok();
  await AppPage.logOut();
  await t.expect(await AppPage.homeIcon.visible).notOk();
});
