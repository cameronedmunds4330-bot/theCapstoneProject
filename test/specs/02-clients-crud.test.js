import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients CRUD Operations - Test Case 2', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()
    })

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

        // Wait for the creation success toast
        const successToast = $('.fui-Toast')
        await successToast.waitForDisplayed({ timeout: 10000 })
        await expect(successToast).toBeDisplayed()

        await browser.pause(1500)

        // Search for the created client and verify it appears
        await ClientsPage.searchFor('test')
        await browser.pause(1500)

        const clientRow = $('//*[contains(text(), "test")]')
        await clientRow.waitForDisplayed({ timeout: 10000 })
        await expect(clientRow).toBeDisplayed()

        // Open the 3-dot menu and click Edit
        await ClientsPage.openClientMenu('test')
        await ClientsPage.clickEdit()
        await browser.pause(1500)   // wait for the slide-out drawer to open

        // PDF pages 5-6: contact details used in the test case doc
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

        // Go back to the clients list
        await ClientsPage.goBackToClientsList()
        await browser.pause(1500)

        // Clean up — find the client and delete it
        await ClientsPage.searchFor('test')
        await browser.pause(1000)
        await ClientsPage.openClientMenu('test')
        await ClientsPage.clickDelete()
        await ClientsPage.confirmDelete()

        // Verify the deletion toast appears
        const deleteToast = $('.fui-Toast')
        await deleteToast.waitForDisplayed({ timeout: 10000 })
        await expect(deleteToast).toBeDisplayed()
    })

    it('should select and deselect all clients using checkbox', async () => {

        await browser.waitUntil(
            async () => (await ClientsPage.getTableRowCount()) > 0,
            { timeout: 15000, timeoutMsg: 'Client table did not load within 15 seconds' }
        )

        await ClientsPage.selectAllCheckbox.waitForDisplayed({ timeout: 15000 })
        await ClientsPage.selectAllCheckbox.waitForClickable({ timeout: 15000 })

        // Select all
        await ClientsPage.selectAllClients()
        await browser.pause(500)

        const isChecked = await ClientsPage.selectAllCheckbox.isSelected()
        expect(isChecked).toBe(true)

        // Deselect all
        await ClientsPage.selectAllClients()
        await browser.pause(500)

        const isUnchecked = await ClientsPage.selectAllCheckbox.isSelected()
        expect(isUnchecked).toBe(false)
    })
})