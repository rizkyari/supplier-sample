import { useMemo, useState } from "react";
import SupplierHeader, {
  SupplierStatus,
  ViewMode,
} from "@/components/SupplierHeader";
import { Table, Tag, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import NewSupplierModal from "@/components/modals/NewSupplierModal";

interface Supplier {
  key: string;
  name: string;
  code: string;
  address: string;
  contact: string;
  status: "Active" | "In Progress" | "Blocked";
}

const allData: Supplier[] = [
  { key: "1", name: "PT Setroom Indonesia", code: "STRM 61000012", address: "Jakarta, Indonesia", contact: "Albert Einstein", status: "Active" },
  { key: "2", name: "PT Suka Suka",        code: "SKSK 41000013", address: "Bandung, Indonesia", contact: "James Lee",     status: "In Progress" },
  { key: "3", name: "PT Angin Ribut",       code: "ARIB 41000014", address: "Denpasar, Indonesia", contact: "Maria Chen",   status: "Blocked" },
];

function SupplierListPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<SupplierStatus>("All");
  const [view, setView] = useState<ViewMode>("table");
  const [openNew, setOpenNew] = useState(false);

  const data = useMemo(() => {
    let tmp = allData;
    if (status !== "All") tmp = tmp.filter((d) => d.status === status);
    if (q.trim()) {
      const s = q.toLowerCase();
      tmp = tmp.filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          d.code.toLowerCase().includes(s) ||
          d.address.toLowerCase().includes(s) ||
          d.contact.toLowerCase().includes(s)
      );
    }
    return tmp;
  }, [q, status]);

  const columns = useMemo<ColumnsType<Supplier>>(
    () => [
      { title: "Name", dataIndex: "name", key: "name", render: (t, r) => <Link href={`/suppliers/${r.key}`}>{t}</Link> },
      { title: "Code", dataIndex: "code", key: "code" },
      { title: "Address", dataIndex: "address", key: "address" },
      { title: "Contact", dataIndex: "contact", key: "contact" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (v) => {
          const color = v === "Active" ? "green" : v === "In Progress" ? "gold" : "red";
          return <Tag color={color}>{v}</Tag>;
        },
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
        <Button icon={<PlusOutlined />} onClick={() => setOpenNew(true)}>
            New Supplier
        </Button>
        <SupplierHeader
        kpi={{ totalSupplier: 1869, newSupplier: 27, avgCostMn: 320.3, blockedSupplier: 31 }}
        status={status}
        view={view}
        searchText={q}
        onSearch={setQ}
        onChangeStatus={setStatus}
        onChangeView={setView}
        onExport={() => console.log("export…")}
        />

        {view === "table" && (
            <Table rowKey="key" columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ x: 720 }}/>
        )}
        {view === "grid" && <div>TODO: Grid view card layout</div>}
        <NewSupplierModal
        open={openNew}
        onCancel={() => setOpenNew(false)}
        onSubmit={(values) => {
        console.log("create supplier:", values);
        message.success("Supplier created (mock)");
        setOpenNew(false);
        }}
        />
    </div>
  );
}

SupplierListPage.layoutProps = {
  title: "Supplier List",
};

export default SupplierListPage;