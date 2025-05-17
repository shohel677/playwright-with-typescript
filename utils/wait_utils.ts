import {Locator, Page, expect, ElementHandle} from '@playwright/test';
import {Logger} from "./logger";

export class WaitUtils {
    private static logger: Logger = new Logger();

    static async waitForVisibility (locator: Locator, timeout: number = 30000): Promise<void> {
        await expect(locator).toBeVisible({ timeout });
    }

    static async waitForEnabled (locator: Locator, timeout: number = 5000): Promise<void> {
        await expect(locator).toBeEnabled({ timeout });
    }

    static async waitForText (locator: Locator, text: string, timeout: number = 5000): Promise<void> {
        await expect(locator).toHaveText(text, { timeout });
    }

    static async waitForHidden (locator: Locator, timeout: number = 5000): Promise<void> {
        await expect(locator).toBeHidden({ timeout });
    }


    static async waitForUrlContains (page: Page, partialUrl: string, timeout: number = 30000): Promise<void> {
        await page.waitForURL(`**/*${partialUrl}*`, { timeout });
    }

    static async waitForSelector (page: Page, selector: string, timeout: number = 5000): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return await page.waitForSelector(selector, { timeout });
    }

    static async pause (page: Page, milliseconds: number): Promise<void> {
        await page.waitForTimeout(milliseconds);
    }
    static async retryStep(locator: Locator): Promise<void> {
        let success = false;
        let attempts = 0;
        const maxAttempts = 5;
        const retryDelay = 5000;

        while (!success && attempts < maxAttempts) {
            try {
                await WaitUtils.waitForVisibility(locator);
                success = true;
            } catch (error) {
                attempts++;
                this.logger?.info?.(`Retrying... Attempt ${attempts}`);

                if (attempts >= maxAttempts) {
                    console.error("Max attempts reached. Giving up.");
                    throw new Error(`Locator still not visible after ${maxAttempts} attempts.`);
                }

                await new Promise(res => setTimeout(res, retryDelay));
            }
        }
    }

}
