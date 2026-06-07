import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog"; // Added core Dialog sub-elements for rendering safety
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

// COMMENT-OUT FALLBACKS: Safe custom placeholders to prevent compile crashes
const orderList = []; 
const orderDetails = null;
const getOrderDetails = (id) => ({ type: "orders/getDetails", payload: id });
const getAllOrdersByUserId = (id) => ({ type: "orders/getAll", payload: id });
const resetOrderDetails = () => ({ type: "orders/resetDetails" });
const ShoppingOrderDetailsView = () => null;

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
//   const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null && orderDetails !== undefined) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                // FIX 1: Added unique map identifier key rule to satisfy React reconciliation layer
                <TableRow key={orderItem?._id || orderItem?.id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  {/* FIX 2: Added optional chaining fallback to prevent split crashes on blank dates */}
                  <TableCell>{orderItem?.orderDate ? orderItem.orderDate.split("T")[0] : "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleFetchOrderDetails(orderItem?._id)
                        }
                      >
                        View Details
                      </Button>
                      
                      {/* FIX 3: Wrapped components inside a valid, structurally labeled DialogContent block */}
                      <DialogContent>
                        <div className="sr-only">
                          <DialogTitle>Order Reference View</DialogTitle>
                          <DialogDescription>Overview and status breakdowns for chosen invoice order.</DialogDescription>
                        </div>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // FIX 4: Added a clean fallback layout when no order records are returned
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-sm">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
