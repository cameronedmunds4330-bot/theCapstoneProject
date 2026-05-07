import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients Search Functionality - Test Cases 4 & 5', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()

        // Make sure we have rows before any test begins
        await browser.waitUntil(
            async () => (await ClientsPage.getTableRowCount()) > 0,
            { timeout: 15000, timeoutMsg: 'Client table did not load' }
        )
    })

    // ══════════════════════════════════════════════════════════
    // TC-11 / PDF Test Case 4: Search for Non-Existing Client
    // Testing Technique: Negative Testing, Search Validation
    // Jira: MTQA-5656
    // ══════════════════════════════════════════════════════════
    it('should return no results when searching for "apple"', async () => {
        await ClientsPage.searchFor('apple')
        await browser.pause(1500)

        // Expect the grid to be empty
        const rowCount = await ClientsPage.getTableRowCount()
        expect(rowCount).toBe(0)

        // PDF page 11: click the X inside the search bar to clear it
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

    // ══════════════════════════════════════════════════════════
    // TC-12 / PDF Test Case 5: Search for Cameron Edmunds
    // Testing Technique: Positive Testing, Search Functionality
    // Jira: MTQA-5428
    // ══════════════════════════════════════════════════════════
    it('should find Cameron Edmunds and allow editing', async () => {
        await ClientsPage.searchFor('Cameron Edmunds')
        await browser.pause(1500)

        const clientRow = $('//*[contains(text(), "Cameron Edmunds")]')
        await clientRow.waitForDisplayed({ timeout: 10000 })
        await expect(clientRow).toBeDisplayed()

        // PDF page 12: click the 3-dot menu then Edit
        await ClientsPage.openClientMenu('Cameron Edmunds')
        await ClientsPage.clickEdit()
        await browser.pause(1500)

        // The edit panel is a slide-out drawer — verify it opened
        const editPanel = $(
            '[data-testid="client-edit-form"], ' +
            '.fui-DrawerBody, ' +
            '[aria-label="Edit Client"], ' +
            '[role="dialog"]'
        )
        await editPanel.waitForDisplayed({ timeout: 10000 })
        await expect(editPanel).toBeDisplayed()

        // URL stays on clientsParties — the edit is a slide-out, not a new page
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('clientsParties')

        // PDF page 13: click Clients/Parties breadcrumb to go back
        await ClientsPage.goBackToClientsList()
        await browser.pause(1000)

        const listUrl = await browser.getUrl()
        expect(listUrl).toContain('clientsParties')
    })

    // ══════════════════════════════════════════════════════════
    // TC-13: Search Clear Restores Full Table
    // Testing Technique: Positive Testing, State Management
    // ══════════════════════════════════════════════════════════
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