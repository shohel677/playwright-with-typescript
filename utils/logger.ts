import fs from 'fs';
import path from 'path';

export class Logger {
    private readonly logFilePath: string;

    constructor() {
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
        this.logFilePath = path.join(logDir, `log-${new Date().toISOString().split('T')[0]}.log`);
    }

    info(message: string) {
        const log = `[INFO] ${new Date().toISOString()} - ${message}`;
        console.log(log);
        fs.appendFileSync(this.logFilePath, log + '\n');
    }

    error(message: string) {
        const log = `[ERROR] ${new Date().toISOString()} - ${message}`;
        console.error(log);
        fs.appendFileSync(this.logFilePath, log + '\n');
    }
}
