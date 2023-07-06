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
      console.log(response.data);
      return response.data;
    },
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 h-screen items-center">
      <div className="lg:col-span-6 flex justify-center h-fit">
        <Image
          src={results.data!.image}
          height={200}
          width={300}
          alt={`Image for ${results.data!.name}`}
        />
      </div>
      <div className="lg:col-span-6 flex flex-col gap-3 pt-6">
        <h1 className="text-4xl font-bold">{results.data?.name}</h1>
        <span className="font-light italic">{results.data?.flavorText}</span>
        <p className="text-xl my-5">{results.data?.text}</p>
        <div className="flex gap-3 items-center">
          <div className=" text-center rounded-md p-1 px-3 text-white bg-blue-500 min-w-[50px]">
            Mana cost: {results.data?.manaCost || "NONE"}
          </div>
          <div className="text-center rounded-md p-1 px-3 text-white bg-blue-500 min-w-[50px]">
            Rarity: {results.data?.rarityId}
          </div>
          <div className=" text-center rounded-md p-1 px-3 text-white bg-blue-500 min-w-[50px]">
            Type: {results.data?.typeId || "NONE"}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className=" text-center rounded-md p-1 px-3 text-white bg-blue-500 min-w-[50px]">
            Atack: {results.data?.attack || "NONE"}
          </div>
          <div className="text-center rounded-md p-1 px-3 text-white bg-blue-500 min-w-[50px]">
            Health: {results.data?.health || "NONE"}
          </div>
        </div>
      </div>
    </div>
  );
}
