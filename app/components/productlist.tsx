"use client";
import { simplifiedProduct } from "@/sanity/interface";
import { Badge, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../components/Pagination"; // Assuming you have a Pagination component

interface ProductsPageProps {
  initialData: simplifiedProduct[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function ProductsPage({
  initialData,
  totalPages,
  currentPage,
  setCurrentPage,
}: ProductsPageProps) {
  return (
    <div className="container mx-auto px-4 py-20 reveal-on-scroll">
      <h1 className="text-3xl text-start font-semibold text-[#1C1B1F] tracking-tight mb-8">
        All Products
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {initialData.map((product) => (
          <div key={product._id} className="group relative rounded-lg bg-white">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {product.badge && (
                <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
                  New
                </Badge>
              )}
              {product.tags && (
                <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-600">
                  Sales
                </Badge>
              )}
              <Link href={`/detail/${product._id}`}>
                <Image
                  src={product.imageUrl || "/images/1.jpg"}
                  alt={product.title || "Product Image"}
                  height={400}
                  width={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-medium text-[#1C1B1F]">
                    ${product.price}
                  </span>
                  {product.priceWithoutDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.priceWithoutDiscount}
                    </span>
                  )}
                </div>
              </div>
              <button className="rounded-full bg-[#00B5A5] p-2 text-white transition-colors hover:bg-[#00A294]">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Pass the setCurrentPage function
      />
    </div>
  );
}
