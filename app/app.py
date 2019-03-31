from flask import Flask, render_template


version = '2.0.0'
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', version=version)

@app.route('/app')
def main():
    return render_template('app.html', version=version)

@app.route('/help')
def help():
    return render_template('help.html', version=version)


if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0', port=80)
