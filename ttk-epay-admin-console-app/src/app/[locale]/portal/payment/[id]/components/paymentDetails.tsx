'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { DownloadSimpleIcon, InvoiceIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import { Button, Checkbox, Col, Form, message, Result, Row, Skeleton } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { theme } from "@/styles/theme";
import { getPaymentById } from "@/lib/features/payment/paymentThunks";
import { usePayment } from "@/lib/features/payment/paymentSelector";
import dayjs from "dayjs";
import { useRegistration } from "@/lib/features/registration/registrationSelectors";


export default function PaymentDetails({ paymentId }: { paymentId: string }) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('payment')
    const translate = useI18n()
    const [form] = Form.useForm();
    const { payment, paymentError, isLoadingPayment } = usePayment()
    const { registration } = useRegistration()

    useEffect(() => {
        dispatch(getPaymentById(paymentId));
    }, [registration]);


    return (
        <>
            <Row gutter={16} style={{ paddingTop: 10, paddingInline: 20 }}>
                <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("payment")}
                    </Title>
                </Col>
                <Col span={24} style={{ display: "flex", justifyContent: "end", marginTop: 10 }}>
                    { //TODO download receipt 
                    }
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
                        <DownloadSimpleIcon size={20} style={{ color: "black" }} />
                        {t("downloadReceipt")}
                    </Button>
                </Col>
            </Row>
            <Row>

            </Row>
            {isLoadingPayment && !payment &&
                <Row gutter={[10, 10]} style={{ margin: 20 }}>
                    <Col span={2}><Skeleton active paragraph={{ rows: 0.5 }} /></Col>
                    <Col span={22}><Skeleton.Input active={true} /></Col>
                </Row>
            }

            {!isLoadingPayment && payment &&
                <>
                    <Form
                        form={form}
                        name="profile-update"
                        labelCol={{ flex: '110px' }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 0 }}
                        colon={false}
                        style={{ padding: 20 }}
                        initialValues={{
                            date: dayjs(payment.DATE).format("DD-MM-YYYY HH:mm"),
                            actionCodeDescreption: payment.ACTION_CODE_DESCRIPTION,
                            actionCode: payment.ACTION_CODE,
                            amount: payment.AMOUNT,
                            authCode: payment.AUTH_CODE,
                            currency: payment.ERROR_CODE,
                            errorMessage: payment.ERROR_MESSAGE,
                            cardHoldeName: payment.CARD_HOLDER_NAME,
                            expiration: payment.EXPIRATION,
                            orderNumber: payment.ORDER_NUMBER,
                            satimOrderId: payment.SATIM_ORDER_ID,
                            responseCodeDescreption: payment.RESPONSE_CODE_DESCRIPTION,

                        }}
                    >

                        <Form.Item label={t('date')} name="date">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>

                        <Form.Item label={t('actionCodeDescreption')} name="actionCodeDescreption">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>

                        <Form.Item label={t('actionCode')} name="actionCode">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('amount')} name="amount">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('authCode')} name="authCode">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('currency')} name="currency">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                                </Form.Item>
                            </Col>

                        </Row>


                        <Form.Item label={t('errorMessage')} name="errorMessage">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>
                        <Form.Item label={t('cardHoldeName')} name="cardHoldeName">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('expiration')} name="expiration">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('orderNumber')} name="orderNumber">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('satimOrderId')} name="satimOrderId">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>
                        <Form.Item label={t('responseCodeDescreption')} name="responseCodeDescreption">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly />
                        </Form.Item>

                    </Form>

                </>
            }

            {!isLoadingPayment && paymentError &&
                <Result
                    status="500"
                    title={translate('error')}
                    subTitle={translate('subTitleError')}
                />
            }

        </>
    )
}