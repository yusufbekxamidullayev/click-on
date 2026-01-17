import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
                <div className="flex items-center justify-center">
                    <img src="/CheckCircle.png" alt="" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800 mb-2 sm:text-2xl">
                    <p>Your order is successfully placed</p>
                </h1>
                <p className=" text-[13px] text-gray-600 mb-6 sm:text-[15px]">
                    Rahmat! Buyurtmangiz muvaffaqiyatli yuborildi. Tez orada yetkaziladi.
                </p>

                <div className="flex justify-center gap-4">
                    <Link to={"/"} className="px-5 py-2 border-[1px] border-[#FFE7D6] text-[#FA8232] flex items-center gap-2  rounded-[4px]">
                        <p><GoStack /></p>
                        <p>Go to Dashboard</p>
                    </Link>
                    <Link to={"/order"} className="flex items-center gap-2 px-5 py-2 bg-[#FA8232] text-white rounded-[4px] sm:text-[16px]">
                        <p>View Order</p>
                        <p><FaArrowRight /></p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
