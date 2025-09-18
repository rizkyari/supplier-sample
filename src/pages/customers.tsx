import Wip from '@/components/Wip'


export default function CustomersPage() {
  return <Wip title="Customer List" subtitle="On progress." />;
}

(CustomersPage as any).layoutProps = { title: "Customer List" };
