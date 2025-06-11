'use client'
import { Button, Col, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../locales/client";
import { InvoiceIcon, PlusIcon } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInvoice } from "@/lib/features/invoice/invoiceSelector";
import { fetchInvoice, getInvoiceByOrderId } from "@/lib/features/invoice/invoiceThunks";
import { Invoice } from "@/lib/features/invoice/invoiceInterface";
import { useRegistration } from "@/lib/features/registration/registrationSelectors";
import { CustomButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";

export default function GetInvoices() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const [columns] = useState([]);
    const { invoiceList, isLoadingInvoiceList } = useInvoice()
    const router = useRouter();
    const { registration } = useRegistration()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(fetchInvoice({ numberPage: page, pageSize: pageSize }));

    }, [registration]);
    const displayInvoiceByOrderId = (ORDER_ID: any) => {
        dispatch(getInvoiceByOrderId(ORDER_ID));
        router.push(`/portal/invoice/${ORDER_ID}`)

    }

    const keysToColumn = () => {
        const list = ["ID", "ORDER_ID", "ORDER_NAME", "NET_AMOUNT", "CLIENT_CODE", "CLIENT_NAME", "IS_PAID"]

        let columns = list.map((element: any, index) => {
            if (element === "IS_PAID")
                return {
                    title: t(element),
                    dataIndex: element,
                    key: index,
                    render: (status: any) => (status ? <span style={{ color: "#28B609" }} >{t('paid')}</span> : <span>{t('unpaid')}</span>),
                };

            else
                return {
                    title: t(element),
                    dataIndex: element,
                    key: index,
                    render: (element: any) => ((element === null || element === "") ? <span  > - </span> : <span>{element}</span>)
                };
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
                <Col span={14} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: theme.token.blackOverlay }} />
                    <Title level={3} style={{ fontWeight: 700, color: theme.token.blackOverlay, marginBottom: 0, marginLeft: 2 }}>
                        {t("invoice")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    <CustomButton onClick={() => router.push(`/portal/invoice/add`)} >
                        <PlusIcon size={20} style={{ color: "black" }} />
                        {t("addInvoice")}
                    </CustomButton>
                </Col>
            </Row>

            <Table<Invoice>
                columns={isLoadingInvoiceList ? skeletonColumns : invoiceList && keysToColumn()}
                dataSource={isLoadingInvoiceList ? Array(1).fill({ key: Math.random() }) : invoiceList?.ITEMS}
                size="middle"
                className="custom-table"
                style={{ marginTop: 40, borderRadius: 0, paddingInline: 20 }}
                scroll={{ y: 70 * 5 }}
                rowKey={(record) => record.ID || `row-${Math.random()}`}
                onRow={(record) => ({
                    onClick: () => { displayInvoiceByOrderId(record.ORDER_ID) },
                    style: { cursor: "pointer" },
                })}
                pagination={{
                    total: ((invoiceList?.TOTALPAGES || 0) * pageSize),
                    current: page,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 100],
                    onChange: (newPage, newPageSize) => {
                        setPage(newPage)
                        setPageSize(newPageSize);
                        dispatch(fetchInvoice({ numberPage: newPage, pageSize: newPageSize }));
                    },
                }}
            />

        </>
    )
}