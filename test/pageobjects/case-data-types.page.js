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

    // =========================
    // METHODS
    // =========================

    async openCaseDataPage() {

        await this.accountSettingsButton.waitForDisplayed({
            timeout: 10000
        });

        await this.accountSettingsButton.click();

        await this.caseDataTab.waitForDisplayed({
            timeout: 10000
        });

        await this.caseDataTab.click();
    }

    async addNewStatus(status, description) {

        await this.openCaseDataPage();

        await this.addStatusButton.waitForClickable({
            timeout: 10000
        });

        await this.addStatusButton.click();

        await this.statusInput.waitForDisplayed({
            timeout: 10000
        });

        await this.statusInput.setValue(status);

        await this.descriptionInput.setValue(description);

        await this.saveButton.waitForClickable({
            timeout: 10000
        });

        await this.saveButton.click();

        await browser.pause(2000);
    }
}

export default new CaseDataTypesPage();