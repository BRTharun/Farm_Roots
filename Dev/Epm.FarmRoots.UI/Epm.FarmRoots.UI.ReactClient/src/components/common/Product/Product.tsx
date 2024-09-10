import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


interface ProductType {
    id : number | string;
    name : string;
    price : number;
    discount : number;
    stock : number;
};


interface ProductProps {
    className? : string;
    data : {
        id : number | string;
        name : string;
        images : string;
        producttypes : ProductType[];
    }
};

const Product : React.FC<ProductProps> = ({className, data}) => {
    const [currentType, setCurrentType] = useState<ProductType>(data.producttypes[0]);
    // const navigate = useNavigate();


    // const onClickProductHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    // }

    const withoutDiscount = Math.ceil(
        currentType.price + (currentType.price * currentType.discount)/ 100
    );

    const priceDifference = withoutDiscount - currentType.price;

    return (
        <div
            className={`${
                className && className
            } shrink-0 relative bg-white shadow h-72 flex p-2 rounded-md flex-col justify-between border`}
            >

                {currentType.stock === 0 && (
                    <div className="flex z-10 justify-center items-center opacity-80 absolute left-0 top-0 bg-gray-100 w-full h-full rounded-md">
                        <p className="relative bottom-10 text-xs font-bold text-white bg-slate-700 px-2 py-1 rounded-md">
                            Out of Stock
                        </p>
                        </div>
                )}

                <div className="flex justify-center">
                    <img className="w-24 h-24 object-cover object-center"
                    src={JSON.parse(data.images)[0]}
                    alt = "product image"
                    />
                </div>

                <p className="text-sm font-semibold">{data.name}</p>


                <select
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        setCurrentType(JSON.parse(e.target.value));
                    }}
                    value={JSON.stringify(currentType)}
                    className="text-xs bg-white font-thin outline-none w-full">
                        {data.producttypes &&
                        data.producttypes.map((type) =>  (
                            <option value={JSON.stringify(type)} key={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>


                <div className="flex flex-col gap-2 md:flex-row justify-between">
                    <div className="flex justify-between items-center md:block">
                        <p className="text-sm font-semibold">${currentType.price}</p>
                        {priceDifference !== 0 && (
                            <p className="text-xs text-gray-600 line-through">${withoutDiscount}</p>
                        )}
                    </div>
                    {/* <AddProductBTN id={currentType.id} /> */}
                </div>
            </div>


    )
};



export default Product;