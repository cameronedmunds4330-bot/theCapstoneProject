import BasePage from './base.page.js'

class AccountMenuPage extends BasePage {


    get menuButton() {
        return $('[data-testid="menu-account-popover-button"]')
    }

    get settingsButton() {
        return $('[data-testid="account-control-settings-button"]')
    }

    get logoutButton() {
        return $('[data-testid="menu-logout-button"]')
    }


    get termsOfServiceButton() {
        return $('[data-testid="menu-terms-of-service-link"]')
    }

    get privacyPolicyButton() {
        return $('[data-testid="menu-privacy-policy-link"]')
    }


    get dataProcessingAgreementButton() {
        return $('[data-testid="menu-data-processing-agreement-link"]')
    }

    get dialogCloseButton() {
        return $('[data-testid="login-tos-close"]')
    }

    // Open the account menu 

    async openMenu() {
        await this.menuButton.waitForDisplayed({ timeout: 15000 })
        await this.menuButton.waitForClickable({ timeout: 15000 })
        await this.menuButton.click()
        await browser.pause(600)
    }


    async clickSettings() {
        await this.openMenu()
        await this.settingsButton.waitForDisplayed({ timeout: 10000 })
        await this.settingsButton.click()
        await browser.pause(1500)
    }


    async clickTermsOfService() {
        await this.openMenu()
        await this.termsOfServiceButton.waitForDisplayed({ timeout: 10000 })
        await this.termsOfServiceButton.click()
        await browser.pause(800)
    }

    async clickPrivacyPolicy() {
        await this.openMenu()
        await this.privacyPolicyButton.waitForDisplayed({ timeout: 10000 })
        await this.privacyPolicyButton.click()
        await browser.pause(800)
    }

    async clickDataProcessingAgreement() {
        await this.openMenu()
        await this.dataProcessingAgreementButton.waitForDisplayed({ timeout: 10000 })
        await this.dataProcessingAgreementButton.click()
        await browser.pause(800)
    }

    async closeDialog() {
        await this.dialogCloseButton.waitForDisplayed({ timeout: 10000 })
        await this.dialogCloseButton.click()
        await browser.pause(600)
    }

    // Logout 

    async logout() {
        await this.openMenu()
        await this.logoutButton.waitForDisplayed({ timeout: 10000 })
        await this.logoutButton.click()
        await browser.pause(2000)
    }
}

export default new AccountMenuPage()