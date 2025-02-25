from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import platform
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

def restart_wifi():
    try:
        if platform.system().lower() == "windows":
            adapter_name = "Wi-Fi"  # Change this if necessary
            subprocess.run(["netsh", adapter_name, "disconnect"], check=True)
            time.sleep(5)
            subprocess.run(["netsh", adapter_name, "connect"], check=True)
        else:  # Linux/macOS
            subprocess.run(["nmcli", "radio", "wifi", "off"], check=True)
            time.sleep(5)
            subprocess.run(["nmcli", "radio", "wifi", "on"], check=True)
        
        return "Wi-Fi restarted successfully"
    
    except subprocess.CalledProcessError as e:
        return f"Error: {e}"

@app.route('/restart-wifi', methods=['GET'])
def restart_wifi_api():
    result = restart_wifi()
    return jsonify({"message": result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
