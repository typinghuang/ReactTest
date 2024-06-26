/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useImperativeHandle, useState } from "react";
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

  useImperativeHandle(mRef, () => ({
    setRowSelection,
  }));

  return (
    <MaterialReactTable
      enableTopToolbar={false}
      enableColumnActions={false}
      columns={columns}
      data={data}
      muiTableHeadCellProps={{
        sx: () => ({
          border: "1px solid transparent",
          borderRadius: 2,
        }),
      }}
      muiTablePaperProps={{
        elevation: 0,
        sx: () => ({
          border: "1px solid #cccccc",
          borderRadius: 2,
        }),
      }}
      muiTableBodyProps={{
        sx: () => ({
          "& tr": {
            backgroundColor: "white",
          },
        }),
      }}
      muiTableBodyRowProps={({ row }) => ({
        sx: () => ({
          "&:nth-of-type(odd)": {
            backgroundColor: rowSelection[row.id]
              ? "rgba(167, 211, 255, 0.2)"
              : "#EEEEEE",
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
      muiBottomToolbarProps={{
        sx: () => ({
          border: "1px solid transparent",
          borderRadius: 2,
        }),
      }}
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
