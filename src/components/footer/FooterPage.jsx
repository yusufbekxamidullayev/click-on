import { FiArrowRight } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="w-full pb-10 sm:pb-0">

            {/* ===== NEWSLETTER SECTION ===== */}
            <section className="bg-[#1B6392] text-white py-20">
                <div className="container mx-auto px-2 md:px-0 2xl:px-33 text-center">

                    <h2 className="text-2xl font-semibold mb-3 sm:text-3xl">
                        Subscribe to our newsletter
                    </h2>

                    <p className="text-sm text-white/80 max-w-xl mx-auto mb-10">
                        Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et
                        cursus. Donec non quam urna. Quisque vitae porta ipsum.
                    </p>

                    {/* INPUT */}
                    <div className="max-w-xl mx-auto flex bg-white rounded-md overflow-hidden shadow-lg">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                        <button className="bg-[#FF7A00] px-6 flex items-center gap-2 text-sm font-semibold">
                            SUBSCRIBE <FiArrowRight />
                        </button>
                    </div>

                    {/* BRANDS */}
                    <div className="flex justify-center items-center gap-5 sm:gap-10 mt-6 sm:mt-12 opacity-80 flex-wrap">
                        <img className="cursor-pointer" src="/google.png" alt="Google" />
                        <img className="cursor-pointer" src="/amazon.png" alt="Amazon" />
                        <img className="cursor-pointer" src="/philips.png" alt="PHILIPS" />
                        <img className="cursor-pointer hidden sm:flex" src="/toshiba.png" alt="TOSHIBA" />
                        <img className="cursor-pointer hidden sm:flex" src="/samsung.png" alt="Samsung" />
                    </div>
                </div>
            </section>

            {/* ===== MAIN FOOTER ===== */}
            <section className="bg-[#111416] text-gray-400 pt-16">
                <div className="container mx-auto px-2 md:px-2 2xl:px-33 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* LOGO + INFO */}
                    <div>
                        <div className="mb-4">
                            <img className="w-[177px] h-[48px]" src="/Logo-footer.png" alt="logo" />
                        </div>
                        <p className="text-[12px]">Customer Supports:</p>
                        <p className="text-white font-semibold mb-3">(629) 555-0129</p>
                        <p className="text-sm leading-6">
                            4517 Washington Ave.<br />
                            Manchester, Kentucky 39495
                        </p>
                        <p className="mt-3 text-[white]">info@kinbo.com</p>
                    </div>

                    {/* TOP CATEGORY */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">TOP CATEGORY</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Computer & Laptop</li>
                            <li>SmartPhone</li>
                            <li>Headphone</li>
                            <li>Accessories</li>
                            <li>Camera & Photo</li>
                            <li>TV & Homes</li>
                            <li className="text-orange-500 font-medium mt-3 cursor-pointer">
                                Browse All Product →
                            </li>
                        </ul>
                    </div>


                    {/* QUICK LINKS */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">QUICK LINKS</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Shop Product</li>
                            <li>Shopping Cart</li>
                            <li>Wishlist</li>
                            <li>Compare</li>
                            <li>Track Order</li>
                            <li>Customer Help</li>
                            <li>About Us</li>
                        </ul>
                    </div>

                    {/* DOWNLOAD APP */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">DOWNLOAD APP</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 bg-gray-600/80 px-4 py-1 rounded cursor-pointer">
                                <img src="/play.png" alt="Google Play" />
                                <div>
                                    <p className="text-[14px]">Get it now</p>
                                    <h1 className="text-[white]">Google Play</h1>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-600/80 px-4 py-1 rounded cursor-pointer">
                                <img src="/app-store.png" alt="Google Play" />
                                <div>
                                    <p className="text-[14px]">Get it now</p>
                                    <h1 className="text-[white]">App Store</h1>
                                </div>
                            </div>                        </div>
                    </div>

                    {/* POPULAR TAG */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">POPULAR TAG</h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {[
                                "Game", "iPhone", "TV", "Asus Laptops",
                                "Macbook", "SSD", "Graphics Card",
                                "Power Bank", "Smart TV", "Speaker",
                                "Tablet", "Microwave", "Samsung"
                            ].map((tag, i) => (
                                <span
                                    key={i}
                                    className="border border-gray-600 px-3 py-1 cursor-pointer rounded text-xs hover:bg-orange-500 hover:text-white transition"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="border-t border-gray-700 mt-12 py-6 text-center text-sm">
                    Kinbo eCommerce Template © 2021. Design by Templatecookie
                </div>
            </section>
        </footer>
    );
};

export default Footer;
