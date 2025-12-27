import { sampleProducts } from 'scripts/seed'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return sampleProducts.find((product) => product.id === params.id)
  },
})

function RouteComponent() {
  return <div>Hello "/products/$id"!</div>
}
