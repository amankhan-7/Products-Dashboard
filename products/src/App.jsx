import { useState, useEffect } from "react";
import { initialProducts } from "./data/initialProducts";
import { useDebounce } from "./hooks/useDebounce";
import ProductForm from "./components/productForm";
import ProductList from "./components/productList";
import SearchBar from "./components/searchBar";
import Pagination from "./components/Pagination";

const ITEMS_PER_PAGE = 6;
const STORAGE_KEY = "products";
const VIEW_KEY = "product_view";

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
  });
  const [search, setSearch] = useState("");
  const [view, setView] = useState(() => {
    return localStorage.getItem(VIEW_KEY) || "table";
  });
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (stored.length !== initialProducts.length) {
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        setProducts(initialProducts);
      }, 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(VIEW_KEY, view);
  }, [view]);

  const debouncedSearch = useDebounce(search);

  //  filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  //  pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  //  add / edit
  const handleSave = (product) => {
    setIsSaving(true);

    setTimeout(() => {
      if (product.id) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? product : p))
        );
      } else {
        setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
      }

      setEditing(null);
      setIsSaving(false);
    }, 600); // realistic UI delay
  };

  // if (isInitializing) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-lg font-medium">Loading products…</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Product Manager
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your catalog, pricing, and inventory
            </p>
          </div>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search */}
          <div className="w-full md:w-1/2">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* View Toggle */}
          <div className="flex w-full rounded-lg border border-slate-200 bg-slate-50 p-1 sm:inline-flex sm:w-auto">
            <button
              onClick={() => setView("table")}
              className={`flex-1 sm:flex-none sm:px-4 py-1.5 text-sm font-medium rounded-md transition
      ${
        view === "table"
          ? "bg-black shadow text-white"
          : "text-slate-700 hover:text-slate-900"
      }`}
            >
              Table
            </button>

            <button
              onClick={() => setView("grid")}
              className={`flex-1 sm:flex-none sm:px-4 py-1.5 text-sm font-medium rounded-md transition
      ${
        view === "grid"
          ? "bg-black shadow text-white"
          : "text-slate-700 hover:text-slate-900"
      }`}
            >
              Grid
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 py-2">
          <ProductForm
            key={editing?.id || "new"}
            onSubmit={handleSave}
            editingProduct={editing}
            isSaving={isSaving}
          />
        </div>

        {/* List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <ProductList
            products={paginatedProducts}
            view={view}
            onEdit={setEditing}
          />
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default App;
