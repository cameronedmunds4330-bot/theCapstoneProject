import BasePage from './base.page.js'

class AccountMenuPage extends BasePage {
    get menuButton() {
        return $('[data-testid="menu-account-popover-button"]')
    }

    get settingsButton() {
        return $('[data-testid="account-control-settings-button"]')
    }

    get termsOfServiceLink() {
        return $('[data-testid="menu-terms-of-service-link"]')
    }

    get privacyPolicyLink() {
        return $('[data-testid="menu-privacy-policy-link"]')
    }

    get dataProcessingAgreementLink() {
        return $('[data-testid="menu-data-processing-agreement-link"]')
    }

    get logoutButton() {
        return $('[data-testid="menu-logout-button"]')
    }

    get dialogCloseButton() {
        return $('[data-testid="login-tos-close"]')
    }

    async openMenu() {
        await this.waitAndClick(this.menuButton)
        await this.pause(500)
    }

    async clickSettings() {
        await this.openMenu()
        await this.waitAndClick(this.settingsButton)
        await this.pause(1000)
    }

    async clickTermsOfService() {
        await this.openMenu()
        await this.waitAndClick(this.termsOfServiceLink)
        await this.pause(1000)
    }

    async clickPrivacyPolicy() {
        await this.openMenu()
        await this.waitAndClick(this.privacyPolicyLink)
        await this.pause(1000)
    }

    async clickDataProcessingAgreement() {
        await this.openMenu()
        await this.waitAndClick(this.dataProcessingAgreementLink)
        await this.pause(1000)
    }

    async closeDialog() {
        await this.waitAndClick(this.dialogCloseButton)
        await this.pause(500)
    }

    async logout() {
        await this.openMenu()
        await this.waitAndClick(this.logoutButton)
        await this.pause(1000)
    }
}

export default new AccountMenuPage()