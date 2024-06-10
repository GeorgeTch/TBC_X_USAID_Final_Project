import Socials from "@/components/auth/Socials";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackBtn from "@/components/auth/BackBtn";

interface CardWrapperProps {
  children: React.ReactNode;
  cardTitle: string;
  backBtnHref: string;
  backBtnLabel: string;
  showSocials?: boolean;
}

export default function AuthCard({
  children,
  cardTitle,
  backBtnHref,
  backBtnLabel,
  showSocials,
}: CardWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn href={backBtnHref} label={backBtnLabel} />
      </CardFooter>
    </Card>
  );
}
