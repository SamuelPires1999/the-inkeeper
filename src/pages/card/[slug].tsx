import { Card } from "@/types/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CardInfoPage() {
  const router = useRouter();

  const results = useQuery<Card>({
    queryKey: ["getSingleCard"],
    queryFn: async () => {
      await axios.get("/api/auth/getToken");

      const response = await axios.get(`/api/cardInfo/${router.query.slug}`);

      return response.data;
    },
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Page for {results.data?.name}</div>;
}
