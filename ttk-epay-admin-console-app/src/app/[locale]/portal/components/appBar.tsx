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
import EditRegistration from "./editRegistration";
import { theme } from "@/styles/theme";




export function AppAppBarDesktop() {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  return (
    <>
      <Header
        style={{
          backgroundColor:theme.token.whisperBlue,
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
