import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import Table from "./Table";
import Box from "@mui/material/Box";
import { employees, employeeType } from "../dummyData";

type Employee = {
  id: number;
  name: string;
  workType: string;
  startTime: string;
  endTime: string;
};

function EmployeeTable({
  onTableSelected,
}: {
  onTableSelected: (name: string | undefined) => void;
}) {
  const [nameSelected, setNameSelected] = useState<string | undefined>();

  onTableSelected(nameSelected);

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "workType",
        header: "Work Type",
        size: 150,
      },
      {
        accessorKey: "startTime", //normal accessorKey
        header: "Start Time",
        size: 200,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        size: 150,
      },
    ],
    []
  );

  const employeeTypeMap = new Map<
    number,
    { startTime: string; endTime: string; workType: string }
  >();
  employeeType.forEach((item, index) => {
    employeeTypeMap.set(index + 1, {
      startTime: item.work_begin,
      endTime: item.work_end,
      workType: item.name,
    });
  });
  const employeeData: Employee[] = [];

  employees.forEach((employee) => {
    const workType = employeeTypeMap.get(employee.type) || {
      startTime: "",
      endTime: "",
      workType: "",
    };
    employeeData.push({
      id: employee.id,
      name: employee.name,
      ...workType,
    });
  });

  return (
    <Box
      sx={{
        border: "1px solid #cccccc",
        background: "white",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box py={3} fontWeight="bolder" color="#838383">
        Employee
      </Box>
      <Table
        columns={columns}
        data={employeeData}
        onTableSelected={(row, select) => {
          if (select) {
            setNameSelected(row.name);
          } else {
            setNameSelected(undefined);
          }
        }}
      />
    </Box>
  );
}

export default EmployeeTable;
