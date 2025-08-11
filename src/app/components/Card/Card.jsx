import Link from "next/link";
import { useCart } from "../../context/CartConext";

function Card({ title, img, price, id, category }) {
  const { cartItems } = useCart();

  // Variant yoxdursa, id üzrə bütün variantların toplam sayı
  const quantity = cartItems
    .filter(item => String(item.id) === String(id))
    .reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative rounded-xl overflow-hidden hover:shadow-2xl">
      <Link href={`/menu/${category}/${id}`} className="group bg-white rounded-xl h-[280px] hover:shadow-2xl transition duration-300 flex flex-col text-center">
        <div className='relative'>
          <img src={img} alt={title} className="w-full h-[150px] object-cover rounded-lg mb-4" />
        </div>
        <h4 className="text-[16px] font-extrabold text-[#16113B] text-left px-3">{title}</h4>
        <h6 className="text-[#000000] text-[14px] text-left px-3">
          {parseFloat(price).toFixed(2)} ₼
        </h6>
        <button className="my-2 text-center hidden group-hover:flex bg-[#CEEB0C] hover:bg-white uppercase border text-[#16113B] text-[12px] w-[85%] mx-auto py-1 hover:flex justify-center items-center rounded-[20px] transition">
          Səbətə əlavə et
        </button>
      </Link>

      {quantity > 0 && (
        <div
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          className="absolute inset-0 bg-white bg-opacity-40 flex items-center h-[150px] justify-center rounded-lg z-20 pointer-events-none"
        >
          <span className="text-white font-extrabold text-4xl select-none">
            {quantity}
          </span>
        </div>
      )}
    </div>
  );
}
export default Card
