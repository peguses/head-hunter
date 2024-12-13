import { join } from "path";
import { ReportingViewInterface } from "./reporting.view.interface";
import { promises as fs } from 'fs';
import { Response } from 'express';


export class ReportingJsonViewService implements ReportingViewInterface {
    async process(response: Response, name: string): Promise<void> {

        const data = await fs.readFile(join(__dirname, '../../../../', 'reports', `${name}.json`), 'utf-8');

        response.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
        response.setHeader('Content-Type', 'application/json');

        response.json(JSON.parse(data));
        
    }
}