/**This is just a replication for the 'LoginTest.js' class That was added for showing the effect of both the parallel & selective test execution
 * The only change that can be found here is in the 'meta-tags' to verify the selective execution will execute only the meant TCs
 */
import env from "../environments.json";
import AppPage from "../pages/AppPage";
import ValidCredens from "../testData/ValidCredens.json";
const loginDataset = require("../testData/LoginCredentials.json");

fixture("ABN-AMRO Login & Logout Verification_Parallel").page(
  "http://" + env.url + ":8081/testautomation-web/"
);

test.meta("tags", "regression")(
  "Failed TC To be showed on the Report_Parallel",
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

loginDataset.forEach((data) => {
  test.meta("tags", "regression")(
    "Verify Valid & Invalid logging credentials_" + data.validity + "_Parallel",
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

test.skip.meta("tags", "smoke")(
  "Skipped TC To be showed on the Report_Parallel",
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

test.meta(
  "tags",
  "smoke",
  "regression"
)("Validate Signout_Parallel", async (t) => {
  await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
  await t
    .expect(await AppPage.getNavBarStyle())
    .contains(ValidCredens.display)
    .expect(await AppPage.homeIcon.visible)
    .ok();
  await AppPage.logOut();
  await t.expect(await AppPage.homeIcon.visible).notOk();
});
