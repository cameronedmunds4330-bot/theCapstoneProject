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
        // Give the page time to render all .fui-InfoButton elements
        await browser.pause(1000)
    })

    // PDF pages 29-33: click each info (i) button, verify text, click again to close
    it('should open and close all info tooltips successfully', async () => {

        // ── Index 0: Case Data Types header info icon ──────────────────────
        // PDF expected text: "Create custom data types for cases."
        await CaseDataTypesPage.clickInfoTooltip(0)
        await browser.pause(500)

        let tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('custom')

        await CaseDataTypesPage.closeInfoTooltip(0)
        await browser.pause(500)

        // ── Index 1: Group Custom Statuses by System Status info icon ─────
        // PDF expected text: mentions "grouped under their corresponding system default categories"
        await CaseDataTypesPage.clickInfoTooltip(1)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)

        await CaseDataTypesPage.closeInfoTooltip(1)
        await browser.pause(500)

        // ── Index 2: "New" status info icon ───────────────────────────────
        // PDF expected text: "System status denoting a newly created case."
        await CaseDataTypesPage.clickInfoTooltip(2)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('new')

        await CaseDataTypesPage.closeInfoTooltip(2)
        await browser.pause(500)

        // ── Index 3: "Active" status info icon ────────────────────────────
        // PDF expected text: "System status denoting an Active case."
        await CaseDataTypesPage.clickInfoTooltip(3)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('active')

        await CaseDataTypesPage.closeInfoTooltip(3)
        await browser.pause(500)

        // ── Index 4: "Completed" status info icon ─────────────────────────
        // PDF expected text: "System status denoting a completed case."
        await CaseDataTypesPage.clickInfoTooltip(4)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('complet')

        await CaseDataTypesPage.closeInfoTooltip(4)
        await browser.pause(500)

        // ── Index 5: "Closed" status info icon ────────────────────────────
        // PDF expected text: "System status denoting a closed case."
        await CaseDataTypesPage.clickInfoTooltip(5)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('clos')

        await CaseDataTypesPage.closeInfoTooltip(5)
        await browser.pause(500)

        // ── Index 6: "Removed" status info icon ───────────────────────────
        // PDF expected text: "System status denoting a removed case."
        await CaseDataTypesPage.clickInfoTooltip(6)
        await browser.pause(500)

        tooltipText = await CaseDataTypesPage.getTooltipText()
        expect(tooltipText.length).toBeGreaterThan(0)
        expect(tooltipText.toLowerCase()).toContain('remov')

        await CaseDataTypesPage.closeInfoTooltip(6)
    })
})