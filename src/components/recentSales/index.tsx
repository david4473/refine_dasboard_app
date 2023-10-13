import React from "react";
import { Card, CardHeader, Chip } from "@mui/material";

import { DataGrid, GridColTypeDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";

import { IOrder, IOrderStatus } from "../../interfaces";

export function RecentSales() {
  const { dataGridProps } = useDataGrid<IOrder>({
    resource: "orders",
  });

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getColor = (status: IOrderStatus["text"]) => {
    switch (status) {
      case "Cancelled":
        return "error";

      case "Ready":
        return "success";

      case "On The Way":
        return "info";

      case "Pending":
        return "warning";

      case "Delivered":
        return "secondary";

      default:
        return "primary";
    }
  };

  const columns = React.useMemo<GridColTypeDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 20,
        flex: 0.5,
      },
      {
        field: "user.fullName",
        headerName: "Ordered By",
        flex: 1,
        renderCell: ({ row }) => <>{row["user"]["fullName"]}</>,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "singleSelect",
        flex: 0.9,
        valueFormatter: ({ value }) => currencyFormatter.format(value),
      },
      {
        field: "user.gender",
        headerName: "Gender",
        flex: 0.6,
        renderCell: ({ row }) => <>{row["user"]["gender"]}</>,
      },
      {
        field: "user.gsm",
        headerName: "Tel",
        flex: 1,
        renderCell: ({ row }) => <>{row["user"]["gsm"]}</>,
      },
      {
        field: "status.text",
        headerName: "Status",
        flex: 0.7,
        type: "singleSelect",
        valueOptions: [
          "Cancelled",
          "Ready",
          "On The Way",
          "Pending",
          "Delivered",
        ],
        renderCell: ({ row }) => (
          <Chip
            label={row["status"]["text"]}
            color={getColor(row["status"]["text"])}
          />
        ),
      },
      {
        field: "adress.text",
        headerName: "Address",
        flex: 1.7,
        headerAlign: "left",
        renderCell: ({ row }) => <>{row["adress"]["text"]}</>,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 1.2,
      },
    ],
    []
  );

  return (
    <Card sx={{ width: "100%" }} elevation={5}>
      <CardHeader title="Recent Sales" />
      <DataGrid
        {...dataGridProps}
        columns={columns as any}
        autoHeight
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Card>
  );
}
