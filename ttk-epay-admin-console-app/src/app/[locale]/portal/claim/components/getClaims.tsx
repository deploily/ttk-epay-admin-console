'use client'
import { Col, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../locales/client";
import { TicketIcon } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { useClaim } from "@/lib/features/claim/claimSelector";
import { fetchClaim } from "@/lib/features/claim/claimThunks";
import { Claim } from "@/lib/features/claim/claimInterface";
import { useRegistration } from "@/lib/features/registration/registrationSelectors";


export default function GetClaims() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('claim')
    const [columns] = useState([]);
    const { claimList, isLoadingClaimList } = useClaim()
    const { registration } = useRegistration()
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchClaim());

    }, [registration]);


    const keysToColumn = () => {
        const list = ["id", "title", "date", "status"]

        let columns: ColumnsType<any> = list.map((element: any, index) => {
            if (element === "date")
                return {
                    title: t(element),
                    dataIndex: element,
                    key: index,
                    render: (date: Date) =>
                        dayjs(date).format("DD-MM-YYYY"),
                };
            else if (element === "status")
                return {
                    title: t(element),
                    dataIndex: element,
                    key: index,
                    render: (status: any) => (status ? <span style={{ color: "#28B609" }} >{t('open')}</span> : <span>{t('closed')}</span>),
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
                    <TicketIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("claim")}
                    </Title>
                </Col>

            </Row>

            <Table<Claim>
                columns={isLoadingClaimList ? skeletonColumns : claimList && keysToColumn()}
                dataSource={isLoadingClaimList ? Array(1).fill({ key: Math.random() }) : claimList}
                size="middle"
                className="custom-table"
                style={{ marginTop: 40, borderRadius: 0, paddingInline: 20 }}
                scroll={{ y: 55 * 5 }}
                rowKey={(record) => record.id || `row-${Math.random()}`}
                onRow={(record) => ({
                    onClick: () => router.push(`/portal/claim/${record.id}`),
                    style: { cursor: "pointer" },
                })}

            />

        </>
    )
}