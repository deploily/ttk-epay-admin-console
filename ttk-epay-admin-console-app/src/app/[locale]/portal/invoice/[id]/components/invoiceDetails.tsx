'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { InvoiceIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import { Button, Checkbox, Col, Form, message, Radio, Result, Row, Skeleton } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { getInvoiceById, updateInvoice } from "@/lib/features/invoice/invoiceThanks";
import { useInvoice } from "@/lib/features/invoice/invoiceSelector";
import { theme } from "@/styles/theme";
import { CustomPrimaryButton } from "@/styles/components/buttonStyle";

export default function InvoiceDetails({ invoiceId }: { invoiceId: string }) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const translate = useI18n()
    const [form] = Form.useForm();
    const { invoice, invoiceError, isLoadingInvoice } = useInvoice()

    useEffect(() => {
        dispatch(getInvoiceById(invoiceId));
    }, []);

    const handleUpdate = (formValues: any) => {
        
        dispatch(updateInvoice({ id: invoiceId, ...formValues }))
            .unwrap()
            // .then(() => {
            //     message.success(t("updateSuccess"));
            // })
            // .catch(() => {
            //     message.error(t("updateError"));
            // });
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
                <Col span={24} style={{ display: "flex", justifyContent: "end", marginTop:10 }}>
                    <Button
                        style={{
                            color: "black",
                            backgroundColor: "rgba(218, 236, 247, 0.57)",
                            border: "0px",
                            paddingInline: 20,
                            borderRadius: 16,
                            fontSize: 15,
                            height: 40
                        }}

                    >
                        <LinkSimpleIcon size={20} style={{ color: "black" }} />
                        {t("generateLink")}
                    </Button>
                </Col>
            </Row>
            <Row>
                
            </Row>
            {isLoadingInvoice && !invoice &&
                <Row gutter={[10, 10]} style={{ margin: 20 }}>
                    <Col span={2}><Skeleton active paragraph={{ rows: 0.5 }} /></Col>
                    <Col span={22}><Skeleton.Input active={true} /></Col>
                </Row>
            }

            {!isLoadingInvoice && invoice &&
                <>
                    <Form
                        form={form}
                        name="profile-update"
                        onFinish={handleUpdate}
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
                                    <CustomInvoiceInput defaultValue={invoice.ORDER_ID} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('orderName')} name="orderName">
                                    <CustomInvoiceInput defaultValue={invoice.ORDER_NAME} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label={t('netAmount')} name="netAmount">
                            <CustomInvoiceInput defaultValue={invoice.NET_AMOUNT} style={{ color: theme.token.colorBlack }} />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('invoiceTva')} name="invoiceTva">
                                    <CustomInvoiceInput defaultValue={invoice.INVOICE_TVA} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('amountTva')} name="amountTva">
                                    <CustomInvoiceInput defaultValue={invoice.AMOUNT_TVA} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('amountTtc')} name="amountTtc">
                                    <CustomInvoiceInput defaultValue={invoice.AMOUNT_TTC} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label={t('clientCode')} name="clientCode">
                            <CustomInvoiceInput defaultValue={invoice.CLIENT_CODE} style={{ color: theme.token.colorBlack }} />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={16} xs={24}>
                                <Form.Item label={t('clientName')} name="clientName">
                                    <CustomInvoiceInput defaultValue={invoice.CLIENT_NAME} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('clientNrc')} name="clientNrc">
                                    <CustomInvoiceInput defaultValue={invoice.CLIENT_NRC} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label={t('clientAdress')} name="clientAdress">
                            <CustomInvoiceInput defaultValue={invoice.CLIENT_ADDRESS} style={{ color: theme.token.colorBlack }} />
                        </Form.Item>
                        <Form.Item label={t('clientMail')} name="clientMail">
                            <CustomInvoiceInput defaultValue={invoice.CLIENT_MAIL} style={{ color: theme.token.colorBlack }} />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={20} xs={24}>
                                <Form.Item label={t('ClientIdf')} name="ClientIdf">
                                    <CustomInvoiceInput defaultValue={invoice.CLIENT_IDF} style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                            <Col md={4} xs={24}>
                                <Form.Item name="isPaid">
                                    <Checkbox defaultChecked={invoice.IS_PAID}>{t("isPaid")}</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('productName')} name="productName">
                            <CustomInvoiceInput defaultValue={invoice.PRODUCT_NAME} style={{ color: theme.token.colorBlack }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'end', marginTop: 20 }}>
                            <CustomPrimaryButton htmlType="submit">
                                {t("updateInvoice")}
                            </CustomPrimaryButton>
                        </Form.Item>
                    </Form>

                </>
            }

            {!isLoadingInvoice && invoiceError &&
                <Result
                    status="500"
                    title={translate('error')}
                    subTitle={translate('subTitleError')}
                />
            }

        </>
    )
}