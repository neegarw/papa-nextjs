'use client'
import React, { useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from '../../context/CartConext';
import { FaBasketShopping } from "react-icons/fa6";
import { IoArrowUndoSharp } from "react-icons/io5";


function Basket() {
    const { cartItems, increment, decrement, removeFromCart } = useCart();
    const [isMobileBasketOpen, setIsMobileBasketOpen] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = item.variation?.price || item.price || 0;
        return acc + price * item.quantity;
    }, 0);
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const BasketContent = () => (
        <div className="flex flex-col gap-2 h-full py-6 w-full ">
            <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px]">Ünvan</div>
            <div className="border-[#999] px-4 pt-3 border-[1px] rounded-[10px] flex flex-col flex-grow overflow-y-auto">
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
            <button className="border-[#999] bg-[#f2f2f2] px-4 py-3 border-[1px] rounded-[25px]">Sifarişin təsdiqinə keçin</button>
        </div>
    );

    const EmptyBasket = () => (
        <div className="flex flex-col w-full py-8 gap-2">
            <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px]">Ünvan</div>
            <div className="border-[#999] px-4 py-3 border-[1px] rounded-[10px] flex flex-col items-center justify-center">
                <span className='text-[60px]'><MdOutlineShoppingCart /></span>
                <span>Səbətiniz boşdur</span>
            </div>
            <button className="border-[#999] bg-[#f2f2f2] px-4 py-3 border-[1px] rounded-[25px]">Sifarişin təsdiqinə keçin</button>
        </div>
    );

    return (
        <>
            {/* Desktop səbət */}
            <div className='hidden lg:flex sticky top-[200px] self-start flex-[0_0_30%]'>
                {cartItems.length === 0 ? <EmptyBasket /> : <BasketContent />}
            </div>

            {/* Mobil alt-bar */}
            
                <div
                    onClick={() => setIsMobileBasketOpen(true)}
                    className='bg-[#2D5D2A] py-4 px-2 flex lg:hidden fixed bottom-0 left-0 w-full justify-between items-center cursor-pointer z-50'
                >
                    <div className='flex items-center gap-2'>
                        <FaBasketShopping className='text-white text-[30px]' />
                        <span className='text-white font-extrabold text-[20px]'>({totalCount})</span>
                    </div>
                    <div className='text-[20px] text-white font-extrabold'>
                        {totalPrice.toFixed(2)} AZN
                    </div>
                </div>

            {/* Tam ekran mobil səbət */}
            <div
                className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isMobileBasketOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center text-[#2D5D2A] p-4 border-b border-gray-300">
                    <h2 onClick={() => setIsMobileBasketOpen(false)} className="font-bold text-lg"><IoArrowUndoSharp /></h2>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    {cartItems.length === 0 ? <EmptyBasket /> : <BasketContent />}
                </div>
            </div>
        </>
    );
}

export default Basket;
