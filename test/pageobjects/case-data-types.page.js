import { $, $$, browser } from '@wdio/globals';

class CaseDataTypesPage {
    // =========================
    // SELECTORS
    // =========================
    get accountSettingsButton() {
        return $('[data-testid="vert-nav-account-settings"]');
    }
    get caseDataTab() {
        return $('[data-testid="account-settings-case-data-tab"]');
    }
    get addStatusButton() {
        return $('span.fui-Button__icon');
    }
    get statusInput() {
        return $('[data-testid="add-edit-status-status-input"]');
    }
    get descriptionInput() {
        return $('[data-testid="add-edit-status-description-input"]');
    }
    get saveButton() {
        return $('[data-testid="add-edit-status-save-button"]');
    }
    get infoTooltipIcons() {
        return $('.fui-InfoButton');
    }
    get tooltipContent() {
        return $('[role="tooltip"]');
    }

    // =========================
    // METHODS
    // =========================
    async openCaseDataPage() {
        await this.accountSettingsButton.waitForDisplayed({ timeout: 10000 });
        await this.accountSettingsButton.click();
        await this.caseDataTab.waitForDisplayed({ timeout: 10000 });
        await this.caseDataTab.click();
    }

    async addNewStatus(status, description) {
        await this.openCaseDataPage();
        await this.addStatusButton.waitForClickable({ timeout: 10000 });
        await this.addStatusButton.click();
        await this.statusInput.waitForDisplayed({ timeout: 10000 });
        await this.statusInput.setValue(status);
        await this.descriptionInput.setValue(description);
        await this.saveButton.waitForClickable({ timeout: 10000 });
        await this.saveButton.click();
        await browser.pause(2000);
    }

    async clickInfoTooltip(index) {
        const icons = await $('.fui-InfoButton');
        const icon = icons[index];
        await icon.waitForDisplayed({ timeout: 8000 });
        await icon.scrollIntoView();
        await icon.click();
        await this.tooltipContent.waitForDisplayed({ timeout: 8000 });
    }

    async getTooltipText() {
        await this.tooltipContent.waitForDisplayed({ timeout: 8000 });
        return await this.tooltipContent.getText();
    }

    async closeInfoTooltip(index) {
        const icons = await $('.fui-InfoButton');
        const icon = icons[index];
        await icon.waitForDisplayed({ timeout: 8000 });
        await icon.scrollIntoView();
        await icon.click();
        await this.tooltipContent.waitForDisplayed({ timeout: 8000, reverse: true });
    }
}

export default new CaseDataTypesPage();