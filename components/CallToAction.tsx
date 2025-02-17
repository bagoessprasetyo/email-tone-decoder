'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function CallToAction() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Ready to Perfect Your Email Communication?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of professionals who trust our AI-powered tool to ensure their emails strike the right tone, every time.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-10"
        >
          <Link
            href="/analyze"
            className={cn(
              "inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-white shadow-sm",
              "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300",
              "dark:from-blue-500 dark:to-blue-400 dark:hover:from-blue-400 dark:hover:to-blue-300",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            )}
          >
            Try Email Analyzer Now
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            No credit card required · Free to try
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}