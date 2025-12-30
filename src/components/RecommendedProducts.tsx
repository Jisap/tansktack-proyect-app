import { ProductSelect } from '@/db/schema'
import { ProductCard } from './ProductCard'

export function RecommendedProducts({ recommendedProducts }: {recommendedProducts: ProductSelect[] }) {
 
  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Recommended Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  )
}