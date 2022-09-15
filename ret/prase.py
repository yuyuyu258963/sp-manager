import requests
from selenium import webdriver
from bs4 import BeautifulSoup as soup

from config import CompanyAttributes
from utils import *
from dbHandler import DbHandler

class HtmlParser(object):
  @classmethod
  def praseCompany_info(self, context) -> dict:
    praser = soup(context, "html.parser")
    data = praser.find_all('dl', class_="company_details" )[0].find_all('dd')
    del data[2]
    name = praser.find_all('strong', id="stockNamePlace" )
    company_code = name[0].text[-6:]
    company_name = name[0].text[:-6]
    dataMap = {
      attr: data[idx].text.strip()
      for idx,attr in enumerate(CompanyAttributes)
    }
    dataMap["涉及概念"] = data[1]["title"].strip()
    dataMap["主营业务"] = data[2]["title"].strip()
    dataMap["公司代号"] = company_code
    dataMap["公司名"] = company_name
    dataMap["_id"] = company_code
    return dataMap
  
  @classmethod
  def praseFund_info(self, context) -> dict:
    
    
    pass
  

if __name__ == '__main__':
  pass
