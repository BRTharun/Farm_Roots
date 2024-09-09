import React, { useRef } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import Product from "../Product/Product";
// import useFetch from "../../Hooks/useFetch";
// import { PRODUCT } from "../../Api/endpoints";

interface ProductData {
  id: number;
  name: string;
  images: string;
  price: number;
  
}

interface ProductCarouselProps {
  mainCategoryId: number;
  title: string;
  firstSubCategoryId: number;
}

const dummyProductData: ProductData[] = [
  { id: 1, name: "Smartphone", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 599 },
  { id: 2, name: "Laptop", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 999 },
  { id: 3, name: "Headphones", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 199 },

  { id: 4, name: "T-shirt", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 25 },
  { id: 5, name: "Jeans", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 45 },
  { id: 6, name: "Jacket", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 75 },

  { id: 7, name: "Bananas", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 1.99 },
  { id: 8, name: "Apples", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 2.49 },
  { id: 9, name: "Grapes", images: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", price: 3.49 },
];

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  mainCategoryId,
  title,
  firstSubCategoryId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // const productLists = useFetch(`${PRODUCT}/${mainCategoryId}`);

  const onClickSeeAllHandler = () => {
    navigate(`/pl/${mainCategoryId}/${firstSubCategoryId}`);
  };

  // Dummy products to be used instead of API Data
  const filteredProducts = dummyProductData.filter(
    (product) => product.id >= mainCategoryId * 3 - 2 && product.id <= mainCategoryId * 3
  );

  return (
    <div className="w-full flex flex-col gap-4 mt-5">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p
          className="mr-2 md:m-0 text-xl text-green-800 cursor-pointer"
          onClick={onClickSeeAllHandler}
        >
          See All
        </p>
      </div>
      <div className="relative">
        <ScrollArrow containerRef={containerRef} side="left" icon={<MdKeyboardArrowLeft />} />
        <div ref={containerRef} className="hideScrollbar overflow-scroll flex gap-4">
          {/* {filteredProducts.map((product) => (
            <Product key={product.id} data={product} className="w-48" />
          ))} */}
        </div>
        <ScrollArrow containerRef={containerRef} side="right" icon={<MdKeyboardArrowRight />} />
      </div>
    </div>
  );
};

export default ProductCarousel;

// Slide arrow component
interface ScrollArrowProps {
  icon: React.ReactNode;
  side: "left" | "right";
  containerRef: React.RefObject<HTMLDivElement>;
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ icon, side, containerRef }) => {
  const onClickArrow = () => {
    const container = containerRef.current;

    if (container) {
      if (side === "left") {
        container.scrollTo({
          behavior: "smooth",
          left: container.scrollLeft - container.clientWidth,
        });
      } else {
        container.scrollTo({
          behavior: "smooth",
          left: container.scrollLeft + container.clientWidth,
        });
      }
    }
  };

  return (
    <p
      onClick={onClickArrow}
      className={`hidden z-20 md:block absolute top-[60%] -translate-y-[50%] ${
        side === "left" ? "-left-5" : "-right-5"
      } bg-white shadow-xl cursor-pointer hover:bg-gray-100 transition-all rounded-full p-3 z-10`}
    >
      {icon}
    </p>
  );
};
