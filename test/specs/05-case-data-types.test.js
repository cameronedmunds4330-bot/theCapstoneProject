import { expect, browser } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SettingsPage from '../pageobjects/settings.page.js';
import CaseDataTypesPage from '../pageobjects/case-data-types.page.js';

describe('Case Data Types - Test Cases 7 through 11', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login();
        await SettingsPage.navigateToSettings();
        await SettingsPage.navigateToCaseDataTypes();
        await browser.pause(1500);
    });

    afterEach(async () => {
        await browser.pause(1500);
    });

    it('MTQA-5568: should create and delete a New case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('New');

        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.descriptionInput.waitForDisplayed({ timeout: 15000 });

        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        const statusValue = await CaseDataTypesPage.statusInput.getValue();
        expect(statusValue.length).toBeLessThanOrEqual(50);

        const descValue = await CaseDataTypesPage.descriptionInput.getValue();
        expect(descValue.length).toBeLessThanOrEqual(200);

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'New');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);
    });

    it('MTQA-5581: should create, edit, and delete an Active case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Active');

        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.descriptionInput.waitForDisplayed({ timeout: 15000 });

        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        const statusValue = await CaseDataTypesPage.statusInput.getValue();
        expect(statusValue.length).toBeLessThanOrEqual(50);

        const descValue = await CaseDataTypesPage.descriptionInput.getValue();
        expect(descValue.length).toBeLessThanOrEqual(200);

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Active');
        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.cancelStatus();
        await browser.pause(1000);

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Active');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);
    });

    it('MTQA-5588: should create, edit, and delete a Completed case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Completed');

        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.descriptionInput.waitForDisplayed({ timeout: 15000 });

        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Completed');
        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.cancelStatus();
        await browser.pause(1000);

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Completed');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);
    });

    it('MTQA-5590: should create, edit, and delete a Closed case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Closed');

        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.descriptionInput.waitForDisplayed({ timeout: 15000 });

        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Closed');
        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.cancelStatus();
        await browser.pause(1000);

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Closed');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);
    });

    it('MTQA-5594: should create, edit, and delete a Removed case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Removed');

        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.descriptionInput.waitForDisplayed({ timeout: 15000 });

        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Removed');
        await CaseDataTypesPage.statusInput.waitForDisplayed({ timeout: 15000 });
        await CaseDataTypesPage.cancelStatus();
        await browser.pause(1000);

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Removed');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 10000 });
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);
    });
});