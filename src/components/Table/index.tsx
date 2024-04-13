/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import MaterialReactTable from "material-react-table";

export type DataTableHandle = {
  setRowSelection: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
};

type Props = {
  data: any;
  columns: any[];
  customSelectRows?: boolean;
  mRef?: React.Ref<DataTableHandle> | null;
  onTableSelected?: (row: any, selected: boolean) => void;
};

const Table = ({
  mRef,
  data,
  columns,
  customSelectRows,
  onTableSelected,
}: Props): JSX.Element => {
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );
  console.log("rowSelection", rowSelection);
  useImperativeHandle(mRef, () => ({
    setRowSelection,
  }));

  return (
    <MaterialReactTable
      enableTopToolbar={false}
      enableColumnActions={false}
      columns={columns}
      data={data}
      muiTableBodyProps={{
        sx: ({ palette }) => ({
          "& tr": {
            backgroundColor: "white",
          },
        }),
      }}
      muiTableBodyRowProps={({ row }) => ({
        sx: ({ palette }) => ({
          "&:nth-of-type(odd)": {
            backgroundColor: rowSelection[row.id] ? "rgba(167, 211, 255, 0.2)" : "#EEEEEE",
          },
          // hide last border#EFF5FF
          "&:last-child td, &:last-child th": {
            border: 0,
          },
        }),
        onClick: (): void => {
          if (!customSelectRows) {
            setRowSelection((prev) => {
              if (onTableSelected) onTableSelected(row.original, !prev[row.id]);
              return { [row.id]: !prev[row.id] };
            });
          }
          // setRowSelection((prev) => ({ [row.id]: !prev[row.id] }));
        },
        selected: rowSelection[row.id],
      })}
      state={{ rowSelection }}
      // getRowId={(row): string => row.id}
    />
  );
};

Table.defaultProps = {
  customSelectRows: false,
  mRef: undefined,
  onTableSelected: undefined,
};

export default Table;
