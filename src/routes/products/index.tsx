import ProductCard from '@/components/Product-card'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { sampleProducts } from '@/db/seed'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute} from '@tanstack/react-router'
import { createMiddleware, createServerFn, json } from '@tanstack/react-start'


const fetchProductsFn = createServerFn({ method: 'GET' }).handler(async () => {
  return { products: sampleProducts }
})

const loggerMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    // 1. ACCIÓN: Aquí hacemos algo antes de continuar.
    console.log(
      '---loggerMiddleware---',
      request.url,                    // Vemos a qué URL quieren ir
      'from',
      request.headers.get('origin'),  // Vemos de dónde vienen
    )
    // 2. PASE: Dejamos que la petición continúe su camino
    return next()
  },
)

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: async () => {
    return fetchProductsFn()
  },
  server: {
    middleware: [loggerMiddleware],
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return json({ message: 'Hello, world from POST request!', body })
      },
    },
  }
})

function RouteComponent() {

  const { products } = Route.useLoaderData();

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await fetchProductsFn() //fetchProductsFn devuelve un objeto data
      return data.products                 // Hay devolver un array de productos para que coincida con initialData
    },
    initialData: products,                 // InitialData devuelve un array de productos
  })
  console.log('---data--', data)

  return (
    <div className='space-y-6'>
      <section className="space-y-4 max-w-6xl mx-auto">
        <Card className="p-6 shadow-md bg-white/80">
          <div className="flex items-center justify-between">
            <div className='space-y-1'>
              <CardHeader className="px-0">
                <p className="text-sm uppercase tracking-wide text-slate-500">
                  StartShop Catalog
                </p>
                <CardTitle className="text-2xl font-semibold">
                  Products built for makers
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-sm text-slate-600">
                Browse a minimal, production-flavoured catalog with TanStack Start server ans types routes.
              </CardDescription>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6'>
          {data?.map((product, index) => (
            <ProductCard 
              product={product} 
              key={`product-${index}`} 
            />
          ))}
        </div>

      </section>
    </div>



  )
}
