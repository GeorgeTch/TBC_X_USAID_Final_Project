"use server";
import { createSafeActionClient } from "next-safe-action";
import * as z from "zod";
import { db } from "..";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import algoliasearch from "algoliasearch";

const action = createSafeActionClient();

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN!
);

const algoliaIndex = client.initIndex("products");

async function getAlgoliaObjectIDs(productID: number) {
  try {
    const result = await algoliaIndex.search("", {
      filters: `id:${productID}`, // Ensure this filter matches Algolia's attribute
    });

    if (result.hits.length > 0) {
      return result.hits.map((hit) => hit.objectID); // Return all matching objectIDs
    } else {
      console.log(
        "No item found with the specified id in Algolia.",
        "ProductID:",
        productID
      );
      return [];
    }
  } catch (error) {
    console.error("Error searching for the item in Algolia:", error);
    return [];
  }
}

export const deleteProduct = action(
  z.object({ id: z.number() }),
  async ({ id }) => {
    try {
      const data = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      if (data.length === 0) {
        console.error(
          "No product found with the specified id in the database."
        );
        return { error: "No product found with the specified id" };
      }

      revalidatePath("/dashboard/products");

      const objectIds = await getAlgoliaObjectIDs(data[0].id); // Use data[0].id from database

      if (objectIds.length > 0) {
        await algoliaIndex.deleteObjects(objectIds);
        console.log(`Deleted ${objectIds.length} records from Algolia.`);
      } else {
        console.log("No corresponding Algolia records found to delete.");
      }

      return { success: `Product ${data[0].title} has been deleted` };
    } catch (error) {
      console.error("Error deleting the product:", error);
      return { error: "Failed to delete product" };
    }
  }
);
