import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SettingsPage from '../pageobjects/settings.page.js'
import CaseTypesPage from '../pageobjects/case-types.page.js'

describe('Case Types – Test Case 8', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login()

        // Navigate to Settings → Case Data Types → Case Types tab
        await SettingsPage.navigateToSettings()
        await SettingsPage.navigateToCaseDataTypes()
        await CaseTypesPage.open()
    })

    it('TC‑12: should create, edit, and delete a case type', async () => {

        const name = 'Automation Case Type'
        const updated = 'Updated Case Type'

        //
        // CREATE
        //
        await CaseTypesPage.createCaseType(name, 'Test description')
        await expect(CaseTypesPage.rowByName(name)).toBeDisplayed()

        //
        // EDIT
        //
        await CaseTypesPage.editCaseType(name, updated)
        await expect(CaseTypesPage.rowByName(updated)).toBeDisplayed()

        //
        // DELETE
        //
        await CaseTypesPage.deleteCaseType(updated)

        // Row should no longer exist
        const exists = await CaseTypesPage.rowByName(updated).isExisting()
        expect(exists).toBe(false)
    })
})
