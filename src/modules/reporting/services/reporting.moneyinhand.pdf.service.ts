import { join } from "path";
import { ReportingViewInterface } from "./reporting.view.interface";
import * as PDFDocument from 'pdfkit';
import { promises as fs } from 'fs';
import { Response } from 'express';
import { ReportMoneyInPipeDto } from "../dto/report.money.in.pipe.dto";

export class ReportingMoneyInHandPdfService implements ReportingViewInterface {
    async process(response: Response, name: string): Promise<void> {

        const data = await fs.readFile(join(__dirname, '../../../../', 'reports', `${name}.json`), 'utf-8');
        const json:ReportMoneyInPipeDto = JSON.parse(data);
        
        const doc = new PDFDocument();

        response.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
        response.setHeader('Content-Type', 'application/pdf');

        doc.pipe(response);

        doc.fontSize(20).text(`Mony in pipline report from ${json.client}`, { align: 'center' });

        doc.moveDown();

        doc.fontSize(14).text(`Client email ${json.clientEmail}`, { align: 'right' });

        doc.moveDown();

        doc.fontSize(14).text(`Total commission ${json.totalCommision}`, { align: 'right' });

        doc.moveDown();

        json.records.forEach((item) => {
            Object.entries(item).forEach(([key, value]) => {
                doc.fontSize(12).text(`${key}: ${value}`);
            });
            doc.moveDown();
        });

        doc.end();
    }

}