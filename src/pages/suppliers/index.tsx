import { Col, Tag, Row, Card, Statistic } from "antd";

function SupplierDashboard() {
    return (
        <div className="space-y-4">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}><Card><Statistic title="Total Supplier" value={1869} suffix="YoY" /></Card></Col>
                <Col xs={24} sm={12} md={6}><Card><Statistic title="New Supplier" value={27} suffix="YoY" /></Card></Col>
                <Col xs={24} sm={12} md={6}><Card><Statistic title="Avg Cost / Supplier" value={320.3} precision={1} prefix="Rp" suffix="Mn" /></Card></Col>
                <Col xs={24} sm={12} md={6}><Card><Statistic title="Blocked Supplier" value={31} suffix="YoY" /></Card></Col>
            </Row>
        </div>
    );
}

SupplierDashboard.layoutProps = {
  title: "Dashboard Supplier",
};

export default SupplierDashboard;