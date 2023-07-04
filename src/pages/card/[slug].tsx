import { Card } from "@/types/card";
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  infoBox: {
    padding: `4px ${theme.spacing.lg}`,
    backgroundColor: theme.colors.blue[7],
    borderRadius: "5px",
  },
}));

export default function CardInfoPage() {
  const router = useRouter();
  const { classes } = useStyles();

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
    <Flex p={3} w={"100%"} align={"center"}>
      <Box w={"300px"} h={"400px"} pos={"relative"}>
        <Image
          src={results.data?.image || ""}
          alt={`Image for ${results.data?.name}`}
          fill
        />
      </Box>
      <Flex direction={"column"} gap={10}>
        <Title order={1}>{results.data?.name}</Title>
        <Text fs={"italic"} size={20}>
          {results.data?.flavorText}
        </Text>
        <Flex w={"100%"} justify={"start"} gap={10}>
          <Group className={classes.infoBox}>
            <Text weight={"bold"}>Manacost:</Text>
            <Text>{results.data?.manaCost}</Text>
          </Group>
          <Group className={classes.infoBox}>
            <Text weight={"bold"}>Atack:</Text>
            <Text>{results.data?.attack || 0}</Text>
          </Group>
          <Group className={classes.infoBox}>
            <Text weight={"bold"}>Health:</Text>
            <Text>{results.data?.health || 0}</Text>
          </Group>
          <Group className={classes.infoBox}>
            <Text weight={"bold"}>Type:</Text>
            <Text>{results.data?.typeId || 0}</Text>
          </Group>
        </Flex>
        <Flex mt={20} gap={10}>
          <Button>Add to favorites</Button>
          <Button>See decks</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
