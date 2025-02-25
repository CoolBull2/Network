import React from 'react';
import { AuroraBackground } from '../components/ui/aurora-background';
import { motion } from 'framer-motion';
import { FileText, Download, Share2 } from 'lucide-react';

function Reports() {
  const reports = [
    {
      id: 1,
      title: 'Network Performance Report',
      date: '2024-02-28',
      status: 'Completed',
      type: 'Performance'
    }, 
    {
      id: 2,
      title: 'Connectivity Analysis',
      date: '2024-02-27',
      status: 'Completed',
      type: 'Connectivity'
    },
    {
      id: 3,
      title: 'DNS Resolution Test',
      date: '2024-02-26',
      status: 'In Progress',
      type: 'DNS'
    }
  ];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl px-4 py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Network Reports
          </h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate New Report
          </button>
        </div>

        <div className="grid gap-4">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span
                      className={`${
                        report.status === 'Completed'
                          ? 'text-green-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default Reports;