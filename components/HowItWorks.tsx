'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Write Your Email',
    description: 'Start by pasting or typing your email content into our analyzer.'
  },
  {
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes the tone, sentiment, and potential impact of your message.'
  },
  {
    icon: Send,
    title: 'Get Insights',
    description: 'Receive detailed feedback and suggestions to optimize your email\'s effectiveness.'
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          variants={fadeInUp} 
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Three simple steps to perfect your email communication
          </p>
        </motion.div>

        <motion.div 
          variants={{
            animate: { transition: { staggerChildren: 0.2 } }
          }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}