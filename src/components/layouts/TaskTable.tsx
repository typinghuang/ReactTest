import { useEffect, useMemo, useRef } from "react";
import { MRT_ColumnDef } from "material-react-table";
import Table, { DataTableHandle } from "../UI/Table";
import Box from "@mui/material/Box/Box";
import { tasks } from "../../dummyData";

type Task = {
  id: number;
  title: string;
  duration: number;
  name: string;
};

type TaskArr = Task & {
  index: number;
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
      let obj: { [x: number]: boolean } = {};
      const taskArr: TaskArr[] = [];
      tasks.forEach((item, index) => {
        if (item.name === name) {
          taskArr.push({ ...item, index });
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
    <Box
      sx={{
        border: "1px solid #cccccc",
        background: "white",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box py={3} fontWeight="bolder" color="#838383">
        Tasks
      </Box>
      <Table columns={columns} data={tasks} customSelectRows mRef={tableRef} />
    </Box>
  );
}

export default TaskTable;
