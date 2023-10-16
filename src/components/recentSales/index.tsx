import React from "react";
import { Card, CardHeader, Chip } from "@mui/material";

import { DataGrid, GridColTypeDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";

import { IOrder, IOrderStatus } from "../../interfaces";

export function RecentSales() {
  const { dataGridProps } = useDataGrid<IOrder>({
    resource: "orders",
    initialPageSize: 5,
  });

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatDate = (value: string) => {
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  };

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
        width: 70,
      },
      {
        field: "user.fullName",
        headerName: "Ordered By",
        width: 200,
        renderCell: ({ row }) => <>{row["user"]["fullName"]}</>,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "singleSelect",
        width: 150,
        valueFormatter: ({ value }) => currencyFormatter.format(value),
      },
      {
        field: "user.gender",
        headerName: "Gender",
        width: 120,
        renderCell: ({ row }) => <>{row["user"]["gender"]}</>,
      },
      {
        field: "user.gsm",
        headerName: "Tel",
        width: 170,
        renderCell: ({ row }) => <>{row["user"]["gsm"]}</>,
      },
      {
        field: "status.text",
        headerName: "Status",
        width: 160,
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
        width: 350,
        headerAlign: "left",
        renderCell: ({ row }) => <>{row["adress"]["text"]}</>,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: ({ row }) => <>{formatDate(row["createdAt"])}</>,
      },
    ],
    []
  );

  return (
    <Card elevation={5}>
      <CardHeader title="Recent Sales" />
      <DataGrid
        {...dataGridProps}
        columns={columns as any}
        sx={{ pl: 3 }}
        autoHeight
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Card>
  );
}
