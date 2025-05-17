import {Locator} from "playwright";
import {Logger} from "../utils/logger";
import {General} from "./general";

export class Input extends General{
    elementLocator : Locator;
    elementName : string;


    constructor(locator : Locator, name : string) {
        super(locator,name );

        this.elementLocator = locator;
        this.elementName = name;
    }
    async clearAndFill(s : string){
        this.logger.info("Clearing and filling for label: "+ this.elementName);
        await this.elementLocator.click();
        await this.elementLocator.clear();
        await this.elementLocator.fill(s);
        this.logger.info("Filled value : "+ s);

    }
    async playwrightFill(s : string){
        this.logger.info("Filling for label: "+ this.elementName);
        await this.elementLocator.fill(s);
        this.logger.info("Filled value : "+ s);

    }



}