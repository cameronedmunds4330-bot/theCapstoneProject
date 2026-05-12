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
    });

    it('should open and close all info tooltips successfully', async () => {

        // Tooltip 0
        await CaseDataTypesPage.clickInfoTooltip(0);
        const tooltip0Text = await CaseDataTypesPage.getTooltipText();
        expect(tooltip0Text.length).toBeGreaterThan(0);
        await CaseDataTypesPage.closeInfoTooltip(0);
        await browser.pause(500);

        // Tooltip 1
        await CaseDataTypesPage.clickInfoTooltip(1);
        const tooltip1Text = await CaseDataTypesPage.getTooltipText();
        expect(tooltip1Text.length).toBeGreaterThan(0);
        await CaseDataTypesPage.closeInfoTooltip(1);
        await browser.pause(500);

        // Tooltip 2 — content confirmed as "Active" from error output
        await CaseDataTypesPage.clickInfoTooltip(2);
        const tooltip2Text = await CaseDataTypesPage.getTooltipText();
        expect(tooltip2Text.length).toBeGreaterThan(0);
        expect(tooltip2Text).toContain('Active');
        await CaseDataTypesPage.closeInfoTooltip(2);
        await browser.pause(500);

        // Tooltip 3
        await CaseDataTypesPage.clickInfoTooltip(3);
        const tooltip3Text = await CaseDataTypesPage.getTooltipText();
        expect(tooltip3Text.length).toBeGreaterThan(0);
        await CaseDataTypesPage.closeInfoTooltip(3);
        await browser.pause(500);

        // Tooltip 4
        await CaseDataTypesPage.clickInfoTooltip(4);
        const tooltip4Text = await CaseDataTypesPage.getTooltipText();
        expect(tooltip4Text.length).toBeGreaterThan(0);
        await CaseDataTypesPage.closeInfoTooltip(4);
        await browser.pause(500);

        // Tooltip 5
        await CaseDataTypesPage.clickInfoTooltip(5);
        const tooltip5Text = await CaseDataTypesPage.getTooltipText();
        expect(tooltip5Text.length).toBeGreaterThan(0);
        await CaseDataTypesPage.closeInfoTooltip(5);
    });
});