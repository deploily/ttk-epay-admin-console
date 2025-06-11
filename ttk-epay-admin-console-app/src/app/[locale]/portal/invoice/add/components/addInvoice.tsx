'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { InvoiceIcon } from "@phosphor-icons/react";
import { Checkbox, Col, Form, notification, Row } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import Title from "antd/es/typography/Title";
import { theme } from "@/styles/theme";
import { CustomPrimaryButton } from "@/styles/components/buttonStyle";
import { postInvoice } from "@/lib/features/invoice/invoiceThunks";
import { useRouter } from "next/navigation";

export default function AddInvoice() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const [form] = Form.useForm();
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();



    const handleFinish = async (values: any) => {

        try {
            await dispatch(postInvoice({ ...values })).unwrap();

            api.success({
                message: t('success'),
                description: t('addInvoiceSuccessMsg'),
            });
            setTimeout(() => router.back(), 2000);
        } catch (error) {

            api.error({
                message: t('error'),
                description: `${error}`,
            });
        }

    };

    return (
        <>
            {contextHolder}
            <Row gutter={16} style={{ paddingTop: 10, paddingInline: 20 }}>
                <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: theme.token.blackOverlay }} />
                    <Title level={3} style={{ fontWeight: 700, color: theme.token.blackOverlay, marginBottom: 0, marginLeft: 2 }}>
                        {t("invoice")}
                    </Title>
                </Col>

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
                            <Form.Item label={t('orderId')} name="ORDER_ID">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item label={t('orderName')} name="ORDER_NAME">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={t('netAmount')} name="NET_AMOUNT">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('invoiceTva')} name="INVOICE_TVA">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('amountTva')} name="AMOUNT_TVA">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('amountTtc')} name="AMOUNT_TTC">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={t('clientCode')} name="CLIENT_CODE">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col md={16} xs={24}>
                            <Form.Item label={t('clientName')} name="CLIENT_NAME">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item label={t('clientNrc')} name="CLIENT_NRC">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={t('clientAdress')} name="CLIENT_ADDRESS">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Form.Item label={t('clientMail')} name="CLIENT_MAIL">
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col md={20} xs={24}>
                            <Form.Item label={t('ClientIdf')} name="CLIENT_IDF">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={4} xs={24}>
                            <Form.Item name="IS_PAID" valuePropName="checked">
                                <Checkbox>{t("isPaid")}</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label={t('productName')} name="PRODUCT_NAME">
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