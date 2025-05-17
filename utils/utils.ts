import {Logger} from "./logger";
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

export class Utils{
    public static logger: Logger = new Logger();
    public baseURL = args.url || 'https://demoqa.com/';
    public browserType = args.browser?.toLowerCase() || 'chromium';
    public headless = args.headless !== 'false';


}