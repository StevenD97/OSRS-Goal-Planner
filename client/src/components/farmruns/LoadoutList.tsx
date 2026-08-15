import type { LoadoutItem } from "../../types/farming";
import { Badge } from "../common/Badge";

export function LoadoutList({ items }: { items: LoadoutItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.item} className="flex items-start gap-2 text-sm">
          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
          <div>
            <span className="font-medium text-ink">{item.item}</span>
            {item.optional && (
              <span className="ml-2">
                <Badge tone="neutral">optional</Badge>
              </span>
            )}
            {item.note && <p className="text-muted">{item.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
