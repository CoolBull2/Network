from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import platform

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/ping')
def ping():
    target = "google.com"
    
    # Choose the correct ping command based on the OS
    if platform.system().lower() == "windows":
        command = ["ping", "-n", "4", target]  # Windows: -n for count
    else:
        command = ["ping", "-c", "4", target]  # Linux/macOS: -c for count

    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    output, error = process.communicate()
    
    if error:
        return jsonify({"error": error})
    
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
