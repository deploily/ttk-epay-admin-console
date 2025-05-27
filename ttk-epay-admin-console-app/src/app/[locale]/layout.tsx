import type { Metadata } from "next";
import React, { ReactElement } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from 'antd';
import { theme } from "@/styles/theme"
import 'antd/dist/reset.css';
import { I18nProviderClient } from "../../../locales/client";



export const metadata: Metadata = {
  title: "Deploily E-Pay ",
  description: "",
};

export default async function RootLayout({ params, children }: { params: Promise<{ locale: string }>, children: ReactElement }) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <I18nProviderClient locale={locale}>
          <AntdRegistry>
            <ConfigProvider theme={theme} >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </I18nProviderClient>
      </body>
    </html>
  );
}
