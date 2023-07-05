import { Card as CardType } from "@/types/card";
import Image from "next/image";
import Link from "next/link";

export default function CardInfo({ card }: { card: CardType }) {
  return <div>{card.name}</div>;
}
