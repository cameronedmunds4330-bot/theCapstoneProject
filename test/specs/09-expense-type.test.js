import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'
import ExpenseTypesPage from '../pageobjects/expense-types.page.js'

describe('Expense Types', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await SettingsPage.open()
        await ExpenseTypesPage.open()
    })

    it('should create, edit, and delete an expense type successfully', async () => {

        const originalName = 'Test Expense Type'
        const updatedName = 'Updated Expense Type'
        const description = 'This is a test expense type'

        // CREATE
        await ExpenseTypesPage.createExpenseType(originalName, description)

        const row1 = ExpenseTypesPage.rowByName(originalName)
        await expect(row1).toBeDisplayed()

        // EDIT
        await ExpenseTypesPage.editExpenseType(originalName, updatedName)

        const row2 = ExpenseTypesPage.rowByName(updatedName)
        await expect(row2).toBeDisplayed()

        // DELETE
        await ExpenseTypesPage.deleteExpenseType(updatedName)

        // Wait for the row to disappear
        await browser.waitUntil(
            async () => {
                const exists = await ExpenseTypesPage.rowByName(updatedName).isExisting().catch(() => false)
                return !exists
            },
            { timeout: 10000, timeoutMsg: 'Deleted expense type row is still present' }
        )

        await expect(ExpenseTypesPage.rowByName(updatedName)).not.toBeDisplayed()
    })
})