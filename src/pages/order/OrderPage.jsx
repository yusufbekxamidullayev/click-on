import React, { useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaArrowRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const OrderPage = () => {
    const cart = useSelector((state) => state.cart.cart);
    const [selectedPayment, setSelectedPayment] = useState('cash');
    

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
        // Telegram uchun xabar tayyorlash
        let message = "";

        // Mijoz ma'lumotlari
        message += `👤 *Mijoz ma'lumotlari:*\n`;
        message += `Ism: ${formData.firstName} ${formData.lastName}\n`;
        message += `Telefon: ${formData.phone}\n\n`;

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
            const BOT_TOKEN = "8533148770:AAHYciMYBIJWMTEWB_KcyBEk69HsEbvlG-0"
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
                alert("✅ Buyurtma muvaffaqiyatli yuborildi!");
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
                })
                console.log("Telegram response:", result);
            } else {
                console.error("Telegram error:", result);
                alert("Xatolik yuz berdi!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Yuborishda xatolik: " + error.message);
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
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
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
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
                                    <label className="block text-sm text-gray-600 mb-2">Viloyat</label>
                                    <select
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tanlang...</option>
                                        {uzbekistanRegions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Shahar</label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tanlang...</option>
                                        {uzbekistanCities['Toshkent shahar']?.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
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
                            </div>
                        </div>

                        {/* Payment Option */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-6  pb-3">Payment Option</h2>

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
                                    onClick={() => setSelectedPayment('venmo')}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${selectedPayment === 'venmo'
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2 text-blue-600 font-bold"><img src="/Icon.png" alt="" /></div>
                                    <span className="text-sm font-medium">Venmo</span>
                                </button>

                                <button
                                    onClick={() => setSelectedPayment('paypal')}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${selectedPayment === 'paypal'
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2 text-blue-700 font-bold"><img src="/image 9.png" alt="" /></div>
                                    <span className="text-sm font-medium">Paypal</span>
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
                                        <label className="block text-sm text-gray-600 mb-2">Karta egasi</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            placeholder="Name on Card"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">Karta raqami</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="Card Number"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">Amal qilish muddati</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">CVC</label>
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={formData.cvc}
                                                onChange={handleInputChange}
                                                placeholder="CVC"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
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