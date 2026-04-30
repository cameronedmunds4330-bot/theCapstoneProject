import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import AccountMenuPage from '../pageobjects/account-menu.page.js'
import SettingsPage from '../pageobjects/settings.page.js'

describe('User Account Menu - Test Case 1', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
    })

    // ══════════════════════════════════════════════════════════
    // TC-01: Open User Account Menu
    // Testing Technique: Positive Testing, UI Verification
    // Jira: MTQA-5429
    // ══════════════════════════════════════════════════════════
    it('should open the user account menu successfully', async () => {
        await AccountMenuPage.openMenu()
        
        await expect(AccountMenuPage.settingsButton).toBeDisplayed()
        await expect(AccountMenuPage.logoutButton).toBeDisplayed()
    })

    // ══════════════════════════════════════════════════════════
    // TC-02: Navigate to Settings
    // Testing Technique: Positive Testing, Navigation Testing
    // ══════════════════════════════════════════════════════════
    it('should navigate to Settings page from account menu', async () => {
        await AccountMenuPage.clickSettings()
        
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('/account/settings')
        
        const isOnSettings = await SettingsPage.isOnSettingsPage()
        expect(isOnSettings).toBe(true)
    })

    // ══════════════════════════════════════════════════════════
    // TC-03: Open Terms of Service
    // Testing Technique: Positive Testing, Navigation Testing
    // ══════════════════════════════════════════════════════════
    it('should open Terms of Service dialog and close it', async () => {
        await AccountMenuPage.clickTermsOfService()
        
        const tosHeader = $('//*[contains(text(), "Terms of Service")]')
        await expect(tosHeader).toBeDisplayed()
        
        await AccountMenuPage.closeDialog()
        
        const isStillDisplayed = await tosHeader.isDisplayed().catch(() => false)
        expect(isStillDisplayed).toBe(false)
    })

    // ══════════════════════════════════════════════════════════
    // TC-04: Open Privacy Policy
    // Testing Technique: Positive Testing, Navigation Testing
    // ══════════════════════════════════════════════════════════
    it('should open Privacy Policy dialog and close it', async () => {
        await AccountMenuPage.clickPrivacyPolicy()
        
        const privacyHeader = $('//*[contains(text(), "Privacy Policy")]')
        await expect(privacyHeader).toBeDisplayed()
        
        await AccountMenuPage.closeDialog()
        
        const isStillDisplayed = await privacyHeader.isDisplayed().catch(() => false)
        expect(isStillDisplayed).toBe(false)
    })

    // ══════════════════════════════════════════════════════════
    // TC-05: Open Data Processing Agreement
    // Testing Technique: Positive Testing, Navigation Testing
    // ══════════════════════════════════════════════════════════
    it('should open Data Processing Agreement dialog and close it', async () => {
        await AccountMenuPage.clickDataProcessingAgreement()
        
        const dpaHeader = $('//*[contains(text(), "Data Processing Agreement")]')
        await expect(dpaHeader).toBeDisplayed()
        
        await AccountMenuPage.closeDialog()
        
        const isStillDisplayed = await dpaHeader.isDisplayed().catch(() => false)
        expect(isStillDisplayed).toBe(false)
    })
})