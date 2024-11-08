import "./App.css";
import LeaderboardHeader from "./components/LeaderboardHeader";
import useLeaderboardData from "./hooks/useLeaderboardData";
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
          />
          20개
        </label>
      </div>
      <div className="table-wrapper">
        <LeaderboardHeader handleSort={setSort} />

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
