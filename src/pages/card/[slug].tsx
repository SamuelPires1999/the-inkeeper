import { Card } from "@/types/card";
import { Box, Flex, Grid, Loader, Text, Title } from "@mantine/core";
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
    return <Loader />;
  }

  return (
    <Grid grow>
      <Grid.Col span={4}>
        <Flex justify={"center"}>
          <Image
            src={results.data?.image || ""}
            alt={`Image for ${results.data?.name}`}
            width={350}
            height={400}
          />
        </Flex>
      </Grid.Col>
      <Grid.Col span={8}>
        <Flex direction={"column"} gap={16} w={"100%"}>
          <Title order={1}>{results.data?.name}</Title>
          <Text>{results.data?.flavorText}</Text>
          <Flex wrap={"wrap"} gap={16}>
            <Text>Mana cost: {results.data?.manaCost}</Text>
          </Flex>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
