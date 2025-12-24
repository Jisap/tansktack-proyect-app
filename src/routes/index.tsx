import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight } from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/")({ component: App });

function App() {
return (
  <div className="space-y-12 bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
    <section>
      <Card className="p-8 shadow-md bg-white/80">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Your favourite e-commerce store
        </p>
        <CardTitle className="text-4xl font-bold leading-tight text-slate-900 dark:text-white max-w-2xl">
          <h1>StartShop - Your one-stop shop for all your needs</h1>
        </CardTitle>
        <CardDescription>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Browse products
            <HugeiconsIcon icon={ArrowRight} size={20} />
          </Link>
        </CardDescription>
      </Card>
    </section>
  </div>
);
}