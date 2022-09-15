
import json
import time
import requests
from selenium import webdriver
from bs4 import BeautifulSoup as soup

from Retile import Retile
from datasave import DataSaver

# 开放式基金的
attribute_tree = {
  "kfs": {
    "gpx",
    "zqx",
    "hhx",
    "etf",
    "lof",
    "qdii",
    "bxx",
    "asx",
  },
}

class FundInfoGetter(Retile):
  UrlFormat = "https://fund.10jqka.com.cn/datacenter/jz/"
  def __init__(self):
    pass
  
  def __call__(self):
    pass
  
  def requsetData(self):
    url = f"{self.UrlFormat}kfs/gpx"
    response = requests.get("https://fund.10jqka.com.cn/data/Net/info/all_rate_desc_0_0_1_9999_0_0_0_jsonp_g.html", allow_redirects=True)
    # response.encoding = response.apparent_encoding
    response.encoding = "utf-8"
    print(response.status_code)
    print(json.loads(response.text[2:-1]))
    DataSaver.save_json("../data/fund_info/kfs_all.json", json.loads(response.text[2:-1]))


def FundInfoGetter_test():
  FundInfoGetter().requsetData()
  pass

def test():
  bro=webdriver.Chrome(r'chromedriver.exe')
# 打开浏览器发起请求
  bro.get('https://fund.10jqka.com.cn/datacenter/jz/kfs/zsx/')
  button = bro.find_element_by_class_name('s_search')
  button.click()
  time.sleep(1)
  
  time.sleep(30)
  print(bro.page_source)
  # bs = soup(bro.page_source, "html.parser").find_all("div", class_="funds_items" )
  bs = soup(bro.page_source, "html.parser").find_all("table", class_="m_table pd_detail_yh" )
  print(bs)
  time.sleep(10)


if __name__ == '__main__':
  FundInfoGetter_test()
  # test()
  pass


