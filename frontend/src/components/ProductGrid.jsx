import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product._id} className="p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground">${product.price}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {product.categoryId?.name}
          </p>
          <Button className="w-full">Add to Cart</Button>
        </Card>
      ))}
    </div>
  );
}

export default ProductGrid; 