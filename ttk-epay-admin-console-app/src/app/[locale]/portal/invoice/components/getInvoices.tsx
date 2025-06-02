'use client'
import { Button, Col, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../locales/client";
import { InvoiceIcon, PlusIcon } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInvoice } from "@/lib/features/invoice/invoiceSelector";
import { fetchInvoice } from "@/lib/features/invoice/invoiceThanks";
import { Invoice } from "@/lib/features/invoice/invoiceInterface";

export default function GetInvoices() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('invoice')
    const [columns] = useState([]);
    const { invoiceList, isLoadingInvoiceList } = useInvoice()
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchInvoice());

    }, []);


    const keysToColumn = () => {
        const list = ["ID", "ORDER_NAME", "NET_AMOUNT", "CLIENT_CODE", "CLIENT_NAME", "IS_PAID"]

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
                    <InvoiceIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("invoice")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
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
                        onClick={() => router.push(`/portal/invoice/add`)}
                    >
                        <PlusIcon size={20} style={{ color: "black" }} />
                        {t("addInvoice")}
                    </Button>
                </Col>
            </Row>

            <Table<Invoice>
                columns={isLoadingInvoiceList ? skeletonColumns : invoiceList && keysToColumn()}
                dataSource={isLoadingInvoiceList ? Array(1).fill({ key: Math.random() }) : invoiceList}
                size="middle"
                className="custom-table"
                style={{ marginTop: 40, borderRadius: 0, paddingInline: 20 }}
                scroll={{ y: 55 * 5 }}
                rowKey={(record) => record.ID || `row-${Math.random()}`}
                onRow={(record) => ({
                    onClick: () => router.push(`/portal/invoice/${record.ID}`),
                    style: { cursor: "pointer" },
                })}
            />

        </>
    )
}