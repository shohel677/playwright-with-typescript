import path from 'path';

import {Locator, Page} from "playwright";
import {WaitUtils} from "../utils/wait_utils";
import {Input} from "../elements/input";
import {Button} from "../elements/button";
import {Label} from "../elements/label";
import {CheckBox} from "../elements/check_box";
import {Logger} from "../utils/logger";

export class PracticeFormPage{
    private readonly page: Page;
    private readonly firstName: Input;
    private readonly lastName: Input;
    private readonly email: Input;
    private readonly genderMale: Button;
    private readonly mobileNumber: Input;
    private readonly dobInput: Locator;
    private readonly subjectsInput: Input;
    private readonly subjectsOption: Label;
    private readonly hobbiesSports: CheckBox;
    private readonly uploadPicture: Locator;
    private readonly currentAddress: Input;
    private readonly stateDropdown: Input;
    private readonly cityDropdown: Input;
    private readonly submitButton: Button;
    private readonly logger: Logger = new Logger();

    constructor(page: Page) {
        this.page = page;
        this.firstName  =  new Input(page.locator("#firstName"), "First name");
        this.lastName  =  new Input(page.locator("#lastName"), "Last name");
        this.email = new Input(page.locator("#userEmail"), "Email address");
        this.genderMale = new Button(page.locator("//div[text()='Gender']/following-sibling::div//label[text()='Male']"), "Gender");
        this.mobileNumber = new Input(page.locator("#userNumber"), "Mobile number");
        this.dobInput = page.locator("#dateOfBirthInput");
        this.subjectsInput = new Input(page.locator("#subjectsInput"), "Subject");
        this.subjectsOption = new Label(page.locator(".subjects-auto-complete__menu-list"), "Subject Option");
        this.hobbiesSports = new CheckBox(page.locator("//label[text()='Hobbies']/parent::div/following-sibling::div//label[contains(text(), 'Sports')]"), "Hobby checkbox Option");
        this.uploadPicture = page.locator("#uploadPicture");
        this.currentAddress = new Input(page.locator('#currentAddress'), "Current address");
        this.stateDropdown = new Input(page.locator("#state"), "State dropdown");
        this.cityDropdown = new Input(page.locator("#city"), "City dropdown");
        this.submitButton = new Button(page.locator("#submit"), "Submit Button");
    }

    async fillForm() {
        await WaitUtils.retryStep(this.firstName.elementLocator);
        await WaitUtils.waitForUrlContains(this.page, "/automation-practice-form")
        await this.firstName.clearAndFill("John");
        await this.lastName.clearAndFill("Doe");
        await this.email.clearAndFill("john.doe@example.com");
        await this.genderMale.playwrightClick();
        await this.mobileNumber.clearAndFill("1234567890");

        await this.dobInput.click();
        await this.page.selectOption('.react-datepicker__month-select', '4'); // May
        await this.page.selectOption('.react-datepicker__year-select', '1995');
        await this.page.click('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)');

        await this.subjectsInput.playwrightFill('Maths');
        await WaitUtils.pause(this.page, 2000)
        await this.subjectsOption.playwrightClick();

        await WaitUtils.waitForEnabled(await this.hobbiesSports.getWrappedLocator());
        await this.hobbiesSports.playwrightCheck();


        const filePath = path.resolve('test-data/picture.jpg');
        await this.uploadPicture.setInputFiles(filePath);

        await this.currentAddress.playwrightFill('123 Main Street, City');
        await this.stateDropdown.playwrightClick();
        await this.page.getByText('NCR', { exact: true }).click();

        await this.cityDropdown.playwrightClick();
        await this.page.getByText('Delhi', { exact: true }).click();

        await this.submitButton.playwrightClick();

    }
    async verifyDataUpdatedOnForm(): Promise<void> {

        const formData: Record<string, string> = {
            'Student Name': 'John Doe',
            'Student Email': 'john.doe@example.com',
            'Gender': 'Male',
            'Mobile': '1234567890',
            'Date of Birth': '15 May,1995',
            'Subjects': 'Maths',
            'Hobbies': 'Sports',
            'Picture': 'picture.jpg',
            'Address': '123 Main Street, City',
            'State and City': 'NCR Delhi'
        };

        for (const [label, expectedValue] of Object.entries(formData)) {
            const locator =this.page.locator(`xpath=//tbody/tr/td[text()='${label}']/following-sibling::td`);
            await WaitUtils.waitForText(locator, expectedValue);
            this.logger.info("Value " + expectedValue + " found on submitted form modal for label " + label);
        }

    }
}
