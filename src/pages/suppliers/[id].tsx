import { Tabs, Descriptions, Tag } from "antd";
import type { GetServerSideProps } from "next";


interface Props { id: string }


export default function SupplierDetail({ id }: Props) {
    return (
        <Tabs
        defaultActiveKey="overview"
        items={[
            {
                key: "overview",
                label: "Overview",
                children: (
                    <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="Supplier">PT Setroom Indonesia</Descriptions.Item>
                    <Descriptions.Item label="Supplier ID">{id}</Descriptions.Item>
                    <Descriptions.Item label="Status"><Tag color="green">Active</Tag></Descriptions.Item>
                    <Descriptions.Item label="Address">Fatmawati Raya St, 33 - Jakarta Selatan</Descriptions.Item>
                    </Descriptions>
                )
            },
            { key: "assesment", label: "Assesment", children: <div>Assesment table…</div> },
            { key: "material", label: "Material Catalog", children: <div>Material list…</div> },
            { key: "orders", label: "Orders", children: <div>Orders table…</div> },
            { key: "invoices", label: "Invoices", children: <div>Invoices table…</div> },
            { key: "projects", label: "Projects", children: <div>Project table…</div> },
            { key: "services", label: "Services", children: <div>Service table…</div> },
            { key: "history", label: "History", children: <div>History table…</div> },
        ]}
        />
    );
}


export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const id = String(ctx.params?.id ?? "1");
    return { props: { id } };
};