'use client'
import React from 'react';
import { Button, Col, Form, Input, Row, Tooltip } from 'antd';
import Image from 'next/image';
import { FloppyDiskIcon, QuestionIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useScopedI18n } from '../../../../locales/client';
import LocaleSwitcher from './localeSwitcher';


export default function ConnectionComponent() {
    const t = useScopedI18n('connectionComponant')
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
        if (values) form.resetFields();
    };

    return (
        <>
           <div style={{marginTop:5, marginInline:5, display:"flex", justifyContent:"start"}}> <LocaleSwitcher /></div>
            <Row>
                <Col md={12} xs={24}>
                    <Col span={24} style={{ display: "flex", justifyContent: "center", marginTop: "10%", marginBottom: "15%" }}>
                        <Image
                            src="/images/deploily-logo.png"
                            width={256}
                            height={63}
                            alt="logo-deploily"

                        />
                    </Col>
                    <Col span={24} >
                        <Form
                            form={form}
                            name="control-hooks"
                            onFinish={onFinish}
                            style={{ paddingInline: "10%" }}
                        >

                            <Form.Item name="url" rules={[{ required: true }]} >
                                <Input
                                    allowClear
                                    placeholder={t('url')}
                                    style={{ height: 40, borderRadius: 8 }}
                                    suffix={
                                        <Tooltip title="Extra information">
                                            <QuestionIcon size={24} style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>


                            <Form.Item name="secretKey" rules={[{ required: true }]}>
                                <Input
                                    allowClear
                                    placeholder={t('secretKey')}
                                    style={{ height: 40, borderRadius: 8, marginTop: 15 }}
                                    suffix={
                                        <Tooltip title="Extra information">
                                            <QuestionIcon size={24} style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>

                            <Form.Item>
                                <Row style={{ display: "flex", justifyContent: "center" }} >
                                    <Button htmlType="submit"
                                        style={{
                                            color: "#ffff",
                                            backgroundColor: "#5394CC",
                                            padding: 10,
                                            marginTop: 15,
                                            borderRadius: 8,
                                            fontSize: 15,
                                            height: 45,
                                            width: "100%"
                                        }}
                                        onClick={() => { }}
                                    >
                                        <FloppyDiskIcon size={24}/>
                                        {t('save')}
                                    </Button>
                                </Row>
                            </Form.Item>
                        </Form>
                        <Link href={"https://console.deploily.cloud/en"}
                            target="_blank"
                            style={{ display: "flex", justifyContent: "center" }}>
                            {t('goDeploilyConsole')}
                        </Link>
                    </Col>

                </Col>
                <Col md={12} xs={24} style={{display:"flex", alignItems:"center", justifyContent:"center"}} >
                <Image
                            src="/images/capture-url.png"
                            width={528}
                            height={404}
                            alt=""

                        />
                </Col>
            </Row>
        </>
    )
}