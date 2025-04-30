import axios from "axios";
export interface DiagnosticResult {
  issue: string;
  severity: "low" | "medium" | "high" | "critical";
  recommendation: string;
  autoFix?: () => Promise<void>;
}

export interface NetworkPattern {
  type: string;
  frequency: number;
  impact: "low" | "medium" | "high";
  description: string;
}

export class NetworkDiagnostics {
  private static thresholds = {
    latency: { warning: 100, high: 300, critical: 500 },
    packetLoss: { warning: 2, high: 10, critical: 30 },
  };

  static async runSmartTests(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];

    if (!navigator.onLine) {
      results.push(
        {
          issue: "Offline",
          severity: "critical",
          recommendation:
            "Your device is offline. Please connect to a network.",
        },
      );
    }
    try {
      // Latency & Packet Loss Test
      const response = await axios.get("http://127.0.0.1:5000/network-health");
      const latency = response.data.latency;
      const packetLoss = response.data.packetloss;

      // LATENCY CHECK
      if (latency > this.thresholds.latency.critical) {
        results.push({
          issue: "Extreme Network Latency",
          severity: "critical",
          recommendation: "Switch to Ethernet and restart your router.",
        });
      } else if (latency > this.thresholds.latency.high) {
        results.push({
          issue: "High Network Latency",
          severity: "high",
          recommendation: "Reduce network load and check router placement.",
        });
      }

      // PACKET LOSS CHECK
      if (packetLoss > this.thresholds.packetLoss.critical) {
        results.push({
          issue: "Severe Packet Loss",
          severity: "critical",
          recommendation:
            "Try a wired connection and contact your ISP. This level of loss is unacceptable.",
        });
      } else if (packetLoss > this.thresholds.packetLoss.high) {
        results.push({
          issue: "High Packet Loss",
          severity: "high",
          recommendation: "Check cables, switch to Ethernet, and minimize interference.",
        });
      } else if (packetLoss > this.thresholds.packetLoss.warning) {
        results.push({
          issue: "Mild Packet Loss",
          severity: "medium",
          recommendation: "Reboot your modem and check for interference.",
        });
      }

      // Connection Type Info
      const connection = (navigator as any).connection || {};
      const effectiveType = connection.effectiveType || "unknown";

      if (["2g", "slow-2g"].includes(effectiveType)) {
        results.push({
          issue: "Slow Network Connection",
          severity: "high",
          recommendation: "Switch to a faster network like Wi-Fi or 4G/5G.",
        });
      }

      return results
    } catch (err) {
      results.push({
        issue: "Network Diagnostics Error",
        severity: "critical",
        recommendation: "Unable to complete diagnostics. Please check your setup or try again.",
      });
      return  results;
    }
  }
}