import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

import "./App.css";

interface UserData {
  score: number;
  wins: number;
  losses: number;
  player: {
    id: number;
    name: string;
    guild?: {
      name: string;
    };
  };
}

interface RankedUserData extends UserData {
  rank: number;
}

type Sort =
  | "scoreUp"
  | "scoreDown"
  | "winsUp"
  | "winsDown"
  | "lossesUp"
  | "lossesDown"
  | "rateUp"
  | "rateDown";

function App() {
  const [data, setData] = useState<RankedUserData[]>([]);
  const [slicedData, setSlicedData] = useState<RankedUserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [listViews, setListViews] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort>("scoreDown");
  const observeRef = useRef(null);

  const fetchUserData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://gateway.pinata.cloud/ipfs/bafkreia2tigtk5kv5x6mptrscob7rwyvooyzte2j7luimkfssvm3m2zf54"
    );

    const data: UserData[] = await response.json();
    const rankedData = data
      .sort((a, b) => b.score - a.score)
      .map((content, index) => ({
        ...content,
        rank: index + 1,
      }));
    setData(rankedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const calculateRate = (wins: number, losses: number) => {
    return Math.round((wins / (wins + losses)) * 1000) / 10;
  };

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
    const sorted = sortData(data);
    setSlicedData(sorted.slice(0, page * listViews));
  }, [data, sort, page, listViews]);

  useEffect(() => {
    const currentRef = observeRef.current;
    if (data.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
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
  }, [observeRef, loading, data.length]);

  return (
    <div className="table-wrapper">
      <div className="grid-container table-header">
        <div className="grid-header">Rank</div>
        <div className="grid-header">Player Name</div>
        <div className="grid-header">Guild</div>
        <div className="grid-header sort">
          <ArrowUp onClick={() => setSort("scoreUp")} />
          <div>Score</div>
          <ArrowDown onClick={() => setSort("scoreDown")} />
        </div>
        <div className="grid-header sort">
          <ArrowUp onClick={() => setSort("winsUp")} />
          <div>Wins</div>
          <ArrowDown onClick={() => setSort("winsDown")} />
        </div>
        <div className="grid-header sort">
          <ArrowUp onClick={() => setSort("lossesUp")} />
          <div>Losses</div>
          <ArrowDown onClick={() => setSort("lossesDown")} />
        </div>
        <div className="grid-header sort">
          <ArrowUp onClick={() => setSort("rateUp")} />
          <div>Win Rate</div>
          <ArrowDown onClick={() => setSort("rateDown")} />
        </div>
      </div>

      <div>
        {slicedData &&
          slicedData.map((content) => (
            <div className="grid-container grid-row" key={content.player.id}>
              <div className="grid-item">{content.rank}</div>
              <div className="grid-item">{content.player.name}</div>
              <div className="grid-item">
                {content.player.guild?.name ?? "-"}
              </div>
              <div className="grid-item">{content.score}</div>
              <div className="grid-item">{content.wins}</div>
              <div className="grid-item">{content.losses}</div>
              <div className="grid-item">
                {calculateRate(content.wins, content.losses)}%
              </div>
            </div>
          ))}
      </div>
      <div ref={observeRef} />
      {loading && <p>loading...</p>}
    </div>
  );
}

export default App;
