"use client";
import { useCartStore } from "@/lib/client-store";
import { motion } from "framer-motion";
import { Check, CreditCard, ShoppingCartIcon } from "lucide-react";

export default function CartProgress() {
  const { checkoutProgress } = useCartStore();

  return (
    <div className="flex justify-center items-center pb-6">
      <div className="relative w-64 h-3 bg-muted rounded-md">
        <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full">
          <motion.span
            className="absolute left-0 top-0 h-full rounded-md bg-primary dark:bg-secondary-foreground z-10"
            initial={{ width: 0 }}
            animate={{
              width:
                checkoutProgress === "cart-page"
                  ? 0
                  : checkoutProgress === "payment-page"
                  ? "50%"
                  : "100%",
            }}
          />

          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-primary dark:bg-secondary text-white rounded-full p-2 z-20"
          >
            <ShoppingCartIcon className="text-white" size={14} />
          </motion.div>

          <motion.div
            animate={{
              scale:
                checkoutProgress === "payment-page"
                  ? 1
                  : 0 || checkoutProgress === "confirmation-page"
                  ? 1
                  : 0,
            }}
            initial={{ scale: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-primary dark:bg-secondary text-white rounded-full p-2 z-20"
          >
            <CreditCard className="text-white" size={14} />
          </motion.div>

          <motion.div
            animate={{
              scale: checkoutProgress === "confirmation-page" ? 1 : 0,
            }}
            initial={{ scale: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-primary dark:bg-secondary text-white rounded-full p-2 z-20"
          >
            <Check className="text-white" size={14} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
