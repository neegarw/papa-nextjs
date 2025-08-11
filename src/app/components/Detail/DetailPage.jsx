'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPizza, getPapadias, getQalyanaltilar, getSalat, getPasta, getSouses, getIcki, getDesertlar } from '../../../../services/api';
import VariationSelector from './VariationSelector';
import { useCart } from '../../context/CartConext';

export default function DetailPage({ productId, category }) {
  const router = useRouter();
  const { cartItems, increment, decrement, addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariation, setSelectedVariation] = useState(() => product?.variations?.[0] || null);

  const cartItem = cartItems.find(item =>
    String(item.id) === String(productId) &&
    JSON.stringify(item.variation) === JSON.stringify(selectedVariation)
  );

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      let products = [];
      try {
        switch (category) {
          case 'pizza': products = await getPizza(); break;
          case 'papadias': products = await getPapadias(); break;
          case 'qalyanaltilar': products = await getQalyanaltilar(); break;
          case 'salat': products = await getSalat(); break;
          case 'pasta': products = await getPasta(); break;
          case 'souses': products = await getSouses(); break;
          case 'icki': products = await getIcki(); break;
          case 'desertlar': products = await getDesertlar(); break;
          default: products = [];
        }

        const foundProduct = products.find(p => String(p.id) === String(productId));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Məhsul yüklənmədi:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId, category]);

  useEffect(() => {
    if (product?.variations?.length) {
      setSelectedVariation(product.variations[0]);
    }
  }, [product]);

const [count, setCount] = useState(2);

useEffect(() => {
  if (cartItem) {
    setCount(cartItem.quantity);
  } else {
    setCount(1);
  }
}, [cartItem]);


  const handleAddToCart = async () => {
    if (!cartItem && product) {
      await addToCart({ ...product, variation: selectedVariation, quantity: count });
    }
    router.push('/menu');
  };

  function incDec(x) {
  if (cartItem) {
    if (x > 0) increment(productId, selectedVariation);
    else if (count > 1) decrement(productId, selectedVariation);
  } else {
    if (x > 0 && product) addToCart({ ...product, variation: selectedVariation, quantity: 1 });

  }
}


  if (loading) return <p>Yüklənir...</p>;
  if (!product) return <p>Məhsul tapılmadı</p>;

  return (
    <div onClick={() => router.back()} className="fixed inset-0 z-50 bg-transparent">
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="absolute inset-0 z-[]"></div>
      <div className="relative flex flex-col justify-center items-center h-screen px-4">
        <div onClick={(e) => e.stopPropagation()} className="bg-[#f2f2f2] rounded-[35px] flex flex-col md:flex-row p-6 w-full relative h-[90%] md:w-[80%] overflow-y-auto">
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-4 text-2xl"
          >
            ×
          </button>

          <div className="flex flex-col md:w-[20%] relative">
            <img
              src={product.img}
              alt={product.title}
              className="w-full md:w-[280px] rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-extrabold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-4">{product.composition}</p>
            </div>
          </div>

          <div className="md:ml-8 md:w-[70%]">
            {(category === 'pizza' || category === 'papadias') && (
              <VariationSelector
                variations={product.variations}
                onChange={(variation) => setSelectedVariation(variation)}
              />
            )}
          </div>
          <div className='bg-white px-4 py-6 absolute bottom-0 right-0 w-full'>
            <div className='flex justify-end items-center '>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => incDec(-1)}
                  className='w-[30px] h-[30px] bg-white border border-[#2D5D2A] rounded-full text-[#2D5D2A] hover:bg-[#2D5D2A] hover:text-white transition ease-in-out duration-200 cursor-pointer' > -</button>
                <span className='text-[#2D5D2A] font-extrabold'>{count}</span>
                <button
                  onClick={() => incDec(1)}
                  className='w-[30px] h-[30px] bg-white border border-[#2D5D2A] rounded-full text-[#2D5D2A] hover:bg-[#2D5D2A] hover:text-white transition ease-in-out duration-200 cursor-pointer' > +</button>
              </div>
              <span className='text-[#2D5D2A] font-extrabold mx-3'>  {((selectedVariation?.price || product.price) * count).toFixed(2)} AZN</span>
              <button
                onClick={handleAddToCart}
                className="uppercase bg-[#CEEB0C] rounded-[30px] px-6 py-2 border border-black text-[12px] md:text-[16px] hover:bg-white transition-all ease-in-out duration-500 cursor-pointer">Səbətə əlavə et→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
