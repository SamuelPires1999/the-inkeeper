import CardInfo from "@/components/CardInfo";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Card } from "@/types/card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMutation<Card[]>({
    mutationFn: async () => {
      const response = await axios.get<Card[]>(
        `/api/searchCards?filter=${searchTerm}`
      );
      return response.data;
    },
  });

  const cardList = useQuery<Card[]>({
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

  if (cardList.isLoading) {
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
            searchResults.mutate();
          }}
        >
          Search cards
        </Button>
      </div>
      {searchResults.data ? (
        <div className="flex w-full flex-col gap-2 my-4">
          {searchResults.data.map((card) => (
            <Link
              href={`/card/${card.slug}`}
              key={card.id}
              className="border border-foreground cursor-pointer p-4 rounded-md"
            >
              <HoverCard>
                <HoverCardTrigger>{card.name}</HoverCardTrigger>
                <HoverCardContent className="w-64 h-64 relative">
                  <Image src={card.image} alt={`Image for ${card.name}`} fill />
                </HoverCardContent>
              </HoverCard>
            </Link>
          ))}
        </div>
      ) : null}
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
          {cardList.isFetching ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Next"
          )}
        </Button>
      </div>
      {cardList.data?.map((card) => (
        <CardInfo key={card.id} card={card} />
      ))}
    </div>
  );
}
