export interface UserData {
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

export interface RankedUserData extends UserData {
  rank: number;
}

export type Sort =
  | "scoreUp"
  | "scoreDown"
  | "winsUp"
  | "winsDown"
  | "lossesUp"
  | "lossesDown"
  | "rateUp"
  | "rateDown";
