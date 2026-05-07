import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients Search Functionality - Test Cases 4 & 5', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()

        await browser.waitUntil(
            async () => (await ClientsPage.getTableRowCount()) > 0,
            { timeout: 15000, timeoutMsg: 'Client table did not load' }
        )
    })

    // TC-11 / PDF Test Case 4: Search for Non-Existing Client

    it('should return no results when searching for "apple"', async () => {
        await ClientsPage.searchFor('apple')
        await browser.pause(1500)

        const rowCount = await ClientsPage.getTableRowCount()
        expect(rowCount).toBe(0)

        await ClientsPage.clearSearch()
        await browser.pause(1000)

        await browser.waitUntil(
            async () => {
                const val = await ClientsPage.searchInput.getValue()
                return val === ''
            },
            { timeout: 10000, timeoutMsg: 'Search input was not cleared' }
        )

        const searchValue = await ClientsPage.searchInput.getValue()
        expect(searchValue).toBe('')
    })

    // TC-12 / Test Case 5: Search for Cameron Edmunds

    it('should find Cameron Edmunds and allow editing', async () => {
        await ClientsPage.searchFor('Cameron Edmunds')
        await browser.pause(1500)

        const clientRow = $('//*[contains(text(), "Cameron Edmunds")]')
        await clientRow.waitForDisplayed({ timeout: 10000 })
        await expect(clientRow).toBeDisplayed()

        await ClientsPage.openClientMenu('Cameron Edmunds')
        await ClientsPage.clickEdit()
        await browser.pause(1500)

        const editPanel = $(
            '[data-testid="client-edit-form"], ' +
            '.fui-DrawerBody, ' +
            '[aria-label="Edit Client"], ' +
            '[role="dialog"]'
        )
        await editPanel.waitForDisplayed({ timeout: 10000 })
        await expect(editPanel).toBeDisplayed()

        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('clientsParties')

        await ClientsPage.goBackToClientsList()
        await browser.pause(1000)

        const listUrl = await browser.getUrl()
        expect(listUrl).toContain('clientsParties')
    })

    // TC-13: Search Clear Restores Full Table

    it('should restore full client list when search is cleared', async () => {
        const initialCount = await ClientsPage.getTableRowCount()
        expect(initialCount).toBeGreaterThan(0)

        await ClientsPage.searchFor('Cameron')
        await browser.pause(1500)

        const filteredCount = await ClientsPage.getTableRowCount()
        expect(filteredCount).toBeLessThanOrEqual(initialCount)

        await ClientsPage.clearSearch()

        await browser.waitUntil(
            async () => {
                const val = await ClientsPage.searchInput.getValue()
                return val === ''
            },
            { timeout: 10000, timeoutMsg: 'Search input was not cleared' }
        )

        await browser.waitUntil(
            async () => (await ClientsPage.getTableRowCount()) >= initialCount,
            { timeout: 15000, timeoutMsg: 'Full client list did not restore after clearing search' }
        )

        const restoredCount = await ClientsPage.getTableRowCount()
        expect(restoredCount).toBe(initialCount)
    })
})