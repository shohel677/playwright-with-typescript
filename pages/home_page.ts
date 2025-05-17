import { Page, Locator } from 'playwright';
import { Logger } from '../utils/logger';
import {Label} from "../elements/label";
import {Button} from "../elements/button";
import {WaitUtils} from "../utils/wait_utils";

export class HomePage {
    private readonly page: Page;
    private readonly logger: Logger = new Logger();

    private readonly formCard: Label;
    private readonly practiceFormLink: Button;

    constructor(page: Page) {
        this.page = page;
        this.formCard = new Label(page.locator("//h5[text()='Forms']"), "Form card");
        this.practiceFormLink = new Button(page.locator("//span[text()='Practice Form']"), "Form link");
    }

    async goto(baseURL: string): Promise<void> {
        this.logger.info('Navigating to: ' + baseURL);
        await this.page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    }

    async navigateToFormPage(): Promise<void> {
        await WaitUtils.retryStep(this.formCard.elementLocator);
        await this.formCard.playwrightClick();
        await this.practiceFormLink.playwrightClick();
    }
}
