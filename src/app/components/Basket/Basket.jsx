'use client'
import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from '../../context/CartConext';

function Basket() {
    const { cartItems, increment, decrement, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((acc, item) => {
        const price = item.variation?.price || item.price || 0;
        return acc + price * item.quantity;
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className='hidden md:flex flex-col w-full md:w-[30%] py-6 gap-2 sticky top-[200px] self-start'>
                <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px]">Ünvan</div>
                <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px] flex flex-col items-center justify-center">
                    <span className='text-[60px]'><MdOutlineShoppingCart /></span>
                    <span>Səbətiniz boşdur</span>
                </div>
                <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px]">Promokodunuz varmı? Onu bura daxil edin.</div>
                <button className="border-[#999] bg-[#f2f2f2] px-4 py-3 border-[1px] rounded-[25px]">Sifarişin təsdiqinə keçin</button>
            </div>
        );
    }

    return (
        <div className='hidden md:flex flex-col w-full md:w-[30%] py-6 gap-2 sticky top-[200px] self-start'>
            <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px]">Ünvan</div>
            <div className="border-[#999] px-4 pt-3 border-[1px] rounded-[10px] flex flex-col max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => {
                    const variationKey = item.variation ? `${item.variation.type}-${item.variation.size}` : '';
                    return (
                        <div key={`${item.id}-${variationKey}`} className="flex gap-4 items-center w-full py-2">
                            <div className="flex flex-col items-center gap-1 flex-grow">
                                <div className='flex justify-between items-center w-full'>
                                    <div>
                                        <span className="text-[16px]">{item.title}</span>
                                        {item.variation && (
                                            <span className="font-light text-[14px]">-{item.variation.size?.slice(0, -8)}</span>
                                        )}
                                    </div>
                                    <button onClick={() => removeFromCart(item.id, item.variation)} className="text-black font-extrabold">
                                        ×
                                    </button>
                                </div>
                                <div className="text-sm text-gray-600 flex justify-between w-full">
                                    {item.variation ? (
                                        <>
                                            <span>{item.variation.type}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decrement(item.id, item.variation)}
                                                    className="bg-white border-gray-300 border flex items-center justify-center hover:bg-[#2D5D2A] hover:text-white transition-all w-[20px] h-[20px] rounded-full"
                                                >
                                                    -
                                                </button>
                                                <span className='text-[#2D5D2A] font-bold'>{item.quantity}</span>
                                                <button
                                                    onClick={() => increment(item.id, item.variation)}
                                                    className="bg-white border-gray-300 border flex items-center justify-center hover:bg-[#2D5D2A] hover:text-white transition-all w-[20px] h-[20px] rounded-full"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="font-semibold w-[20%]">{(item.variation.price * item.quantity).toFixed(2)} AZN</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-transparent">ənənəvi</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decrement(item.id)}
                                                    className="bg-white border-gray-300 border flex items-center justify-center hover:bg-[#2D5D2A] hover:text-white transition-all w-[20px] h-[20px] rounded-full"
                                                >
                                                    -
                                                </button>
                                                <span className='text-[#2D5D2A] font-bold'>{item.quantity}</span>
                                                <button
                                                    onClick={() => increment(item.id)}
                                                    className="bg-white border-gray-300 border flex items-center justify-center hover:bg-[#2D5D2A] hover:text-white transition-all w-[20px] h-[20px] rounded-full"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="font-semibold w-[20%]">{(item.price * item.quantity).toFixed(2)} AZN</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="border border-[#999] mt-2 px-4 py-3 font-extrabold text-[15px] rounded-[10px] flex justify-between items-center">
                <span>YEKUN</span>
                <span>{totalPrice.toFixed(2)} AZN</span>
            </div>

            <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px]">Promokodunuz varmı? Onu bura daxil edin.</div>
            <button className="border-[#999] bg-[#f2f2f2] px-4 py-3 border-[1px] rounded-[25px]">Sifarişin təsdiqinə keçin</button>
        </div>
    );
}

export default Basket;
