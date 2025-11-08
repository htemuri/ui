import { Goldman } from "next/font/google";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import { Button } from "@/registry/8starlabs-ui/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/registry/8starlabs-ui/ui/badge";

const goldman = Goldman({
  weight: "400",
  subsets: ["latin"],
  display: "swap"
});

export default function Home() {
  return (
    <div className="max-w-10xl  px-6 sm:px-16  mx-auto flex flex-col min-h-svh py-8 gap-8">
      <div className="flex flex-col w-full items-center gap-2">
        <Badge variant="secondary" className="bg-transparent">
          <span
            className="flex size-2 rounded-full bg-blue-500"
            title="Coming soon"
          />
          Coming soon!
        </Badge>
        <p
          className={`ml-2.5 lg:ml-0 ${goldman.className} text-black dark:text-white text-5xl font-bold flex items-center`}
        >
          <Image
            src={"/images/8sl_logo_lite_light_transparent.png"}
            alt="StarLabs"
            width={40}
            height={40}
          />
          StarLabs UI
        </p>
        <p className="text-md max-w-3xl text-center">
          A set of beautifully designed components designed for developers who
          want niche, high-utility UI elements that you won&apos;t find in
          standard libraries.
        </p>
        {/* <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/docs/components">View Components</Link>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
