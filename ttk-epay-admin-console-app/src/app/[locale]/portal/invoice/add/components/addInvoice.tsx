'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { InvoiceIcon } from "@phosphor-icons/react";
import { Checkbox, Col, Form, Row } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import Title from "antd/es/typography/Title";
import { theme } from "@/styles/theme";
import { CustomPrimaryButton } from "@/styles/components/buttonStyle";
import { postInvoice } from "@/lib/features/invoice/invoiceThanks";
import { useRouter } from "next/navigation";

export default function AddInvoice() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const [form] = Form.useForm();
    const router = useRouter();



    const handleFinish = async(values: any) => {

        await dispatch(postInvoice({ ...values }))
            .unwrap()
        router.back()

    };

    return (
        <>
            <Row gutter={16} style={{ paddingTop: 10, paddingInline: 20 }}>
                <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("invoice")}
                    </Title>
                </Col>

            </Row>
            <Row>

            </Row>



            <>
                <Form
                    form={form}
                    name="profile-update"
                    onFinish={handleFinish}
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 0 }}
                    colon={false}
                    style={{ padding: 20 }}
                >
                    <Row gutter={[16, 16]}>
                        <Col md={12} xs={24}>
                            <Form.Item label={t('orderId')} name="orderId">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item label={t('orderName')} name="orderName">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={t('netAmount')} name="netAmount">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('invoiceTva')} name="invoiceTva">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('amountTva')} name="amountTva">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('amountTtc')} name="amountTtc">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={t('clientCode')} name="clientCode">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col md={16} xs={24}>
                            <Form.Item label={t('clientName')} name="clientName">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('clientNrc')} name="clientNrc">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={t('clientAdress')} name="clientAdress">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Form.Item label={t('clientMail')} name="clientMail">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col md={20} xs={24}>
                            <Form.Item label={t('ClientIdf')} name="ClientIdf">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={4} xs={24}>
                            <Form.Item name="isPaid" valuePropName="checked">
                                <Checkbox>{t("isPaid")}</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label={t('productName')} name="productName">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'end', marginTop: 20 }}>
                        <CustomPrimaryButton htmlType="submit">
                            {t("saveInvoice")}
                        </CustomPrimaryButton>
                    </Form.Item>
                </Form>

            </>




        </>
    )
}