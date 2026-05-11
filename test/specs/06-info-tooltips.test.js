import { expect, browser } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SettingsPage from '../pageobjects/settings.page.js';
import CaseDataTypesPage from '../pageobjects/case-data-types.page.js';

describe('Case Data Types Info Tooltips - Test Case 12', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login();
        await SettingsPage.navigateToSettings();
        await SettingsPage.navigateToCaseDataTypes();
        // Wait for info buttons to actually render before the test starts
        await browser.waitUntil(
            async () => (await $$('.fui-InfoButton')).length > 0,
            { timeout: 10000, timeoutMsg: 'Info tooltip buttons never appeared on page' }
        );
    });

    it('should open and close all info tooltips successfully', async () => {
        const tooltipCount = (await $$('.fui-InfoButton')).length;
        expect(tooltipCount).toBeGreaterThan(0);

        for (let i = 0; i < tooltipCount; i++) {
            await CaseDataTypesPage.clickInfoTooltip(i);
            await browser.pause(400);

            const tooltipText = await CaseDataTypesPage.getTooltipText();
            expect(tooltipText.length).toBeGreaterThan(0);

            await CaseDataTypesPage.closeInfoTooltip(i);
            await browser.pause(400);
        }
    });
});