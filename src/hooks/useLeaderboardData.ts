import { useEffect, useRef, useState } from "react";
import { RankedUserData, Sort } from "../lib/types";
import useFetchUserData from "./useFetchUserData";
import { calculateRate } from "../lib/utils";

const useLeaderboardData = () => {
  const [slicedData, setSlicedData] = useState<RankedUserData[]>([]);
  const [listViews, setListViews] = useState(10);
  const [page, setPage] = useState(1);
  const { originalData, isLoading } = useFetchUserData();
  const [sort, setSort] = useState<Sort>("scoreDown");
  const observeRef = useRef<HTMLDivElement | null>(null);

  const sortData = (data: RankedUserData[]) => {
    return [...data].sort((a, b) => {
      switch (sort) {
        case "scoreUp":
          return a.score - b.score;
        case "scoreDown":
          return b.score - a.score;
        case "winsUp":
          return a.wins - b.wins;
        case "winsDown":
          return b.wins - a.wins;
        case "lossesUp":
          return a.losses - b.losses;
        case "lossesDown":
          return b.losses - a.losses;
        case "rateUp":
          return (
            calculateRate(a.wins, a.losses) - calculateRate(b.wins, b.losses)
          );
        case "rateDown":
          return (
            calculateRate(b.wins, b.losses) - calculateRate(a.wins, a.losses)
          );
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    const sorted = sortData(originalData);
    setSlicedData(sorted.slice(0, page * listViews));
  }, [originalData, sort, page, listViews]);

  useEffect(() => {
    const currentRef = observeRef.current;
    if (originalData.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 0.6 }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) observer.disconnect();
      };
    }
  }, [observeRef, isLoading, originalData.length]);

  return { slicedData, setListViews, setSort, observeRef, isLoading };
};

export default useLeaderboardData;
