import React, { useMemo, useState } from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
    DashboardOutlined,
    ApartmentOutlined,
    FunnelPlotOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

type Item = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: Item[]): Item {
    return {
    key,
    icon,
    children,
    label,
    } as Item;
}


const items: Item[] = [
    getItem(<Link href="/">Dashboard</Link>, "/", <DashboardOutlined />),
    getItem("Supplier Management", "supplier-mgmt", <ApartmentOutlined />, [
        getItem(<Link href="/suppliers">Dashboard</Link>, "/suppliers"),
        getItem(<Link href="/suppliers/list">Supplier List</Link>, "/suppliers/list"),
        getItem(<Link href="/suppliers/review">Review & Approvals</Link>, "/suppliers/review"),
        getItem(<Link href="/suppliers/configuration">Configurations</Link>, "/suppliers/configuration"),
    ]),
    getItem(<Link href="/funnel">Funnel Management</Link>, "/funnel", <FunnelPlotOutlined />),
    getItem(<Link href="/customers">Customer List</Link>, "/customers", <TeamOutlined />),
];

export default function AppLayout({ children, title, actions }: { children: React.ReactNode, title?: string, actions?: React.ReactNode, }) {
const router = useRouter();
const [collapsed, setCollapsed] = useState(false);
const { token } = theme.useToken();

const selectedKeys = useMemo(() => [router.pathname], [router.pathname]);
const defaultOpenKeys = useMemo(() => {
    if (router.pathname.startsWith("/suppliers") || router.pathname.startsWith("/review-approvals")) {
        return ["supplier-mgmt"];
    }
    return [] as string[];
}, [router.pathname]);


return (
    <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="lg">
            <div className="logo-slot">{collapsed ? "AL" : "ALISA"}</div>
            <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} defaultOpenKeys={defaultOpenKeys} items={items} />
        </Sider>
        <Layout>
            <Header className="topbar" style={{ background: token.colorBgContainer }}>
                <div className="title">{title ?? "Dashboard"}</div>
                <div>{actions}</div>
            </Header>
            <Content className="content p-4" style={{ background: token.colorBgContainer }}>
                {children}
            </Content>
        </Layout>
    </Layout>
);
}