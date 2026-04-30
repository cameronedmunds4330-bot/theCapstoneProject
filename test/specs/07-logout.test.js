import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import AccountMenuPage from '../pageobjects/account-menu.page.js'

describe('Logout Functionality - Test Case 6', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
    })

    // ══════════════════════════════════════════════════════════
    // TC-20: Logout and Verify Session Termination
    // Testing Technique: Positive Testing, Security Testing
    // Jira: MTQA-5400
    // ══════════════════════════════════════════════════════════
    it('should logout successfully and prevent back navigation', async () => {
        // Logout
        await AccountMenuPage.logout()
        
        // Verify we're on login page
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('thecasework.com')
        expect(currentUrl).not.toContain('/account')
        
        await expect(LoginPage.submitButton).toBeDisplayed()
        
        // Try to navigate back (simulate browser back button)
        await browser.back()
        await browser.pause(1000)
        
        // Should still be on login page or redirected to login
        const urlAfterBack = await browser.getUrl()
        
        // If we ended up on an account page, it should redirect us back
        if (urlAfterBack.includes('/account')) {
            await browser.pause(2000)
            const finalUrl = await browser.getUrl()
            expect(finalUrl).not.toContain('/account')
            await expect(LoginPage.submitButton).toBeDisplayed()
        } else {
            // We stayed on login page (expected)
            await expect(LoginPage.submitButton).toBeDisplayed()
        }
    })
})