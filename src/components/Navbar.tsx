import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex w-full p-3 lg:mb-10">
        <span className="text-4xl font-bold italic grow">The inkeeper</span>
        <div className="lg:flex gap-3 hidden items-center">
          <Button variant={"outline"}>Explore decks</Button>
          <Button variant={"outline"}>My decks</Button>
          <Button variant={"outline"}>Deck builder</Button>
          {status === "unauthenticated" ? (
            <Button onClick={() => signIn("google")}>Login With Google</Button>
          ) : (
            <span>Logged as {session?.user?.name}</span>
          )}
        </div>
        <Button
          variant={"outline"}
          className="lg:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <HamburgerMenuIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {menuOpen && (
        <div className="flex flex-col gap-3 lg:hidden">
          <Button variant={"outline"}>Explore decks</Button>
          <Button variant={"outline"}>My decks</Button>
          <Button variant={"outline"}>Deck builder</Button>
        </div>
      )}
    </>
  );
}
