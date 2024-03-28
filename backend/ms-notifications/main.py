from flask import Flask
from dotenv import load_dotenv
from waitress import serve

load_dotenv()
app = Flask(__name__)


if __name__ == '__main__':
    print('server running')
    serve(app, host='0.0.0.0', port=5000)