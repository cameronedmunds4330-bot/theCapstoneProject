import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'
import CaseDataTypesPage from '../pageobjects/case-data-types.page.js'

describe('Info Tooltips', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()

        await SettingsPage.navigateToSettings()
        await SettingsPage.navigateToCaseDataTypes()
    })

    it('should display tooltip information', async () => {

        const buttons = await CaseDataTypesPage.infoButtons

        expect(buttons.length).toBeGreaterThan(0)

        await buttons[0].click()

        const tooltip = $('.fui-PopoverSurface')

        await tooltip.waitForDisplayed({
            timeout: 5000
        })

        expect(await tooltip.isDisplayed()).toBe(true)
    })
})