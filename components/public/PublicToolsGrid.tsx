import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export type PublicCategory =
  | "power-tools"
  | "garden"
  | "kitchen"
  | "camping"
  | "cleaning"
  | "other";

export type PublicTool = {
  name: string;
  category: PublicCategory;
};

const categoryLabels: Record<PublicCategory, string> = {
  "power-tools": "Power tools",
  garden: "Garden",
  kitchen: "Kitchen",
  camping: "Camping",
  cleaning: "Cleaning",
  other: "Other",
};

type PublicToolsGridProps = {
  items: PublicTool[];
  loading?: boolean;
};

export default function PublicToolsGrid({
  items,
  loading = false,
}: PublicToolsGridProps) {
  return (
    <section aria-labelledby="available-tools-heading" className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="available-tools-heading" className="text-heading font-semibold">
            Available nearby
          </h2>
          <p className="mt-1 text-small text-muted-foreground">
            Tool name and category only. Sign in to see details.
          </p>
        </div>
      </div>

      {loading ? (
        <div
          aria-hidden="true"
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[0, 1, 2].map((index) => (
            <Card key={index} className="p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-surface-muted" />
              <div className="mt-3 h-6 w-24 animate-pulse rounded-full bg-surface-muted" />
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <p className="font-semibold text-foreground">No tools listed yet</p>
          <p className="mt-1 text-small text-muted-foreground">
            When neighbours add tools, their names and categories will appear here.
          </p>
        </Card>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((tool) => (
            <li key={`${tool.category}-${tool.name}`}>
              <Card className="h-full p-5">
                <h3 className="font-semibold text-foreground">{tool.name}</h3>
                <Badge className="mt-3">{categoryLabels[tool.category]}</Badge>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
