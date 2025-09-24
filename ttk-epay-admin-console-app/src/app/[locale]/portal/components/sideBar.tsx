"use client";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, } from "@phosphor-icons/react";
import { menuItems } from "./menuItem";
import { useI18n, useScopedI18n } from "../../../../../locales/client";
import { useParams, usePathname } from "next/navigation";
import { theme } from "@/styles/theme";
import { useLocaleRouter } from "@/lib/navigation";

const { Sider } = Layout;

export function MainSideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const scopedSidebar = useScopedI18n("sideBar");
  const pathName = usePathname();
  const router= useLocaleRouter();

  const parentKey = menuItems(scopedSidebar, router)?.find(item => {
    return pathName.includes(`/${item?.key}`)
  }
  )?.key;


  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width="225px"
      style={{
        lineHeight: "120px",
        color: theme.token.colorWhite,
        background: theme.token.whisperBlue,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems(scopedSidebar, router)}
        style={{ flexGrow: 1, background: "none", borderInlineEnd: "none" }}
        selectable
        selectedKeys={[`${parentKey}`]}
      />
      <div
        style={{

          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          color: theme.token.colorWhite,
          background: theme.token.whisperBlue,
          padding: "10px",
          marginTop: "auto",
          position: "absolute",
          bottom: "8px",
          display: "inline-grid"
        }}
      >

        <div
          onClick={toggleCollapsed}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            height: 40,
          }}
        >
          {collapsed ? (
            <ArrowRightIcon size={24} color={theme.token.neutralGray} />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowLeftIcon size={24} color={theme.token.neutralGray} />
              <div style={{ paddingLeft: 10, fontSize: 16, color: theme.token.neutralGray }}>
                {"Collapse"}
              </div>
            </div>
          )}
        </div>
      </div>
    </Sider>
  );
}

export function MainSideBarMobile() {
  const scopedSidebar = useScopedI18n("sideBar");
  const t = useI18n();
  const router= useLocaleRouter();


  return (
    <>

      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={menuItems(scopedSidebar, router)}
        style={{ flexGrow: 1 }}
      />


    </>
  );
}
