import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { Button } from "@/registry/8starlabs-ui/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/registry/8starlabs-ui/ui/skeleton";

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <Suspense fallback={<Skeleton className="h-4 w-2" />}>
          <StarsCount />
        </Suspense>
      </Link>
    </Button>
  );
}

export async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/8starlabs/ui", {
    next: { revalidate: 86400 } // Cache for 1 day (86400 seconds)
  });
  const json = await data.json();

  return (
    <span className="text-muted-foreground w-2 text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
}
