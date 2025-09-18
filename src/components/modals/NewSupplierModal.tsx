import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Input,
    Tabs,
    Button,
    Space,
    Upload,
    message,
    Row,
    Col,
    Image
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile } from "rc-upload/lib/interface";
// import Image from "next/image";

export interface NewSupplierValues {
    supplierName: string;
    nickName?: string;
    logoBase64?: string;
    addresses: { label: string; address: string }[];
}

export default function NewSupplierModal({
    open,
    loading,
    initialValues,
    onCancel,
    onSubmit,
}: {
    open: boolean;
    loading?: boolean;
    initialValues?: Partial<NewSupplierValues>;
    onCancel: () => void;
    onSubmit: (values: NewSupplierValues) => void;
}) {
    const [form] = Form.useForm<NewSupplierValues>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [uploadLoading, setUploadLoading] = useState(false);

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) message.error("Only JPG/PNG allowed.");
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) message.error("Image must be smaller than 2MB.");
        return isJpgOrPng && isLt2M;
    };

    const customRequest: UploadProps["customRequest"] = async (options) => {
        const { file, onSuccess, onError } = options;
        try {
            setUploadLoading(true);
            const url = await getBase64(file as RcFile);
            setImageUrl(url);
            form.setFieldsValue({ logoBase64: url });
            setUploadLoading(false);
            onSuccess?.("ok");
        } catch (e: unknown) {
            setUploadLoading(false);
            const err = e instanceof Error ? e : new Error(String(e));
            onError?.(err);
        }
    };

    const uploadButton = (
        <button type="button">
            {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div>Upload</div>
        </button>
    );

    useEffect(() => {
        if (open) {
            const base: NewSupplierValues = {
            supplierName: "",
            nickName: "",
            logoBase64: undefined,
            addresses: [{ label: "Head Office", address: "" }],
        };
        const v = { ...base, ...initialValues };
        form.setFieldsValue(v);
        setImageUrl(v.logoBase64);
        } else {
            form.resetFields();
            setImageUrl(undefined);
            setUploadLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const footer = (
        <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" loading={!!loading} onClick={() => form.submit()}>
                Save
            </Button>
        </Space>
    );

    return (
        <Modal
        open={open}
        onCancel={onCancel}
        title="New Supplier"
        footer={footer}
        destroyOnHidden
        >
        <Row>
            <Col span={8}>
                <div >
                    <Upload
                      name="logo"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      customRequest={customRequest}
                    >
                        {imageUrl ? (
                            <Image
                            src={imageUrl}
                            alt="logo"
                            draggable={false}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </div>
            </Col>

            <Col span={16}>
                <Form
                form={form}
                layout="vertical"
                onFinish={(vals) => onSubmit(vals)}
                preserve={false}
                >
                    <Form.Item name="logoBase64" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                    name="supplierName"
                    label="Supplier Name"
                    rules={[{ required: true, message: "Required" }]}
                    >
                        <Input placeholder="PT Setroom Indonesia" />
                    </Form.Item>

                    <Form.Item name="nickName" label="Nick Name">
                        <Input placeholder="Setroom" />
                    </Form.Item>
                </Form>
            </Col>
                
        </Row>
        <Tabs
        defaultActiveKey="basic"
        items={[
            {
                key: "address",
                label: "Address",
                children: (
                    <div>Address content</div>
                ),
            },
            { key: "contacts", label: "Contacts", children: <div>Contacts Content</div> },
            { key: "groups", label: "Groups", children: <div>Groups Content</div> },
            { key: "material", label: "Material List", children: <div>Material List Content</div> },
            { key: "others", label: "Others", children: <div>Others Content</div> },
        ]}
      />
    </Modal>
  );
}
