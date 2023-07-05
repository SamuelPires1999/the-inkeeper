import CardInfo from "@/components/CardInfo";
import SearchCardInput from "@/components/SearchCardInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/types/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const results = useQuery<Card[]>({
    queryKey: ["getCards", page],
    queryFn: async () => {
      await axios.get("/api/auth/getToken");

      const response = await axios.get(`/api/getCards`, {
        params: {
          page: page,
        },
      });

      return response.data;
    },
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    keepPreviousData: true,
  });

  if (results.isLoading) {
    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;
  }
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex w-full my-3 gap-3 justify-center">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Card Name"
          className="max-w-2xl"
        />
        <Button
          onClick={() => {
            console.log("The card you searched for -> " + searchTerm);
          }}
        >
          Search cards
        </Button>
      </div>
      <div className="flex w-full justify-between">
        <Button
          onClick={() => {
            setPage((prev) => {
              if (prev == 1) return 1;
              return prev - 1;
            });
          }}
          disabled={page == 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          {results.isFetching ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Next"
          )}
        </Button>
      </div>
      {results.data?.map((card) => (
        <CardInfo key={card.id} card={card} />
      ))}
    </div>
  );
}
