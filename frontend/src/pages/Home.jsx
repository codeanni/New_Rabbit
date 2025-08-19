import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import CollectionSection from "../components/Products/CollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeatureCollections from "../components/Products/FeatureCollections";
import FeatureSection from "../components/Products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchProductsByFilters,
} from "../redux/slices/productSlice";
import axios from "axios";
// const placeholderProducts = [
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=11"}],
// },
// {
//     _id: 2,
//     name: "Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=12"}],
// },
// {
//     _id: 3,
//     name: "Product 3",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=13"}],
// },
// {
//     _id: 4,
//     name: "Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=14"}],
// },
// {
//   _id: 5,
//   name: "Product 1",
//   price: 100,
//   images: [{ url: "https://picsum.photos/500/500?random=15"}],
// },
// {
//   _id: 6,
//   name: "Product 2",
//   price: 100,
//   images: [{ url: "https://picsum.photos/500/500?random=16"}],
// },
// {
//   _id: 7,
//   name: "Product 3",
//   price: 100,
//   images: [{ url: "https://picsum.photos/500/500?random=17"}],
// },
// {
//   _id: 8,
//   name: "Product 2",
//   price: 100,
//   images: [{ url: "https://picsum.photos/500/500?random=18"}],
// }
// ]

const Home = () => {

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <CollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      {/* <ProductDetails /> */}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeatureCollections />
      <FeatureSection />
    </div>
  );
};

export default Home;
