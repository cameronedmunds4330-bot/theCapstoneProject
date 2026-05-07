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

    // PDF page 34: aria-label="Select all rows" on the checkbox input
    get selectAllCheckbox() {
        return $('input[aria-label="Select all rows"]')
    }

    get deleteSelectedButton() {
        return $('[data-testid="parties-delete-selected-button"]')
    }

    get confirmDeleteButton() {
        return $('[data-testid="confirmation-dialog-confirm-button"]')
    }

    // ── Create client form ────────────────────────────────────────────────────

    get nameInput()           { return $('[data-testid="party-dialog-name-input"]') }
    get addressInput()        { return $('[data-testid="party-dialog-address1-input"]') }
    get cityInput()           { return $('[data-testid="party-dialog-city-input"]') }
    get stateInput()          { return $('[data-testid="party-dialog-state-input"]') }
    get zipInput()            { return $('[data-testid="party-dialog-zip-input"]') }
    get urlInput()            { return $('[data-testid="party-dialog-url-input"]') }
    get addPhoneButton()      { return $('[data-testid="phone-panel-add-button"]') }
    get phoneNumberInput()    { return $('[data-testid="phone-dialog-number-input"]') }
    get phoneTypeCombobox()   { return $('[data-testid="phone-dialog-type-combobox"]') }
    get phonePrimarySwitch()  { return $('input[name="primary"]') }
    get phoneSubmitButton()   { return $('[data-testid="phone-dialog-submit-button"]') }
    get createClientButton()  { return $('[data-testid="party-dialog-create-button"]') }
    get importUploadButton()  { return $('[data-testid="import-parties-upload-button"]') }

    // ── Contact fields ────────────────────────────────────────────────────────

    get addContactButton()        { return $('[data-testid="edit-party-add-contact-button"]') }
    get createNewContactSwitch()  { return $('[data-testid="select-contacts-create-new-contact-link"]') }
    get contactNameInput()        { return $('[data-testid="select-contacts-name-input"]') }
    get contactTitleInput()       { return $('[data-testid="select-contacts-title-input"]') }
    get contactEmailInput()       { return $('[data-testid="select-contacts-email-input"]') }
    get contactAddressInput()     { return $('[data-testid="select-contacts-address1-input"]') }
    get contactCityInput()        { return $('[data-testid="select-contacts-city-input"]') }
    get contactStateInput()       { return $('[data-testid="select-contacts-state-input"]') }
    get contactZipInput()         { return $('[data-testid="select-contacts-zip-input"]') }
    get addNewContactButton()     { return $('[data-testid="select-contacts-submit-button"]') }
    get breadcrumbHomeButton()    { return $('[data-testid="parties-page-breadcrumb-home-button"]') }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigate() {
        await this.waitAndClick(this.clientsNav)
        await this.pause(1500)
    }

    async clickCreate() {
        await this.waitAndClick(this.createButton)
        await this.pause(1000)
    }

    // ── Phone type dropdown ───────────────────────────────────────────────────

    async selectPhoneType(phoneType) {
        await this.waitAndSetValue(this.phoneTypeCombobox, phoneType)
        await this.pause(500)

        const option = $(`[role="option"]=${phoneType}`)
        const optionExists = await option.isExisting().catch(() => false)

        if (optionExists) {
            await option.waitForDisplayed({ timeout: 5000 })
            await option.click()
        } else {
            const fallback = $(`//*[@role="option" and normalize-space(text())="${phoneType}"]`)
            await fallback.waitForDisplayed({ timeout: 5000 })
            await fallback.click()
        }
        await this.pause(300)
    }

    // ── Primary phone toggle ──────────────────────────────────────────────────

    async togglePrimarySwitch() {
        const label = await $('label[for^="primary"]')
        const labelExists = await label.isExisting().catch(() => false)

        if (labelExists) {
            await label.waitForDisplayed({ timeout: 5000 })
            await browser.execute((el) => el.click(), label)
        } else {
            const input = await this.phonePrimarySwitch
            await input.waitForExist({ timeout: 5000 })
            await browser.execute((el) => el.click(), input)
        }
        await this.pause(300)
    }

    // ── Create client ─────────────────────────────────────────────────────────

    async createClient(clientData) {
        await this.waitAndSetValue(this.nameInput, clientData.name)
        await this.waitAndSetValue(this.addressInput, clientData.address)
        await this.waitAndSetValue(this.cityInput, clientData.city)
        await this.waitAndSetValue(this.stateInput, clientData.state)
        await this.waitAndSetValue(this.zipInput, clientData.zip)

        if (clientData.url) {
            await this.waitAndSetValue(this.urlInput, clientData.url)
        }

        await this.waitAndClick(this.addPhoneButton)
        await this.pause(500)

        await this.waitAndSetValue(this.phoneNumberInput, clientData.phone)
        await this.selectPhoneType('Cell')
        await this.togglePrimarySwitch()

        await this.waitAndClick(this.phoneSubmitButton)
        await this.pause(500)

        await this.waitAndClick(this.createClientButton)
        await this.pause(2000)
    }

    // ── Search ────────────────────────────────────────────────────────────────

    async searchFor(searchTerm) {
        await this.waitAndSetValue(this.searchInput, searchTerm)
        await this.pause(1000)
    }

    /**
     * clearSearch — PDF page 68: clear button is a sibling button to the input.
     * Use the ~ (general sibling) CSS selector from the search input.
     * Falls back to keyboard clearing if the button isn't visible.
     */
    async clearSearch() {
        const searchInput = this.searchInput
        await searchInput.waitForDisplayed({ timeout: 10000 })

        const currentText = await searchInput.getValue().catch(() => '')
        if (currentText === '') return  // Already clear — nothing to do

        // Strategy 1: sibling X button (appears once the input has a value)
        try {
            // PDF page 68: button is a direct sibling inside the search wrapper
            const clearBtn = await searchInput.$('~ button')
            const visible = await clearBtn.isDisplayed().catch(() => false)
            if (visible) {
                await clearBtn.click()
                await browser.pause(800)
                const val = await searchInput.getValue().catch(() => '')
                if (val === '') return
            }
        } catch (_) { /* fall through */ }

        // Strategy 2: any button inside the search container with an svg icon
        try {
            const clearBtn = await $('button .fui-Button__icon ~ svg').parentElement
            const exists = await clearBtn.isExisting().catch(() => false)
            if (exists) {
                await browser.execute((el) => el.click(), clearBtn)
                await browser.pause(800)
                const val = await searchInput.getValue().catch(() => '')
                if (val === '') return
            }
        } catch (_) { /* fall through */ }

        // Strategy 3: keyboard select-all + Delete
        await searchInput.click()
        await browser.keys(['Control', 'a'])
        await browser.keys('Delete')
        await browser.pause(800)

        // Strategy 4: clearValue as last resort
        const val = await searchInput.getValue().catch(() => 'x')
        if (val !== '') {
            await searchInput.clearValue()
            await searchInput.setValue('')
            await browser.keys('Escape')
            await browser.pause(800)
        }

        const finalVal = await searchInput.getValue().catch(() => 'x')
        if (finalVal !== '') {
            throw new Error('Search input could not be cleared')
        }
    }

    // ── Client row 3-dot menu ─────────────────────────────────────────────────

    async openClientMenu(clientName) {
        const row = await $(`//*[contains(text(), "${clientName}")]/ancestor::div[@role="row"]`)
        await row.waitForExist({ timeout: 10000 })
        await row.moveTo()
        await this.pause(400)

        // PDF page 39: aria-label="More items"
        const moreButton = await row.$('button[aria-label="More items"]')
        await moreButton.waitForExist({ timeout: 10000 })
        await browser.execute((el) => el.click(), moreButton)
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

    // ── Add contact ───────────────────────────────────────────────────────────

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

        await this.waitAndClick(this.addPhoneButton)
        await this.pause(500)

        await this.waitAndSetValue(this.phoneNumberInput, contactData.phone)
        await this.selectPhoneType('Office')
        await this.togglePrimarySwitch()

        await this.waitAndClick(this.phoneSubmitButton)
        await this.pause(500)

        await this.waitAndClick(this.addNewContactButton)
        await this.pause(2000)
    }

    async goBackToClientsList() {
        await this.waitAndClick(this.breadcrumbHomeButton)
        await this.pause(1000)
    }

    // ── CSV Import ────────────────────────────────────────────────────────────
    /**
     * importCSV — PDF pages 69-70:
     * The file input has display:none so WebDriver can't click it directly.
     * We JS-unhide it, then setValue the file path, then click Import.
     * Fluent UI shows a 300ms fade-in on the modal — always wait after clicking
     * the import button before touching the file input.
     */
    async importCSV(filename) {
        const filePath = path.join(process.cwd(), 'test/data', filename)

        await this.waitAndClick(this.importButton)
        // Give the Fluent UI dialog fade-in animation time to complete
        await this.pause(1500)

        const fileInput = await $('input[type="file"][accept=".csv"]')
        await fileInput.waitForExist({ timeout: 10000 })

        // Unhide the hidden input so WebDriver can interact with it
        await browser.execute((el) => {
            el.style.display = 'block'
            el.style.visibility = 'visible'
            el.style.opacity = '1'
            el.style.position = 'fixed'
            el.style.top = '0'
            el.style.left = '0'
            el.style.zIndex = '9999'
            el.style.width = '1px'
            el.style.height = '1px'
        }, fileInput)

        await this.pause(500)
        await fileInput.setValue(filePath)
        await this.pause(1000)

        // Wait for the Import button inside the modal to become enabled
        await browser.waitUntil(
            async () => {
                const btn = await $('[data-testid="import-parties-upload-button"]')
                const disabled = await btn.getAttribute('disabled')
                return disabled === null
            },
            {
                timeout: 10000,
                timeoutMsg: 'Import button never became enabled after file selection',
            }
        )

        await this.waitAndClick(this.importUploadButton)
        await this.pause(4000)
    }

    // ── Select all / bulk delete ──────────────────────────────────────────────

    async selectAllClients() {
        const checkbox = this.selectAllCheckbox
        await checkbox.waitForExist({ timeout: 15000 })
        await checkbox.scrollIntoView()
        await this.pause(300)
        await browser.execute((el) => el.click(), checkbox)
        await this.pause(1000)
    }

    async deleteAllSelected() {
        await this.waitAndClick(this.deleteSelectedButton)
        await this.pause(500)
        await this.confirmDelete()
    }

    // ── Table row count ───────────────────────────────────────────────────────

    async getTableRowCount() {
        const rows = await $$('div[role="row"]')
        return Math.max(0, rows.length - 1)
    }
}

export default new ClientsPage()