import { RankedUserData } from "../lib/types";
import { calculateRate } from "../lib/utils";

interface LeaderboardRowProps {
  content: RankedUserData;
}

const LeaderboardRow = ({ content }: LeaderboardRowProps) => {
  return (
    <div className="grid-container grid-row">
      <div className="grid-item">{content.rank}</div>
      <div className="grid-item">{content.player.name}</div>
      <div className="grid-item">{content.player.guild?.name ?? "-"}</div>
      <div className="grid-item">{content.score}</div>
      <div className="grid-item">{content.wins}</div>
      <div className="grid-item">{content.losses}</div>
      <div className="grid-item">
        {calculateRate(content.wins, content.losses)}%
      </div>
    </div>
  );
};

export default LeaderboardRow;
