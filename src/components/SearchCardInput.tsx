import { Card } from "@/types/card";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function SearchCardInput() {
  const [filter, setFilter] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutate, data } = useMutation<Card[]>({
    mutationFn: async () => {
      const response = await axios.get<Card[]>(
        `/api/searchCards?filter=${filter}`
      );
      return response.data.map((card) => {
        return {
          ...card,
          value: card.id,
        };
      });
    },
  });
  return <div>SEARCH INPUT NOT IMPLEMENTED YET</div>;
}
