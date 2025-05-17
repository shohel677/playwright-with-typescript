import { Page } from 'playwright';
import {Label} from "../elements/label";
import {Button} from "../elements/button";
import {WaitUtils} from "../utils/wait_utils";
import {Utils} from "../utils/utils";

export class HomePage extends Utils{
    private readonly page: Page;
    private readonly formCard: Label;
    private readonly practiceFormLink: Button;
    private readonly elementCard: Label;
    private readonly webTableMenu: Button;

    constructor(page: Page) {
        super();
        this.page = page;
        this.formCard = new Label(page.locator("//h5[text()='Forms']"), "Form card");
        this.practiceFormLink = new Button(page.locator("//span[text()='Practice Form']"), "Form link");
        this.elementCard = new Label(page.locator("//h5[text()='Elements']"), "Element Card");
        this.webTableMenu = new Button(page.locator("//span[text()='Web Tables']"), "Web Table");
    }

    async goto(): Promise<void> {
        Utils.logger.info('Navigating to: ' + this.baseURL);
        await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded' });
    }

    async navigateToFormPage(): Promise<void> {
        await WaitUtils.retryStep(this.formCard.elementLocator);
        await this.formCard.playwrightClick();
        await this.practiceFormLink.playwrightClick();
    }
    async navigateToWebTablePage(): Promise<void> {
        await WaitUtils.retryStep(this.elementCard.elementLocator);
        await this.elementCard.playwrightClick();
        await this.webTableMenu.playwrightClick();
    }

}
