
import { test } from '@playwright/test';
import { LoginPage } from '../Page_object/login.po';

const testData = require('../fixtures/login_fixture.json');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Valid login tests', () => {

  test('Login using valid username and password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login({
      username: testData.ValidUser.UserName,
      password: testData.ValidUser.password
    });

    await login.verifyValidLogin();

  });


//   test('Login using invalid username and password', async ({ page }) => {
//     const login = new LoginPage(page);

//     await login.login({
//       username: testData.InvalidUser.UserName,
//       password: testData.InvalidUser.password
//     });

//     await login.verifyInValidLogin();
//   });


//   test('Login using invalid password and username both', async ({ page }) => {
//     const login = new LoginPage(page);

//     await login.login({
//       username: '',
//       password: ''
//     });

//     await login.verifyInValidLogin();
//   });



});
test.afterEach(async ({ page }) => {
  await page.close();
});

