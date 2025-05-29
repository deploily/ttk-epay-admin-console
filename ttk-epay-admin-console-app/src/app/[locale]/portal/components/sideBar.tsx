"use client";
import { Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import { SignOut, ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ArrowLeftIcon, ArrowRightIcon, CaretUp, User } from "@phosphor-icons/react";
import Link from "next/link";
import { menuItems } from "./menuItem";
import { useI18n, useScopedI18n } from "../../../../../locales/client";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

export function MainSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const scopedSidebar = useScopedI18n("sideBar");
  const pathName = usePathname();

  const parentKey = menuItems(scopedSidebar)?.find(item => {
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
        color: "#fff",
        background: "rgba(218, 236, 247, 0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems(scopedSidebar)}
        style={{ flexGrow: 1, background: "none", borderInlineEnd: "none" }}
        selectable
        selectedKeys={[`${parentKey}`]}
      />
      <div
        style={{

          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          color: "#fff",
          background: "rgba(218, 236, 247, 0.2)",
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
            height: 40, // fixe la hauteur pour éviter les sauts visuels
          }}
        >
          {collapsed ? (
            <ArrowRightIcon size={24} color="#7D7D7D" />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowLeftIcon size={24} color="#7D7D7D" />
              <div style={{ paddingLeft: 10, fontSize: 16, color: "#7D7D7D" }}>
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


  return (
    <>

      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={menuItems(scopedSidebar)}
        style={{ flexGrow: 1 }}
      />


    </>
  );
}
