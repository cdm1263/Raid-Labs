import { useEffect, useState } from "react";
import { RankedUserData, UserData } from "../lib/types";

const useFetchUserData = () => {
  const [originalData, setOriginalData] = useState<RankedUserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
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
    setOriginalData(rankedData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { originalData, isLoading };
};

export default useFetchUserData;
