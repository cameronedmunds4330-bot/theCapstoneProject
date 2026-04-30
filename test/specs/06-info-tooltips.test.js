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
    })

    // ══════════════════════════════════════════════════════════
    // TC-19: Validate All Info Icon Tooltips
    // Testing Technique: Positive Testing, UI Validation
    // Jira: MTQA-5595
    // ══════════════════════════════════════════════════════════
    it('should open and close all info tooltips successfully', async () => {
        // There are multiple info icons on the Case Data Types page
        // We'll test the first few
        
        // Click first info icon (Case Data Types header)
        await CaseDataTypesPage.clickInfoTooltip(0)
        
        let tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText).toContain('Create custom')
        
        // Close tooltip
        await CaseDataTypesPage.closeInfoTooltip(0)
        await browser.pause(500)
        
        // Click second info icon (Group Custom Statuses)
        await CaseDataTypesPage.clickInfoTooltip(1)
        
        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        
        await CaseDataTypesPage.closeInfoTooltip(1)
        await browser.pause(500)
        
        // Click third info icon (New status)
        await CaseDataTypesPage.clickInfoTooltip(2)
        
        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText).toContain('newly created')
        
        await CaseDataTypesPage.closeInfoTooltip(2)
        await browser.pause(500)
        
        // Click fourth info icon (Active status)
        await CaseDataTypesPage.clickInfoTooltip(3)
        
        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText).toContain('Active')
        
        await CaseDataTypesPage.closeInfoTooltip(3)
        await browser.pause(500)
        
        // Click fifth info icon (Completed status)
        await CaseDataTypesPage.clickInfoTooltip(4)
        
        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText).toContain('completed')
        
        await CaseDataTypesPage.closeInfoTooltip(4)
    })
})