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
        await browser.pause(1000);
    });

    it('MTQA-5568: should create and delete a New case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('New');
        await browser.pause(1000);
        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        expect((await CaseDataTypesPage.statusInput.getValue()).length).toBeLessThanOrEqual(50);
        expect((await CaseDataTypesPage.descriptionInput.getValue()).length).toBeLessThanOrEqual(200);

        await CaseDataTypesPage.saveStatus();
        await browser.pause(1500);
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await browser.execute((statusName) => {
            const btn = document.querySelector(`[data-testid="case-status-remove-New-${statusName}"]`)
            if (!btn) return
            btn.classList.remove('hidden')
            btn.style.visibility = 'visible'
            btn.style.opacity = '1'
            btn.style.pointerEvents = 'auto'
            const parent = btn.closest('[role="row"]') || btn.parentElement
            if (parent) {
                parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
                parent.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            }
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }, '1'.repeat(50));

        await browser.pause(500);
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    it('MTQA-5581: should create, edit, and delete an Active case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Active');
        await browser.pause(1000);
        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        expect((await CaseDataTypesPage.statusInput.getValue()).length).toBeLessThanOrEqual(50);
        expect((await CaseDataTypesPage.descriptionInput.getValue()).length).toBeLessThanOrEqual(200);

        await CaseDataTypesPage.saveStatus();
        await browser.pause(1500);
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await SettingsPage.navigateToCaseDataTypes();
        await browser.pause(1000);

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Active');
        await browser.pause(500);
        await CaseDataTypesPage.cancelStatus();
        await browser.pause(500);

        await browser.execute((statusName) => {
            const btn = document.querySelector(`[data-testid="case-status-remove-Active-${statusName}"]`)
            if (!btn) return
            btn.classList.remove('hidden')
            btn.style.visibility = 'visible'
            btn.style.opacity = '1'
            btn.style.pointerEvents = 'auto'
            const parent = btn.closest('[role="row"]') || btn.parentElement
            if (parent) {
                parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
                parent.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            }
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }, '1'.repeat(50));

        await browser.pause(500);
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    it('MTQA-5588: should create, edit, and delete a Completed case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Completed');
        await browser.pause(1000);
        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        await CaseDataTypesPage.saveStatus();
        await browser.pause(1500);
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await SettingsPage.navigateToCaseDataTypes();
        await browser.pause(1000);

        await CaseDataTypesPage.clickEditOnStatus('1'.repeat(50), 'Completed');
        await browser.pause(500);
        await CaseDataTypesPage.cancelStatus();
        await browser.pause(500);

        await browser.execute((statusName) => {
            const btn = document.querySelector(`[data-testid="case-status-remove-Completed-${statusName}"]`)
            if (!btn) return
            btn.classList.remove('hidden')
            btn.style.visibility = 'visible'
            btn.style.opacity = '1'
            btn.style.pointerEvents = 'auto'
            const parent = btn.closest('[role="row"]') || btn.parentElement
            if (parent) {
                parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
                parent.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            }
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }, '1'.repeat(50));

        await browser.pause(500);
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    it('MTQA-5590: should create and delete a Closed case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Closed');
        await browser.pause(1000);
        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        await CaseDataTypesPage.saveStatus();
        await browser.pause(1500);
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await browser.execute((statusName) => {
            const btn = document.querySelector(`[data-testid="case-status-remove-Closed-${statusName}"]`)
            if (!btn) return
            btn.classList.remove('hidden')
            btn.style.visibility = 'visible'
            btn.style.opacity = '1'
            btn.style.pointerEvents = 'auto'
            const parent = btn.closest('[role="row"]') || btn.parentElement
            if (parent) {
                parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
                parent.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            }
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }, '1'.repeat(50));

        await browser.pause(500);
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });

    it('MTQA-5594: should create and delete a Removed case status', async () => {
        await CaseDataTypesPage.clickAddButtonForSection('Removed');
        await browser.pause(1000);
        await CaseDataTypesPage.fillStatusForm('1'.repeat(50), '1'.repeat(200));

        await CaseDataTypesPage.saveStatus();
        await browser.pause(1500);
        await CaseDataTypesPage.dismissToast();
        await browser.pause(1000);

        await browser.execute((statusName) => {
            const btn = document.querySelector(`[data-testid="case-status-remove-Removed-${statusName}"]`)
            if (!btn) return
            btn.classList.remove('hidden')
            btn.style.visibility = 'visible'
            btn.style.opacity = '1'
            btn.style.pointerEvents = 'auto'
            const parent = btn.closest('[role="row"]') || btn.parentElement
            if (parent) {
                parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
                parent.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            }
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }, '1'.repeat(50));

        await browser.pause(500);
        await CaseDataTypesPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await CaseDataTypesPage.dismissToast();
    });
});