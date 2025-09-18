import React from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Segmented,
  Select,
  Space,
  Statistic,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  AppstoreOutlined,
  BarsOutlined,
  TeamOutlined,
  UserAddOutlined,
  FieldTimeOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export type ViewMode = "table" | "grid";
export type SupplierStatus = "Active" | "In Progress" | "Blocked" | "All";

interface Kpi {
  totalSupplier: number;
  newSupplier: number;
  avgCostMn: number;
  blockedSupplier: number;
}

interface SupplierHeaderProps {
  kpi: Kpi;
  status: SupplierStatus;
  view: ViewMode;
  searchText: string;
  onSearch: (q: string) => void;
  onChangeStatus: (s: SupplierStatus) => void;
  onChangeView: (v: ViewMode) => void;
  onExport: () => void;
  onCreate: () => void;
}

export default function SupplierHeader({
  kpi,
  status,
  view,
  searchText,
  onSearch,
  onChangeStatus,
  onChangeView,
  onExport,
  onCreate,
}: SupplierHeaderProps) {
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={6}>
          <Card size="small" variant="outlined">
            <div className="flex items-center justify-between">
              <Statistic
                title="Total Supplier"
                value={kpi.totalSupplier}
                valueStyle={{ fontSize: 24 }}
              />
              <TeamOutlined style={{ fontSize: 30, opacity: 0.6 }} />
            </div>
            <div className="text-green-600 mt-1">
              +8% vs Last Year
            </div>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card size="small" variant="outlined">
            <div className="flex items-center justify-between">
              <Statistic title="New Supplier" value={kpi.newSupplier} />
              <UserAddOutlined style={{ fontSize: 30, opacity: 0.6 }} />
            </div>
            <div className="text-green-600 mt-1">
              +1% vs Last Year
            </div>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card size="small" variant="outlined">
            <div className="flex items-center justify-between">
                <Statistic
                title="Avg Cost per Supplier"
                prefix="Rp"
                value={kpi.avgCostMn}
                precision={1}
                suffix=" Mn"
                />
                <FieldTimeOutlined style={{ fontSize: 30, opacity: 0.6 }} />
            </div>
            <div className="text-red-600 mt-1">
                -1% vs Last Year
            </div>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card size="small" variant="outlined">
            <div className="flex items-center justify-between">
              <Statistic title="Blocked Supplier" value={kpi.blockedSupplier} />
              <StopOutlined style={{ fontSize: 30, opacity: 0.6, }} />
            </div>
            <div className="text-red-600 mt-1">
                -4% vs Last Year
            </div>
          </Card>
        </Col>

      </Row>

      <Row gutter={[12, 12]} align="middle" wrap>
        <Col flex="auto">
          <Search
            placeholder="Search Supplier"
            allowClear
            enterButton
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            onSearch={onSearch}
          />
        </Col>

        <Col>
          <Select<SupplierStatus>
            value={status}
            style={{ width: 160 }}
            onChange={onChangeStatus}
            options={[
              { value: "All", label: "All" },
              { value: "Active", label: "Active" },
              { value: "In Progress", label: "In Progress" },
              { value: "Blocked", label: "Blocked" },
            ]}
          />
        </Col>

        <Col>
          <Tooltip title="Export">
            <Button icon={<DownloadOutlined />} onClick={onExport}>
              Export
            </Button>
          </Tooltip>
        </Col>

        <Col>
          <Segmented<ViewMode>
            value={view}
            onChange={(v) => onChangeView(v as ViewMode)}
            options={[
              { label: <AppstoreOutlined />, value: "grid" },
              { label: <BarsOutlined />, value: "table" },
            ]}
          />
        </Col>
      </Row>
    </Space>
  );
}
