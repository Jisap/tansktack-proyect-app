
import { createFileRoute } from '@tanstack/react-router'
import { getProductById } from '@/data/products'

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getProductById(params.id)
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <div>Hello "/products/$id"! { id }</div>
}
