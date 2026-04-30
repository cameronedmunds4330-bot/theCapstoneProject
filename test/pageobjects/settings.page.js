import BasePage from './base.page.js'

class SettingsPage extends BasePage {
    get accountSettingsNav() {
        return $('[data-testid="vert-nav-account-settings"]')
    }

    get caseDataTypesTab() {
        return $('[data-testid="account-settings-case-data-tab"]')
    }

    get settingsHeader() {
        return $('.fui-Subtitle1=Account Info')
    }

    async navigateToSettings() {
        await this.waitAndClick(this.accountSettingsNav)
        await this.pause(1000)
    }

    async navigateToCaseDataTypes() {
        await this.waitAndClick(this.caseDataTypesTab)
        await this.pause(1000)
    }

    async isOnSettingsPage() {
        try {
            await this.waitForElement(this.settingsHeader, 5000)
            return true
        } catch {
            return false
        }
    }
}

export default new SettingsPage()