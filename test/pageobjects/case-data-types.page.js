import BasePage from './base.page.js'

class CaseDataTypesPage extends BasePage {

    // Tracks the most recently created status name so no-arg callers work
    _lastStatusName = null

    // ── Selectors ─────────────────────────────────────────────────────────────

    get caseDataTab() {
        return $('[data-testid="account-settings-case-data-tab"]')
    }

    // PDF page 57: data-testid="add-case-status-{StatusName}"
    addStatusButton(statusName) {
        return $(`[data-testid="add-case-status-${statusName}"]`)
    }

    get statusNameInput() {
        return $('[data-testid="add-edit-status-status-input"]')
    }

    get statusDescriptionInput() {
        return $('[data-testid="add-edit-status-description-input"]')
    }

    get saveButton() {
        return $('[data-testid="add-edit-status-save-button"]')
    }

    get cancelButton() {
        return $('[data-testid="add-edit-status-cancel-button"]')
    }

    get successToast() {
        return $('.fui-Toast')
    }

    // PDF page 66: Info buttons use .fui-InfoButton class, aria-label="information"
    get infoButtons() {
        return $$('.fui-InfoButton')
    }

    get tooltip() {
        return $('.fui-Tooltip')
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async open() {
        await this.caseDataTab.waitForClickable({ timeout: 10000 })
        await this.caseDataTab.click()
        await browser.pause(500)
    }

    // ── Row helpers ───────────────────────────────────────────────────────────

    rowByName(name) {
        return $(
            `//div[@role="row" and contains(@class,"fui-DataGridRow")]` +
            `//*[normalize-space()="${name}"]/ancestor::div[@role="row"]`
        )
    }

    // PDF page 62: data-testid="case-status-edit-{Category}-{StatusName}"
    editButtonInRow(name) {
        return this.rowByName(name).$('button[data-testid^="case-status-edit-"]')
    }

    // PDF page 62: data-testid="case-status-remove-{Category}-{StatusName}"
    deleteButtonInRow(name) {
        return this.rowByName(name).$('button[data-testid^="case-status-remove-"]')
    }

    // ── CRUD ──────────────────────────────────────────────────────────────────

    async createStatus(category, name, description) {
        const addBtn = this.addStatusButton(category)
        await addBtn.waitForClickable({ timeout: 10000 })
        await addBtn.click()

        await this.statusNameInput.waitForDisplayed({ timeout: 10000 })
        await this.statusNameInput.setValue(name)
        await this.statusDescriptionInput.setValue(description)

        await this.saveButton.click()
        await browser.pause(800)

        this._lastStatusName = name
    }

    async addNewStatus(category, name, description) {
        return this.createStatus(category, name, description)
    }

    /**
     * editStatus(oldName?, newName?)
     * Called with NO args in 05-case-data-types.test.js — opens the edit form
     * using _lastStatusName, leaving it open so the caller can click Cancel.
     */
    async editStatus(oldName, newName) {
        const targetName = oldName || this._lastStatusName
        if (!targetName) {
            throw new Error('editStatus: no name provided and no status has been created yet')
        }

        const editBtn = this.editButtonInRow(targetName)
        await editBtn.waitForClickable({ timeout: 10000 })
        await browser.execute((el) => el.click(), editBtn)

        await this.statusNameInput.waitForDisplayed({ timeout: 10000 })

        if (newName) {
            await this.statusNameInput.clearValue()
            await this.statusNameInput.setValue(newName)
            await this.saveButton.click()
            await browser.pause(800)
            this._lastStatusName = newName
        }
        // No newName = caller handles Cancel themselves
    }

    /**
     * deleteStatus(name?)
     * Called with NO args in 05-case-data-types.test.js — uses _lastStatusName.
     */
    async deleteStatus(name) {
        const targetName = name || this._lastStatusName
        if (!targetName) {
            throw new Error('deleteStatus: no name provided and no status has been created yet')
        }

        const deleteBtn = this.deleteButtonInRow(targetName)
        await deleteBtn.waitForClickable({ timeout: 10000 })
        await browser.execute((el) => el.click(), deleteBtn)
        await browser.pause(300)

        this._lastStatusName = null
    }

    // ── Tooltip helpers — PDF page 66: use .fui-InfoButton ───────────────────

    async clickInfoTooltip(index = 0) {
        const buttons = await this.infoButtons
        if (buttons.length === 0) {
            throw new Error('No .fui-InfoButton elements found on page')
        }
        const btn = buttons[index]
        if (!btn) throw new Error(`No info button at index ${index}`)
        await btn.waitForDisplayed({ timeout: 10000 })
        await btn.scrollIntoView()
        await btn.click()
        await browser.pause(300)
    }

    async closeInfoTooltip(index = 0) {
        // Clicking the same button again toggles it closed
        return this.clickInfoTooltip(index)
    }

    // Aliases for backward compatibility
    async openTooltip(index = 0) { return this.clickInfoTooltip(index) }
    async closeTooltip(index = 0) { return this.closeInfoTooltip(index) }

    async getTooltipText() {
        // Fluent UI renders tooltip content in a popover — wait for it
        await this.tooltip.waitForDisplayed({ timeout: 5000 })
        return this.tooltip.getText()
    }
}

export default new CaseDataTypesPage()