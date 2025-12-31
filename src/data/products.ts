import { db } from "@/db"
import { ProductInsert, products, ProductSelect } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getAllProducts() {
  try {
    const productsData = await db.select().from(products)
    return productsData
  } catch (error) {
    console.error('Error getting all products:', error)
    return []
  }
}

export async function getRecommendedProducts() {
  try {
    const productsData = await db.select().from(products).limit(3)
    return productsData
  } catch (error) {
    console.error('Error getting recommended products:', error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)
    return product?.[0] ?? null
  } catch (error) {
    console.error('Error getting product by id:', error)
    return null
  }
}

export async function createProduct(
  data: ProductInsert,
): Promise<ProductSelect> {
  try {
    const result = await db.insert(products).values(data).returning()
    const product = result[0]
    if (!product) {
      throw new Error(
        'Failed to create product: no product returned from database',
      )
    }

    return product
  } catch (error) {
    console.error('Error creating product', error)
    throw error
  }
}
