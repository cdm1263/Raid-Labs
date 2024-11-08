import { ArrowDown, ArrowUp } from "lucide-react";
import { Sort } from "../lib/types";

interface LeaderboardHeaderProps {
  handleSort: (sort: Sort) => void;
}

const LeaderboardHeader = ({ handleSort }: LeaderboardHeaderProps) => (
  <div className="grid-container table-header">
    <div className="grid-header">Rank</div>
    <div className="grid-header">Player Name</div>
    <div className="grid-header">Guild</div>
    <div className="grid-header sort">
      <ArrowUp onClick={() => handleSort("scoreUp")} />
      <div>Score</div>
      <ArrowDown onClick={() => handleSort("scoreDown")} />
    </div>
    <div className="grid-header sort">
      <ArrowUp onClick={() => handleSort("winsUp")} />
      <div>Wins</div>
      <ArrowDown onClick={() => handleSort("winsDown")} />
    </div>
    <div className="grid-header sort">
      <ArrowUp onClick={() => handleSort("lossesUp")} />
      <div>Losses</div>
      <ArrowDown onClick={() => handleSort("lossesDown")} />
    </div>
    <div className="grid-header sort">
      <ArrowUp onClick={() => handleSort("rateUp")} />
      <div>Win Rate</div>
      <ArrowDown onClick={() => handleSort("rateDown")} />
    </div>
  </div>
);

export default LeaderboardHeader;
