'use client';
import { useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import { FiMenu } from 'react-icons/fi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className={`w-full bg-white z-20 relative transition-all duration-300 ${menuOpen ? '' : 'shadow-md'}`}>
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="w-[150px] cursor-pointer">
            <img
              src="https://1000logos.net/wp-content/uploads/2023/04/Papa-Johns-logo.jpg"
              alt="logo"
              className="object-contain"
            />
          </div>
          <div className='lg:flex items-center font-bold text-[18px] hidden'>
            <GrLanguage />
            <select name="" id="">
              <option value="aze">Azərbaycan</option>
              <option value="eng">English</option>
            </select>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <button className="uppercase bg-[#CEEB0C]  rounded-[30px] px-4 py-2 border border-black text-[12px] hover:bg-white transition-all ease-in-out duration-500 cursor-pointer">
              SİFARİŞ ET
            </button>
            <div onClick={toggleMenu} className="text-[#2D5D2A] text-2xl cursor-pointer" >
              <FiMenu />
            </div>
          </div>
        </div>
        <div className='container mx-auto hidden lg:block'><hr className='border-0 h-[1px] bg-gray-200' /></div>
        <div className='container mx-auto hidden lg:flex justify-between py-3'>
          <ul className='flex font-bold text-[18px] gap-2'>
            <li className="rounded-[20px] hover:bg-gray-200 hover:rounded-[20px] px-3 py-1 transition ease-in-out duration-300 cursor-pointer">Menyu</li>
            <li className="rounded-[20px] hover:bg-gray-200 hover:rounded-[20px] px-3 py-1 transition ease-in-out duration-300 cursor-pointer">Təkliflər</li>
            <li className="rounded-[20px] hover:bg-gray-200 hover:rounded-[20px] px-3 py-1 transition ease-in-out duration-300 cursor-pointer">Papa Bonus</li>
            <li className="rounded-[20px] hover:bg-gray-200 hover:rounded-[20px] px-3 py-1 transition ease-in-out duration-300 cursor-pointer">Papa Talk</li>
            <li className="rounded-[20px] hover:bg-gray-200 hover:rounded-[20px] px-3 py-1 transition ease-in-out duration-300 cursor-pointer">Haqqımızda</li>
          </ul>
          <button className="uppercase bg-[#CEEB0C] rounded-[30px] px-4 py-2 border border-black text-[12px] hover:bg-white transition-all ease-in-out duration-500 cursor-pointer">
            SİFARİŞ ET
          </button>
        </div>
      </header>

      {/* Sidebar menyu */}
      <div
        className={`fixed top-0 left-0 w-full bg-white border border-gray-100 z-10 transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-screen pt-20 pb-3' : 'max-h-0 overflow-hidden'
          }`}
      >
        <ul className="flex container mx-auto flex-col items-start space-y-1 text-[#000] text-lg px-4">
          <li className='font-semibold'><a href="#">Menyu</a></li>
          <li className='font-semibold'><a href="#">Təkliflər</a></li>
          <li className='font-semibold'><a href="#">Papa Bonus</a></li>
          <li className='font-semibold'><a href="#">Papa Talk</a></li>
          <li className='font-semibold'><a href="#">Haqqımızda</a></li>
          <li><a href="#">İnqrediyentlər</a></li>
          <li><a href="#">Allergenlər</a></li>
          <li><a href="#">Restoranlar</a></li>
          <li><a href="#">Sual-Cavab</a></li>
        </ul>
        <div className='container mx-auto px-4'>
          <button className="uppercase bg-[#CEEB0C] rounded-[30px] px-6 py-2 border border-black text-[12px] hover:bg-white transition-all ease-in-out duration-500 cursor-pointer">
            SİFARİŞ ET
          </button>
        </div>
        <div className='h-[1px] w-full bg-gray-200 my-3'></div>
        <div className='container mx-auto px-4'>
          <div className='flex items-center font-bold text-[18px]'>
            <GrLanguage />
            <select name="" id="">
              <option value="aze">Azərbaycan</option>
              <option value="eng">English</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
