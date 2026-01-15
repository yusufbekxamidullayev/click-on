import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import './header.css'

// react-icons
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
    const cart = useSelector((state) => state.cart.cart)
    const heart = useSelector((state) => state.cart.heart)
    const [language, setLanguage] = useState("Eng");
    const [currency, setCurrency] = useState("USD");
    const [hideTopBar, setHideTopBar] = useState(false);

    const lastScrollY = useRef(0);
    const upScroll = useRef(0);
    const downScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            const diff = current - lastScrollY.current;

            // pastga harakat
            if (diff > 0) {
                downScroll.current += diff;
                upScroll.current = 0;

                if (downScroll.current >= 35) {
                    setHideTopBar(true);
                    downScroll.current = 0;
                }
            }

            // tepaga harakat
            if (diff < 0) {
                upScroll.current += Math.abs(diff);
                downScroll.current = 0;

                if (upScroll.current >= 35) {
                    setHideTopBar(false);
                    upScroll.current = 0;
                }
            }

            lastScrollY.current = current;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 z-20 w-full bg-[#1B6392] pb-4 shadow-md shadow-[white]">
            <div>

                {/* TOP BAR */}
                <div
                    className={`container mx-auto px-2 md:px-0 2xl:px-33 w-full
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${hideTopBar
                            ? "h-0 opacity-0 pt-0"
                            : "h-[56px] opacity-100 pt-4"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-white text-sm">
                            Welcome to Clicon online eCommerce store.
                        </p>

                        <ul className="hidden lg:flex items-center gap-3 text-white text-sm">
                            <li className="font-medium">Follow us :</li>

                            <li className="cursor-pointer"><img src="/Twitter.png" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Facebook.png" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Pinterest.png" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Reddit.png" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Youtube.png" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Instagram.png" alt="" /></li>

                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-[#1B6392] outline-none"
                            >
                                <option>Eng</option>
                                <option>Ru</option>
                                <option>Uz</option>
                            </select>

                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-[#1B6392] outline-none"
                            >
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </ul>
                    </div>
                </div>


                <hr
                    className={`border-gray-300 transition-all duration-500
                    ${hideTopBar ? "opacity-0 h-0 m-0" : "opacity-100"}
                    `}
                />

                {/* MAIN HEADER */}
                <div className="flex items-center justify-between pt-3 container mx-auto px-2 md:px-0 2xl:px-33 w-full">
                    <Link to="/">
                        <img src="/Logo (3).png" className="w-[180px]" />
                    </Link>

                    <div className="relative hidden md:block">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="search"
                            placeholder="Search for anything..."
                            className="w-[550px] h-[38px] bg-white rounded pl-10 pr-3 outline-none"
                        />
                    </div>

                    <div className="hidden lg:flex gap-5">
                        <div>
                            <Link to="/cart" className="relative inline-block">
                                <FiShoppingCart className="text-white text-[29px]" />

                                <span className="absolute bottom-4 left-5 w-[20px] h-[20px]  bg-white text-[#1B6392] text-[12px] font-semibold rounded-full flex items-center justify-center">
                                    {cart?.length}
                                </span>
                            </Link>
                        </div>
                        <Link to="/like" className="relative inline-block">
                            <AiOutlineHeart className="text-white text-[29px]" />

                            <span className="absolute bottom-5 left-5 w-[20px] h-[20px]  bg-white text-[#1B6392] text-[12px] font-semibold rounded-full flex items-center justify-center">
                                {heart?.length}
                            </span>
                        </Link>                        <Link to="/register"><AiOutlineUser className="text-white text-[29px]" /></Link>
                    </div>

                    {/* 👇 here */}
                    <HiBars3 className="block lg:hidden text-white text-3xl" />
                </div>

                <div className="fixed w-full z-10 bottom-0 bg-[#1B6392] flex items-center justify-between px-2 py-1 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.25)] shadow-[white] sm:hidden">
                    <NavLink to={"/"} className="flex flex-col items-center">
                        <AiOutlineHome className="text-[24px] text-[white]"/>
                        <p className="text-[14px] text-[white]">Home</p>
                    </NavLink>
                    <Link to="/like" className="flex flex-col items-center">
                        <div className="relative inline-block">
                            <AiOutlineHeart className="text-white text-[24px]" />

                            <span className="absolute bottom-3 left-4 w-[15px] h-[15px]  bg-white text-[#1B6392] text-[10px] font-semibold rounded-full flex items-center justify-center">
                                {heart?.length}
                            </span>
                        </div>
                        <div>
                            <p className="text-[14px] text-[white]">Like</p>
                        </div>
                    </Link>                        
                    <Link to="/cart" className="flex flex-col items-center">
                        <div className="relative inline-block">
                            <FiShoppingCart className="text-white text-[24px]" />

                            <span className="absolute bottom-3 left-5 w-[15px] h-[15px]  bg-white text-[#1B6392] text-[10px] font-semibold rounded-full flex items-center justify-center">
                                {cart?.length}
                            </span>
                        </div>
                        <div>
                            <p className="text-[14px] text-[white]">Home</p>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center">
                        <AiOutlineHome className="text-[24px] text-[white]" />
                        <p className="text-[14px] text-[white]">Home</p>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
