import { date } from "drizzle-orm/pg-core";
import checkDate from "./check-date";
import betweenWeeks from "./between-date";

export const monthlyChart = (chartItems: { date: Date; revenue: number }[]) => {
  return [
    {
      date: "3 weeks ago",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 28, 21))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "2 weeks ago",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 21, 14))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "1 week ago",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 14, 7))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
    {
      date: "This week",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 7, 0))
        .reduce((acc, order) => acc + order.revenue, 0),
    },
  ];
};
