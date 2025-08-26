import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b shrink-0 bg-card">
      <h1 className="text-xl font-bold text-primary font-headline">
        Guardian Mobile
      </h1>
      <Badge variant="outline" className="flex items-center gap-2 border-green-500/50 text-green-600 dark:text-green-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Connected
      </Badge>
    </header>
  );
}
