import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 p-10 rounded-md w-full z-10 bg-primary-foreground opacity-90">
      <div className="flex items-center justify-around">
        <Link
          target="_blank"
          href="https://termify.io/terms-and-conditions-generator?gad_source=1&gclid=CjwKCAiA0bWvBhBjEiwAtEsoWzs2jSqzrLqZpJmdtm---oXR8xYTOLYo0L-QaQeKJSFxdm-dFJmo8RoCY9cQAvD_BwE"
        >
          Terms and Conditions
        </Link>
        <Link target="_blank" href="https://fsymbols.com/copyright/">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
