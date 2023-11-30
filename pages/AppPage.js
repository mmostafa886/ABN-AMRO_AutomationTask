import { t, Selector } from "testcafe";
import PageBase from "./PageBase";

class AppPage extends PageBase {
  constructor() {
    super();
    this.userEmailField = Selector("#email");
    this.userPasswordField = Selector("#password");
    this.loginBtn = Selector(".btn-login");
    this.navigationBar = Selector("#navigation");
    this.homeIcon = Selector(".home");
    this.userIcon = Selector("#user");
    this.signoutMenuEntry = Selector("span").withText(/Sign Out/i);
  }
  
  async userLogin(user, password) {
    await this.enterText(this.userEmailField, user);
    await this.enterText(this.userPasswordField, password);
    await this.clickOnElement(this.loginBtn);
  }

  async getNavBarStyle() {
    return await this.getAttributeValue(this.navigationBar, "style");
  }

  async logOut() {
    await this.clickOnElement(this.userIcon);
    await this.clickOnElement(this.signoutMenuEntry);
  }
}

export default new AppPage();
