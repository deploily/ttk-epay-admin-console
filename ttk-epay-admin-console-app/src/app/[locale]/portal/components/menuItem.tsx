import { CardholderIcon, InvoiceIcon, TicketIcon } from "@phosphor-icons/react";
import type { MenuProps } from "antd";
import Link from "next/link";

const labelStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
};

export const menuItems = (scopedSidebar: any): MenuProps["items"] => [
  {
    key: "invoice",
    label: (
      <Link href="/portal/invoice">
        <span style={labelStyle}>{scopedSidebar("invoice")}</span>
      </Link>
    ),
    icon: <InvoiceIcon size={24} />,
  },
  {
    key: "payement",
    label: (
      <Link href="/portal/payement">
        <span style={labelStyle}>{scopedSidebar("payement")}</span>
      </Link>
    ),
    icon: <CardholderIcon size={24} />,
  },
  {
    key: "claim",
    label: (
      <Link href="/portal/claim">
        {" "}
        <span style={labelStyle}>{scopedSidebar("claim")}</span>{" "}
      </Link>
    ),
    icon: <TicketIcon size={24} />,

  },

];
