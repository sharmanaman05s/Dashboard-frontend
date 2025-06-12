import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "../components/ui/chart";

const fakeOrders = [
  {
    _id: "1",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    customer: "John Doe",
    total: 125.50,
    status: "Delivered",
    items: [
      { name: "Wireless Mouse", quantity: 1, price: 25.50 },
      { name: "USB-C Hub", quantity: 2, price: 50.00 },
    ],
  },
  {
    _id: "2",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    customer: "Jane Smith",
    total: 1575.5,
    status: "Shipped",
    items: [
      { name: "Laptop Pro", quantity: 1, price: 1500.00 },
      { name: "Laptop Stand", quantity: 1, price: 50.00 },
      { name: "Wireless Mouse", quantity: 1, price: 25.50 },
    ],
  },
    {
    _id: "3",
    date: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
    customer: "Peter Jones",
    total: 80.00,
    status: "Delivered",
    items: [
      { name: "Mechanical Keyboard", quantity: 1, price: 80.00 },
    ],
  },
  {
    _id: "4",
    date: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(),
    customer: "Mary Poppins",
    total: 1525.50,
    status: "Delivered",
    items: [
        { name: "Laptop Pro", quantity: 1, price: 1500.00 },
        { name: "Wireless Mouse", quantity: 1, price: 25.50 },
    ],
  },
  {
    _id: "5",
    date: new Date(new Date().setDate(new Date().getDate() - 80)).toISOString(),
    customer: "Gregory House",
    total: 130.00,
    status: "Delivered",
    items: [
        { name: "Mechanical Keyboard", quantity: 1, price: 80.00 },
        { name: "Laptop Stand", quantity: 1, price: 50.00 },
    ],
  },
];

function processRevenueData(orders, days) {
  const data = [];
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const filteredOrders = orders.filter(order => new Date(order.date) >= pastDate);

  const revenueByDay = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.date).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {});

  for (let i = 0; i < days; i++) {
    const date = new Date(pastDate);
    date.setDate(pastDate.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    data.push({
      date: dateString,
      revenue: revenueByDay[dateString] || 0,
    });
  }

  return data;
}

function processTopProductsData(orders) {
  const productCounts = orders.reduce((acc, order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
      });
    }
    return acc;
  }, {});

  return Object.entries(productCounts)
    .map(([name, sales]) => ({ name, sales }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5); // Top 5 products
}

function Analytics() {
  const [revenueTimeRange, setRevenueTimeRange] = useState(30); // 7, 30, 90 days

  const orders = fakeOrders;
  const loading = false;

  const revenueData = useMemo(() => processRevenueData(orders, revenueTimeRange), [orders, revenueTimeRange]);
  const topProductsData = useMemo(() => processTopProductsData(orders), [orders]);

  const revenueChartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8884d8",
    },
  };

  const topProductsChartConfig = {
    sales: {
      label: "Sales",
      color: "#82ca9d",
    },
  };

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stat Cards can be made dynamic later */}
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Orders</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Revenue over the selected period.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant={revenueTimeRange === 7 ? 'default' : 'outline'} onClick={() => setRevenueTimeRange(7)}>7 Days</Button>
              <Button size="sm" variant={revenueTimeRange === 30 ? 'default' : 'outline'} onClick={() => setRevenueTimeRange(30)}>30 Days</Button>
              <Button size="sm" variant={revenueTimeRange === 90 ? 'default' : 'outline'} onClick={() => setRevenueTimeRange(90)}>3 Months</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig}>
              <LineChart data={revenueData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="revenue" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={topProductsChartConfig}>
              <BarChart data={topProductsData} layout="vertical" margin={{ left: 12 }}>
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80} />
                <XAxis type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics; 