import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'

describe('Expense Types - Test Case 15', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await SettingsPage.navigateToSettings()
        await SettingsPage.navigateToCaseDataTypes()
        await browser.pause(1000)
    })

    it('should create and delete an expense type successfully', async () => {
        const expenseName = '1'.repeat(50)

        // CREATE
        const nameInput = $('[data-testid="expense-type-panel-input"]')
        await nameInput.waitForDisplayed({ timeout: 10000 })
        await nameInput.clearValue()
        await nameInput.setValue(expenseName)
        await browser.pause(300)
        const addButton = $('[data-testid="expense-type-panel-add-button"]')
        await addButton.waitForClickable({ timeout: 10000 })
        await addButton.click()
        await browser.pause(1000)

        // Verify item exists
        const item = $(`//*[normalize-space(text())="${expenseName}"]`)
        await item.waitForExist({ timeout: 10000 })
        await expect(item).toBeDisplayed()

        // Get button coordinates
        const coords = await browser.execute((name) => {
            const btn = document.querySelector(`[data-testid="case-data-type-${name}"]`)
            if (!btn) return null
            const r = btn.getBoundingClientRect()
            return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }
        }, expenseName)

        if (!coords) throw new Error('Delete button not found')

        // Use WDIO BiDi pointer actions with viewport origin
        await browser.action('pointer', { parameters: { pointerType: 'mouse' } })
            .move({ x: coords.x, y: coords.y, origin: 'viewport' })
            .pause(500)
            .down()
            .pause(50)
            .up()
            .perform()

        await browser.pause(2000)

        // Verify toast appeared
        const toast = $('.fui-Toast')
        await toast.waitForDisplayed({ timeout: 8000 })
        await expect(toast).toBeDisplayed()

        // Verify item gone
        await browser.waitUntil(
            async () => !(await $(`//*[normalize-space(text())="${expenseName}"]`).isExisting().catch(() => false)),
            { timeout: 10000, timeoutMsg: 'Deleted expense type is still present on the page' }
        )
    })
})