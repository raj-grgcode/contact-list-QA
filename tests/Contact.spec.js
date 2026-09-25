import { test } from "@playwright/test";
import { LoginPage } from "../Page_object/login.po";
import { ContactPage } from "../Page_object/contact.po";

const testData = require("../fixtures/login_fixture.json");
const contactTestData = require("../fixtures/contactFixture.json");

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto("/");

    await login.login({
        username: testData.ValidUser.UserName,
        password: testData.ValidUser.password,
    });

    await login.verifyValidLogin();
});

test.describe("Valid contact tests", () => {
    test("Contact Add test", async ({ page }) => {
        const contact = new ContactPage(page);
        const uniqueFirstName = `${contactTestData.contact.firstName}_${Date.now()}`;

        await contact.addContact(
            uniqueFirstName,
            contactTestData.contact.lastName,
            contactTestData.contact.dob,
            contactTestData.contact.email,
            contactTestData.contact.phone,
            contactTestData.contact.address,
            contactTestData.contact.city,
            contactTestData.contact.state,
            contactTestData.contact.postal,
            contactTestData.contact.country,
        );
        await contact.viewContact(uniqueFirstName, contactTestData.contact.lastName);
        await contact.validateContactCreated(
            uniqueFirstName,
            contactTestData.contact.lastName,
            contactTestData.contact.dob,
            contactTestData.contact.email,
            contactTestData.contact.phone,
            contactTestData.contact.address,
            contactTestData.contact.city,
            contactTestData.contact.state,
            contactTestData.contact.postal,
            contactTestData.contact.country,
        );
    });
});