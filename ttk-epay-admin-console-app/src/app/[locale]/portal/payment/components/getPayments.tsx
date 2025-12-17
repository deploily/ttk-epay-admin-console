'use client'
import { Col, DatePicker, notification, Result, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { useI18n, useScopedI18n } from "../../../../../../locales/client";
import { DownloadSimpleIcon, FilePdfIcon, InvoiceIcon } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { usePayment } from "@/lib/features/payment/paymentSelector";
import { fetchPayment, savePdfReceipt } from "@/lib/features/payment/paymentThunks";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { useRegistration } from "@/lib/features/registration/registrationSelectors";
import { CustomButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { CustomStyledTable } from "@/styles/components/tableStyle";
import { useLocaleRouter } from "@/lib/navigation";


export default function GetPayments() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('payment')
    const translate = useI18n()
    const [columns] = useState([]);
    const { paymentList, isLoadingPaymentList, paymentErrorList } = usePayment()
    const router = useLocaleRouter();
    const { registration } = useRegistration()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { RangePicker } = DatePicker;
    const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [api, contextHolder] = notification.useNotification();

    const handleRangeChange = (dates: any) => {
        if (dates && dates.length === 2) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        }
    };


    useEffect(() => {
        dispatch(fetchPayment({
            numberPage: page,
            pageSize: pageSize,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }));

    }, [registration, page, pageSize, startDate, endDate]);



    const handleClick = async (satimOrderId: string) => {
        try {
            await dispatch(savePdfReceipt(satimOrderId)).unwrap();

            api.success({
                message: 'Succès',
                description: t('savePdfReceiptSuccessMsg'),
            });
        } catch (error) {

            api.error({
                message: 'Erreur',
                description: `${error}`,
            });
        }
    };




    const keysToColumn = () => {
        const list = ["ID", "ACTION_CODE", "AMOUNT", "ORDER_NUMBER", "CLIENT_ID", "DATE",]

        let columns: ColumnsType<any> = list.map((element: any, index) => {
            if (element === "DATE")
                return {
                    title: t(element),
                    dataIndex: element,
                    key: index,
                    render: (date: Date) =>
                        dayjs(date).format("DD-MM-YYYY HH:mm"),
                };

            else
                return {
                    title: t(element),
                    dataIndex: element,
                    key: index,
                };
        });

        columns.push({
            title: "",
            dataIndex: "",
            key: 6,
            render: (element) =>
                <div style={{ textAlign: "end", marginRight: 15, }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick(element.SATIM_ORDER_ID);



                    }} >
                    <FilePdfIcon size={24} color={theme.token.colorBlack} style={{ cursor: 'pointer' }} />
                </div>,
        });

        return columns;
    };
    const skeletonColumns = columns.length
        ? columns.map((col: any, index) => ({
            ...col,
            render: () => <Skeleton.Input active={true} key={index} />,
        }))
        : Array(3).fill({}).map((_, index) => ({
            title: <Skeleton.Input active={true} size="small" />,
            dataIndex: `col${index}`,
            key: `col${index}`,
            render: () => <Skeleton.Input active={true} />,
        }));
    return (
        <>
            <Row gutter={16} style={{ paddingTop: 10, paddingInline: 20 }}>
                <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: theme.token.blackOverlay }} />
                    <Title level={3} style={{ fontWeight: 700, color: theme.token.blackOverlay, marginBottom: 0, marginLeft: 2 }}>
                        {t("payment")}
                    </Title>
                </Col>
                <Col span={10}  >

                </Col>
                <Col span={24} style={{ display: "flex", justifyContent: "end", gap: 4 }}>
                    <RangePicker
                        value={[startDate, endDate]}
                        format='DD-MM-YYYY'
                        onChange={handleRangeChange}

                    />
                    { //TODO download list 
                    }
                    <CustomButton disabled style={{ opacity: 0.6 }} >
                        <DownloadSimpleIcon size={20} style={{ color: theme.token.colorBlack }} />
                        {t("downloadList")}
                    </CustomButton>
                </Col>
            </Row>

            {contextHolder}
            {!paymentErrorList &&
                <div>
                <CustomStyledTable<any>
                        columns={isLoadingPaymentList ? skeletonColumns : paymentList && keysToColumn()}
                        dataSource={isLoadingPaymentList ? Array(1).fill({ key: Math.random() }) : paymentList?.ITEMS}
                        size="middle"
                        className="custom-table"
                        style={{ marginTop: 40, borderRadius: 0, paddingInline: 20 , }}
                        scroll={{ y: 'calc(100vh - 350px)' }}
                        rowKey={(record:any) => record.ID || `row-${Math.random()}`}
                        onRow={(record:any) => ({
                            onClick: () => router.push(`/portal/payment?id=${record.ID}`),
                            style: { cursor: "pointer" },
                        })}
                        pagination={{
                            total: ((paymentList?.TOTALPAGES || 0) * pageSize),
                            current: page,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: [10, 20, 50, 100],
                            onChange: (newPage: any, newPageSize: any) => {
                                setPage(newPage)
                                setPageSize(newPageSize);
                                dispatch(fetchPayment({
                                    numberPage: newPage,
                                    pageSize: newPageSize,
                                    startDate: startDate.toISOString(),
                                    endDate: endDate.toISOString()
                                }));
                            },
                            style: { marginTop: 50 },
                        }}

                    />
                </div>}
            {!isLoadingPaymentList && paymentErrorList &&
                <Result
                    status="500"
                    title={translate('error')}
                    subTitle={translate('subTitleError')}
                />
            }

        </>
    )
}