'use client'
import { Button, Col, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../locales/client";
import { DownloadSimpleIcon, FilePdfIcon, InvoiceIcon } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayement } from "@/lib/features/payement/payementSelector";
import { fetchPayement } from "@/lib/features/payement/payementThanks";
import { Payement } from "@/lib/features/payement/payementInterface";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";


export default function GetPayements() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('payement')
    const [columns] = useState([]);
    const { payementList, isLoadingPayementList } = usePayement()
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchPayement());

    }, []);


    const keysToColumn = () => {
        const list = ["ID", "ACTION_CODE", "AMOUNT", "ORDER_NUMBER", "DATE"]

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
            render: () =>
                <div style={{ textAlign: "end", marginRight: 15 }}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        //TODO download receipt 
                        
                    }} >
                    <FilePdfIcon size={24} color="black" style={{ cursor: 'pointer' }} />
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
                <Col span={14} style={{ display: "flex", alignItems: "center" }}>
                    <InvoiceIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("payement")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                { //TODO download list 
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
                        {t("downloadList")}
                    </Button>
                </Col>
            </Row>

            <Table<Payement>
                columns={isLoadingPayementList ? skeletonColumns : payementList && keysToColumn()}
                dataSource={isLoadingPayementList ? Array(1).fill({ key: Math.random() }) : payementList}
                size="middle"
                className="custom-table"
                style={{ marginTop: 40, borderRadius: 0, paddingInline: 20 }}
                scroll={{ y: 55 * 5 }}
                rowKey={(record) => record.ID || `row-${Math.random()}`}
                onRow={(record) => ({
                    onClick: () => router.push(`/portal/payement/${record.ID}`),
                    style: { cursor: "pointer" },
                })}

            />

        </>
    )
}