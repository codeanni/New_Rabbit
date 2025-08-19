import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] =  useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error} =  useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
dispatch(fetchProductsByFilters({collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    //close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target))
      setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Add eventlistner for clicks
    document.addEventListener("mousedown", handleClickOutside);
    //clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedProducts = [
  //       {
  //         _id: 1,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=11" }],
  //       },
  //       {
  //         _id: 2,
  //         name: "Product 2",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=12" }],
  //       },
  //       {
  //         _id: 3,
  //         name: "Product 3",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=13" }],
  //       },
  //       {
  //         _id: 4,
  //         name: "Product 2",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=14" }],
  //       },
  //       {
  //         _id: 5,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=15" }],
  //       },
  //       {
  //         _id: 6,
  //         name: "Product 2",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=16" }],
  //       },
  //       {
  //         _id: 7,
  //         name: "Product 3",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=17" }],
  //       },
  //       {
  //         _id: 8,
  //         name: "Product 2",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=18" }],
  //       },
  //     ];
  //     setProducts(fetchedProducts);
  //   }, 1000);
  // }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      bg-white w-64 fixed inset-y-0 z-50 overflow-y-auto transition-transform duration-300
      lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* sort options */}
        <SortOptions />

        {/* Product grid */}
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
