import PDFDocument from 'pdfkit';

export const generateInvoicePDF = async (invoice: any): Promise<Buffer> => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    try {
      // Header
      doc.fontSize(22).font('Helvetica-Bold').text('INVOICE', { align: 'center' }).moveDown(1.5);

      // Invoice Details (Left-aligned & Bold Titles)
      doc.fontSize(12).font('Helvetica-Bold').text(`Invoice Number: `, { continued: true })
        .font('Helvetica').text(invoice.invoiceNumber);
      doc.font('Helvetica-Bold').text(`Issued Date: `, { continued: true })
        .font('Helvetica').text(new Date(invoice.issuedDate).toDateString());
      doc.font('Helvetica-Bold').text(`Due Date: `, { continued: true })
        .font('Helvetica').text(new Date(invoice.dueDate).toDateString()).moveDown();
      
      // Sender & Client Info
      doc.fontSize(12).font('Helvetica-Bold').text(`From: `, { continued: true })
        .font('Helvetica').text(`${invoice.senderCompanyName} (${invoice.senderName})`);
      doc.text(`${invoice.senderAddress}`).text(`${invoice.senderEmail} | ${invoice.senderPhone}`).moveDown(0.5);
      
      doc.font('Helvetica-Bold').text(`To: `, { continued: true })
        .font('Helvetica').text(`${invoice.clientCompanyName} (${invoice.clientName})`);
      doc.text(`${invoice.clientAddress}`).text(`${invoice.clientEmail} | ${invoice.clientPhone}`).moveDown(2);
      
      // Table Header (Aligned Correctly)
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Description', 50, doc.y, { width: 200 });
      doc.text('Quantity', 260, doc.y, { width: 80, align: 'right' });
      doc.text('Unit Price', 360, doc.y, { width: 80, align: 'right' });
      doc.text('Total', 460, doc.y, { width: 80, align: 'right' }).moveDown(0.5);
      
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(0.5);
      
      // Invoice Items Table
      doc.fontSize(11).font('Helvetica');
      invoice.items.forEach((item: any) => {
        doc.text(item.description, 50, doc.y, { width: 200 });
        doc.text(item.quantity.toString(), 260, doc.y, { width: 80, align: 'right' });
        doc.text(`${item.price} ${invoice.currency}`, 360, doc.y, { width: 80, align: 'right' });
        doc.text(`${item.quantity * item.price} ${invoice.currency}`, 460, doc.y, { width: 80, align: 'right' }).moveDown(0.5);
      });
      
      doc.moveDown(1);
      
      // Taxes in Proper Format
      invoice.taxes.forEach((tax: any) => {
        doc.fontSize(12).font('Helvetica-Bold').text(`${tax.type}: `, { continued: true })
          .font('Helvetica').text(`${tax.amount} ${invoice.currency}`, { align: 'right' });
      });
      
      doc.moveDown(1);
      
      // Total Amount
      doc.fontSize(14).font('Helvetica-Bold').text(`Total: `, { continued: true })
        .font('Helvetica').text(`${invoice.totalAmount} ${invoice.currency}`, { align: 'right' });
      
      doc.moveDown(2);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(1);
      
      // Notes & Terms (Left-aligned)
      doc.fontSize(11).font('Helvetica-Bold').text('Notes:', { align: 'left' });
      doc.font('Helvetica').text(invoice.notes || 'N/A').moveDown(0.5);
      
      doc.fontSize(11).font('Helvetica-Bold').text('Terms & Conditions:', { align: 'left' });
      doc.font('Helvetica').text(invoice.termsAndConditions || 'N/A');
      
      // Generate PDF Buffer
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
