import { useEffect, useState } from "react";
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

function App() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://gateway.pinata.cloud/ipfs/bafkreia2tigtk5kv5x6mptrscob7rwyvooyzte2j7luimkfssvm3m2zf54"
    );

    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return <></>;
}

export default App;
