import { useState } from "react";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  stock: "",
  description: "",
};

const ProductForm = ({ onSubmit, editingProduct, isSaving }) => {
  const [form, setForm] = useState(editingProduct ?? emptyForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.price) e.price = "Required";
    if (!form.category) e.category = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eMap = validate();
    if (Object.keys(eMap).length) {
      setErrors(eMap);
      return;
    }

    onSubmit(form);
    setForm(emptyForm);
    setErrors({});
  };

  return (
 <form
  onSubmit={handleSubmit}
  className="bg-white rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
>
  {["name", "price", "category", "stock"].map((field) => (
    <div key={field} className="space-y-1">
      <label className="text-sm font-medium text-slate-700 capitalize">
        {field}
      </label>

      <input
        type={field === "price" || field === "stock" ? "number" : "text"}
        placeholder={`Enter ${field}`}
        value={form[field]}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        className={`h-10 w-full rounded-lg border px-3 text-sm
          ${
            errors[field]
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-300 focus:ring-black"
          }
          focus:outline-none focus:ring-1`}
      />

      {errors[field] && (
        <p className="text-xs text-rose-600">
          {errors[field]}
        </p>
      )}
    </div>
  ))}

  {/* Description */}
  <div className="md:col-span-2 space-y-1">
    <label className="text-sm font-medium text-slate-700">
      Description
    </label>

    <textarea
      rows={4}
      placeholder="Enter product description"
      value={form.description}
      onChange={(e) =>
        setForm({ ...form, description: e.target.value })
      }
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
        focus:outline-none focus:ring-1 focus:ring-black resize"
    />
  </div>

  {/* Submit */}
  <div className="md:col-span-2 flex justify-end pt-2">
    <button
      disabled={isSaving}
      className={`h-10 w-full rounded-lg px-6 text-sm font-medium text-center text-white transition
        ${
          isSaving
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-700"
        }`}
    >
      {isSaving
        ? editingProduct
          ? "Updating..."
          : "Adding..."
        : editingProduct
        ? "Update Product"
        : "Add Product"}
    </button>
  </div>
</form>

  );
};

export default ProductForm;
