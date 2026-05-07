import BasePage from './base.page.js'

class CaseTypesPage extends BasePage {

    // ── Selectors ─────────────────────────────────────────────────────────────

    get caseDataTab() {
        return $('[data-testid="account-settings-case-data-tab"]')
    }

    get caseTypesTab() {
        return $('[data-testid="account-settings-case-types-tab"]')
    }

    get addButton() {
        return $('[data-testid="case-type-panel-add-button"]')
    }

    get nameInput() {
        return $('[data-testid="add-edit-case-type-name-input"]')
    }

    get descriptionInput() {
        return $('[data-testid="add-edit-case-type-description-input"]')
    }

    get saveButton() {
        return $('[data-testid="add-edit-case-type-save-button"]')
    }

    get cancelButton() {
        return $('[data-testid="add-edit-case-type-cancel-button"]')
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    /**
     * open() navigates directly to the settings URL, waits for the page to
     * fully render, THEN clicks the Case Types tab.
     *
     * The previous implementation only clicked the tab without first ensuring
     * the settings page was loaded — so if another parallel worker had the
     * same session or the nav item wasn't visible yet, the click failed.
     */
    async open() {
        await browser.url('/account/settings')
        await browser.pause(1500)

        // Wait until the tab itself is in the DOM before trying to click it
        await this.caseTypesTab.waitForExist({ timeout: 15000 })
        await this.caseTypesTab.waitForClickable({ timeout: 15000 })
        await this.caseTypesTab.click()
        await browser.pause(1000)
    }

    // ── Row helpers ───────────────────────────────────────────────────────────

    rowByName(name) {
        return $(`[data-testid="case-data-type-${name}"]`)
    }

    editButtonInRow(name) {
        return this.rowByName(name).$('button[aria-label="Edit"]')
    }

    deleteButtonInRow(name) {
        return this.rowByName(name).$('button[aria-label="Delete"]')
    }

    // ── CRUD ──────────────────────────────────────────────────────────────────

    async createCaseType(name, description) {
        await this.addButton.waitForClickable({ timeout: 10000 })
        await this.addButton.click()

        await this.nameInput.waitForDisplayed({ timeout: 10000 })
        await this.nameInput.setValue(name)
        await this.descriptionInput.setValue(description)

        await this.saveButton.click()
        await browser.pause(800)

        await this.rowByName(name).waitForDisplayed({ timeout: 10000 })
    }

    async editCaseType(oldName, newName) {
        const editBtn = this.editButtonInRow(oldName)
        await editBtn.waitForClickable({ timeout: 10000 })
        // Fluent UI hides action buttons until hover — JS click is reliable
        await browser.execute((el) => el.click(), editBtn)

        await this.nameInput.waitForDisplayed({ timeout: 10000 })
        await this.nameInput.clearValue()
        await this.nameInput.setValue(newName)

        await this.saveButton.click()
        await browser.pause(800)

        await this.rowByName(newName).waitForDisplayed({ timeout: 10000 })
    }

    async deleteCaseType(name) {
        const deleteBtn = this.deleteButtonInRow(name)
        await deleteBtn.waitForClickable({ timeout: 10000 })
        await browser.execute((el) => el.click(), deleteBtn)
        await browser.pause(300)
    }
}

export default new CaseTypesPage()