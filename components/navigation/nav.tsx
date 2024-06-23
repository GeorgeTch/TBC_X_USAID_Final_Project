import { auth } from "@/server/auth";
import UserBtn from "./user-button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./logo";
import CartDrawer from "../cart/cart-drawer";

export default async function Nav() {
  const session = await auth();
  const expires = session?.expires ?? new Date().toISOString();
  return (
    <header className="py-4 px-12 rounded-b-full fixed top-0 left-0 w-full z-10 bg-primary-foreground opacity-90">
      <nav>
        <ul className="flex justify-between items-center gap-4 md:gap-8">
          <li className="flex-1">
            <Link
              className="cursor-default"
              href={"/"}
              aria-label="company logo"
            >
              <Logo />
            </Link>
          </li>
          <li className="flex items-center relative  hover:scale-110 transition-all duration-700 ease-in-out">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center hover:scale-105 transition-all duration-700 ease-in-out">
              <Button asChild>
                <Link className="flex gap-2 " href="/auth/login">
                  <LogIn size={16}></LogIn>
                  <span>Log In</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center hover:scale-110 transition-all duration-500 ease-in-out">
              <UserBtn expires={expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
