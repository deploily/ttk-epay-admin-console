"use client";
import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { Col, Drawer, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import LocaleSwitcher from "@/app/[locale]/components/localeSwitcher";
import { GearIcon, ListIcon } from "@phosphor-icons/react";
import { MainSideBarMobile } from "./sideBar";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hook";
import { removeRegistration } from "@/lib/features/registration/registrationSlice";
import { useRouter } from "next/navigation";




export function AppAppBarDesktop() {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const settingClick = () => {
    dispatch(removeRegistration())
    router.push('/')

  }

  return (
    <>
      <Header
        style={{
          backgroundColor: "rgba(218, 236, 247, 0.2)",
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",

        }}
      >
        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
          <Col style={{ flexGrow: 1 }}>
            <Link href="/portal">
              <Image
                src="/images/deploily-logo.png"
                width={180}
                height={44}
                alt="logo-deploily"
                style={{
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Col>
          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Col>
              <Row
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <LocaleSwitcher />
                <GearIcon size={24} style={{ cursor: "pointer"}} onClick={settingClick} />
              </Row>
            </Col>
          </Row>
        </Row>
      </Header>
    </>
  );
}

export function AppAppBarMobile() {
  const [theme] = useState("dark");
  const dispatch = useAppDispatch();
  const router = useRouter()

  const settingClick = () => {
    dispatch(removeRegistration())
    router.push('/')

  }

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: "rgba(218, 236, 247, 0.2)",
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",
          padding: "0px",
          boxShadow:
            theme === "dark" ? "0 4px 8px rgba(0, 0, 0, 0.25)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
          <Col style={{ flexGrow: 1 }}>
            <Link href="/portal">
              <Image
                src="/images/deploily-logo.png"
                width={180}
                height={44}
                alt="logo-deploily"
                style={{
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Col>
          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Col>
              <Row
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "10px",
                  alignItems: "center",
                }}
              >
                <LocaleSwitcher />
                <GearIcon size={24} style={{ cursor: "pointer"}} onClick={settingClick} />
                <ListIcon size={28} style={{ color: "black" }} onClick={showDrawer} />
              </Row>
            </Col>
          </Row>
        </Row>
        <Drawer onClose={onClose} open={open} width={"50%"} styles={{ body: { padding: "0px" } }}>
          <MainSideBarMobile />
        </Drawer>
      </Header>
    </>
  );
}
