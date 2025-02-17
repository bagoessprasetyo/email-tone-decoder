'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./ui/shimmer-button";
import { GeistSans } from 'geist/font/sans';
import { AuthDialog } from "./ui/auth-dialog";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Hero() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950"
    >
      <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))]" />
      
      <motion.div
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className={cn(
          "relative z-10 flex flex-col items-center justify-center min-h-[80vh] space-y-12 px-4 sm:px-6 lg:px-8",
          GeistSans.className
        )}
      >
        <motion.div
        className="mt-6 flex items-center justify-center gap-x-2"
          variants={fadeInUp}
        >
            <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                Powered by DeepSeek-R1
                </span>
            </ShimmerButton>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className={cn(
            "text-4xl font-bold tracking-tight text-center bg-gradient-to-r from-gray-900 via-blue-800 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-100 bg-clip-text text-transparent sm:text-6xl max-w-4xl mx-auto",
            GeistSans.className
          )}
        >
          AI-Powered <br></br>Email Tone Decoder
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg leading-8 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Understand the emotional tone of your emails before sending them. Our AI-powered tool helps you communicate more effectively by analyzing and suggesting improvements to your message tone.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <AuthDialog>
            <Button size="lg" className="rounded-full">
              Try for free
            </Button>
          </AuthDialog>
          <Link
            href="#features"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}