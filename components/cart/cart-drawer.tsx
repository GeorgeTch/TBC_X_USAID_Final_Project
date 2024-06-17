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

export default function CartDrawer() {
  const { cart } = useCartStore();

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="flex items-center justify-center absolute -top-1 -right-0.5 w-4 h-4 bg-primary text-secondary  dark:bg-primary text-xs font-bold rounded-full"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag />
        </div>
      </DrawerTrigger>
      <DrawerContent className="min-h-50vh">
        <DrawerHeader>
          <DrawerTitle>Cart Items</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-auto p-4">
          <CartItems />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
