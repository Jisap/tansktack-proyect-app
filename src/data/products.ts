import { db } from "@/db"
import { products } from "@/db/schema"

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
