# Complete initial scraping using BeautifulSoup, Pandas, and Requests/Splinter.

from bs4 import BeautifulSoup as bs
from splinter import Browser
import pandas as pd
import requests
import time
#from flask_pymongo import PyMongo

def get_browser():
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)
    return browser

def get_soup(url):
    browser = get_browser()
    browser.visit(url)
    html = browser.html
    soup = bs(html, 'html.parser') 
    browser.quit()
    return soup

def nasa_mars_news():

    news_dict = {}

    nmn_url = 'https://mars.nasa.gov/news'

    response = requests.get(nmn_url)

    nmn = bs(response.text, 'html.parser')

    news_dict["News Headline"] = nmn.find('div', class_='content_title').text
    
    news_dict["News Text"] = nmn.find('div', class_='rollover_description_inner').text

    return news_dict

def featured_mars_image():

    image_dict = {}

    
    jpl_url = 'https://www.jpl.nasa.gov'
    search_url = jpl_url + '/spaceimages/?search=&category=Mars'

    soup = get_soup(search_url)

    relative_image_path = soup.find('footer').find('a')['data-fancybox-href']
    
    image_dict["Featured Image"] = jpl_url + relative_image_path

    return image_dict

def mars_weather():

    weather_dict = {}

    mw_url = 'https://twitter.com/marswxreport?lang=en'
    
    mw_soup = get_soup(mw_url)

    weather_dict["Mars Weather Tweet"] = mw_soup.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text').text

    return weather_dict

def mars_facts():

    facts_dict = {}

    mf_url = 'https://space-facts.com/mars/'

    mf_tables = pd.read_html(mf_url)

    mf_df = mf_tables[0]

    mf_df.columns=['', 'Value']
    
    facts_dict["Mars Facts Table"] = mf_df.to_html(index=False)

    return facts_dict

def mars_hemispheres():

    hemispheres_dict = {}

    # Empty list for storing links
    links = []
    browser = get_browser()

    mh_url = 'https://astrogeology.usgs.gov'
    mh_search = mh_url + '/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(mh_search)

    elements = browser.find_link_by_partial_text('Hemisphere Enhanced')
    for element in elements:
        links.append(element['href'])


    for link in links:

        time.sleep(1)

        browser.visit(link)
    
        html = browser.html
        
        mh_soup = bs(html, 'html.parser')
        
        # Retrieve hemisphere links & titles
        mh_img = mh_url + mh_soup.find('img', class_='wide-image')['src']
            
        mh_title = mh_soup.find('h2', class_='title').text
 
        # Append dictionary to list. 
        hemispheres_dict[mh_title]=mh_img
          
        # Remove key-value pairs equal to 'None'
        #hemispheres_dict = [i for i in hemispheres_dict if i['img_url'] and i['title']]
    
    browser.quit()

    return hemispheres_dict

def scrape_info ():
    mars_data = {}
    mars_data.update(nasa_mars_news())
    mars_data.update(featured_mars_image())
    mars_data.update(mars_weather())
    mars_data.update(mars_facts())
    mars_data['hems']= mars_hemispheres()
   
    return mars_data
   



