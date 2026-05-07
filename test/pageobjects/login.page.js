import BasePage from './base.page.js'

class LoginPage extends BasePage {
    get usernameInput() {
        return $('[data-testid="login-username"]')
    }

    get passwordInput() {
        return $('[data-testid="login-password"]')
    }

    get submitButton() {
        return $('[data-testid="login-submit"]')
    }

    get errorMessage() {
        return $('[data-testid="login-error-text"]')
    }

    get accountMenuButton() {
        return $('[data-testid="menu-account-popover-button"]')
    }

    async open() {
        await super.open('https://app.thecasework.com/')
        await this.pause(1000)
    }

    async login(username = 'cameron.edmunds4330@stu.mtec.edu', password = 'Successful!4321') {
 
        const alreadyLoggedIn = await this.accountMenuButton.isDisplayed().catch(() => false)
        if (alreadyLoggedIn) {
            console.log('✓ Already logged in - skipping login form')
            await super.open('https://app.thecasework.com/')
            await this.pause(1000)
            return
        }


        await this.usernameInput.waitForDisplayed({ timeout: 15000 })

        // Clear and enter username
        await this.usernameInput.clearValue()
        await this.usernameInput.setValue(username)
        await this.pause(300)

        // Clear and enter password
        await this.passwordInput.clearValue()
        await this.passwordInput.setValue(password)
        await this.pause(300)

        // Click submit
        await this.submitButton.click()

        try {
            await this.accountMenuButton.waitForDisplayed({
                timeout: 25000,
                timeoutMsg: 'Login failed - account menu not visible after 25 seconds'
            })

            console.log('✓ Login successful')
            await this.pause(2000)

        } catch (error) {
            const currentUrl = await browser.getUrl()
            console.log('Current URL:', currentUrl)

            const errorExists = await this.errorMessage.isDisplayed().catch(() => false)
            if (errorExists) {
                const errorText = await this.errorMessage.getText()
                throw new Error(`Login failed with error: ${errorText}`)
            }

            throw error
        }
    }
}

export default new LoginPage()