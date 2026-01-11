import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import './Bill.css';

const sanitizeText = (text = '') => {
  return text.replace(/[^\x00-\x7F]/g, '');
};

export default function Bill() {
  const navigate = useNavigate();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('latestOrder'));

    if (!order) {
      alert('No order found');
      navigate('/');
      return;
    }

    const doc = new jsPDF();

    /* ================= TITLE ================= */
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('EcoMart - Order Invoice', 105, 18, { align: 'center' });

    /* ================= GST / CONTACT ================= */
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('GST No : 33AALFE9646F1Z8', 14, 26);
    doc.text('FSSAI License No : 12425026000375', 105, 26, { align: 'center' });
    doc.text('Contact : +91 7200260036', 196, 26, { align: 'right' });

    /* ================= CUSTOMER DETAILS ================= */
    doc.setFontSize(12);
    const infoY = 36;

    // 🔥 BILL NUMBER
    doc.text(`Bill No  : ${order.billNumber}`, 14, infoY - 4);

    doc.text(`Customer : ${order.name}`, 14, infoY+1);
    doc.text(`Mobile   : ${order.mobile}`, 14, infoY + 7);
    doc.text(
      `Address  : ${sanitizeText(order.address)}`,
      14,
      infoY + 14,
      { maxWidth: 180 }
    );
    doc.text(`City     : ${order.city}`, 14, infoY + 26);
    doc.text(`Date     : ${new Date().toLocaleString()}`, 14, infoY + 33);

    /* ================= ITEM COUNTS ================= */
    const totalItems = order.numberOfItems || order.items.length;
    const totalQuantity =
      order.totalQuantity ||
      order.items.reduce((sum, item) => sum + item.quantity, 0);

    /* ================= TABLE DATA ================= */
    const tableColumn = ['Product', 'Price', 'Qty', 'Subtotal'];
    const tableRows = [];

    // Product rows
    order.items.forEach(item => {
      tableRows.push([
        item.itemname,
        `Rs. ${item.price}`,
        item.quantity,
        `Rs. ${item.subtotal}`
      ]);
    });

    // 🔥 ITEMS + QTY (CENTER, FULL WIDTH)
    tableRows.push([
      {
        content: `Item : ${totalItems} | Qty : ${totalQuantity}`,
        colSpan: 4,
        styles: {
          halign: 'center',
          fontStyle: 'bold',
          fontSize: 12
        }
      }
    ]);

    /* ================= TOTALS ================= */
    tableRows.push(['', '', 'Net Total', `Rs. ${order.total}`]);
    tableRows.push(['', '', 'GST Amount', `Rs. ${order.gstTotal || 0}`]);
    tableRows.push(['', '', 'Delivery Charge', 'Rs. 30']);
    tableRows.push([
      '',
      '',
      'Grand Total',
      `Rs. ${order.grandTotal || order.total + (order.gstTotal || 0) + 30}`
    ]);

    /* ================= TABLE ================= */
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: infoY + 42,
      theme: 'grid',
      styles: {
        fontSize: 11,
        halign: 'center'
      },
      headStyles: {
        fillColor: [11, 159, 81],
        textColor: [255, 255, 255]
      },
      columnStyles: {
        0: { halign: 'left' },
        3: { halign: 'right' }
      },
      didParseCell: function (data) {
        // Bold Grand Total
        if (data.row.index === tableRows.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fontSize = 12;
        }
      }
    });

    /* ================= FOOTER ================= */
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(
      'Thank you for shopping with EcoMart. Visit Again!',
      105,
      finalY,
      { align: 'center' }
    );

    /* ================= SAVE ================= */
    doc.save(`EcoMart-Bill-EM-${order.billNumber}.pdf`);
    navigate('/products');
  }, [navigate]);

  return <p className="bill-message">Generating your bill...</p>;
}
