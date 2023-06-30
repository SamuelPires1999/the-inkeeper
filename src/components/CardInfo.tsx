import { Card as CardType } from "@/types/card";

import { createStyles, Card, Avatar, Text, Group } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export default function CardInfo({ card }: { card: CardType }) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image
          src={card.image}
          height={140}
          width={140}
          alt={`Display Image for ${card.name}`}
        />
        <div className={classes.body}>
          <Text transform="uppercase" weight={700} size="xs">
            {card.name}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {card.text}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {card.flavorText}
          </Text>
          {/* <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} src={author.avatar} />
              <Text size="xs">{author.name}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {date}
            </Text>
          </Group> */}
        </div>
      </Group>
    </Card>
  );
}
