import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '@/db';
import { clientTable } from '@/db/schema/client';
import { organizationTable } from '@/db/schema/organization';
import { userTable } from '@/db/schema/user';
import { invoices } from '@/db/schema/invoices';
import { eq } from 'drizzle-orm';
import { generateInvoicePDF } from '@/libs/pdfGenerator';

export const createInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'User authentication required' });
      return;
    }

    if (!req.user?.is_onboarded) {
      res.status(StatusCodes.CONFLICT).json({
        message: 'user is not onboarded',
      });

      return;
    }

    const invoiceData = req.body;

    // Validate Dates
    if (invoiceData.issuedDate) {
      invoiceData.issuedDate = new Date(invoiceData.issuedDate);
    }
    if (invoiceData.dueDate) {
      invoiceData.dueDate = new Date(invoiceData.dueDate);
    }
    if (
      invoiceData.issuedDate &&
      invoiceData.dueDate &&
      invoiceData.dueDate < invoiceData.issuedDate
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Due date must be after issued date' });
      return;
    }

    const client = await db
      .select()
      .from(clientTable)
      .where(eq(clientTable.id, invoiceData.clientId))
      .limit(1);
    if (!client.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid client ID' });
      return;
    }

    const clientData = client[0];

    const orgDetails = await db
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.user_id, user_id))
      .limit(1);
    if (!orgDetails.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Organization details not found' });
      return;
    }

    const sender = orgDetails[0];

    const userDetails = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, user_id))
      .limit(1);
    if (!userDetails.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User details not found' });
      return;
    }

    const user = userDetails[0];

    // ✅ Insert invoice with all details
    const newInvoice = await db
      .insert(invoices)
      .values({
        invoiceNumber: invoiceData.invoiceNumber,
        clientId: invoiceData.clientId,
        issuedDate: invoiceData.issuedDate,
        dueDate: invoiceData.dueDate,
        status: invoiceData.status || 'pending',

        // Sender Details
        senderName: user.name,
        senderEmail: user.email,
        senderAddress: sender.address,
        senderPhone: sender.phone,
        senderLogoUrl: sender.logo_url,
        senderTaxId: sender.tax_id,
        senderCompanyName: sender.name,

        // Client Details (Auto-filled)
        clientName: clientData.name,
        clientEmail: clientData.email,
        clientAddress: clientData.address,
        clientPhone: clientData.phone,
        clientTaxId: clientData.tax_id,
        clientCompanyName: clientData.company_name,

        // Invoice details
        items: invoiceData.items,
        totalAmount: invoiceData.totalAmount,
        currency: invoiceData.currency || 'USD',
        taxes: invoiceData.taxes || [],
        taxTotal: invoiceData.taxTotal || 0,
        notes: invoiceData.notes,
        termsAndConditions: invoiceData.termsAndConditions,

        templateId: invoiceData.templateId,
      })
      .returning({ id: invoices.id });

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Invoice created successfully', invoice: newInvoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Failed to create invoice',
        error: (error as any).message,
      });
  }
};

export const updateInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId } = req.params;
    const user_id = req.user?.id;
    const updateData = req.body;

    // Check if invoice exists
    const invoice = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, invoiceId))
      .limit(1);
    if (!invoice.length) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
      return;
    }

    await db.update(invoices).set(updateData).where(eq(invoices.id, invoiceId));

    res
      .status(StatusCodes.OK)
      .json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Failed to update invoice',
        error:
          error instanceof Error ? error.message : 'Unknown Error Occurred',
      });
  }
};

export const deleteInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId } = req.params;

    // Check if invoice exists
    const invoice = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, invoiceId))
      .limit(1);
    if (!invoice.length) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
      return;
    }

    await db.delete(invoices).where(eq(invoices.id, invoiceId));

    res
      .status(StatusCodes.OK)
      .json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Failed to delete invoice',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};

export const downloadInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId } = req.params;

    const invoice = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, invoiceId))
      .limit(1);

    if (!invoice.length) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
      return;
    }

    res
      .status(StatusCodes.OK)
      .json({ message: 'Invoice data', invoice: invoice[0] });
  } catch (error) {
    console.error('Error downloading invoice:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Failed to fetch invoice',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};

export const generateInvoicePdf = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId } = req.params;

    const invoice = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, invoiceId))
      .limit(1);

    if (!invoice.length) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Invoice not found' });
      return;
    }

    const pdfBuffer = await generateInvoicePDF(invoice[0]);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${invoiceId}.pdf`,
    });

    res.status(StatusCodes.OK).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Failed to generate invoice PDF',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};
