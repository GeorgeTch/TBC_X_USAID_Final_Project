import { auth } from "@/server/auth";
import UserBtn from "./UserBtn";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";

export default async function Nav() {
  const session = await auth();
  const expires = session?.expires ?? new Date().toISOString();
  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between">
          <li>LOGO</li>
          {!session ? (
            <li>
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={16}></LogIn>
                  <span>Log In</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserBtn expires={expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
