"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import * as backendService from "@/lib/backend-service";
import { Person } from "@/lib/backend-service";
import { DataForm } from "@/app/workshop/data-form";
import { useEffect, useState } from "react";

export default function DemoPage() {
  const [peopleState, setPeopleState] = useState<Array<Person>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await backendService.listPeople();
      setPeopleState(response);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataForm setPeopleState={setPeopleState} />
      <DataTable columns={columns} data={peopleState} />
    </div>
  );
}
