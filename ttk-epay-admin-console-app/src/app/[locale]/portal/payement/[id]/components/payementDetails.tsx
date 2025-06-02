'use client'
import { useAppDispatch } from "@/lib/hook";
import { CustomInvoiceInput } from "@/styles/components/inputStyle";
import { DownloadSimpleIcon, InvoiceIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import { Button, Checkbox, Col, Form, message, Result, Row, Skeleton } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { theme } from "@/styles/theme";
import { getPayementById } from "@/lib/features/payement/payementThanks";
import { usePayement } from "@/lib/features/payement/payementSelector";
import dayjs from "dayjs";


export default function PayementDetails({ payementId }: { payementId: string }) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('payement')
    const translate = useI18n()
    const [form] = Form.useForm();
    const { payement, payementError, isLoadingPayement } = usePayement()

    useEffect(() => {
        dispatch(getPayementById(payementId));
    }, []);


    return (
        <>
            <Row gutter={16} style={{ paddingTop: 10, paddingInline: 20 }}>
                <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("payement")}
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
            {isLoadingPayement && !payement &&
                <Row gutter={[10, 10]} style={{ margin: 20 }}>
                    <Col span={2}><Skeleton active paragraph={{ rows: 0.5 }} /></Col>
                    <Col span={22}><Skeleton.Input active={true} /></Col>
                </Row>
            }

            {!isLoadingPayement && payement &&
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
                            date: dayjs(payement.DATE).format("DD-MM-YYYY HH:mm"),
                            actionCodeDescreption: payement.ACTION_CODE_DESCRIPTION,
                            actionCode: payement.ACTION_CODE,
                            amount: payement.AMOUNT,
                            authCode: payement.AUTH_CODE,
                            currency: payement.ERROR_CODE,
                            errorMessage: payement.ERROR_MESSAGE,
                            cardHoldeName: payement.CARD_HOLDER_NAME,
                            expiration: payement.EXPIRATION,
                            orderNumber: payement.ORDER_NUMBER,
                            satimOrderId: payement.SATIM_ORDER_ID,
                            responseCodeDescreption: payement.RESPONSE_CODE_DESCRIPTION,

                        }}
                    >

                        <Form.Item label={t('date')} name="date">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>

                        <Form.Item label={t('actionCodeDescreption')} name="actionCodeDescreption">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>

                        <Form.Item label={t('actionCode')} name="actionCode">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('amount')} name="amount">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('authCode')} name="authCode">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('currency')} name="currency">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                                </Form.Item>
                            </Col>

                        </Row>


                        <Form.Item label={t('errorMessage')} name="errorMessage">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>
                        <Form.Item label={t('cardHoldeName')} name="cardHoldeName">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('expiration')} name="expiration">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('orderNumber')} name="orderNumber">
                                    <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('satimOrderId')} name="satimOrderId">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>
                        <Form.Item label={t('responseCodeDescreption')} name="responseCodeDescreption">
                            <CustomInvoiceInput style={{ color: theme.token.colorBlack }} readOnly/>
                        </Form.Item>

                    </Form>

                </>
            }

            {!isLoadingPayement && payementError &&
                <Result
                    status="500"
                    title={translate('error')}
                    subTitle={translate('subTitleError')}
                />
            }

        </>
    )
}