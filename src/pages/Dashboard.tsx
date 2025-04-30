import { useState } from 'react';
import axios from 'axios';
import { NetworkStatus } from '../components/NetworkStatus';
import { DiagnosticPanel } from '../components/DiagnosticPanel';
import { AuroraBackground } from '../components/ui/aurora-background';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { NetworkDiagnostics, DiagnosticResult } from '../lib/diagnostics';

function Dashboard() {
  const [status, setStatus] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);

  const runDiagnostics = async () => {
    setIsLoading(true);
    setStatus('checking');
    try {
      // Run network health check
      const response = await axios.get('http://127.0.0.1:5000/network-health');
      setStatus(response.data.status);
      setReport(response.data.reason);

      // Run diagnostic tests
      const results = await NetworkDiagnostics.runSmartTests();
      setDiagnosticResults(results);


      // Generate fix suggestions
    } catch (error) {
      setStatus('critical');
      setReport('Error fetching report.');
      setDiagnosticResults([]);
    } finally {
      setIsLoading(false);
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
              {isLoading ? 'Running Diagnostics...' : 'Run Diagnostics'}
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
              <p className="text-gray-700 dark:text-gray-300 mb-4">{report}</p>
            </motion.div>
          )}
          <DiagnosticPanel 
            diagnosticResults={diagnosticResults}
          />
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default Dashboard;
