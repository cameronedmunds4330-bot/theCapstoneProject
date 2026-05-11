import { expect, browser } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';

describe('User Account Menu - Test Case 1', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login();
    });

    it('MTQA-5429: should open the account menu and navigate to settings', async () => {
        const accountMenuBtn = $('[data-testid="menu-account-popover-button"]');
        await accountMenuBtn.waitForClickable({ timeout: 10000 });
        await accountMenuBtn.click();

        const settingsBtn = $('[data-testid="account-control-settings-button"]');
        await settingsBtn.waitForClickable({ timeout: 8000 });
        await settingsBtn.click();

        await expect(browser).toHaveUrl('https://app.thecasework.com/account/settings');
    });

    it('MTQA-5429: should open and close the Terms of Service page', async () => {
        const accountMenuBtn = $('[data-testid="menu-account-popover-button"]');
        await accountMenuBtn.waitForClickable({ timeout: 10000 });
        await accountMenuBtn.click();

        const tosBtn = $('[data-testid="menu-terms-of-service-link"]');
        await tosBtn.waitForExist({ timeout: 8000 });
        await browser.pause(500);
        await tosBtn.scrollIntoView();
        await tosBtn.click();

        const closeBtn = $('[data-testid="login-tos-close"]');
        await closeBtn.waitForClickable({ timeout: 8000 });
        await closeBtn.click();
        await closeBtn.waitForDisplayed({ timeout: 5000, reverse: true });
    });

    it('MTQA-5429: should open and close the Privacy Policy page', async () => {
        const accountMenuBtn = $('[data-testid="menu-account-popover-button"]');
        await accountMenuBtn.waitForClickable({ timeout: 10000 });
        await accountMenuBtn.click();

        const privacyBtn = $('[data-testid="menu-privacy-policy-link"]');
        await privacyBtn.waitForExist({ timeout: 8000 });
        await browser.pause(500);
        await privacyBtn.scrollIntoView();
        await privacyBtn.click();

        const closeBtn = $('[data-testid="login-tos-close"]');
        await closeBtn.waitForClickable({ timeout: 8000 });
        await closeBtn.click();
        await closeBtn.waitForDisplayed({ timeout: 5000, reverse: true });
    });

    it('MTQA-5429: should open and close the Data Processing Agreement page', async () => {
        const accountMenuBtn = $('[data-testid="menu-account-popover-button"]');
        await accountMenuBtn.waitForClickable({ timeout: 10000 });
        await accountMenuBtn.click();

        const dpaBtn = $('[data-testid="menu-data-processing-agreement-link"]');
        await dpaBtn.waitForExist({ timeout: 8000 });
        await browser.pause(500);
        await dpaBtn.scrollIntoView();
        await dpaBtn.click();

        const closeBtn = $('[data-testid="login-tos-close"]');
        await closeBtn.waitForClickable({ timeout: 8000 });
        await closeBtn.click();
        await closeBtn.waitForDisplayed({ timeout: 5000, reverse: true });
    });
});