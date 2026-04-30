import BasePage from './base.page.js'

class CaseDataTypesPage extends BasePage {
    get saveButton() {
        return $('[data-testid="add-edit-status-save-button"]')
    }

    get cancelButton() {
        return $('[data-testid="add-edit-status-cancel-button"]')
    }

    get successToast() {
        return $('.fui-Toast')
    }

    // Info tooltips
    getCaseDataTypesInfoButton() {
        return $('button[aria-label="information"]')
    }

    getInfoButton(label) {
        const buttons = $$('button[aria-label="information"]')
        return buttons
    }

    // Dynamic selectors for case status operations
    getAddStatusButton(statusType) {
        return $(`[data-testid="add-case-status-${statusType}"]`)
    }

    getStatusInput() {
        return $('[data-testid="add-edit-status-status-input"]')
    }

    getDescriptionInput() {
        return $('[data-testid="add-edit-status-description-input"]')
    }

    async addNewStatus(statusType, statusName, description) {
        const addButton = await this.getAddStatusButton(statusType)
        await this.waitAndClick(addButton)
        await this.pause(500)
        
        await this.waitAndSetValue(this.getStatusInput(), statusName)
        await this.waitAndSetValue(this.getDescriptionInput(), description)
        
        await this.waitAndClick(this.saveButton)
        await this.pause(1000)
    }

    async clickInfoTooltip(index = 0) {
        const infoButtons = await this.getInfoButton()
        if (infoButtons[index]) {
            await infoButtons[index].waitForDisplayed({ timeout: 10000 })
            await infoButtons[index].click()
            await this.pause(500)
        }
    }

    async closeInfoTooltip(index = 0) {
        const infoButtons = await this.getInfoButton()
        if (infoButtons[index]) {
            await infoButtons[index].click()
            await this.pause(500)
        }
    }

    async getTooltipText() {
        const tooltip = $('.fui-PopoverSurface')
        await tooltip.waitForDisplayed({ timeout: 5000 })
        return await tooltip.getText()
    }

    async editStatus() {
        const pencilIcon = $('svg[aria-hidden="true"]')
        await pencilIcon.waitForDisplayed({ timeout: 10000 })
        await pencilIcon.click()
        await this.pause(500)
    }

    async deleteStatus() {
        const deleteIcon = $('svg[aria-hidden="true"]:last-child')
        await deleteIcon.waitForDisplayed({ timeout: 10000 })
        await deleteIcon.click()
        await this.pause(1000)
    }
}

export default new CaseDataTypesPage()