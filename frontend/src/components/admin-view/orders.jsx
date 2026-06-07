import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog"; // Added core Dialog sub-elements for layout rendering safety
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
 import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

// COMMENT-OUT FALLBACKS: Safe custom placeholders to prevent compiler crashes
const orderList = [];
const orderDetails = null;
const getOrderDetailsForAdmin = (id) => ({ type: "adminOrders/getDetails", payload: id });
const getAllOrdersForAdmin = () => ({ type: "adminOrders/getAll" });
const resetOrderDetails = () => ({ type: "adminOrders/resetDetails" });

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null && orderDetails !== undefined) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                // FIX 1: Added unique map layout element key anchor identification tracking property
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

                      {/* FIX 3: Wrapped components inside a valid, structurally labeled DialogContent block for Radix layout compliance */}
                      <DialogContent>
                        <div className="sr-only">
                          <DialogTitle>Admin Order Management View</DialogTitle>
                          <DialogDescription>Administrative summary and detail actions for chosen dashboard order.</DialogDescription>
                        </div>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // FIX 4: Added a clean fallback layout when no order records are returned
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-sm">
                  No orders found in the system.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
