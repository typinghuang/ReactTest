import { useEffect, useMemo, useRef } from "react";
import { MRT_ColumnDef } from "material-react-table";
import Table, { DataTableHandle } from "./Table";
import Box from "@mui/material/Box/Box";

const tasks = [
  { id: 1, title: "task01", duration: 60, name: "Alice" }, // min
  { id: 2, title: "task02", duration: 120, name: "Karen" },
  { id: 3, title: "task03", duration: 180, name: "Miles" },
  { id: 4, title: "task04", duration: 360, name: "Alice" },
  { id: 5, title: "task05", duration: 30, name: "Bob" },
  { id: 6, title: "task06", duration: 220, name: "Bob" },
  { id: 7, title: "task07", duration: 640 },
  { id: 8, title: "task08", duration: 250, name: "Karen" },
  { id: 9, title: "task09", duration: 119, name: "Miles" },
  { id: 10, title: "task10", duration: 560, name: "John" },
  // { id: 11, title: "task11", duration: 340 },
  // { id: 12, title: "task12", duration: 45 },
  // { id: 13, title: "task13", duration: 86 },
  // { id: 14, title: "task14", duration: 480 },
  // { id: 15, title: "task15", duration: 900 },
];

type Task = {
  id: number;
  title: string;
  duration: number;
};

function TaskTable({ name }: { name: string | undefined }) {
  const tableRef = useRef<DataTableHandle>(null);

  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "title", //access nested data with dot notation
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
    ],
    []
  );

  useEffect(() => {
    if (name) {
      // eslint-disable-next-line prefer-const
      let obj = {};
      const taskArr: (Task & { index: number })[] = [];
      tasks.forEach((item, index) => {
        if (item.name === name) {
          taskArr.push({ item, index });
        }
      });
      taskArr.forEach((task) => {
        obj[task.index] = true;
      });
      tableRef.current?.setRowSelection(obj);
    } else {
      tableRef.current?.setRowSelection({});
    }
  }, [name]);

  return (
    <Box sx={{ border: "1px solid #cccccc", background: "white", p: 2, borderRadius: 2 }}>
      <Box py={3} fontWeight="bolder" color="#838383">
        Tasks
      </Box>
      <Table columns={columns} data={tasks} customSelectRows mRef={tableRef} />
    </Box>
  );
}

export default TaskTable;
