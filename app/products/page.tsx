"use client"
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import ProductsPage from "../components/productlist";

// Fetch data with pagination support
async function getData(page: number, limit: number) {
  const skip = (page - 1) * limit; // Calculate the skip based on the current page
  const query = `*[_type == "product"] [${skip}...${skip + limit}] | order(_createdAt desc) {
    _id,
    title,
    price,
    "categoryName": category->name,
    "imageUrl": image.asset->url,
    description,
    badge,
    priceWithoutDiscount,
    "tags": tags[] 
  }`;

  const data = await client.fetch(query);
  return data;
}

// Fetch total product count for pagination
async function getTotalProducts() {
  const query = `count(*[_type == "product"])`;
  const count = await client.fetch(query);
  return count;
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      const totalCount = await getTotalProducts();
      setTotalPages(Math.ceil(totalCount / itemsPerPage));

      const newProducts = await getData(currentPage, itemsPerPage);
      setProducts(newProducts);
    }

    fetchData();
  }, [currentPage]); // Re-fetch when the current page changes

  return (
    <ProductsPage
      initialData={products}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}
