import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { AuroraBackground } from '../components/ui/aurora-background';

const fixes = [
  {
    title: 'Run Network Test',
    content: 'Use the dashboard to run a diagnostic check on your current network connection.',
  },
  {
    title: 'Try a Different Site',
    content: 'Some websites may be down. Try accessing a different one like google.com or wikipedia.org.',
  },
  {
    title: 'Restart the Wi-Fi Adapter',
    content: (
      <>
        <p className="mb-2">This can help reinitialize your network adapter and resolve connectivity issues.</p>
        <button
          
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          Restart Adapter
        </button>
      </>
    ),
  },
  {
    title: 'Restart Your Modem, Router or Access Point',
    content: 'Power cycling your router can often resolve intermittent or dropped connections.',
  },
  {
    title: 'Restart Your PC',
    content: 'A simple restart can fix software or configuration issues related to networking.',
  },
];

function Issues() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto px-4 py-10"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Common Network Fixes
        </h1>

        <div className="space-y-4">
          {fixes.map((fix, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <span>{fix.title}</span>
                {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              <AnimatePresence initial={false}>
  {openIndex === index && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.01, ease:'linear' }} 
      className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600"
    >
      {typeof fix.content === 'string' ? <p>{fix.content}</p> : fix.content}
    </motion.div>
  )}
</AnimatePresence>

            </div>
          ))}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default Issues;
