"use client";

import { useCartStore } from "@/lib/client-store";
import { ShoppingBag } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import CartItems from "./cart-items";
import Payment from "./payment";
import OrderConfirmed from "./order-confirmed";
import CartHeader from "./cart-header";
import CartProgress from "./cart-progress";
import { useEffect, useMemo } from "react";

export default function CartDrawer() {
  const {
    cart,
    checkoutProgress,
    setCheckoutProgress,
    cartDrawerOpen,
    setCartDrawerOpen,
  } = useCartStore();

  useEffect(() => {
    if (checkoutProgress !== "cart-page" && cart.length > 0) {
      setCheckoutProgress("cart-page");
    }
  }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.variant.quantity;
    }, 0);
  }, [cart]);

  return (
    <Drawer open={cartDrawerOpen} onOpenChange={setCartDrawerOpen}>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="flex items-center justify-center absolute -top-1 -right-0.5 w-5 h-4 bg-primary text-secondary  dark:bg-primary text-xs font-bold rounded-full"
              >
                {totalQuantity}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag />
        </div>
      </DrawerTrigger>
      <DrawerContent className="fixed bottom-0 left-0 max-h-[70vh] min-h-[50vh  ]">
        <DrawerHeader>
          <CartHeader />
        </DrawerHeader>
        <CartProgress />
        <div className="overflow-auto p-4">
          {checkoutProgress === "cart-page" && <CartItems />}
          {checkoutProgress === "payment-page" && <Payment />}
          {checkoutProgress === "confirmation-page" && <OrderConfirmed />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
