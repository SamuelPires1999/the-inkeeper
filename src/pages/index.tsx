import { Card } from "@/types/card";
import { Button, Loader } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

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
    return <Loader />;
  }
  return (
    <>
      <div>
        {results.data?.map((card) => (
          <Image
            key={card.id}
            src={card.image}
            alt={`Image for ${card.name}`}
            width={200}
            height={200}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          setPage((prev) => {
            if (prev == 1) return 1;
            return prev - 1;
          });
          console.log(page);
        }}
      >
        Previous 10
      </Button>
      <Button
        onClick={() => {
          setPage((prev) => prev + 1);
          console.log(page);
        }}
      >
        Next 10
      </Button>
    </>
  );
}
