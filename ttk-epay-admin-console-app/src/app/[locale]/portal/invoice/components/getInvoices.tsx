'use client'
import { Button, Col, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../locales/client";
import { PlusIcon } from "@phosphor-icons/react";
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
    const { invoiceList, isLoadingInvoice } = useInvoice()
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

        // columns = [
        //     ...columns,

        // ];

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
            <Row gutter={16}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                        {t("invoice")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        style={{
                            color: "#ffff",
                            backgroundColor: "#5394CC",
                            padding: 10,
                            borderRadius: 25,
                            fontSize: 15,
                            height: 45
                        }}
                        onClick={() => router.push(`/portal/invoice/add`)}
                    >
                        <PlusIcon size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                        {t("addInvoice")}
                    </Button>
                </Col>
            </Row>

            <Table<Invoice>
                columns={isLoadingInvoice ? skeletonColumns : invoiceList && keysToColumn()}
                dataSource={isLoadingInvoice ? Array(1).fill({ key: Math.random() }) : invoiceList}
                size="middle"
                className="custom-table"
                style={{ marginTop: 40, borderRadius: 0, paddingInline:10 }}
                scroll={{ y: 55 * 5 }}
            />

        </>
    )
}