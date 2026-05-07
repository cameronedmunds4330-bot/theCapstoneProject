import BasePage from './base.page.js'

class AccountMenuPage extends BasePage {

    // ── Selectors — verified against real DOM in PDF ──────────────────────────

    get menuButton() {
        return $('[data-testid="menu-account-popover-button"]')
    }

    // PDF page 1: data-testid="account-control-settings-button"
    get settingsButton() {
        return $('[data-testid="account-control-settings-button"]')
    }

    // PDF page 14: data-testid="menu-logout-button"
    get logoutButton() {
        return $('[data-testid="menu-logout-button"]')
    }

    // PDF page 1: data-testid="menu-terms-of-service-link"
    get termsOfServiceButton() {
        return $('[data-testid="menu-terms-of-service-link"]')
    }

    // PDF page 2: data-testid="menu-privacy-policy-link"
    get privacyPolicyButton() {
        return $('[data-testid="menu-privacy-policy-link"]')
    }

    // PDF page 2: data-testid="menu-data-processing-agreement-link"
    get dataProcessingAgreementButton() {
        return $('[data-testid="menu-data-processing-agreement-link"]')
    }

    // PDF pages 2, 6, 10: all three dialogs share data-testid="login-tos-close"
    get dialogCloseButton() {
        return $('[data-testid="login-tos-close"]')
    }

    // ── Open the account menu ─────────────────────────────────────────────────

    async openMenu() {
        await this.menuButton.waitForDisplayed({ timeout: 15000 })
        await this.menuButton.waitForClickable({ timeout: 15000 })
        await this.menuButton.click()
        await browser.pause(600)
    }

    // ── Navigate to Settings ──────────────────────────────────────────────────

    async clickSettings() {
        await this.openMenu()
        await this.settingsButton.waitForDisplayed({ timeout: 10000 })
        await this.settingsButton.click()
        await browser.pause(1500)
    }

    // ── Legal dialogs ─────────────────────────────────────────────────────────

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

    // ── Close dialog — all three share the same close button testid ──────────

    async closeDialog() {
        await this.dialogCloseButton.waitForDisplayed({ timeout: 10000 })
        await this.dialogCloseButton.click()
        await browser.pause(600)
    }

    // ── Logout ────────────────────────────────────────────────────────────────

    async logout() {
        await this.openMenu()
        await this.logoutButton.waitForDisplayed({ timeout: 10000 })
        await this.logoutButton.click()
        await browser.pause(2000)
    }
}

export default new AccountMenuPage()