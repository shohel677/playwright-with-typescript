import { Browser, chromium, firefox, webkit, Page } from 'playwright';
import minimist from 'minimist';
import { Logger } from '../utils/logger';

const args = minimist(process.argv.slice(2));

export class BasePage {
    private browser!: Browser;
    private page!: Page;
    public baseURL: string;
    private readonly logger: Logger = new Logger();

    constructor() {
        this.baseURL = args.url || 'https://demoqa.com/';
    }

    async initialize(): Promise<Page> {
        const browserType = args.browser?.toLowerCase() || 'chromium';
        const headless = args.headless !== 'false';

        this.logger.info(`Launching browser: ${browserType}, headless: ${headless}`);

        switch (browserType) {
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
        this.logger.info('Browser closed ###################################');
    }
}
