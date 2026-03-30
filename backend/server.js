const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let invoices = [
  { id: "INV-001", client: "SkyStream Solutions", amount: 1200.00, status: "Paid", date: "2024-03-01", due: "2024-03-15" },
  { id: "INV-002", client: "AlphaFlow Tech", amount: 850.50, status: "Pending", date: "2024-03-10", due: "2024-03-24" },
  { id: "INV-003", client: "GlobalDev Inc.", amount: 2400.00, status: "Overdue", date: "2024-02-15", due: "2024-03-01" },
  { id: "INV-004", client: "NovaScale AI", amount: 3100.00, status: "Pending", date: "2024-03-12", due: "2024-03-26" },
  { id: "INV-005", client: "Zenith Design", amount: 450.00, status: "Paid", date: "2024-03-05", due: "2024-03-19" },
];

app.get('/api/invoices', (req, res) => {
  res.json(invoices);
});

app.post('/api/generate-pdf', (req, res) => {
  const { invoiceId } = req.body;
  const invoice = invoices.find(inv => inv.id === invoiceId);
  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }
  // Simulate PDF generation delay
  setTimeout(() => {
    res.json({ 
      success: true, 
      message: `Professional PDF for ${invoiceId} has been generated and is ready for download.`,
      downloadUrl: `#`, // Mock download URL
      timestamp: new Date().toISOString()
    });
  }, 1000);
});

const PORT = 5003;
app.listen(PORT, () => console.log(`Invoicing API on port ${PORT}`));
