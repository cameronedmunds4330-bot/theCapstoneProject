import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'
import CaseDataTypesPage from '../pageobjects/case-data-types.page.js'

describe('Case Data Types Info Tooltips - Test Case 12', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await SettingsPage.navigateToSettings()
        await SettingsPage.navigateToCaseDataTypes()

        await browser.pause(1000)
    })

    it('should open and close all info tooltips successfully', async () => {

        await CaseDataTypesPage.clickInfoTooltip(0)
        await browser.pause(500)

        let tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('custom')

        await CaseDataTypesPage.closeInfoTooltip(0)
        await browser.pause(500)

        await CaseDataTypesPage.clickInfoTooltip(1)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)

        await CaseDataTypesPage.closeInfoTooltip(1)
        await browser.pause(500)

        // ── Index 2: "New" status info icon 
        await CaseDataTypesPage.clickInfoTooltip(2)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('new')

        await CaseDataTypesPage.closeInfoTooltip(2)
        await browser.pause(500)

        // ── Index 3: "Active" status info icon 
        await CaseDataTypesPage.clickInfoTooltip(3)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('active')

        await CaseDataTypesPage.closeInfoTooltip(3)
        await browser.pause(500)

        // ── Index 4: "Completed" status info icon 
        await CaseDataTypesPage.clickInfoTooltip(4)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('complet')

        await CaseDataTypesPage.closeInfoTooltip(4)
        await browser.pause(500)

        // ── Index 5: "Closed" status info icon 
        await CaseDataTypesPage.clickInfoTooltip(5)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('clos')

        await CaseDataTypesPage.closeInfoTooltip(5)
        await browser.pause(500)

        // Removed" status info icon 

        await CaseDataTypesPage.clickInfoTooltip(6)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('remov')

        await CaseDataTypesPage.closeInfoTooltip(6)
    })
})