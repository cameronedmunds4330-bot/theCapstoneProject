export default class BasePage {
    async open(path) {
        return await browser.url(path)
    }

    async waitAndClick(selector) {
        await selector.waitForDisplayed({ timeout: 15000 })
        await selector.click()
    }

    async waitAndSetValue(selector, value) {
        await selector.waitForDisplayed({ timeout: 15000 })
        await selector.clearValue()
        await selector.setValue(value)
    }

    async waitForElement(selector, timeout = 15000) {
        await selector.waitForDisplayed({ timeout })
    }

    async scrollIntoView(selector) {
        await selector.scrollIntoView()
    }

    async pause(ms = 1000) {
        await browser.pause(ms)
    }

    async dismissToast() {
        const dismissButton = $('span.fui-Text=Dismiss')
        const isDisplayed = await dismissButton.isDisplayed().catch(() => false)
        if (isDisplayed) {
            await dismissButton.click()
            await this.pause(500)
        }
    }
}