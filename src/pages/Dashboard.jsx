"use client";

import React, { useState } from "react";
import axios from "axios";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";
import {Activity , RefreshCw, FileText} from 'lucide-react'
import {NetworkStatus} from '../components/NetworkStatus'

function Dashboard() {
  const [status, setStatus] = useState(null);
  const [report, setReport] = useState(null); // Store ping & packet loss details
  const [isLoading,setIsLoading] = useState(false);

  const runDiagnostics = async () => {
    setStatus("checking");
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/network-health");
      setStatus(response.data.status);
      setReport(null); // Reset report when running diagnostics
    } catch (error) {
      setStatus("critical");
    }
    finally {
      setIsLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/network-health");
      setReport(response.data.reason); // Store ping & packet loss details
    } catch (error) {
      setReport("Error fetching report.");
    }
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl px-4 py-8"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Network Health Monitor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Real-time network diagnostics and monitoring
          </p>
        </div>

        <div className="grid gap-6">
          <NetworkStatus status={status} />

          <div className="flex gap-4 justify-center">
            <button
              onClick={runDiagnostics}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Activity className="w-5 h-5" />
              Run Diagnostics
            </button>
            <button
              onClick={generateReport}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Generate Report
            </button>
          </div>

          {report && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Network Report
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{report}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default Dashboard;
