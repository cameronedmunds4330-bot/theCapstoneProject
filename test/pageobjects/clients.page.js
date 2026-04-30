import BasePage from './base.page.js'
import path from 'path'

class ClientsPage extends BasePage {
    get clientsNav() {
        return $('[data-testid="vert-nav-clients-parties"]')
    }

    get createButton() {
        return $('[data-testid="parties-create-button"]')
    }

    get importButton() {
        return $('[data-testid="parties-import-button"]')
    }

    get searchInput() {
        return $('[data-testid="search-input"]')
    }

    get selectAllCheckbox() {
        return $('input[aria-label="Select all rows"]')
    }

    get deleteSelectedButton() {
        return $('[data-testid="parties-delete-selected-button"]')
    }

    get confirmDeleteButton() {
        return $('[data-testid="confirmation-dialog-confirm-button"]')
    }

    // Create client form fields
    get nameInput() {
        return $('[data-testid="party-dialog-name-input"]')
    }

    get addressInput() {
        return $('[data-testid="party-dialog-address1-input"]')
    }

    get cityInput() {
        return $('[data-testid="party-dialog-city-input"]')
    }

    get stateInput() {
        return $('[data-testid="party-dialog-state-input"]')
    }

    get zipInput() {
        return $('[data-testid="party-dialog-zip-input"]')
    }

    get urlInput() {
        return $('[data-testid="party-dialog-url-input"]')
    }

    get addPhoneButton() {
        return $('[data-testid="phone-panel-add-button"]')
    }

    get phoneNumberInput() {
        return $('[data-testid="phone-dialog-number-input"]')
    }

    get phoneTypeCombobox() {
        return $('[data-testid="phone-dialog-type-combobox"]')
    }

    get phonePrimarySwitch() {
        return $('input[name="primary"]')
    }

    get phoneSubmitButton() {
        return $('[data-testid="phone-dialog-submit-button"]')
    }

    get createClientButton() {
        return $('[data-testid="party-dialog-create-button"]')
    }

    // The file input for CSV import is hidden (display:none), so we reference it
    // but must use browser.execute to set its value - see importCSV() below
    get uploadInput() {
        return $('input[type="file"][accept=".csv"]')
    }

    get importUploadButton() {
        return $('[data-testid="import-parties-upload-button"]')
    }

    // Contact fields
    get addContactButton() {
        return $('[data-testid="edit-party-add-contact-button"]')
    }

    get createNewContactSwitch() {
        return $('[data-testid="select-contacts-create-new-contact-link"]')
    }

    get contactNameInput() {
        return $('[data-testid="select-contacts-name-input"]')
    }

    get contactTitleInput() {
        return $('[data-testid="select-contacts-title-input"]')
    }

    get contactEmailInput() {
        return $('[data-testid="select-contacts-email-input"]')
    }

    get contactAddressInput() {
        return $('[data-testid="select-contacts-address1-input"]')
    }

    get contactCityInput() {
        return $('[data-testid="select-contacts-city-input"]')
    }

    get contactStateInput() {
        return $('[data-testid="select-contacts-state-input"]')
    }

    get contactZipInput() {
        return $('[data-testid="select-contacts-zip-input"]')
    }

    get addNewContactButton() {
        return $('[data-testid="select-contacts-submit-button"]')
    }

    get breadcrumbHomeButton() {
        return $('[data-testid="parties-page-breadcrumb-home-button"]')
    }

    async navigate() {
        await this.waitAndClick(this.clientsNav)
        await this.pause(1500)
    }

    async clickCreate() {
        await this.waitAndClick(this.createButton)
        await this.pause(1000)
    }

    // FIX for 02-clients-crud:
    // The old code used `svg.fui-Icon` to select a phone type option from the dropdown,
    // which was too broad and grabbed the wrong element.
    // The correct approach: type the phone type into the combobox, wait for the dropdown
    // list to appear, then click the option that matches by text.
    async selectPhoneType(phoneType) {
        // Type the value to filter the dropdown options
        await this.waitAndSetValue(this.phoneTypeCombobox, phoneType)
        await this.pause(500)

        // The dropdown renders options as listbox items - pick the one matching our text
        const option = $(`[role="option"]=${phoneType}`)
        const optionExists = await option.isExisting().catch(() => false)

        if (optionExists) {
            await option.waitForDisplayed({ timeout: 5000 })
            await option.click()
        } else {
            // Fallback: try finding by text content inside listbox
            const fallbackOption = $(`//*[@role="option" and normalize-space(text())="${phoneType}"]`)
            await fallbackOption.waitForDisplayed({ timeout: 5000 })
            await fallbackOption.click()
        }

        await this.pause(300)
    }

    async createClient(clientData) {
        await this.waitAndSetValue(this.nameInput, clientData.name)
        await this.waitAndSetValue(this.addressInput, clientData.address)
        await this.waitAndSetValue(this.cityInput, clientData.city)
        await this.waitAndSetValue(this.stateInput, clientData.state)
        await this.waitAndSetValue(this.zipInput, clientData.zip)

        if (clientData.url) {
            await this.waitAndSetValue(this.urlInput, clientData.url)
        }

        // Add phone number
        await this.waitAndClick(this.addPhoneButton)
        await this.pause(500)

        await this.waitAndSetValue(this.phoneNumberInput, clientData.phone)

        // Use the fixed selectPhoneType method instead of the broken svg.fui-Icon approach
        await this.selectPhoneType('Cell')

        await this.waitAndClick(this.phonePrimarySwitch)
        await this.waitAndClick(this.phoneSubmitButton)
        await this.pause(500)

        // Submit client creation
        await this.waitAndClick(this.createClientButton)
        await this.pause(2000)
    }

    async searchFor(searchTerm) {
        await this.waitAndSetValue(this.searchInput, searchTerm)
        await this.pause(1000)
    }

    async clearSearch() {
        // Try clicking the X button inside the search bar first
        const clearButton = $('[data-testid="search-input"] ~ button, .fui-Button__icon')
        const isDisplayed = await clearButton.isDisplayed().catch(() => false)
        if (isDisplayed) {
            await clearButton.click()
            await this.pause(1000)
        } else {
            // Fallback: clear the input directly using keyboard shortcut
            await this.searchInput.click()
            await browser.keys(['Control', 'a'])
            await browser.keys('Delete')
            await this.pause(1000)
        }
    }

    async openClientMenu(clientName) {
        const moreButton = $('button[aria-label="More items"]')
        await moreButton.waitForDisplayed({ timeout: 10000 })
        await moreButton.click()
        await this.pause(500)
    }

    async clickEdit() {
        const editOption = $('span.fui-MenuItem__content=Edit')
        await editOption.waitForDisplayed({ timeout: 5000 })
        await editOption.click()
        await this.pause(1000)
    }

    async clickDelete() {
        const deleteOption = $('span.fui-MenuItem__content=Delete')
        await deleteOption.waitForDisplayed({ timeout: 5000 })
        await deleteOption.click()
        await this.pause(500)
    }

    async confirmDelete() {
        await this.waitAndClick(this.confirmDeleteButton)
        await this.pause(2000)
    }

    async addContact(contactData) {
        await this.waitAndClick(this.addContactButton)
        await this.pause(500)

        await this.waitAndClick(this.createNewContactSwitch)
        await this.pause(500)

        await this.waitAndSetValue(this.contactNameInput, contactData.name)
        await this.waitAndSetValue(this.contactTitleInput, contactData.title)
        await this.waitAndSetValue(this.contactEmailInput, contactData.email)
        await this.waitAndSetValue(this.contactAddressInput, contactData.address)
        await this.waitAndSetValue(this.contactCityInput, contactData.city)
        await this.waitAndSetValue(this.contactStateInput, contactData.state)
        await this.waitAndSetValue(this.contactZipInput, contactData.zip)

        // Add contact phone using the fixed selectPhoneType method
        await this.waitAndClick(this.addPhoneButton)
        await this.pause(500)

        await this.waitAndSetValue(this.phoneNumberInput, contactData.phone)
        await this.selectPhoneType('Office')

        await this.waitAndClick(this.phonePrimarySwitch)
        await this.waitAndClick(this.phoneSubmitButton)
        await this.pause(500)

        await this.waitAndClick(this.addNewContactButton)
        await this.pause(2000)
    }

    async goBackToClientsList() {
        await this.waitAndClick(this.breadcrumbHomeButton)
        await this.pause(1000)
    }

    // FIX for 03-clients-import:
    // The file input has style="display:none" so WebdriverIO's normal setValue()
    // throws "Element did not become interactable".
    // We use browser.execute() to directly set the file input's value via a DataTransfer
    // object, which bypasses the visibility check that WebdriverIO enforces.
    async importCSV(filename) {
        const filePath = path.join(process.cwd(), 'test/data', filename)

        // Click the import button to open the file upload modal
        await this.waitAndClick(this.importButton)
        await this.pause(1000)

        // Use browser.execute to set the hidden file input's value directly,
        // bypassing the "element not interactable" error caused by display:none
        const fileInput = await $('input[type="file"][accept=".csv"]')
        await browser.execute((el, fp) => {
            // Create a minimal File object and attach it to the input
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, 'value'
            ).set
            nativeInputValueSetter.call(el, fp)
            el.dispatchEvent(new Event('input', { bubbles: true }))
            el.dispatchEvent(new Event('change', { bubbles: true }))
        }, fileInput, filePath)

        // Alternatively (and more reliably), use WebdriverIO's addValue on the element
        // after temporarily making it visible via JS
        await browser.execute((el) => {
            el.style.display = 'block'
            el.style.visibility = 'visible'
            el.style.opacity = '1'
        }, fileInput)

        await this.pause(300)
        await fileInput.setValue(filePath)

        // Hide it again so the page looks normal
        await browser.execute((el) => {
            el.style.display = 'none'
        }, fileInput)

        await this.pause(1000)

        // Click the Import button inside the modal to confirm the upload
        await this.waitAndClick(this.importUploadButton)
        await this.pause(3000) // Give the server time to process the import
    }

    async selectAllClients() {
        await this.waitAndClick(this.selectAllCheckbox)
        await this.pause(1000)
    }

    async deleteAllSelected() {
        await this.waitAndClick(this.deleteSelectedButton)
        await this.pause(500)
        await this.confirmDelete()
    }

    async getTableRowCount() {
        const rows = await $$('table tr')
        return rows.length - 1 // Subtract header row
    }
}

export default new ClientsPage()