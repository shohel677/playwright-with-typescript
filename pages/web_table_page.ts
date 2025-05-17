import { Page, Locator, expect } from '@playwright/test';
import {Button} from "../elements/button";
import {Input} from "../elements/input";

export class WebTablePage {
    readonly page: Page;
    readonly addButton: Button;
    readonly submitButton: Button;
    readonly firstNameInput: Input;
    readonly lastNameInput: Input;
    readonly emailInput: Input;
    readonly ageInput: Input;
    readonly salaryInput: Input;
    readonly departmentInput: Input;
    readonly tableBodyRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addButton = new Button(page.locator("#addNewRecordButton"), "Add entry button");
        this.submitButton = new Button(page.getByRole("button", { name: "Submit" }), "Submit button");
        this.firstNameInput = new Input(page.getByPlaceholder("First Name"), "First name");
        this.lastNameInput = new Input(page.getByPlaceholder("Last Name"), "Last name");
        this.emailInput = new Input(page.locator("//input[@placeholder='name@example.com']"), "Email");
        this.ageInput = new Input(page.getByPlaceholder("Age"), "Age");
        this.salaryInput = new Input(page.getByPlaceholder("Salary"), "Salary");
        this.departmentInput = new Input(page.getByPlaceholder("Department"), "Department");
        this.tableBodyRows = page.locator("//div[@class='rt-tbody']/div/div[@role='row']");

    }

    async navigate() {
        await this.page.goto('https://demoqa.com/webtables');
    }

    async clickAddButton() {
        await this.addButton.playwrightClick();
    }

    async fillForm() {

        await this.firstNameInput.clearAndFill("John");
        await this.lastNameInput.clearAndFill("Doe");
        await this.emailInput.clearAndFill("john@webtable.org");
        await this.ageInput.clearAndFill("30");
        await this.salaryInput.clearAndFill("5000");
        await this.departmentInput.clearAndFill("QA");
        await this.submitForm();

    }

    async submitForm() {
        await this.submitButton.playwrightClick();
    }

    async getTheRow(): Promise<Locator | null> {
        const rowCount = await this.tableBodyRows.count();

        for (let i = 0; i < rowCount; i++) {
            const email : string | null= await this.page.locator(`(//div[@class='rt-tbody']/div/div[@role='row'])[${i + 1}]/div[4]`).textContent()
           if(email == "john@webtable.org"){
               return this.tableBodyRows.nth(i)
           }

        }
        return null;
    }

    async editLastRow() {
        const row = await this.getTheRow();
        if(row){
            await row.locator("span[title='Edit']").click();
            await this.salaryInput.clearAndFill("6000");
            await this.departmentInput.clearAndFill("Sr. QA");
            await this.submitForm();
        }

    }

    async deleteLastRow() {
        const row = await this.getTheRow();
        if(row){
            await row.locator("span[title='Delete']").click();
            const deletedText = await row.textContent();
            expect(deletedText).not.toContain('john@webtable.org');

        }

    }

    async dataBeforeUpdate() :Promise<string []> {
        return ['John', 'Doe', '30', 'john@webtable.org', '5000', 'QA'];
    }
    async dataAfterUpdate() :Promise<string []> {
        return ['John', 'Doe', '30', 'john@webtable.org', '6000', 'Sr. QA'];
    }
    async verifyRowValues(expected : string []) : Promise<void> {
        const row = await this.getTheRow();
        if(row){
            for (let i = 0; i < expected.length; i++) {
                await expect(row.locator('.rt-td').nth(i)).toHaveText(expected[i]);
            }
        }

    }
    async verifyRowValuesBeforeUpdate() {
        const data  = await this.dataBeforeUpdate();
        await this.verifyRowValues(data);

    }
    async verifyRowValuesAfterUpdate() {
        const data  = await this.dataAfterUpdate();
        await this.verifyRowValues(data);
    }
}
