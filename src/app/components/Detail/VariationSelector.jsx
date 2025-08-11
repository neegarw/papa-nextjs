import React, { useState, useEffect } from 'react';

export default function VariationSelector({ variations, onChange }) {
  const [selectedType, setSelectedType] = useState('Ənənəvi');
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAllSizes, setShowAllSizes] = useState(false);

  useEffect(() => {
  if (variations?.length > 0) {
    const filtered = variations.filter((v) => v.type === selectedType);
    if (filtered.length > 0 && !selectedSize) { // yalnız seçilməyibsə
      setSelectedSize(filtered[0]);
      onChange && onChange({ type: selectedType, ...filtered[0] });
    }
  }
}, [selectedType, variations]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowAllSizes(false);
  };

  const handleSizeSelect = (sizeVariation) => {
    setSelectedSize(sizeVariation);
    onChange && onChange({ type: selectedType, ...sizeVariation });
  };

  return (
    <div className="py-4 space-y-6">
      <div>
        <p className="font-extrabold mb-2">
          Xəmirin növünü seçin <span className="text-[#2D5D2A]">(Mütləq)</span>
        </p>
        <div className="flex gap-3">
          {['Ənənəvi', 'Nazik'].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`pl-2 pr-6 py-1 border rounded-lg text-left  ${
                selectedType === type ? 'bg-[#2D5D2A] text-white' : 'bg-transparent text-gray-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {variations && variations.length > 0 && selectedSize && (
        <div>
          <p className="font-extrabold mb-2">
            Ölçü <span className="text-[#2D5D2A]">(Mütləq)</span>
          </p>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-between items-start border p-3 rounded w-[200px]">
              <p className="font-medium text-gray-600">{selectedSize.size?.slice(0, -8)}</p>
              <p className="text-[#2D5D2A] font-extrabold">{selectedSize.price}AZN</p>
            </div>
            <button
              className="text-gray-400 hover:text-[#2D5D2A] transition-all w-[50px] px-3"
              onClick={() => setShowAllSizes(!showAllSizes)}
            >
              {showAllSizes ? 'Bağla' : `Digər variant seçin→`}
            </button>
          </div>

          {showAllSizes && (
            <div className="mt-4 flex flex-col md:flex-row">
              {variations
                .filter((v) => v.type === selectedType)
                .map((v) => (
                  <button
                    key={v.size}
                    onClick={() => handleSizeSelect(v)}
                    className={`border-[1px] border-gray-500 p-3 w-[200px] rounded ${
                      selectedSize?.size === v.size ? 'bg-[#2D5D2A] text-white' : ''
                    }`}
                  >
                    <p>{v.size?.slice(0, -8)}</p>
                    <p
                      className={`text-sm text-gray-500 ${
                        selectedSize?.size === v.size ? 'text-white' : ''
                      }`}
                    >
                      {v.price} AZN
                    </p>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
