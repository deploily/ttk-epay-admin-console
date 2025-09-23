"use client";

import { useSearchParams } from "next/navigation";
import GetInvoices from "./getInvoices";
import InvoiceDetails from "./invoiceDetails";

export default function InvoicePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id) {
    return <InvoiceDetails invoicerId={id} />;
  }

  return <GetInvoices />;
}
