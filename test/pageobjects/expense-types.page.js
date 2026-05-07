import BasePage from './base.page.js'

class ExpenseTypesPage extends BasePage {

    // ── Selectors ─────────────────────────────────────────────────────────────

    get caseDataTab() {
        return $('[data-testid="account-settings-case-data-tab"]')
    }

    get expenseTypesTab() {
        return $('[data-testid="account-settings-expense-types-tab"]')
    }

    get expenseTypesTabByText() {
        return $('//button[normalize-space()="Expense Types"]')
    }

    get addButton() {
        return $('[data-testid="expense-type-panel-add-button"]')
    }

    get nameInput() {
        return $('[data-testid="add-edit-expense-type-name-input"]')
    }

    get descriptionInput() {
        return $('[data-testid="add-edit-expense-type-description-input"]')
    }

    get saveButton() {
        return $('[data-testid="add-edit-expense-type-save-button"]')
    }

    get cancelButton() {
        return $('[data-testid="add-edit-expense-type-cancel-button"]')
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async open() {
        // 1. Navigate to settings
        await browser.url('/account/settings')
        await browser.pause(1500)

        // 2. Click the top-level "Case Data Types" tab to reveal sub-tabs
        await this.caseDataTab.waitForExist({ timeout: 15000 })
        await this.caseDataTab.waitForClickable({ timeout: 15000 })
        await this.caseDataTab.click()
        await browser.pause(1000)

        // 3. Click "Expense Types" sub-tab — prefer data-testid, fall back to text
        const byId = this.expenseTypesTab
        const idExists = await byId.isExisting().catch(() => false)

        if (idExists) {
            await byId.waitForClickable({ timeout: 10000 })
            await byId.click()
        } else {
            const byText = this.expenseTypesTabByText
            await byText.waitForExist({ timeout: 10000 })
            await byText.waitForClickable({ timeout: 10000 })
            await byText.click()
        }

        await browser.pause(800)
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

    async createExpenseType(name, description) {
        await this.addButton.waitForClickable({ timeout: 10000 })
        await this.addButton.click()

        await this.nameInput.waitForDisplayed({ timeout: 10000 })
        await this.nameInput.setValue(name)
        await this.descriptionInput.setValue(description)

        await this.saveButton.click()
        await browser.pause(800)

        await this.rowByName(name).waitForDisplayed({ timeout: 10000 })
    }

    async editExpenseType(oldName, newName) {
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

    async deleteExpenseType(name) {
        const deleteBtn = this.deleteButtonInRow(name)
        await deleteBtn.waitForClickable({ timeout: 10000 })
        await browser.execute((el) => el.click(), deleteBtn)
        await browser.pause(300)
    }
}

export default new ExpenseTypesPage()