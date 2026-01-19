import React from 'react'
import useTanstackGet from '../../hooks/useTanstackGet'

const ProductsPage = () => {

  const {data , isLoading} = useTanstackGet({url: "products/category-list" , key: "category-lists"})
  const categoryLists = data?.data;

  return (
    <div>
      <section>
        <div className="container mx-auto">
          <div className="bg-white rounded-lg p-6 border-[1px] max-w-[310px]">
            {/* Header */}
            <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
              Category
            </h2>

            {/* Radio List */}
            <div className="space-y-4 overflow-hidden z-50 max-h-[405px] overflow-y-auto">
              {
                categoryLists?.map((el) => (
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="category"
                        value={el}
                        className="peer sr-only"
                        defaultChecked
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-orange-500 peer-checked:border-[6px] transition-all"></div>
                    </div>
                    <span className="text-[15px] text-gray-700 group-hover:text-gray-900 font-medium">{el}</span>
                  </label>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductsPage