import {Locator} from "playwright";
import {Logger} from "../utils/logger";

export class General{
    elementLocator : Locator;
    elementName : string;
    protected logger: Logger = new Logger();

    constructor(locator : Locator, name : string) {

        this.elementLocator = locator;
        this.elementName = name;
    }

    async playwrightClick(){
        this.logger.info("Clicking element : " + this.elementName);
        await this.elementLocator.click();
        this.logger.info("Clicked element : " + this.elementName);

    }
    async getWrappedLocator(){
        return this.elementLocator;

    }
    async getWrappedName(){
        return this.elementName;

    }
}