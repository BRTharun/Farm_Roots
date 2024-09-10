import PageWrapper from "../Wrapper & Cards/PageWrapper";
import TopBanner from "../common/HomePage/UI/TopBanner";
import MainCategoryContainer from "../common/HomePage/MainCategoryContainer";
import ProductCarousel from "../common/HomePage/ProductCarousel";

const dummyMainCategoryList = [
    {
      id: 1,
      name: "Electronics",
      subCategories: [
        { id: 101, name: "Smartphones" },
        { id: 102, name: "Laptops" },
      ],
    },
    {
      id: 2,
      name: "Clothing",
      subCategories: [
        { id: 201, name: "T-Shirts" },
        { id: 202, name: "Jeans" },
      ],
    },
    {
      id: 3,
      name: "Groceries",
      subCategories: [
        { id: 301, name: "Fruits" },
        { id: 302, name: "Vegetables" },
      ],
    },
  ];

function HomePage() {
    const mainCategoryList = dummyMainCategoryList;
    return (
    
    <PageWrapper className="p-2">
        <TopBanner />
        <MainCategoryContainer />
        {mainCategoryList.map((mainCategory) => (
        <ProductCarousel
          firstSubCategoryId={mainCategory.subCategories[0].id}
          key={mainCategory.id}
          title={mainCategory.name}
          mainCategoryId={mainCategory.id}
        />
    ))}
    </PageWrapper>
    
);
}

export default HomePage;