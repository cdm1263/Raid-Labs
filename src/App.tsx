import { ChangeEvent } from "react";
import LeaderboardHeader from "./components/LeaderboardHeader";
import LeaderboardRow from "./components/LeaderboardRow";
import useLeaderboardData from "./hooks/useLeaderboardData";
import "./App.css";
import Loading from "./components/Loading";

function App() {
  const { slicedData, setListViews, setSort, observeRef, isLoading } =
    useLeaderboardData();

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setListViews(Number(event.target.value));
  };

  return (
    <section>
      <h1>Leaderboard</h1>
      <div>
        <p>표시할 리스트 수</p>
        <form className="list-views">
          <label>
            <input
              type="radio"
              name="listViews"
              value="10"
              onChange={handleSortChange}
            />
            10개
          </label>
          <label>
            <input
              type="radio"
              name="listViews"
              value="20"
              onChange={handleSortChange}
            />
            20개
          </label>
        </form>
      </div>
      <div className="table-wrapper">
        <LeaderboardHeader handleSort={setSort} />

        <div>
          {slicedData &&
            slicedData.map((content) => (
              <LeaderboardRow content={content} key={content.player.id} />
            ))}
        </div>
        <div ref={observeRef} />
        {isLoading && <Loading />}
      </div>
    </section>
  );
}

export default App;
