'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { InvoiceIcon } from "@phosphor-icons/react";
import { Col, Divider, Form, notification, Row } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import Title from "antd/es/typography/Title";
import { theme } from "@/styles/theme";
import { CustomPrimaryButton } from "@/styles/components/buttonStyle";
import { postInvoice } from "@/lib/features/invoice/invoiceThunks";
import { useLocaleRouter } from "@/lib/navigation";

export default function AddInvoice() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const [form] = Form.useForm();
    const router = useLocaleRouter();
    const [api, contextHolder] = notification.useNotification();

    const handleFinish = async (values: any) => {
        console.log(values);

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
                            <Form.Item label={t('invoiceNumber')} name="INVOICE_NUMBER" required rules={[{ required: true, message: t('requiredMessage') }]}>
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item label={t('netAmount')} name="NET_AMOUNT" required rules={[{ required: true, message: t('requiredMessage') }]}>
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={12} xs={24}>
                            <Form.Item label={t('clientCode')} name="CLIENT_CODE" required rules={[{ required: true, message: t('requiredMessage') }]}>
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item label={t('clientName')} name="CLIENT_NAME" required rules={[{ required: true, message: t('requiredMessage') }]}>
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item label={t('clientAdress')} name="CLIENT_ADDRESS" required rules={[{ required: true, message: t('requiredMessage') }]}>
                        <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                    </Form.Item>

                    <Divider></Divider>
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