import { Card } from "@/types/card";
import { Autocomplete, Button, Flex } from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

export default function SearchCardInput() {
  const [filter, setFilter] = useDebouncedState("", 300);
  const ref = useRef<HTMLInputElement>(null);

  const { mutate, data } = useMutation<Card[]>({
    mutationFn: async () => {
      const response = await axios.get<Card[]>(
        `/api/searchCards?filter=${filter}`
      );
      console.log(response.data);
      return response.data;
    },
  });
  return (
    <Flex w={"100%"} align={"center"} gap={4}>
      <Autocomplete
        ref={ref}
        my={10}
        w={"100%"}
        placeholder="Search for a specific card"
        defaultValue={filter}
        onChange={(value) => setFilter(value)}
        data={data ? data.map((card) => card.name) : []}
      />
      <Button
        onClick={() => {
          mutate();
          ref.current?.focus();
        }}
      >
        Search Card
      </Button>
    </Flex>
  );
}
