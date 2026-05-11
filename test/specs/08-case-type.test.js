import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'

describe('Case Types - Test Case 14', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await SettingsPage.navigateToSettings()
        await SettingsPage.navigateToCaseDataTypes()
        await browser.pause(1000)
    })

    it('should create a case type successfully', async () => {
        const caseName = '1'.repeat(50)

        // Fill in the name input
        const nameInput = $('[data-testid="case-type-panel-type-input"]')
        await nameInput.waitForDisplayed({ timeout: 10000 })
        await nameInput.clearValue()
        await nameInput.setValue(caseName)
        await browser.pause(300)

        // Click Add
        const addButton = $('[data-testid="case-type-panel-add-button"]')
        await addButton.waitForClickable({ timeout: 10000 })
        await addButton.click()
        await browser.pause(1500)

        // Verify toast appeared (confirms server accepted the create)
        const toast = $('.fui-Toast')
        await toast.waitForDisplayed({ timeout: 10000 })
        await expect(toast).toBeDisplayed()

        // Verify item appears in the list via DOM check (avoids BiDi XPath polling issues)
        const item = await browser.execute((name) => {
            const allEls = Array.from(document.querySelectorAll('span, div, p'))
            return allEls.some(el =>
                el.children.length === 0 &&
                (el.textContent || '').trim() === name
            )
        }, caseName)
        expect(item).toBe(true)

        await browser.pause(500)
    })
})