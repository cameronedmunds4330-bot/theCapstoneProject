import { $, $$, browser } from '@wdio/globals';
import BasePage from './base.page.js';

class CaseDataTypesPage extends BasePage {

    get statusInput() {
        return $('[data-testid="add-edit-status-status-input"]');
    }

    get descriptionInput() {
        return $('[data-testid="add-edit-status-description-input"]');
    }

    get saveButton() {
        return $('[data-testid="add-edit-status-save-button"]');
    }

    get cancelButton() {
        return $('[data-testid="add-edit-status-cancel-button"]');
    }

    get toastMessage() {
        return $('.fui-Toast');
    }

    get addNewStatusButton()       { return $('[data-testid="add-case-status-New"]') }
    get addActiveStatusButton()    { return $('[data-testid="add-case-status-Active"]') }
    get addCompletedStatusButton() { return $('[data-testid="add-case-status-Completed"]') }
    get addClosedStatusButton()    { return $('[data-testid="add-case-status-Closed"]') }
    get addRemovedStatusButton()   { return $('[data-testid="add-case-status-Removed"]') }

    get tooltipContent() {
        return $('[role="tooltip"], .fui-PopoverSurface');
    }

    async clickAddButtonForSection(systemStatus) {
        const btn = $(`[data-testid="add-case-status-${systemStatus}"]`)
        await btn.waitForExist({ timeout: 10000 })
        await btn.scrollIntoView()
        await browser.pause(400)
        await btn.click()
        await browser.pause(500)
    }

    async fillStatusForm(status, description) {
        await this.statusInput.waitForDisplayed({ timeout: 10000 });
        await this.statusInput.clearValue();
        await this.statusInput.setValue(status);
        await this.descriptionInput.waitForDisplayed({ timeout: 10000 });
        await this.descriptionInput.clearValue();
        await this.descriptionInput.setValue(description);
    }

    async saveStatus() {
        await this.saveButton.waitForClickable({ timeout: 10000 });
        await this.saveButton.click();
        await browser.pause(1500);
    }

    async cancelStatus() {
        await this.cancelButton.waitForClickable({ timeout: 10000 });
        await this.cancelButton.click();
        await browser.pause(500);
    }

    async dismissToast() {
        try {
            const dismissBtn = $('span.fui-Text=Dismiss');
            const visible = await dismissBtn.isDisplayed().catch(() => false);
            if (visible) {
                await dismissBtn.click();
                await browser.pause(500);
            }
        } catch (_) { /* already gone */ }
    }

    // Uses real testid pattern confirmed from PDF: case-status-edit-{Category}-{StatusName}
    editButton(systemStatus, label) {
        return $(`[data-testid="case-status-edit-${systemStatus}-${label}"]`)
    }

    // Uses real testid pattern confirmed from PDF: case-status-remove-{Category}-{StatusName}
    deleteButton(systemStatus, label) {
        return $(`[data-testid="case-status-remove-${systemStatus}-${label}"]`)
    }

    async clickEditOnStatus(label, systemStatus) {
        const btn = this.editButton(systemStatus, label)
        await btn.waitForExist({ timeout: 10000 })
        await btn.scrollIntoView()
        await browser.pause(300)
        await btn.moveTo()
        await browser.pause(300)
        await btn.click()
        await browser.pause(500)
    }

    async clickDeleteOnStatus(label, systemStatus) {
        const btn = this.deleteButton(systemStatus, label)
        await btn.waitForExist({ timeout: 10000 })
        await btn.scrollIntoView()
        await browser.pause(300)
        await btn.moveTo()
        await browser.pause(300)
        await btn.click()
        await browser.pause(500)
    }

    async clickInfoTooltip(index) {
        const icons = await $$('.fui-InfoButton');
        const icon = icons[index];
        await icon.waitForDisplayed({ timeout: 8000 });
        await icon.scrollIntoView();
        await browser.pause(300);
        await icon.click();
        await browser.pause(500);
        await browser.waitUntil(
            async () => {
                const tooltip = await $('[role="tooltip"]').isExisting().catch(() => false);
                const popover = await $('.fui-PopoverSurface').isDisplayed().catch(() => false);
                return tooltip || popover;
            },
            { timeout: 8000, timeoutMsg: 'Tooltip/popover did not appear after clicking InfoButton' }
        );
    }

    async getTooltipText() {
        for (const sel of ['[role="tooltip"]', '.fui-PopoverSurface']) {
            try {
                const el = $(sel);
                const exists = await el.isExisting().catch(() => false);
                if (exists) {
                    const visible = await el.isDisplayed().catch(() => false);
                    if (visible) return await el.getText();
                }
            } catch (_) { /* try next */ }
        }
        return '';
    }

    async closeInfoTooltip(index) {
        const icons = await $$('.fui-InfoButton');
        const icon = icons[index];
        await icon.scrollIntoView();
        await browser.pause(300);
        await icon.click();
        await browser.pause(500);
    }
}

export default new CaseDataTypesPage();