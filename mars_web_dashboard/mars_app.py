from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars 

# Use flask_pymongo to set up mongo connection
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")


@app.route("/")
def index():
    scrape_data = mongo.db.mars_data.find_one()
    print(scrape_data)
    return render_template("index.html", mars_data=scrape_data)

@app.route("/scrape")
def scrape():
    mars_data = mongo.db.mars_data
    data = scrape_mars.scrape_info()
    mars_data.update({}, data, upsert=True)
    return redirect ("/" , code=302)
    

if __name__ == "__main__":
    app.run(debug=True)