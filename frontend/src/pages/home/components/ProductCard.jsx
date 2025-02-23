import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";

function ProductCard(props) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (props.stockQuantity < 1) {
      return;
    }
    
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
        stockQuantity: props.stockQuantity
      })
    );
  };

  return (
    <Card>
      <div className="h-80 bg-card rounded-lg p-4 relative">
        <img src={props.image} className="block" />
        {props.stockQuantity < 1 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
        {props.stockQuantity > 0 && props.stockQuantity <= 5 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded">
            Low Stock: {props.stockQuantity}
          </div>
        )}
      </div>
      <div className="flex px-4 mt-4 items-center justify-between">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">${props.price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="mt-1 p-4">
        <Button 
          className="w-full" 
          onClick={handleClick}
          disabled={props.stockQuantity < 1}
        >
          {props.stockQuantity < 1 ? 'Out of Stock' : 'Add To Cart'}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
