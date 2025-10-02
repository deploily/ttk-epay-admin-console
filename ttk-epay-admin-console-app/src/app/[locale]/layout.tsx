// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { theme } from "@/styles/theme";
import "antd/dist/reset.css";
import { I18nProviderClient } from "../../../locales/client";
import { StoreProvider } from "../storeProvider";

// ⚡ locales you support
const SUPPORTED_LOCALES = ["en", "fr"];

export const metadata: Metadata = {
  title: "TTK E-Pay",
  description: "",
};


export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
  ];
}
export default function RootLayout({
  params,
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <StoreProvider>
          <I18nProviderClient locale={locale}>
            <AntdRegistry>
              <ConfigProvider theme={theme}>{children}</ConfigProvider>
            </AntdRegistry>
          </I18nProviderClient>
        </StoreProvider>
      </body>
    </html>
  );
}
