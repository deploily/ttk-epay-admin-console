'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { InvoiceIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import { Button, Checkbox, Col, Divider, Form, message, notification, Popover, Radio, Result, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { getInvoiceById, updateInvoice } from "@/lib/features/invoice/invoiceThunks";
import { useInvoice } from "@/lib/features/invoice/invoiceSelector";
import { theme } from "@/styles/theme";
import { CustomPrimaryButton } from "@/styles/components/buttonStyle";
import { useRegistration } from "@/lib/features/registration/registrationSelectors";
import GenerateLinkPopover from "./generateLinkPopover";
import { useI18n, useScopedI18n } from "../../../../../../locales/client";

export default function InvoiceDetails({ invoicerId }: { invoicerId: any }) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const translate = useI18n()
    const [form] = Form.useForm();
    const { invoice, invoiceError, isLoadingInvoice } = useInvoice()
    const { registration } = useRegistration()
    const [api, contextHolder] = notification.useNotification();


    useEffect(() => {
        dispatch(getInvoiceById(invoicerId));

    }, [registration, invoicerId]);

    const handleUpdate = async (formValues: any) => {
        try {
            await dispatch(updateInvoice({ ID: invoice?.ID, ...formValues })).unwrap();
            dispatch(getInvoiceById(invoicerId));
            api.success({
                message: t('success'),
                description: t('updateInvoiceSuccessMsg'),
            });
        } catch (error) {

            api.error({
                message: t('error'),
                description: `${error}`,
            });
        }
    };

    console.log(invoice);

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
                <Col span={24} style={{ display: "flex", justifyContent: "end", marginTop: 10 }}>


                    <GenerateLinkPopover invoiceNumber={invoice?.INVOICE_NUMBER} clientCode={invoice?.CLIENT_CODE} />

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
                        initialValues={{
                            ORDER_NAME: invoice.ORDER_NAME,
                            INVOICE_NUMBER: invoice.INVOICE_NUMBER,
                            NET_AMOUNT: invoice.NET_AMOUNT,
                            INVOICE_TVA: invoice.INVOICE_TVA,
                            AMOUNT_TVA: invoice.AMOUNT_TVA,
                            AMOUNT_TTC: invoice.AMOUNT_TTC,
                            CLIENT_CODE: invoice.CLIENT_CODE,
                            CLIENT_NAME: invoice.CLIENT_NAME,
                            CLIENT_NRC: invoice.CLIENT_NRC,
                            CLIENT_ADDRESS: invoice.CLIENT_ADDRESS,
                            CLIENT_MAIL: invoice.CLIENT_MAIL,
                            CLIENT_IDF: invoice.CLIENT_IDF,
                            IS_PAID: invoice.IS_PAID,
                            PRODUCT_NAME: invoice.PRODUCT_NAME,
                        }}
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
                        <Col md={12} xs={24}>
                            <Form.Item label={t('orderName')} name="ORDER_NAME">
                                <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                            </Form.Item>
                        </Col>
                        <Row gutter={[16, 16]}>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('clientMail')} name="CLIENT_MAIL">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                                </Form.Item>                        </Col>

                            <Col md={12} xs={24}>
                                <Form.Item label={t('clientNrc')} name="CLIENT_NRC">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={20} xs={24}>
                                <Form.Item label={t('ClientIdf')} name="CLIENT_IDF">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
                                </Form.Item>
                            </Col>
                            <Col md={4} xs={24}>
                                <Form.Item name="IS_PAID" valuePropName="checked" >
                                    <Checkbox>{t("isPaid")}</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('productName')} name="PRODUCT_NAME">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} />
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