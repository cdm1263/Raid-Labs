import { ArrowDown, ArrowUp } from "lucide-react";
import "./App.css";
import useLeaderboardData from "./hooks/useLeaderBoardData";
import { calculateRate } from "./lib/utils";

function App() {
  const { slicedData, setListViews, setSort, observeRef, isLoading } =
    useLeaderboardData();
  return (
    <section>
      <h1>Leaderboard</h1>
      <div>
        <p>표시할 리스트 수</p>
        <label>
          <input
            type="radio"
            name="listViews"
            value="10"
            onChange={(e) => setListViews(Number(e.target.value))}
          />
          10개
        </label>
        <label>
          <input
            type="radio"
            name="listViews"
            value="20"
            onChange={(e) => setListViews(Number(e.target.value))}
          />{" "}
          20개
        </label>
      </div>
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
        {isLoading && <p>loading...</p>}
      </div>
    </section>
  );
}

export default App;
