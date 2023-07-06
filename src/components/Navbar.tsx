import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <div className="flex w-full p-3 lg:mb-10">
      <span className="text-4xl font-bold italic grow">The inkeeper</span>
      <div className="lg:flex gap-3 hidden">
        <Button variant={"outline"}>Explore decks</Button>
        <Button variant={"outline"}>My decks</Button>
        <Button variant={"outline"}>Deck builder</Button>
      </div>
      <Button variant={"outline"} className="lg:hidden block ">
        <HamburgerMenuIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
