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
    });

    // ══════════════════════════════════════════════════════════
    // TC-7: Create New 'New' Status
    // Jira: MTQA-5568
    // ══════════════════════════════════════════════════════════
    it('MTQA-5568: should create and delete a New case status', async () => {
        await CaseDataTypesPage.addNewStatusButton.waitForClickable({ timeout: 8000 });
        await CaseDataTypesPage.addNewStatusButton.click();

        await CaseDataTypesPage.fillStatusForm(
            '1'.repeat(50),
            '1'.repeat(200)
        );

        const statusValue = await CaseDataTypesPage.statusInput.getValue();
        expect(statusValue.length).toBeLessThanOrEqual(50);

        const descValue = await CaseDataTypesPage.descriptionInput.getValue();
        expect(descValue.length).toBeLessThanOrEqual(200);

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.dismissToast();

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'New');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    // ══════════════════════════════════════════════════════════
    // TC-8: Create New 'Active' Status
    // Jira: MTQA-5581
    // ══════════════════════════════════════════════════════════
    it('MTQA-5581: should create, edit, and delete an Active case status', async () => {
        await CaseDataTypesPage.addActiveStatusButton.waitForClickable({ timeout: 8000 });
        await CaseDataTypesPage.addActiveStatusButton.click();

        await CaseDataTypesPage.fillStatusForm(
            '1'.repeat(50),
            '1'.repeat(200)
        );

        const statusValue = await CaseDataTypesPage.statusInput.getValue();
        expect(statusValue.length).toBeLessThanOrEqual(50);

        const descValue = await CaseDataTypesPage.descriptionInput.getValue();
        expect(descValue.length).toBeLessThanOrEqual(200);

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.dismissToast();

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Active');
        await CaseDataTypesPage.cancelStatus();

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Active');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    // ══════════════════════════════════════════════════════════
    // TC-9: Create New 'Completed' Status
    // Jira: MTQA-5588
    // ══════════════════════════════════════════════════════════
    it('MTQA-5588: should create, edit, and delete a Completed case status', async () => {
        await CaseDataTypesPage.addCompletedStatusButton.waitForClickable({ timeout: 8000 });
        await CaseDataTypesPage.addCompletedStatusButton.click();

        await CaseDataTypesPage.fillStatusForm(
            '1'.repeat(50),
            '1'.repeat(200)
        );

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.dismissToast();

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Completed');
        await CaseDataTypesPage.cancelStatus();

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Completed');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    // ══════════════════════════════════════════════════════════
    // TC-10: Create New 'Closed' Status
    // Jira: MTQA-5590
    // ══════════════════════════════════════════════════════════
    it('MTQA-5590: should create, edit, and delete a Closed case status', async () => {
        await CaseDataTypesPage.addClosedStatusButton.waitForClickable({ timeout: 8000 });
        await CaseDataTypesPage.addClosedStatusButton.click();

        await CaseDataTypesPage.fillStatusForm(
            '1'.repeat(50),
            '1'.repeat(200)
        );

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.dismissToast();

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Closed');
        await CaseDataTypesPage.cancelStatus();

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Closed');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    // ══════════════════════════════════════════════════════════
    // TC-11: Create New 'Removed' Status
    // Jira: MTQA-5594
    // ══════════════════════════════════════════════════════════
    it('MTQA-5594: should create, edit, and delete a Removed case status', async () => {
        await CaseDataTypesPage.addRemovedStatusButton.waitForClickable({ timeout: 8000 });
        await CaseDataTypesPage.addRemovedStatusButton.click();

        await CaseDataTypesPage.fillStatusForm(
            '1'.repeat(50),
            '1'.repeat(200)
        );

        await CaseDataTypesPage.saveStatus();
        await CaseDataTypesPage.dismissToast();

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Removed');
        await CaseDataTypesPage.cancelStatus();

        await CaseDataTypesPage.clickDeleteOnStatus('1'.repeat(50), 'Removed');
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });
});