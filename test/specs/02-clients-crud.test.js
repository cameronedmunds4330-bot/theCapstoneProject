import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients CRUD Operations - Test Case 2', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()
    })

    // ══════════════════════════════════════════════════════════
    // TC-06: Create New Client with Contact
    // Testing Technique: Positive Testing, CRUD Operations, Integration Testing
    // Jira: MTQA-5420
    // ══════════════════════════════════════════════════════════
    it('should create a new client with all details and add a contact', async () => {
        await ClientsPage.clickCreate()
        
        const clientData = {
            name: 'test',
            address: 'test 123',
            city: 'test city',
            state: 'utah',
            zip: '84095',
            url: 'www.test.com',
            phone: '(801) 888-8888'
        }
        
        await ClientsPage.createClient(clientData)
        
        // Verify client was created
        const successToast = $('.fui-Toast')
        await expect(successToast).toBeDisplayed()
        
        await browser.pause(1000)
        
        // Search for the created client
        await ClientsPage.searchFor('test')
        await browser.pause(1000)
        
        const clientRow = $('//*[contains(text(), "test")]')
        await expect(clientRow).toBeDisplayed()
        
        // Open client to edit and add contact
        await ClientsPage.openClientMenu('test')
        await ClientsPage.clickEdit()
        
        const contactData = {
            name: 'test',
            title: 'Parent',
            email: 'test@testing.com',
            address: '123 Fake St',
            city: 'test city',
            state: 'utah',
            zip: '84095',
            phone: '(801) 777-7777'
        }
        
        await ClientsPage.addContact(contactData)
        
        // Go back to clients list
        await ClientsPage.goBackToClientsList()
        
        // Clean up - delete the test client
        await ClientsPage.searchFor('test')
        await ClientsPage.openClientMenu('test')
        await ClientsPage.clickDelete()
        await ClientsPage.confirmDelete()
        
        // Verify deletion
        const deleteToast = $('.fui-Toast')
        await expect(deleteToast).toBeDisplayed()
    })

    // ══════════════════════════════════════════════════════════
    // TC-07: Verify Select All Functionality
    // Testing Technique: Positive Testing, UI Interaction
    // ══════════════════════════════════════════════════════════
    it('should select and deselect all clients using checkbox', async () => {
        await ClientsPage.selectAllCheckbox.waitForDisplayed({ timeout: 10000 })
        
        // Select all
        await ClientsPage.selectAllClients()
        
        const isChecked = await ClientsPage.selectAllCheckbox.isSelected()
        expect(isChecked).toBe(true)
        
        // Deselect all
        await ClientsPage.selectAllClients()
        
        const isUnchecked = await ClientsPage.selectAllCheckbox.isSelected()
        expect(isUnchecked).toBe(false)
    })
})