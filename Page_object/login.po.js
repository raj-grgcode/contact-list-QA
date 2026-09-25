const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.userInput = '#email'; //css selector
    this.passwordInput = "//input[@placeholder='Password']";
    this.loginButton = '//button[@id="submit"]';
    this.logout = this.page.getByRole('button', { name: 'Logout' });   
    this.loginValidation =
      '//p[contains(text(),"Click on any contact to view the Contact Details")]';    this.alertMessage = '//span[@id="error"]';
  }

  async login({ username, password }) {
    await this.page.locator(this.userInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

async verifyValidLogin() {
    await this.page.waitForURL('**/contactList');
    await expect(this.logout).toBeVisible();
    await expect(this.page.locator(this.loginValidation)).toHaveText(
      "Click on any contact to view the Contact Details",
    );
  }

  async verifyInvalidLogin() {
    const invalidLogin = this.page.locator(this.alertMessage);
    await expect(invalidLogin).toHaveText('Incorrect username or password');
  }
};