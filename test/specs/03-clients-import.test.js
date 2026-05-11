import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ClientsPage from '../pageobjects/clients.page.js'

describe('Clients Import - Test Case 3', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await ClientsPage.navigate()
    })

    it('should import 5 clients from CSV and delete them', async () => {
        await ClientsPage.importCSV('clients_5.csv')

        // Verify success message bar
        const successToast = $('.fui-MessageBarBody')
        await successToast.waitForDisplayed({ timeout: 15000 })
        await expect(successToast).toBeDisplayed()

        const toastText = await successToast.getText()
        expect(toastText).toContain('5')

        // Close the import dialog by clicking its close/done button
        await ClientsPage.closeImportDialog()
        await browser.pause(1000)

        await ClientsPage.selectAllClients()
        await ClientsPage.deleteAllSelected()

        const deleteToast = $('.fui-Toast')
        await deleteToast.waitForDisplayed({ timeout: 10000 })
        await expect(deleteToast).toBeDisplayed()
    })

    it('should import 50 clients from CSV and delete them', async () => {
        await ClientsPage.importCSV('clients_50.csv')

        const successToast = $('.fui-MessageBarBody')
        await successToast.waitForDisplayed({ timeout: 20000 })
        await expect(successToast).toBeDisplayed()

        const toastText = await successToast.getText()
        expect(toastText).toContain('50')

        await ClientsPage.closeImportDialog()
        await browser.pause(1000)

        await ClientsPage.selectAllClients()
        await ClientsPage.deleteAllSelected()

        const deleteToast = $('.fui-Toast')
        await deleteToast.waitForDisplayed({ timeout: 10000 })
        await expect(deleteToast).toBeDisplayed()
    })

    it('should import 100 clients from CSV and delete them', async () => {
        await ClientsPage.importCSV('clients_100.csv')

        const successToast = $('.fui-MessageBarBody')
        await successToast.waitForDisplayed({ timeout: 30000 })
        await expect(successToast).toBeDisplayed()

        const toastText = await successToast.getText()
        expect(toastText).toContain('100')

        await ClientsPage.closeImportDialog()
        await browser.pause(1000)

        await ClientsPage.selectAllClients()
        await ClientsPage.deleteAllSelected()

        const deleteToast = $('.fui-Toast')
        await deleteToast.waitForDisplayed({ timeout: 10000 })
        await expect(deleteToast).toBeDisplayed()
    })
})