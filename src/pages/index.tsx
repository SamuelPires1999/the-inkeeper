import { HSClient } from "@/lib/hearthstone-api/clients";
import { getToken } from "@/lib/hearthstone-api/getToken";
import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const results = useQuery({
    queryKey: ["getCards"],
    queryFn: async () => {
      const response = await axios.get("/api/auth/getToken");

      const testData = await axios.get("/api/getCards");
      console.log(testData);

      const data = await axios.get("/api/getCards");

      return data.data;
    },
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (results.isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <pre>{JSON.stringify(results.data, null, 2)}</pre>
    </div>
  );
}
