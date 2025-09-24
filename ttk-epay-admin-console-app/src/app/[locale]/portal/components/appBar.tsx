"use client";
import * as React from "react";
import { useState } from "react";
import { Col, Drawer, Image, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import LocaleSwitcher from "@/app/[locale]/components/localeSwitcher";
import { GearIcon, ListIcon } from "@phosphor-icons/react";
import { MainSideBarMobile } from "./sideBar";
import Link from "next/link";
import EditRegistration from "./editRegistration";
import { theme } from "@/styles/theme";
import { useLocaleRouter } from "@/lib/navigation";




export function AppAppBarDesktop() {

  const router = useLocaleRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  return (
    <>
      <Header
        style={{
          backgroundColor: theme.token.whisperBlue,
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",

        }}
      >
        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
          <Col style={{ flexGrow: 1 }}>
            <Link href="" onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
              style={{ display: "flex", alignItems: "center", color: "#b42e12", fontSize: "20px", fontWeight: "bold" }}>
              <Image
                src="/images/ttk-epay-logo.png"
                width={50}
                height={50}
                alt="logo-deploily"
                preview={false}
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                  maxWidth: "100%",
                  height: "auto"
                }}
                
              />
              TTK ePay
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
                <GearIcon size={24} style={{ cursor: "pointer" }} onClick={showModal} />
                <EditRegistration isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
              </Row>
            </Col>
          </Row>
        </Row>
      </Header>
    </>
  );
}

export function AppAppBarMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useLocaleRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

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
          backgroundColor: theme.token.whisperBlue,
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",
          padding: "0px",
          boxShadow: `0 4px 8px ${theme.token.ghostBlack}`,
        }}
      >
        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
          <Col style={{ flexGrow: 1 }}>
            <Link href="" onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}>
              <Image
                src="/images/ttk-epay-logo.png"
                width={50}
                height={50}
                alt="logo-deploily"
                preview={false}
                style={{
                  marginRight: "20px",
                  cursor: "pointer",
                  maxWidth: "100%",
                  height: "auto"
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
                <GearIcon size={24} style={{ cursor: "pointer" }} onClick={showModal} />
                <EditRegistration isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <ListIcon size={28} style={{ color: theme.token.colorBlack }} onClick={showDrawer} />
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
