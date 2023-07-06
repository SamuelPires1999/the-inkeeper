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
    <div className="flex items-center flex-col lg:flex-row gap-3">
      <div className="w-40 h-40 relative">
        <Image src={card.image} alt={`Image for ${card.name}`} fill />
      </div>
      <Card className="w-full">
        <CardHeader>
          <Link href={`/card/${card.slug}`}>
            <CardTitle>{card.name}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent>{card.flavorText}</CardContent>
      </Card>
    </div>
  );
}
