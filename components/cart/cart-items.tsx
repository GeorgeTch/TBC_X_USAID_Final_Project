"use client";

import { useCartStore } from "@/lib/client-store";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import formatPrice from "@/lib/format-price";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import emptyCart from "@/public/empty-cart.json";
import { createId } from "@paralleldrive/cuid2";

export default function CartItems() {
  const { cart, addToCart, removeFromCart } = useCartStore();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.variant.quantity;
    }, 0);
  }, [cart]);

  const lettersForPrice = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => {
      return { letter, id: createId() };
    });
  }, [totalPrice]);

  return (
    <motion.div>
      <div>
        {cart.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center">
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <h2 className="text-center text-2xl text-muted-foreground">
                Your cart is empty
              </h2>
              <Lottie className="h-64" animationData={emptyCart} />
            </motion.div>
          </div>
        )}
        {cart.length > 0 && (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.variant.variantID}>
                    <TableCell>{item.name}</TableCell>

                    <TableCell>{formatPrice(item.price)}</TableCell>

                    <TableCell>
                      <div>
                        <Image
                          className="rounded-md"
                          width={48}
                          height={48}
                          src={item.image}
                          alt={item.name}
                          priority
                        />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-between">
                        <MinusCircle
                          className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                          size={14}
                          onClick={() => {
                            removeFromCart({
                              ...item,
                              variant: {
                                variantID: item.variant.variantID,
                                quantity: 1,
                              },
                            });
                          }}
                        />
                        <p className="font-bold">{item.variant.quantity}</p>
                        <PlusCircle
                          className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                          onClick={() => {
                            addToCart({
                              ...item,
                              variant: {
                                quantity: 1,
                                variantID: item.variant.variantID,
                              },
                            });
                          }}
                          size={14}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <motion.div className="flex items-center justify-center overflow-hidden relative my-2">
        <span>Total: $ </span>
        <AnimatePresence mode="popLayout">
          {lettersForPrice.map((char, i) => (
            <motion.div key={char.id}>
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: i * 0.1 }}
                className="inline-block"
              >
                {char.letter}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
