import React, { useState } from "react";
import KpiCard from "../../components/kpi card";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import { Box, Grid, Tab, Card, CardHeader } from "@mui/material";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AreaGraph, BarChart } from "../../components/charts";
import { RecentSales } from "../../components/recentSales";

import { IChart } from "../../interfaces";

// KPI card code
const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

const numberFormatter = Intl.NumberFormat("en");

export function Dashboard({}) {
  const API_URL = useApiUrl();

  const { data: revenue } = useCustom<IChart>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const { data: orders } = useCustom<IChart>({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { data: customers } = useCustom<IChart>({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });

  // Chart code
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <main>
      <Box mt={2} mb={5}>
        <Grid container columnGap={3} rowGap={3}>
          <Grid item xs>
            <KpiCard
              title="Weekly Revenue"
              color="blue-300"
              total={revenue?.data.total ?? 0}
              trend={revenue?.data.trend ?? 0}
              target={10000}
              formatTotal={(value) => `$${value}`}
            />
          </Grid>
          <Grid item xs>
            <KpiCard
              title="Weekly Orders"
              color="blue-300"
              total={orders?.data.total ?? 0}
              trend={orders?.data.trend ?? 0}
              target={150}
            />
          </Grid>
          <Grid item xs>
            <KpiCard
              title="New Customers"
              color="blue-300"
              total={customers?.data.total ?? 0}
              trend={customers?.data.trend ?? 0}
              target={300}
            />
          </Grid>
        </Grid>
      </Box>
      <Box my={5} sx={{ boxShadow: 5 }}>
        <Card>
          <CardHeader title="Sales Chart" />
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AreaGraph
                data={revenue?.data?.data ?? []}
                stroke="#8884d8"
                fill="#cfeafc"
              />
            </TabPanel>
            <TabPanel value="2">
              <BarChart data={orders?.data?.data ?? []} fill="#ffce90" />
            </TabPanel>
            <TabPanel value="3">
              <AreaGraph
                data={customers?.data?.data ?? []}
                stroke="#00bd56"
                fill="#ccf3f3"
              />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
      <Box my={5}>
        <Box>
          <RecentSales />
        </Box>
      </Box>
    </main>
  );
}