import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients Search Functionality - Test Cases 4 & 5', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()
    })

    // ══════════════════════════════════════════════════════════
    // TC-11: Search for Non-Existing Client
    // Testing Technique: Negative Testing, Search Validation
    // Jira: MTQA-5656
    // ══════════════════════════════════════════════════════════
    it('should return no results when searching for "apple"', async () => {
        await ClientsPage.searchFor('Apple')
        
        // Wait for filtering to complete
        await browser.pause(1000)
        
        // Check if "apple" appears in results (it shouldn't)
        const appleResult = $('//*[contains(text(), "Apple")]')
        const exists = await appleResult.isExisting()
        expect(exists).toBe(false)
        
        // Clear search
        await ClientsPage.clearSearch()
        
        // Verify search was cleared
        const searchValue = await ClientsPage.searchInput.getValue()
        expect(searchValue).toBe('')
    })

    // ══════════════════════════════════════════════════════════
    // TC-12: Search for Existing Client - Cameron Edmunds
    // Testing Technique: Positive Testing, Search Functionality
    // Jira: MTQA-5428
    // ══════════════════════════════════════════════════════════
    it('should find Cameron Edmunds and allow editing', async () => {
        await ClientsPage.searchFor('Cameron Edmunds')
        
        const clientRow = $('//*[contains(text(), "Cameron Edmunds")]')
        await expect(clientRow).toBeDisplayed()
        
        // Open 3-dot menu and click edit
        await ClientsPage.openClientMenu('Cameron Edmunds')
        await ClientsPage.clickEdit()
        
        // Verify we're on the edit page
        await browser.pause(1000)
        const currentUrl = await browser.getUrl()
        expect(currentUrl).not.toContain('clientsParties')
        
        // Go back to clients list
        await ClientsPage.goBackToClientsList()
        
        const listUrl = await browser.getUrl()
        expect(listUrl).toContain('clientsParties')
    })

    // ══════════════════════════════════════════════════════════
    // TC-13: Search Clear Restores Full Table
    // Testing Technique: Positive Testing, State Management
    // ══════════════════════════════════════════════════════════
    it('should restore full client list when search is cleared', async () => {
        // Get initial row count
        const initialCount = await ClientsPage.getTableRowCount()
        expect(initialCount).toBeGreaterThan(0)
        
        // Search to filter results
        await ClientsPage.searchFor('Cameron')
        await browser.pause(1000)
        
        const filteredCount = await ClientsPage.getTableRowCount()
        expect(filteredCount).toBeLessThanOrEqual(initialCount)
        
        // Clear search
        await ClientsPage.clearSearch()
        await browser.pause(1000)
        
        // Verify full list restored
        const restoredCount = await ClientsPage.getTableRowCount()
        expect(restoredCount).toBe(initialCount)
    })
})