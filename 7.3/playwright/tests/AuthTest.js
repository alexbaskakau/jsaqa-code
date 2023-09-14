const { test, expect } = require("@playwright/test");
const user = require("../user.js");

test("Successful authorisation", async({page})=> {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(user.email);
    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill(user.password);
    await page.locator('[data-testid ="login-submit-btn"]').click();
    await expect(page).toHaveURL('https://netology.ru/profile');
    await expect(page.locator('h2')).toHaveText('Моё обучение');

})