import { Card as CardType } from "@/types/card";

import { createStyles, Card, Avatar, Text, Group } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  cardName: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  cardText: {
    fontWeight: 400,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  subtitle: {
    fontWeight: 300,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
    fontStyle: "italic",
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export default function CardInfo({ card }: { card: CardType }) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={3} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image
          src={card.image}
          height={200}
          width={200}
          alt={`Display Image for ${card.name}`}
        />
        <div className={classes.body}>
          <Text
            transform="uppercase"
            className={classes.cardName}
            weight={700}
            size="lg"
          >
            {card.name}
          </Text>
          <Text className={classes.cardText} mt="xs" mb="md">
            {card.text}
          </Text>
          <Text className={classes.subtitle} color="dimmed" mt="xs" mb="md">
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
