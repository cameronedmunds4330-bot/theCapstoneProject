import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients Import - Test Case 3', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()
    })

    // ══════════════════════════════════════════════════════════
    // TC-08: Import 5 Clients and Delete
    // Testing Technique: Positive Testing, Data Import, Bulk Operations
    // Jira: MTQA-5539
    // ══════════════════════════════════════════════════════════
    it('should import 5 clients from CSV and delete them', async () => {
        await ClientsPage.importCSV('clients_5.csv')
        
        // Verify success message
        const successToast = $('.fui-MessageBarBody')
        await expect(successToast).toBeDisplayed()
        
        const toastText = await successToast.getText()
        expect(toastText).toContain('5')
        
        // Select all and delete
        await ClientsPage.selectAllClients()
        await ClientsPage.deleteAllSelected()
        
        // Verify deletion success
        const deleteToast = $('.fui-Toast')
        await expect(deleteToast).toBeDisplayed()
    })

    // ══════════════════════════════════════════════════════════
    // TC-09: Import 50 Clients and Delete
    // Testing Technique: Positive Testing, Performance Testing, Boundary Testing
    // ══════════════════════════════════════════════════════════
    it('should import 50 clients from CSV and delete them', async () => {
        await ClientsPage.importCSV('clients_50.csv')
        
        const successToast = $('.fui-MessageBarBody')
        await expect(successToast).toBeDisplayed()
        
        const toastText = await successToast.getText()
        expect(toastText).toContain('50')
        
        await ClientsPage.selectAllClients()
        await ClientsPage.deleteAllSelected()
        
        const deleteToast = $('.fui-Toast')
        await expect(deleteToast).toBeDisplayed()
    })

    // ══════════════════════════════════════════════════════════
    // TC-10: Import 100 Clients and Delete
    // Testing Technique: Positive Testing, Performance Testing, Boundary Testing
    // ══════════════════════════════════════════════════════════
    it('should import 100 clients from CSV and delete them', async () => {
        await ClientsPage.importCSV('clients_100.csv')
        
        const successToast = $('.fui-MessageBarBody')
        await expect(successToast).toBeDisplayed()
        
        const toastText = await successToast.getText()
        expect(toastText).toContain('100')
        
        await ClientsPage.selectAllClients()
        await ClientsPage.deleteAllSelected()
        
        const deleteToast = $('.fui-Toast')
        await expect(deleteToast).toBeDisplayed()
    })
})