import ProductCard from "./productCard";

const ProductList = ({ products, view, onEdit }) => {
  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-t-lg border-t-4 border-black">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-600">Product</th>
            <th className="px-4 py-3 font-medium text-slate-600">Category</th>
            <th className="px-4 py-3 font-medium text-slate-600">Price</th>
            <th className="px-4 py-3 font-medium text-slate-600">Stock</th>
            <th className="px-4 py-3 font-medium text-slate-600 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {products.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-slate-50 transition"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {p.name}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {p.category}
              </td>

              <td className="px-4 py-3 text-slate-900">
                ₹{p.price}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[12px] md:text-xs font-medium
                    ${
                      p.stock > 0
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                >
                  {p.stock > 0 ? `${p.stock}` : "Out of stock"}
                </span>
              </td>

              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEdit(p)}
                  className="text-black hover:text-gray-800 font-medium transition"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
