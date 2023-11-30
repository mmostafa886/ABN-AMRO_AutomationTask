import AppPage from "../pages/AppPage";
import ValidCredens from "../testData/ValidCredens.json";
const loginDataset = require("../testData/LoginCredentials.json");

fixture("ABN-AMRO Login & Logout Verification").page(
  "http://localhost:8081/testautomation-web/"
);

test("Failed TC To be showed on the Report", async (t) => {
  await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
  await t
    .expect(await AppPage.getNavBarStyle())
    .contains(ValidCredens.display)
    .expect(await AppPage.homeIcon.visible)
    .ok();
  await AppPage.logOut();
  await t.expect(await AppPage.homeIcon.visible).ok();
});

loginDataset.forEach((data) => {
  test(
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

test.skip("Skipped TC To be showed on the Report", async (t) => {
    await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
    await t
      .expect(await AppPage.getNavBarStyle())
      .contains(ValidCredens.display)
      .expect(await AppPage.homeIcon.visible)
      .ok();
    await AppPage.logOut();
    await t.expect(await AppPage.homeIcon.visible).ok();
  });

test("Validate Signout", async (t) => {
  await AppPage.userLogin(ValidCredens.email, ValidCredens.password);
  await t
    .expect(await AppPage.getNavBarStyle())
    .contains(ValidCredens.display)
    .expect(await AppPage.homeIcon.visible)
    .ok();
  await AppPage.logOut();
  await t.expect(await AppPage.homeIcon.visible).notOk();
});
