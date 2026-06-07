import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner"; // FIX 1: Replaced useToast hook with Sonner's toast mechanism

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        // FIX 2: Added a safety guard. If a cart product isn't found in productList, it won't crash your code.
        if (getCurrentProductIndex > -1) {
          const getTotalStock = productList[getCurrentProductIndex].totalStock;

          console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

          if (indexOfCurrentCartItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              // FIX 3: Swapped to Sonner error alert syntax
              toast.error(`Only ${getQuantity} quantity can be added for this item`);
              return;
            }
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        // FIX 4: Swapped to Sonner success notification syntax
        toast.success("Cart item updated successfully");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        // FIX 5: Swapped to Sonner success notification syntax
        toast.success("Cart item removed successfully");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 border-b border-muted pb-4 last:border-0 last:pb-0">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover bg-muted"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-extrabold text-sm truncate">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="font-semibold text-sm w-4 text-center">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-20 pl-2">
        <p className="font-semibold text-sm text-foreground">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <button
          onClick={() => handleCartItemDelete(cartItem)}
          className="text-muted-foreground hover:text-destructive transition-colors duration-200 p-1 rounded-md"
          aria-label="Delete item"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
