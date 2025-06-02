'use client'
import { useAppDispatch } from "@/lib/hook";
import { TicketIcon } from "@phosphor-icons/react";
import { Col, Form, Result, Row, Skeleton, Tag, Typography } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { useEffect } from "react";
import dayjs from "dayjs";
import { getClaimById } from "@/lib/features/claim/claimThanks";
import { useClaim } from "@/lib/features/claim/claimSelector";

const { Title, Text } = Typography;


export default function ClaimDetails({ claimId }: { claimId: string }) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('claim')
    const translate = useI18n()
    const [form] = Form.useForm();
    const { claim, claimError, isLoadingClaim } = useClaim()

    useEffect(() => {
        dispatch(getClaimById(claimId));
    }, []);


    return (
        <>
            <Row gutter={16} style={{ paddingTop: 10, paddingInline: 20 }}>
                <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                    <TicketIcon size={32} style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    <Title level={3} style={{ fontWeight: 700, color: 'rgba(0, 0, 0, 0.7)', marginBottom: 0, marginLeft: 2 }}>
                        {t("claim")}
                    </Title>
                </Col>

            </Row>
            <Row>

            </Row>
            {isLoadingClaim && !claim &&
                <Row gutter={[10, 10]} style={{ margin: 20 }}>
                    <Col span={2}><Skeleton active paragraph={{ rows: 0.5 }} /></Col>
                    <Col span={22}><Skeleton.Input active={true} /></Col>
                </Row>
            }

            {!isLoadingClaim && claim &&
                <>
                    
                <div style={{
                    paddingTop: 30, paddingInline: 20,
                    marginBottom: 16, gap: "10px", alignItems: 'center', flexDirection: "row",
                    display: "flex"
                }}>
                    <Title level={4} style={{ color: 'black', margin: 0, fontWeight:500 }}>
                        {claim.title}
                    </Title>
                  
                    
                        <Tag color= {claim.status? "success" : "default"} style={{fontSize:13, paddingInline:10}}>
                            {claim.status ? t('open'): t('closed')}
                            </Tag>
                </div>

                
                <div
                    style={{
                        marginTop: 10, marginInline: 20,
                        background: '#F2F2F2',
                        border:"1px solid rgba(0, 0, 0, 0.21)",
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 24,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                        <div style={{ flex: 1 }}>
                            <Text style={{ color: 'black' }}>
                                {claim.description}
                            </Text>
                        </div>
                    </div>
                </div>


                </>
            }

            {!isLoadingClaim && claimError &&
                <Result
                    status="500"
                    title={translate('error')}
                    subTitle={translate('subTitleError')}
                />
            }

        </>
    )
}