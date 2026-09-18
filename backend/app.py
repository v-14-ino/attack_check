from flask import Flask
from flask_cors import CORS
from routes.report_routes import report_bp

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Register blueprints
app.register_blueprint(report_bp, url_prefix='/api/reports')

if __name__ == '__main__':
    app.run(debug=True, port=5002)
