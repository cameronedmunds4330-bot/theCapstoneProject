import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'
import CaseDataTypesPage from '../pageobjects/case-data-types.page.js'

describe('Case Data Types - Test Cases 7-11', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()
        await SettingsPage.navigateToSettings()
        await SettingsPage.navigateToCaseDataTypes()
    })

    // TC-14: Create New "New" Status with Character Limits

    it('should create a New case status with 50 char limit', async () => {
        const statusName = '1'.repeat(50)
        const description = '1'.repeat(200)
        
        await CaseDataTypesPage.addNewStatus('New', statusName, description)
        
        // Verify success toast
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
        
        // Edit the status
        await CaseDataTypesPage.editStatus()
        await browser.pause(500)
        
        // Click cancel
        await CaseDataTypesPage.cancelButton.click()
        await browser.pause(500)
        
        // Delete the status
        await CaseDataTypesPage.deleteStatus()
        
        // Verify deletion toast
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
    })

    // TC-15: Create New "Active" Status
  

    it('should create an Active case status successfully', async () => {
        const statusName = '1'.repeat(50)
        const description = '1'.repeat(200)
        
        await CaseDataTypesPage.addNewStatus('Active', statusName, description)
        
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
        
        await CaseDataTypesPage.editStatus()
        await CaseDataTypesPage.cancelButton.click()
        
        await CaseDataTypesPage.deleteStatus()
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
    })

    // TC-16: Create New "Completed" Status

    it('should create a Completed case status successfully', async () => {
        const statusName = '1'.repeat(50)
        const description = '1'.repeat(200)
        
        await CaseDataTypesPage.addNewStatus('Completed', statusName, description)
        
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
        
        await CaseDataTypesPage.editStatus()
        await CaseDataTypesPage.cancelButton.click()
        
        await CaseDataTypesPage.deleteStatus()
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
    })

    // TC-17: Create New "Closed" Status

    it('should create a Closed case status successfully', async () => {
        const statusName = '1'.repeat(50)
        const description = '1'.repeat(200)
        
        await CaseDataTypesPage.addNewStatus('Closed', statusName, description)
        
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
        
        await CaseDataTypesPage.editStatus()
        await CaseDataTypesPage.cancelButton.click()
        
        await CaseDataTypesPage.deleteStatus()
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
    })

    // TC-18: Create New "Removed" Status

    it('should create a Removed case status successfully', async () => {
        const statusName = '1'.repeat(50)
        const description = '1'.repeat(200)
        
        await CaseDataTypesPage.addNewStatus('Removed', statusName, description)
        
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
        
        await CaseDataTypesPage.editStatus()
        await CaseDataTypesPage.cancelButton.click()
        
        await CaseDataTypesPage.deleteStatus()
        await expect(CaseDataTypesPage.successToast).toBeDisplayed()
    })
})