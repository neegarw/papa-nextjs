'use client';
import React, { useEffect, useState } from 'react';
import Basket from '../Basket/Basket'
import {
  getDesertlar,
  getIcki,
  getPapadias,
  getPasta,
  getPizza,
  getQalyanaltilar,
  getSalat,
  getSouses
} from '../../../../services/api';
import Card from '../Card/Card';

function Products() {
  const [data, setData] = useState({
    papadias: [],
    pizza: [],
    qalyanaltilar: [],
    salat: [],
    pasta: [],
    souses: [],
    icki: [],
    desert: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const [
          papadias,
          pizza,
          qalyanaltilar,
          salat,
          pasta,
          souses,
          icki,
          desert
        ] = await Promise.all([
          getPapadias(),
          getPizza(),
          getQalyanaltilar(),
          getSalat(),
          getPasta(),
          getSouses(),
          getIcki(),
          getDesertlar()
        ]);

        setData({
          papadias,
          pizza,
          qalyanaltilar,
          salat,
          pasta,
          souses,
          icki,
          desert
        });
      } catch (err) {
        console.error("Məhsullar yüklənmədi:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  if (loading) return <p className='text-center py-10'>Yüklənir...</p>;

  return (
    <>
      <div className='container mx-auto px-3 pt-[150px] md:pt-[200px]'>
        <div className='flex justify-between relative gap-4'>
          <div className="w-full lg:w-[65%]">
            {Object.entries(data).map(([key, value]) => (
              <section key={key} id={key} className="scroll-mt-[180px]">
                <h2 className='text-[24px] md:text-[30px] font-extrabold py-4 capitalize'>{key}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {value.map(item => (
                    <Card key={item.id} {...item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
          <Basket />
        </div>
      </div>
    </>

  );
}

export default Products;
