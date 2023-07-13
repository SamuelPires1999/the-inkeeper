import { Button } from "@/components/ui/button";
import { useDeckStore } from "@/lib/stores/deckStore";
import { Card } from "@/types/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function DeckBuilderPage() {
  const [page, setPage] = useState(1);
  const deckStore = useDeckStore();

  const cardList = useQuery<Card[]>({
    queryKey: ["getCards", page],
    queryFn: async () => {
      await axios.get("/api/auth/getToken");

      const response = await axios.get(`/api/getCards`, {
        params: {
          page: page,
          ammount: 100,
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
    return (
      <div className="text-center w-full flex justify-center">
        <ReloadIcon className="mt-10 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 space-x-3">
      <div className="flex flex-col col-span-2">
        <div className="flex w-full justify-between">
          <Button
            variant={"outline"}
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
            variant={"outline"}
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
        <div className="flex flex-wrap">
          {cardList.data?.map((card) => (
            <div
              className="relative w-32 h-32"
              key={card.id}
              onClick={() => {
                deckStore.addCard(card);
              }}
            >
              <Image
                className="hover:scale-150 duration-150"
                src={card.image}
                alt={`Image for ${card.name}`}
                fill
              />
            </div>
          ))}
        </div>
        {cardList.data?.length == 0 && <span>No cards returned</span>}
      </div>
      <div className="col-span-1 flex flex-col">
        <h1 className="text-xl font-bold mt-2">New Deck</h1>
        <Separator className="my-2 w-full border border-primary" />
        {deckStore.deckList.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              deckStore.removeCard(card);
            }}
          >
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
}
