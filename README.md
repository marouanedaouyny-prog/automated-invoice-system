# Automated Invoice System

A cloud-based invoicing tool that automates the creation and distribution of invoices with PDF generation capabilities.

![Automated Invoice System Demo](./demo.png)

## ✨ Features

- **Invoice Management:** View, search, and filter client invoices with status tracking
- **PDF Generation:** Generate professional PDF invoices (mock implementation in demo version)
- **Status Tracking:** Monitor paid, pending, and overdue invoices in real-time
- **Revenue Insights:** Basic financial forecasting dashboard with analytics
- **Express Backend:** RESTful API with proper error handling and validation
- **Modern Frontend:** Built with Next.js 14, Tailwind CSS, and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Backend Setup (Node.js)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```bash
   cp .env.example .env
   ```

4. Run the server:
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:5003`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📡 API Documentation

### GET /api/invoices

Retrieve all invoices from the system.

**Response:**
```json
[
  {
    "id": "INV-001",
    "client": "SkyStream Solutions",
    "amount": 1200.00,
    "status": "Paid",
    "date": "2024-03-01",
    "due": "2024-03-15"
  }
]
```

### POST /api/generate-pdf

Generate a PDF for an existing invoice.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "invoiceId": "INV-001"
  }
  ```

**Response:**
```json
{
  "success": true,
  "message": "Professional PDF for INV-001 has been generated and is ready for download.",
  "downloadUrl": "#",
  "timestamp": "2024-03-20T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Invoice not found"
}
```

### Example with cURL

```bash
# Get all invoices
curl http://localhost:5003/api/invoices

# Generate PDF for an invoice
curl -X POST http://localhost:5003/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"invoiceId": "INV-001"}'
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization

## 📁 Project Structure

```
automated-invoice-system/
├── backend/
│   ├── server.js         # Express API server
│   ├── package.json      # Node dependencies
│   └── .env.example      # Environment variables template
├── frontend/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable React components
│   └── package.json
├── LICENSE
└── README.md
```

## 🔒 Security Notes

- CORS is restricted to specific origins in production
- Input validation for invoice ID parameters
- Error handling middleware prevents information leakage
- 404 handler for undefined routes

## 🎯 Use Cases

- **Freelancers:** Create and track client invoices
- **Small Businesses:** Manage billing and payments
- **Agencies:** Track project-based invoicing
- **Consultants:** Professional invoice generation
- **Remote Teams:** Cloud-based invoice access

## 🔄 Future Enhancements

- Integration with payment gateways (Stripe, PayPal)
- Email automation for invoice delivery
- Recurring invoice scheduling
- Multi-currency support
- Tax calculation and compliance
- Real payment PDF generation (currently mocked)

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.
