import { Browser, chromium, firefox, webkit, Page } from 'playwright';
import {Utils} from "../utils/utils";

export class BasePage extends Utils{
    private browser!: Browser;
    private page!: Page;

    constructor() {
        super();
    }

    async initialize(): Promise<Page> {
        const headless = this.headless;

        Utils.logger.info(`Launching browser: ${this.browserType}, headless: ${this.headless}`);

        switch (this.browserType) {
            case 'firefox':
                this.browser = await firefox.launch({ headless });
                break;
            case 'webkit':
                this.browser = await webkit.launch({ headless });
                break;
            case 'chromium':
            default:
                this.browser = await chromium.launch({ headless });
                break;
        }

        this.page = await this.browser.newPage();
        return this.page;
    }

    async close(): Promise<void> {
        await this.browser.close();
        Utils.logger.info('Browser closed ###################################');
    }
}
