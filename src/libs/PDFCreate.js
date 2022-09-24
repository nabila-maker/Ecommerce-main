const PDFGenerator = require('pdfkit');
const fs = require('fs');

class InvoiceGenerator {
  constructor(invoice) {
    this.invoice = invoice;
  }

  generateHeaders(doc) {
    const billingAddress = this.invoice.addresses.billing;
    // doc.font('Courier');
    doc.font('Helvetica');
    doc
      .image('./src/assets/logo500X500_nautilus.png', 5, 5, { width: 100 })
      .fillColor('#000')
      // .fontSize(20)
      // .text('INVOICE', 275, 50, { align: 'right' })
      .fontSize(10)
      .text(' NAUTILUS VTC\n 22 allée Monthyon\n Les Pavillons Sous Bois 93320 France\n n° TVA: FR82879773695', 10, 90)
      .text(`\n\n Numero de Facture: ${this.invoice.invoiceNumber}`, { align: 'left' })
      .text(` Date: ${this.invoice.dueDate}`, { align: 'left' })
      // .text(`Balance Due: $${this.invoice.subtotal - this.invoice.paid}`, { align: 'right' })
      // .moveDown()
      .text(`${billingAddress.name}\n${billingAddress.address}\n${billingAddress.country}`, 250, 90, { align: 'right' });

    const beginningOfPage = 50;
    const endOfPage = 550;

    doc.moveTo(beginningOfPage, 200)
      .lineTo(endOfPage, 200)
      .stroke();
    // doc.font('Courier-Bold');
    doc.font('Helvetica-Bold');
    doc.fontSize(15).text('FACTURE', 50, 220, { align: 'center', bold: true });
    // doc.font('Courier');
    doc.font('Helvetica');
    doc.moveTo(beginningOfPage, 250)
      .lineTo(endOfPage, 250)
      .stroke();
  }

  generateTable(doc) {
    const tableTop = 270;
    const itemCodeX = 50;
    const descriptionX = 200;
    // const quantityX = 250;
    const priceX = 450;
    // const amountX = 350;
    // doc.font('Courier-Bold');
    doc.font('Helvetica-Bold');
    doc
      .fontSize(10)
      .text('Date', itemCodeX, tableTop, { bold: true })
      .text('Description', descriptionX, tableTop, { bold: true })
    // .text('Quantity', quantityX, tableTop)
      .text('Prix', priceX, tableTop, { bold: true });
    //  .text('Amount', amountX, tableTop);
    // doc.font('Courier');
    doc.font('Helvetica');
    const { items } = this.invoice;
    let i = 0;
    let y = 0;
    for (i = 0; i < items.length; i++) {
      const item = items[i];
      y = tableTop + 25 + (i * 25);

      doc
        .fontSize(10)
        .text(item.itemCode, itemCodeX, y)
        .text(item.description, descriptionX, y)
      // .text(item.quantity, quantityX, y)
        .text(`${item.price} Euros`, priceX, y);
      // .text(`$ ${item.amount}`, amountX, y);
    }

    y += 50;
    // doc.font('Courier-Bold');
    doc.font('Helvetica-Bold');
    doc.text(`TOTAL HT: ${items[0].price} Euros`, 300, y, { align: 'right', bold: true });
    doc.text(`TVA:      ${this.invoice.tax} Euros`, 300, y + 15, { align: 'right', bold: true });
    doc.text(`TOTAL: ${this.invoice.subtotal} Euros`, 300, y + 30, { align: 'right', bold: true });
    // doc.font('Courier');
    doc.font('Helvetica');
  }

  generateFooter(doc) {
    doc
      .fontSize(8)
      .text('NAUTILUS VTC-22 allée Monthyon 93320 Les Pavillons Sous Bois-n° TVA: FR82879773695', 50, 700, {
        align: 'center',
      });
  }

  generate() {
    const theOutput = new PDFGenerator();
    const fileName = `./files/Facture-${this.invoice.invoiceNumber}.pdf`;

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream(fileName));

    this.generateHeaders(theOutput);

    theOutput.moveDown();

    this.generateTable(theOutput);

    this.generateFooter(theOutput);

    // write out file
    theOutput.end();
  }
}

module.exports = InvoiceGenerator;
