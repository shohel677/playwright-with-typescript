import { BasePage } from '../pages/base_page';
import { HomePage } from '../pages/home_page';
import {PracticeFormPage} from "../pages/practice_form_page";
import {WebTablePage} from "../pages/web_table_page";

describe('Demo QA Test Suite', function () {
    this.timeout(40000);

    let basePage: BasePage;
    let homePage: HomePage;
    let practiceFormPage: PracticeFormPage;
    let webTablePage: WebTablePage;

    beforeEach(async () => {
        console.log('🔧 Initializing...');
        basePage = new BasePage();
        const page = await basePage.initialize();
        homePage = new HomePage(page);
        practiceFormPage = new PracticeFormPage(page);
        webTablePage = new WebTablePage(page);
        await homePage.goto();
        console.log('✅ Initialization complete');
    });

    afterEach(async () => {
        await basePage.close();
        console.log('Test closed');

    });

    it('[testcase_ui] Test to check form', async () => {
        await homePage.navigateToFormPage();
        await practiceFormPage.fillForm();
        await practiceFormPage.verifyDataUpdatedOnForm();
    });

    it('[testcase_ui] Test to check web table', async () => {
        await homePage.navigateToWebTablePage();
        await webTablePage.clickAddButton();

        await webTablePage.fillForm();
        await webTablePage.verifyRowValuesBeforeUpdate();

        await webTablePage.editLastRow();
        await webTablePage.verifyRowValuesAfterUpdate();

        await webTablePage.deleteLastRow();

    });

});
