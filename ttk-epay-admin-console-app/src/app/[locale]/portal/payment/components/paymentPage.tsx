"use client";

import { useSearchParams } from "next/navigation";
import GetPayments from "./getPayments";
import PaymentDetails from "./paymentDetails";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id) {    
    return <PaymentDetails paymentId={id} />;
  }

  return <GetPayments />;
}
