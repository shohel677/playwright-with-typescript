import {Locator} from "playwright";
import {Logger} from "../utils/logger";
import {General} from "./general";

export class Button extends General{
    elementLocator : Locator;
    elementName : string;


    constructor(locator : Locator, name : string) {
        super(locator, name)
        this.elementLocator = locator;
        this.elementName = name;
    }

}