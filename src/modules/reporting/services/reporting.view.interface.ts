
import { Response } from 'express';

export interface ReportingViewInterface {
    process(response: Response, name: string): void
}