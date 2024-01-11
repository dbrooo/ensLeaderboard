"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  type LeaderboardItem = {
    rank: string;
    eth_name: string;
    display: string;
    follower_count: string;
  };

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[] | null>(null);
  const [cursor, setCursor] = useState<number>(0);

  useEffect(() => {
    async function getData(cursor: number) {
      const localRoute = `https://api.farcasterkit.com/users/ensLeaderboard?cursor=${cursor}`;
      const data = await axios.get(localRoute);
      if (data) {
        const final = data.data.leaderboard as LeaderboardItem[];
        setLeaderboardData(final);
      }
    }
    getData(cursor);
  }, [cursor]);

  const handleNext = () => {
    setCursor((prevCursor) => prevCursor + 100);
  };

  const handlePrevious = () => {
    setCursor((prevCursor) => (prevCursor > 0 ? prevCursor - 100 : 0));
  };
  return (
    <div className="mt-10">
      <h1 className="text-center text-xl text-black font-semibold">
        <span style={{ color: 'rgb(125 152 242)' }}>.eth</span> Leaderboard for
        <span style={{ color: 'rgb(67 43 140)' }}> Farcaster</span>
      </h1>
      <h2 className="text-center">The most followed Farcaster accounts with .eth Farcaster names</h2>
      <div className="flex justify-center mt-4">
        <button onClick={handlePrevious} className="mr-2">Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="flex justify-center w-full overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">ENS Name</th>
              <th className="px-4 py-2 text-left">Display Name</th>
              <th className="px-4 py-2 text-left">Followers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {leaderboardData !== null && leaderboardData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-left">{item.rank}</td>
                <td className="px-4 py-2 text-left">{item.eth_name}</td>
                <td className="px-4 py-2 text-left">{item.display}</td>
                <td className="px-4 py-2 text-left">{Number(item.follower_count).toLocaleString()}</td>
          <tbody>
            {leaderboardData !== null && leaderboardData.map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
                <td>
                  <Link href={`https://app.ens.domains/${item.eth_name}`}>
                    {item.eth_name}
                  </Link>
                </td>
                <td>
                  <Link href={`https://warpcast.com/${item.eth_name}`}>
                    {item.display}
                  </Link>
                </td>
                <td>{Number(item.follower_count).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}