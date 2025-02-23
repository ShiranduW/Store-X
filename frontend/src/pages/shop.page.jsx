import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductGrid from "@/components/ProductGrid";
import { fetchProducts, fetchCategories, setFilters } from "@/lib/store/shopSlice";

function ShopPage() {
  const dispatch = useDispatch();
  const { products, categories, loading, error, filters } = useSelector((state) => state.shop);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await dispatch(fetchCategories()).unwrap();
        await dispatch(fetchProducts({ 
          categoryId: 'all', 
          sortBy: 'default' 
        })).unwrap();
      } catch (err) {
        console.error('Error loading initial data:', err);
      }
    };

    loadInitialData();
  }, [dispatch]);

  const handleCategoryChange = (value) => {
    dispatch(setFilters({ categoryId: value }));
    dispatch(fetchProducts({ 
      categoryId: value, 
      sortBy: filters.sortBy 
    }));
  };

  const handleSortChange = (value) => {
    dispatch(setFilters({ sortBy: value }));
    dispatch(fetchProducts({ 
      categoryId: filters.categoryId, 
      sortBy: value 
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shop</h1>
        
        <div className="flex gap-4">
          <Select value={filters.categoryId} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default ShopPage; 