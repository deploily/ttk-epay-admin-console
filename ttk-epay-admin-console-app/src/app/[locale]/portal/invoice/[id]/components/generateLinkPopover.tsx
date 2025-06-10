import React, { useEffect, useState } from 'react';
import { Button, Input, message, Popover, Space } from 'antd';
import {
    CopyIcon,
    EnvelopeSimpleIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
    LinkSimpleIcon,
    MessengerLogoIcon,
    ShareNetworkIcon,
    WhatsappLogoIcon
} from '@phosphor-icons/react';

import { useScopedI18n } from '../../../../../../../locales/client';
import { useAppDispatch } from '@/lib/hook';
import { generateLink } from '@/lib/features/invoice/invoiceThunks';
import { useInvoice } from '@/lib/features/invoice/invoiceSelector';

export default function GenerateLinkPopover({ orderId, clientCode }: { orderId: any, clientCode: any }) {
    const [open, setOpen] = useState(false);
    const [showSocials, setShowSocials] = useState(false);
    const t = useScopedI18n('invoice');
    const dispatch = useAppDispatch();
    const { generatedLink, generateLinkError } = useInvoice()

    useEffect(() => {
        dispatch(generateLink({ orderId: orderId, clientCode: clientCode }))

    }, [orderId, clientCode]);

    const handleOpenChange = async (newOpen: boolean) => {
        if (generatedLink) {

            setOpen(newOpen);
            if (!newOpen) setShowSocials(false);
}
    };

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        message.success("Copied to clipboard!");
    };

    const handleShareClick = () => {
        setShowSocials(!showSocials);
    };

    const popoverContent = () => (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input
                addonAfter={
                    <>
                        <Button
                            icon={<CopyIcon color='black' size={24} />}
                            type="text"
                            onClick={() => handleCopy(generatedLink || "")}
                        />
                        <Button
                            icon={<ShareNetworkIcon color='black' size={24} />}
                            type="text"
                            onClick={handleShareClick}
                        />
                    </>
                }
                size="large"
                value={generatedLink}
                disabled
            />

            {showSocials && (
                <Space wrap style={{ display: "flex", justifyContent: "end" }}>
                    <Button icon={<WhatsappLogoIcon color='black' size={24} />} />
                    <Button icon={<MessengerLogoIcon color='black' size={24} />} />
                    <Button icon={<LinkedinLogoIcon color='black' size={24} />} />
                    <Button icon={<InstagramLogoIcon color='black' size={24} />} />
                    <Button icon={<EnvelopeSimpleIcon color='black' size={24} />} />
                </Space>
            )}
        </Space>
    );

    return (
        <Space style={{ marginInline: 10 }}>
            <Popover
                content={popoverContent}
                open={open}
                trigger="click"
                onOpenChange={handleOpenChange}
                align={{ offset: [-10, 0] }}
            >
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
                    <LinkSimpleIcon size={20} style={{ color: "black", marginRight: 8 }} />
                    {t("generateLink")}
                </Button>
            </Popover>
        </Space>
    );
}
