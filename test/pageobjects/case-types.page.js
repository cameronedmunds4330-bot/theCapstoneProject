import { $, browser } from '@wdio/globals'
import BasePage from './base.page.js'

class CaseTypesPage extends BasePage {

    get nameInput() {
        return $('[data-testid="case-type-panel-type-input"]')
    }

    get addButton() {
        return $('[data-testid="case-type-panel-add-button"]')
    }

    get toastMessage() {
        return $('.fui-Toast')
    }

    itemByName(name) {
        return $(`//*[normalize-space(text())="${name}"]`)
    }

    async createCaseType(name) {
        await this.nameInput.waitForDisplayed({ timeout: 10000 })
        await this.nameInput.clearValue()
        await this.nameInput.setValue(name)
        await browser.pause(300)
        await this.addButton.waitForClickable({ timeout: 10000 })
        await this.addButton.click()
        await browser.pause(1000)
    }

    async deleteCaseType(name) {
        const textItem = this.itemByName(name)
        await textItem.waitForExist({ timeout: 10000 })
        await textItem.scrollIntoView({ block: 'center' })
        await browser.pause(300)

        await browser.execute((itemName) => {
            // Make button visible
            const style = document.createElement('style')
            style.id = 'wdio-unhide'
            style.textContent = '.hidden { visibility: visible !important; opacity: 1 !important; pointer-events: auto !important; display: flex !important; }'
            document.head.appendChild(style)

            const btn = document.querySelector(`[data-testid="case-data-type-${itemName}"]`)
            if (!btn) return

            // Get the button's center coordinates and fire a real mouse event sequence
            const rect = btn.getBoundingClientRect()
            const x = rect.left + rect.width / 2
            const y = rect.top + rect.height / 2

            const eventProps = {
                bubbles: true,
                cancelable: true,
                composed: true,
                view: window,
                clientX: x,
                clientY: y,
                screenX: x,
                screenY: y,
                button: 0,
                buttons: 1
            }

            btn.dispatchEvent(new MouseEvent('pointerover', eventProps))
            btn.dispatchEvent(new MouseEvent('mouseover', eventProps))
            btn.dispatchEvent(new MouseEvent('pointermove', eventProps))
            btn.dispatchEvent(new MouseEvent('mousemove', eventProps))
            btn.dispatchEvent(new MouseEvent('pointerdown', { ...eventProps, buttons: 1 }))
            btn.dispatchEvent(new MouseEvent('mousedown', { ...eventProps, buttons: 1 }))
            btn.dispatchEvent(new MouseEvent('pointerup', eventProps))
            btn.dispatchEvent(new MouseEvent('mouseup', eventProps))
            btn.dispatchEvent(new MouseEvent('click', eventProps))

            setTimeout(() => {
                const s = document.getElementById('wdio-unhide')
                if (s) s.remove()
            }, 500)
        }, name)

        await browser.pause(1500)
    }

    async dismissToast() {
        try {
            const dismissBtn = $('span.fui-Text=Dismiss')
            const visible = await dismissBtn.isDisplayed().catch(() => false)
            if (visible) {
                await dismissBtn.click()
                await browser.pause(500)
            }
        } catch (_) { /* already gone */ }
    }
}

export default new CaseTypesPage()