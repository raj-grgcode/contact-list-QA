import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test("Login with valid credentials1", async ({ page }) => {
//   await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await page.locator("xpath=//input[@id='email']").fill("rajg2239@gmail.com");
  //....//p[text()='Log In:']//following::input[1]
  //.... //button[text()='Sign up']
  // ....//*[@id='email' or @placeholder='Email']
  // ....//*[contains(@id,'mail')]
  // await page.locator('xpath=/html/body/div[3]/form/p[1]/input').fill('rajg2239@gmail.com');
  // await page.getByPlaceholder('email').fill('rajg2239@gmail.com');
  await page.getByPlaceholder("password").fill("appleballcat");
  await page.getByRole("button", { name: "submit" }).click();
  await expect(page.getByText("Logout")).toBeVisible();
  await page.waitForTimeout(15000);
});

test("Login with invalid credentials1", async ({ page }) => {
  await page.locator("xpath=//input[@id='email']").fill("abc@gmail.com");
  await page.getByPlaceholder("password").fill("xyz");
  await page.getByRole("button", { name: "submit" }).click();
  await expect(page.getByText("Incorrect username or password")).toBeVisible();
  await page.waitForTimeout(15000);
});

test("Login with invalid email valid password1", async ({ page }) => {
  await page.locator("xpath=//input[@id='email']").fill("abc@gmail.com");
  await page.getByPlaceholder("password").fill("appleballcat");
  await page.getByRole("button", { name: "submit" }).click();
  await expect(page.getByText("Incorrect username or password")).toBeVisible();
  await page.waitForTimeout(15000);
});

test("Login with valid email invalid password1", async ({ page }) => {
  await page.locator("xpath=//input[@id='email']").fill("rajg2239@gmail.com");
  await page.getByPlaceholder("password").fill("xyz");
  await page.getByRole("button", { name: "submit" }).click();
  await expect(page.getByText("Incorrect username or password")).toBeVisible();

  await page.waitForTimeout(15000);
});

test("Login with invalid email invalid password1", async ({ page }) => {
  await page.locator("xpath=//input[@id='email']").fill("xyz@gmail.com");
  await page.getByPlaceholder("password").fill("xyz");
  await page.getByRole("button", { name: "submit" }).click();
  await expect(page.getByText("Incorrect username or password")).toBeVisible();
  await page.waitForTimeout(15000);
});

test.afterEach(async ({ page }) => {
  await page.close();
});