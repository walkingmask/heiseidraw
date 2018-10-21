from flask import Flask, render_template


version = '1.1.0'
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/app')
def main():
    return render_template('app.html', version=version)


if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0', port=80)
