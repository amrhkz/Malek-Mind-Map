"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./carousel.css";
import { useEffect, useState } from "react";
import Oscar from "../oscar/oscar";

function filterProductsByTitle(products, title) {
  switch (title) {
    case "Short Term":
      return products.filter((p) => p.price <= 1000000);

    case "Mid Term":
      return products.filter((p) => p.price > 1000000 && p.price <= 2500000);

    case "Long Term":
      return products.filter((p) => p.price > 2500000);

    default:
      return products;
  }
}

export default function Carousel({ title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/products", {
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Something Went Wrong!");

        const data = await res.json();

        const filtered = filterProductsByTitle(data, title);
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [title]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="title">{title}</div>
      <div className="shopping-list">
        {products.length === 0 ? (
          <div className="no-products">
            <Oscar width={75} height={75}/>
            <p>No Product to Show</p>
          </div>
        ) : (
          <Swiper
            className="mySwiper"
            slidesPerView={5}
            spaceBetween={30}
            pagination={{ clickable: true }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="shopping-card">
                  {product.image ? (
                    <img
                      src={`http://localhost:4000${product.image}`}
                      alt={product.title}
                      className="product-image"
                    />
                  ) : (
                    <div className="no-image">📦 تصویر موجود نیست</div>
                  )}

                  <div className="detail">
                    <div className="title">{product.title}</div>
                    <div className="desc">{product.desc}</div>
                    <div className="price">
                      {Number(product.price).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
