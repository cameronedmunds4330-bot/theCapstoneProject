import LoginPage from '../pageobjects/login.page.js';
import CaseDataTypesPage from '../pageobjects/case-data-types.page.js';

describe('Case Data Types - Test Cases 7-11', () => {

    before(async () => {

        await browser.url('/');

        // LOGIN
        await LoginPage.login(
            'cameron.edmunds4330@stu.mtec.edu',
            'Successful!4321'
        );
    });

    it('should create a New case status with 50 char limit', async () => {

        await CaseDataTypesPage.addNewStatus(
            'New',
            'Testing New Status'
        );
    });

    it('should create an Active case status successfully', async () => {

        await CaseDataTypesPage.addNewStatus(
            'Active',
            'Testing Active Status'
        );
    });

    it('should create a Completed case status successfully', async () => {

        await CaseDataTypesPage.addNewStatus(
            'Completed',
            'Testing Completed Status'
        );
    });

    it('should create a Closed case status successfully', async () => {

        await CaseDataTypesPage.addNewStatus(
            'Closed',
            'Testing Closed Status'
        );
    });

    it('should create a Removed case status successfully', async () => {

        await CaseDataTypesPage.addNewStatus(
            'Removed',
            'Testing Removed Status'
        );
    });

});