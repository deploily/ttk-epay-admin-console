"use client";

import {Dropdown, Button, Space, Typography, Row, Col} from "antd";
import {locales} from "@/config";
import {useChangeLocale, useCurrentLocale} from "../../../../locales/client";
import {useState} from "react";
import {Globe, GlobeIcon} from "@phosphor-icons/react";

export default function LocaleSwitcher() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const [theme] = useState("dark");

  const handleChange = (value: any) => {
    changeLocale(value);
  };


  const menuItems = locales.map((loc) => ({
    key: loc,
    label: (
      <div onClick={() => handleChange(loc)}>
        {loc.toUpperCase()}
      </div>
    ),
  }));

  return (
    <Space wrap>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <Button
          style={{
            paddingInline:5,
            border:"1px solid black"
          }}
        >
          <Row
            align="middle"
            justify="space-between"
            style={{display: "flex", alignItems: "center", paddingLeft: "0px"}}
          >
            <Col>
              <Typography style={{color:"black"}}>{locale.toUpperCase()}</Typography>
            </Col>
            <Col style={{display: "flex"}}>
              <GlobeIcon color={"black"} size={20} />
            </Col>
          </Row>
        </Button>
      </Dropdown>
    </Space>
  );
}
