import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle} from 'lucide-react';
import { DiagnosticResult } from '../lib/diagnostics';

interface DiagnosticPanelProps {
  diagnosticResults: DiagnosticResult[];
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({
  diagnosticResults,
}) => {
  
  const getSeverityColor = (severity: DiagnosticResult['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  const getSeverityBadge = (severity: DiagnosticResult['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const timestamp = new Date().toLocaleTimeString();

  const hasNoIssues = diagnosticResults.length === 0;
  console.log(diagnosticResults.length)
 
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Last checked: {timestamp}</p>
      </div>

      <AnimatePresence>
        {hasNoIssues ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
              ✅ Everything Looks Great!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              No network issues were detected at the moment.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            {/* Current Issues */ }
            {diagnosticResults.length > 0 && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Current Issues</h3>
                </div>
                <div className="space-y-4">
                  {diagnosticResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-semibold ${getSeverityColor(result.severity)}`}>
                          {result.issue}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityBadge(
                            result.severity
                          )}`}
                        >
                          {result.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {result.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
