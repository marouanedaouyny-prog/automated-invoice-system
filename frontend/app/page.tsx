"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Plus, Download, Send, Search, Filter, 
  CheckCircle, Clock, AlertTriangle, MoreVertical, CreditCard 
} from "lucide-react";

export default function InvoiceDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5003/api/invoices")
      .then(res => res.json())
      .then(data => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch invoices", err);
        setLoading(false);
      });
  }, []);

  const handleDownload = (id: string) => {
    fetch("http://localhost:5003/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId: id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
      } else {
        alert("Failed to generate PDF: " + data.error);
      }
    })
    .catch(err => alert("Error connecting to the invoicing server."));
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b pb-8 border-gray-100">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <FileText className="text-indigo-600" />
              AutoInvoice <span className="text-indigo-600">Pro</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Professional document automation and client billing engine.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition shadow-sm">
              <CreditCard size={18}/> Manage Billing
            </button>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20">
              <Plus size={18}/> Create Invoice
            </button>
          </div>
        </header>

        {/* Filters & Actions */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium text-slate-700" 
              placeholder="Search by client or invoice ID..."
            />
          </div>
          <div className="flex gap-3">
            <button className="p-3.5 bg-slate-50 border rounded-2xl text-slate-500 hover:bg-slate-100 transition"><Filter size={20}/></button>
            <button className="p-3.5 bg-slate-50 border rounded-2xl text-slate-500 hover:bg-slate-100 transition"><Download size={20}/></button>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-gray-50 overflow-hidden">
          <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
             <span className="font-bold text-slate-500 text-xs uppercase tracking-widest">Client Invoices ({invoices.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-4">Invoice ID</th>
                  <th className="px-8 py-4">Client Name</th>
                  <th className="px-8 py-4">Issue / Due Date</th>
                  <th className="px-8 py-4">Total Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition group">
                    <td className="px-8 py-6 font-bold text-indigo-600">{inv.id}</td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-800">{inv.client}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-medium text-slate-700">{inv.date}</div>
                      <span className="text-[10px] text-slate-400 block font-bold mt-1 uppercase">Due: {inv.due}</span>
                    </td>
                    <td className="px-8 py-6 font-extrabold text-slate-900">${inv.amount.toLocaleString()}</td>
                    <td className="px-8 py-6">
                       <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${
                         inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                         inv.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                       }`}>
                          {inv.status === 'Paid' ? <CheckCircle size={14}/> : 
                           inv.status === 'Overdue' ? <AlertTriangle size={14}/> : <Clock size={14}/>}
                          {inv.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex justify-center gap-3">
                          <button className="text-slate-400 hover:text-indigo-600 transition"><Send size={18}/></button>
                          <button className="text-slate-400 hover:text-indigo-600 transition"><Download size={18}/></button>
                          <button className="text-slate-400 hover:text-indigo-600 transition"><MoreVertical size={18}/></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insight */}
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-slate-900/20 flex items-center justify-between">
           <div className="space-y-1">
              <h4 className="text-xl font-bold flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                 Revenue Forecast
              </h4>
              <p className="text-sm opacity-60 leading-relaxed font-medium max-w-xl">
                 You have $850.50 in pending invoices. Based on your current billing cycle, you are on track to increase revenue by 12% this quarter compared to last.
              </p>
           </div>
           <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-bold transition text-sm">
              View Detailed Report
           </button>
        </div>
      </div>
    </main>
  );
}
