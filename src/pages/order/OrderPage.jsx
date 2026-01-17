import React, { useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaArrowRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
    const cart = useSelector((state) => state.cart.cart);
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('cash');
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        address: '',
        country: "O'zbekiston",
        region: '',
        city: '',
        zipCode: '',
        email: '',
        phone: '',
        shipToDifferent: false,
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Xatolikni olib tashlash
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Asosiy maydonlarni tekshirish
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Ism kiritish majburiy';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Manzil kiritish majburiy';
        }

        if (!formData.region) {
            newErrors.region = 'Viloyatni tanlang';
        }

        if (!formData.city) {
            newErrors.city = 'Shaharni tanlang';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email kiritish majburiy';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email formati noto\'g\'ri';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Telefon raqam kiritish majburiy';
        } else if (!/^\+?[\d\s-]{9,}$/.test(formData.phone)) {
            newErrors.phone = 'Telefon raqam formati noto\'g\'ri';
        }

        // Karta to'lovi tanlangan bo'lsa
        if (selectedPayment === 'card') {
            if (!formData.cardName.trim()) {
                newErrors.cardName = 'Karta egasi ismini kiriting';
            }
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'Karta raqamini kiriting';
            }
            if (!formData.expiry.trim()) {
                newErrors.expiry = 'Amal qilish muddatini kiriting';
            }
            if (!formData.cvc.trim()) {
                newErrors.cvc = 'CVC kodni kiriting';
            }
        }

        // Savat bo'sh emasligini tekshirish
        if (cart.length === 0) {
            toast.error('❌ Savatingiz bo\'sh! Mahsulot qo\'shing.');
            return false;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = 'Free';
    const discount = 64;
    const tax = 61.99;
    const total = subtotal - discount + tax;

    const handlePlaceOrder = async () => {
        // Validatsiya
        if (!validateForm()) {
            toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring!");
            return;
        }

        // Telegram uchun xabar tayyorlash
        let message = "";

        // Mijoz ma'lumotlari
        message += `👤 *Mijoz ma'lumotlari:*\n`;
        message += `Ism: ${formData.firstName} ${formData.lastName}\n`;
        message += `Telefon: ${formData.phone}\n`;
        message += `Email: ${formData.email}\n\n`;

        // Manzil
        message += `📍 *Yetkazib berish manzili:*\n`;
        message += `${formData.address}\n`;
        message += `${formData.city}, ${formData.region}\n`;
        message += `${formData.country}, ${formData.zipCode}\n\n`;

        // Mahsulotlar
        message += `📦 *Buyurtma mahsulotlari:*\n`;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.title || item.name || item.description}\n`;
            message += `   Soni: ${item.qty} x $${item.price} = $${(item.qty * item.price).toFixed(2)}\n`;
        });
        message += `\n`;

        // Narx hisob-kitobi
        message += `💰 *Narx ma'lumotlari:*\n`;
        message += `Sub-total: $${subtotal.toFixed(2)}\n`;
        message += `Yetkazib berish: Bepul\n`;
        message += `Chegirma: $${discount.toFixed(2)}\n`;
        message += `Soliq: $${tax.toFixed(2)}\n`;
        message += `*JAMI: $${total.toFixed(2)} USD*\n\n`;

        // To'lov usuli
        message += `💳 *To'lov usuli:*\n`;
        const paymentMethods = {
            cash: "Naqd pul (Cash on Delivery)",
            venmo: "Venmo",
            paypal: "PayPal",
            amazon: "Amazon Pay",
            card: "Debit/Credit Card",
        };
        message += paymentMethods[selectedPayment] + "\n";

        // Qo'shimcha izohlar
        if (formData.notes) {
            message += `\n📝 *Izoh:* ${formData.notes}`;
        }

        try {
            // Telegramga yuborish
            const BOT_TOKEN = "8533148770:AAHYciMYBIJWMTEWB_KcyBEk69HsEbvlG-0";
            const CHAT_ID = "8382789935";

            const response = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                        parse_mode: "Markdown",
                    }),
                }
            );

            const result = await response.json();

            if (result.ok) {
                // Toast xabari
                toast.success('Buyurtma muvaffaqiyatli yuborildi!', {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Formani tozalash
                setFormData({
                    firstName: '',
                    lastName: '',
                    companyName: '',
                    address: '',
                    country: "O'zbekiston",
                    region: '',
                    city: '',
                    zipCode: '',
                    email: '',
                    phone: '',
                    shipToDifferent: false,
                    cardName: '',
                    cardNumber: '',
                    expiry: '',
                    cvc: '',
                    notes: ''
                });

                // Success sahifasiga o'tkazish (2 soniyadan keyin)
                setTimeout(() => {
                    navigate('/checkout');
                }, 500);

                console.log("Telegram response:", result);
            } else {
                console.error("Telegram error:", result);
                toast.error('❌ Xatolik yuz berdi! Qaytadan urinib ko\'ring.');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`❌ Yuborishda xatolik: ${error.message}`);
        }
    };

    const uzbekistanRegions = [
        'Toshkent shahar',
        'Toshkent viloyati',
        'Samarqand',
        'Buxoro',
        'Andijon',
        'Farg\'ona',
        'Namangan',
        'Qashqadaryo',
        'Surxondaryo',
        'Sirdaryo',
        'Jizzax',
        'Navoiy',
        'Xorazm',
        'Qoraqalpog\'iston'
    ];

    const uzbekistanCities = {
        'Toshkent shahar': ['Chilonzor', 'Yunusobod', 'Mirzo Ulug\'bek', 'Yakkasaroy', 'Shayxontohur'],
        'Samarqand': ['Samarqand shahri', 'Kattaqo\'rg\'on', 'Urgut', 'Jomboy'],
        'Buxoro': ['Buxoro shahri', 'Kogon', 'Olot', 'G\'ijduvon']
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Billing Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Billing Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-6 pb-3">Billing Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        Ism <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First name"
                                        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Familiya</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last name"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Kompaniya nomi (Optional)</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        placeholder="Company Name (Optional)"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 mb-2">
                                    Manzil <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Mamlakat</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>O'zbekiston</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        Viloyat <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.region ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Tanlang...</option>
                                        {uzbekistanRegions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errors.region && (
                                        <p className="text-red-500 text-xs mt-1">{errors.region}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        Shahar <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Tanlang...</option>
                                        {uzbekistanCities['Toshkent shahar']?.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    {errors.city && (
                                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="Zip Code"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        Phone raqami <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="different-address"
                                    name="shipToDifferent"
                                    checked={formData.shipToDifferent}
                                    onChange={handleInputChange}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="different-address" className="text-sm text-gray-700">
                                    Ship to different address
                                </label>
                            </div> */}
                        </div>

                        {/* Payment Option */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-6 pb-3">Payment Option</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <button
                                    onClick={() => setSelectedPayment('cash')}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${selectedPayment === 'cash'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2 text-[#FA8232]"><BsCurrencyDollar /></div>
                                    <span className="text-sm font-medium">Cash on Delivery</span>
                                </button>

                                <button
                                    onClick={() => setSelectedPayment('card')}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${selectedPayment === 'card'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2 text-[#FA8232]"><CiCreditCard1 /></div>
                                    <span className="text-sm font-medium">Debit/Credit Card</span>
                                </button>
                            </div>

                            {selectedPayment === 'card' && (
                                <div className="space-y-4 border-t pt-6">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">
                                            Karta egasi <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            placeholder="Name on Card"
                                            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.cardName && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">
                                            Karta raqami <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="Card Number"
                                            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Amal qilish muddati <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiry ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.expiry && (
                                                <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                CVC <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={formData.cvc}
                                                onChange={handleInputChange}
                                                placeholder="CVC"
                                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvc ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.cvc && (
                                                <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 pb-3">Additional Information</h2>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Izoh (Optional)</label>
                                <textarea
                                    rows="4"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Notes about your order, e.g. special notes for delivery"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                            <h2 className="text-xl font-semibold mb-6 border-b border-[#E4E7E9] pb-3">Order Summary</h2>

                            {/* Products */}
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">Savatingiz bo'sh</p>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={item.thumbnail || item.image}
                                                    alt={item.title || item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium line-clamp-2">{item.title || item.name || item.description}</h3>
                                                <p className="text-sm text-gray-500">{item.qty} x ${item.price}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-[#E4E7E9] pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Sub-total</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">{shipping}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="font-medium">${discount}</span>
                                </div>
                                <div className="flex justify-between text-sm border-[#E4E7E9] border-b pb-3">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2">
                                    <span>Total</span>
                                    <span className="text-orange-500">${total.toFixed(2)} USD</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                PLACE ORDER <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;