'use client'

import { Modal } from "antd"
import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Tooltip } from 'antd';
import { FloppyDiskIcon, QuestionIcon } from '@phosphor-icons/react';
import { useAppDispatch } from '@/lib/hook';
import { getRegistration, setRegistration } from '@/lib/features/registration/registrationSlice';
import { useScopedI18n } from "../../../../../locales/client";
import { useRegistration } from "@/lib/features/registration/registrationSelectors";

export default function EditRegistration({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: any }) {
    const t = useScopedI18n('registration')
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { registration } = useRegistration()
    
    const onFinish = async (values: any) => {
        await dispatch(setRegistration(values))       
        handleOk()
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
            dispatch(getRegistration());
        }, [])

    
    return (
        <>
            <Modal
                title="Registration"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ paddingInline: "10%" }}
                    initialValues={{
                        url: registration?.url,
                        secretKey: registration?.secretKey,
                    }}
                >

                    <Form.Item name="url" rules={[{ required: true }]} >
                        <Input
                            allowClear
                            placeholder={t('url')}
                            style={{ height: 40, borderRadius: 8, marginTop:20 }}
                            suffix={
                                <Tooltip title={t('urlInformation')}>
                                    <QuestionIcon size={24} style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>


                    <Form.Item name="secretKey" rules={[{ required: true }]}>
                        <Input
                            allowClear
                            placeholder={t('secretKey')}
                            style={{ height: 40, borderRadius: 8, marginTop: 5 }}
                            suffix={
                                <Tooltip title={t('secretKeyInformation')}>
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
                                    marginTop: 5,
                                    borderRadius: 8,
                                    fontSize: 15,
                                    height: 45,
                                    width: "100%"
                                }}
                                onClick={() => { }}
                            >
                                <FloppyDiskIcon size={24} />
                                {t('save')}
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}