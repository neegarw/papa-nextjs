'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPizza, getPapadias, getQalyanaltilar, getSalat, getPasta, getSouses, getIcki, getDesertlar } from '../../../../services/api';
import VariationSelector from './VariationSelector';
import { useCart } from '../../context/CartConext';

export default function DetailPage({ productId, category }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const finalPrice =
    category === 'pizza'
      ? Number(selectedVariation?.price) || 0
      : Number(product?.price) || 0;

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
        if (foundProduct?.variations?.length) {
          setSelectedVariation(foundProduct.variations[0]);
        }
      } catch (error) {
        console.error('Məhsul yüklənmədi:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId, category]);

  if (loading) return <p>Yüklənir...</p>;
  if (!product) return <p>Məhsul tapılmadı</p>;

  return (
    <div onClick={() => router.back()} className="fixed inset-0 z-50 bg-transparent">
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="absolute inset-0 z-[]"></div>
      <div className="relative flex flex-col justify-center items-center h-[85%] md:h-screen px-4">
        <div onClick={(e) => e.stopPropagation()} className="bg-[#f2f2f2] rounded-[35px] flex flex-col md:flex-row p-6 w-full relative h-[90%] md:w-[80%] overflow-y-auto">
          <button
            onClick={() => router.back()}
            className="absolute z-50 top-4 right-4 text-2xl"
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
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  className='w-[30px] h-[30px] bg-white border border-[#2D5D2A] rounded-full text-[#2D5D2A]'>-</button>
                <span className='text-[#2D5D2A] font-extrabold'>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className='w-[30px] h-[30px] bg-white border border-[#2D5D2A] rounded-full text-[#2D5D2A]'>+</button>
              </div>
              <span className='text-[#2D5D2A] font-extrabold mx-3'>
                {(finalPrice * quantity).toFixed(2)} AZN
              </span>
              <button
                onClick={() => {
                  if (category === 'pizza') {
                    if (!selectedVariation) {
                      alert('Zəhmət olmasa məhsulun variantını seçin!');
                      return;
                    }
                    addToCart(product, quantity, selectedVariation);
                  } else {
                    addToCart(product, quantity);
                  }

                  setQuantity(1);
                  router.push('/menu'); 
                }}
                className="uppercase bg-[#CEEB0C] rounded-[30px] px-6 py-2 border border-black text-[12px] md:text-[16px]">Səbətə əlavə et→</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
