import { date } from "drizzle-orm/pg-core";
import checkDate from "./check-date";

export const weeklyChart = (chartItems: { date: Date; revenue: number }[]) => {
  return [
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 6))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "5 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 5))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "4 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 4))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "3 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 3))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "2 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 2))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "1 day ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 1))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "today",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 0))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
  ];
};
