import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import AccountMenuPage from '../pageobjects/account-menu.page.js'

describe('Logout Functionality - Test Case 6', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
    })

    // TC-20: Logout and Verify Session Termination

    it('should logout successfully and prevent back navigation', async () => {
        await AccountMenuPage.logout()

        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('thecasework.com')
        expect(currentUrl).not.toContain('/account')

        await expect(LoginPage.submitButton).toBeDisplayed()

        //  click the browser back arrow — user should NOT get back in
        await browser.back()
        await browser.pause(2000)

        const urlAfterBack = await browser.getUrl()

        if (urlAfterBack.includes('/account')) {
            // The app's route guard should redirect back to login
            await browser.pause(3000)
            const finalUrl = await browser.getUrl()
            expect(finalUrl).not.toContain('/account')
            await expect(LoginPage.submitButton).toBeDisplayed()
        } else {

            await expect(LoginPage.submitButton).toBeDisplayed()
        }
    })
})