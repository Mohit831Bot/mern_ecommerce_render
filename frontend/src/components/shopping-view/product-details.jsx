import { Dialog, DialogContent } from "@/components/ui/dialog";
import {Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner"; // CHANGED: Imported new toast mechanism

function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    function handleAddtoCart(getCurrentProductId){
        dispatch(addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1,
        })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product is added to cart");
            }
        }); 
    }




  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* FIX 1: Changed grid-cols-2 to stack as 1 column on mobile and 2 columns on medium+ screens */}
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto">
        
        {/* Product Image Wrapper */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Product Details Wrapper */}
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4 ">
              {productDetails?.description}
            </p>
          </div>

          {/* Pricing Section */}
          <div className="flex items-center justify-between mt-auto">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through text-muted-foreground text-2xl" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-3xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            )}
          </div> {/* FIX 2: Added the missing closing </div> tag here */}


          <div className="mt-5 mb-5">
            <Button className="w-full" onClick={()=>handleAddtoCart(productDetails?._id)}>Add to Cart</Button>


          </div>

 <Separator/>
        </div>
       

      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
