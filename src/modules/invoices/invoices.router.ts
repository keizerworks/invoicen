import { Router } from 'express';
import { validateRequestBody } from '@/middleware/validate-request.middleware';
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  downloadInvoice,
  generateInvoicePdf,
} from './invoices.controller';
import { postInvoiceSchema, postUpdateInvoiceSchema } from './invoices.schema';

const invoiceRouter = Router();

invoiceRouter.post('/create', validateRequestBody(postInvoiceSchema),createInvoice);
invoiceRouter.put('/update/:invoiceId', validateRequestBody(postUpdateInvoiceSchema), updateInvoice);
invoiceRouter.delete('/delete/:invoiceId', deleteInvoice);
invoiceRouter.get('/download/:invoiceId', downloadInvoice);
invoiceRouter.get('/generate/:invoiceId/pdf', generateInvoicePdf);

export default invoiceRouter;
