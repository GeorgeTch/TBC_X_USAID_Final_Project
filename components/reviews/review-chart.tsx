"use client";

import { ReviewsWithUser } from "@/lib/infer-type";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Stars from "./stars";
import { getReviewAverage } from "@/lib/review-average";
import { useMemo } from "react";
import { Divide } from "lucide-react";
import { Progress } from "../ui/progress";

export default function ReviewChart({
  reviews,
}: {
  reviews: ReviewsWithUser[];
}) {
  const getRatingByStars = useMemo(() => {
    const ratingValues = Array.from({ length: 5 }, () => 0);
    const totalReviews = reviews.length;
    reviews.forEach((review) => {
      const starIndex = review.rating - 1;
      if (starIndex >= 0 && starIndex < 5) {
        ratingValues[starIndex]++;
      }
    });
    console.log(ratingValues, totalReviews);
    return ratingValues.map((rating) => (rating / totalReviews) * 100);
  }, [reviews]);

  const totalRating = getReviewAverage(reviews.map((r) => r.rating));
  return (
    <Card className="flex flex-col rounded-md p-8 gap-4">
      <div className="flex flex-col gap-2">
        <CardTitle>Product Rating:</CardTitle>
        <Stars size={18} totalReviews={reviews.length} rating={totalRating} />
        <CardDescription className="text-lg font-medium">
          {totalRating.toFixed(1)} stars
        </CardDescription>
      </div>
      {getRatingByStars.map((rating, index) => (
        <div key={index} className="flex gap-2 justify-between items-center">
          <p className="flex text-xs gap-1 font-medium">
            {index + 1} <span>stars</span>
          </p>
          <Progress value={rating} />
        </div>
      ))}
    </Card>
  );
}
