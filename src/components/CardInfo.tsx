import { Card as CardType } from "@/types/card";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function CardInfo({ card }: { card: CardType }) {
  return (
    <div className="flex items-center">
      <div className="w-40 h-40 relative">
        <Image src={card.image} alt={`Image for ${card.name}`} fill />
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{card.name}</CardTitle>
          <CardDescription>{card.flavorText}</CardDescription>
        </CardHeader>
        <CardContent>{card.text}</CardContent>
      </Card>
    </div>
  );
}
