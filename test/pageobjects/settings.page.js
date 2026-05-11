import BasePage from './base.page.js'

class SettingsPage extends BasePage {

    get accountSettingsNav() {
        return $('[data-testid="vert-nav-account-settings"]')
    }

    get caseDataTypesTab() {
        return $('[data-testid="account-settings-case-data-tab"]')
    }

    get caseTypesTab() {
        return $('[data-testid="account-settings-case-types-tab"]')
    }

    async navigateToSettings() {
        await browser.url('/account/settings')
        await browser.pause(1500)
        await this.caseDataTypesTab.waitForExist({ timeout: 15000 })
    }

    async open() {
        await browser.url('/account/settings')
        await browser.pause(1500)
        await this.caseDataTypesTab.waitForExist({ timeout: 15000 })
    }

    async navigateToCaseDataTypes() {
        await this.caseDataTypesTab.waitForDisplayed({ timeout: 15000 })
        await this.caseDataTypesTab.waitForClickable({ timeout: 15000 })
        await this.caseDataTypesTab.click()
        await browser.pause(1000)
    }

    async navigateToCaseTypes() {
        await this.caseTypesTab.waitForDisplayed({ timeout: 15000 })
        await this.caseTypesTab.waitForClickable({ timeout: 15000 })
        await this.caseTypesTab.click()
        await browser.pause(1000)
    }

    async isOnSettingsPage() {
        try {
            const url = await browser.getUrl()
            if (!url.includes('/account/settings')) return false
            await this.caseDataTypesTab.waitForExist({ timeout: 5000 })
            return true
        } catch {
            return false
        }
    }
}

export default new SettingsPage()