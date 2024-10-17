import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Person } from "@/lib/backend-service";
import { DataForm } from "@/app/workshop/data-form";

async function getData(): Promise<Person[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Paulo",
      weight: 65,
      height: 1.75,
      imcIndex: 2,
      imcClassification: "GORDO",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const peopleState = useState<Array<Person>>([])
  //
  // useEffect(() => {})

  return (
    <div className="container mx-auto py-10">
      <DataForm />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
