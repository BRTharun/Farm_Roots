import React, { useRef } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface ProductCarouselProps {
  mainCategoryId: number;
  title: string;
  firstSubCategoryId: number;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  mainCategoryId,
  title,
  firstSubCategoryId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onClickSeeAllHandler = () => {
    navigate(`/pl/${mainCategoryId}/${firstSubCategoryId}`);
  };

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
        <div
          ref={containerRef}
          className="hideScrollbar overflow-scroll flex gap-6" // Added larger gap between products
          style={{ paddingLeft: '1rem', paddingRight: '1rem' }} // Optional padding for carousel content
        >
          {/* Product items will go here */}
          {/* For example:
            <Product key={product.id} data={product} className="w-48" />
          */}
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
      className={`hidden z-10 md:block absolute top-[50%] -translate-y-[50%] ${
        side === "left" ? "left-0" : "right-0"
      } bg-white shadow-xl cursor-pointer hover:bg-gray-100 transition-all rounded-full p-3`}
      style={{ zIndex: 5 }} // Control z-index to avoid overlapping with other elements
    >
      {icon}
    </p>
  );
};
