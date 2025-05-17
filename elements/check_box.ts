import {Locator} from "playwright";
import {General} from "./general";

export class CheckBox extends General{
    elementLocator : Locator;
    elementName : string;


    constructor(locator : Locator, name : string) {
        super(locator, name)
        this.elementLocator = locator;
        this.elementName = name;
    }
    async playwrightCheck(){
        this.logger.info("Checking element : " + this.elementName);
        await this.elementLocator.check();
        this.logger.info("Checked element : " + this.elementName);

    }

}