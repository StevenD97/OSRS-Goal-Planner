import type { LoadoutItem } from "../../types/farming";
import { Badge } from "../common/Badge";

export function LoadoutList({ items }: { items: LoadoutItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.item} className="flex items-start gap-2 text-sm">
          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
          <div>
            <span className="font-medium text-slate-200">{item.item}</span>
            {item.optional && (
              <span className="ml-2">
                <Badge tone="neutral">optional</Badge>
              </span>
            )}
            {item.note && <p className="text-slate-400">{item.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
