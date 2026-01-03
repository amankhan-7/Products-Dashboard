const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="group bg-white rounded-xl rounded-t-lg border-t-4 border-black shadow-sm hover:shadow-md transition overflow-hidden">
      
      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-base font-semibold text-slate-900 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-slate-500">
          {product.category}
        </p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-semibold text-slate-900">
            ₹{product.price}
          </p>

          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
              ${
                product.stock > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 flex justify-end">
        <button
          onClick={() => onEdit(product)}
          className="text-sm font-medium text-black hover:text-gray-700 transition"
        >
          Edit product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
