import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex w-full p-3 lg:mb-10">
        <Link className="text-4xl font-bold italic grow" href={"/"}>
          The inkeeper
        </Link>
        <div className="lg:flex gap-3 hidden items-center">
          <Link
            href={"/decks"}
            className={buttonVariants({ variant: "outline" })}
          >
            Explore decks
          </Link>
          {session && (
            <Link
              href={"/myDecks"}
              className={buttonVariants({ variant: "outline" })}
            >
              My Decks
            </Link>
          )}
          <Link
            href={"/deckBuilder"}
            className={buttonVariants({ variant: "outline" })}
          >
            Deck Builder
          </Link>
          {status === "unauthenticated" ? (
            <Button onClick={() => signIn("google")}>Login With Google</Button>
          ) : (
            <>
              <span>Logged as {session?.user?.name}</span>
              <Button onClick={() => signOut()}>Logout</Button>
            </>
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
          <Link
            href={"/decks"}
            className={buttonVariants({ variant: "outline" })}
          >
            Explore decks
          </Link>
          {session && (
            <Link
              href={"/myDecks"}
              className={buttonVariants({ variant: "outline" })}
            >
              My Decks
            </Link>
          )}
          <Link
            href={"/deckBuilder"}
            className={buttonVariants({ variant: "outline" })}
          >
            Deck Builder
          </Link>
          {status === "unauthenticated" ? (
            <Button onClick={() => signIn("google")}>Login With Google</Button>
          ) : (
            <>
              <span>Logged as {session?.user?.name}</span>
              <Button onClick={() => signOut()}>Logout</Button>
            </>
          )}
        </div>
      )}

      <Separator className="my-8" />
    </>
  );
}
