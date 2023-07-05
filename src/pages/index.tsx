import CardInfo from "@/components/CardInfo";
import SearchCardInput from "@/components/SearchCardInput";
import { Card } from "@/types/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);

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
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <Flex w={"100%"}>
        <SearchCardInput />
      </Flex> */}
      {/* <Flex w={"100%"} justify={"center"} gap={100} my={"lg"}>
        <Button
          onClick={() => {
            setPage((prev) => {
              if (prev == 1) return 1;
              return prev - 1;
            });
          }}
          disabled={page == 1}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
          loading={results.isFetching}
        >
          Next Page
        </Button>
      </Flex>
      <Flex direction={"column"} gap={10}>
        {results.data?.map((card) => (
          <CardInfo key={card.id} card={card} />
        ))}
      </Flex> */}
      <div className=" flex flex-col w-full gap-3">
        {results.data?.map((card) => (
          <CardInfo key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}
