import { ExchangeIcon } from "./ExchangeIcon";
import { cn } from "@/lib/utils";

interface ExchangeSpinnerProps {
  size?: number;
  className?: string;
}

export function ExchangeSpinner({ size = 20, className }: ExchangeSpinnerProps) {
  return (
    <ExchangeIcon
      size={size}
      color="currentColor"
      strokeWidth={Math.max(1.6, size * 0.09)}
      className={cn("animate-spin", className)}
    />
  );
}
