import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import './App.css';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "./components/ui/chart";
import { useOrders } from "./hooks/useOrders";
import { Button } from "./components/ui/button";

function generateSampleData(days) {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * (300 - 100 + 1)) + 100,
    });
  }
  return data;
}

const allChartData = {
  "7d": generateSampleData(7),
  "30d": generateSampleData(30),
  "90d": generateSampleData(90),
};

function Dashboard() {
  const { orders, loading } = useOrders();
  const [timeRange, setTimeRange] = useState("7d");

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;

  const chartData = useMemo(() => allChartData[timeRange], [timeRange]);

  const chartConfig = {
    visitors: {
      label: "Visitors",
      color: "#8884d8",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Total revenue from all orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Total number of orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <CardDescription>+19% from last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">+12,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Now</CardTitle>
            <CardDescription>+201 since last hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">+573</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>A chart showing the total number of visitors.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={timeRange === '7d' ? 'default' : 'outline'} onClick={() => setTimeRange('7d')}>7 Days</Button>
            <Button size="sm" variant={timeRange === '30d' ? 'default' : 'outline'} onClick={() => setTimeRange('30d')}>30 Days</Button>
            <Button size="sm" variant={timeRange === '90d' ? 'default' : 'outline'} onClick={() => setTimeRange('90d')}>3 Months</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SignedIn>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </BrowserRouter>
  );
}

export default App;
