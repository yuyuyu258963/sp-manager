import time
import requests
from bs4 import BeautifulSoup as soup
from prase import HtmlParser

from config import CompanyAttributes, ProxiesIps
from utils import *
from dbHandler import DbHandler

class CompanyInfoGetter(object):
  headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
  }
  proxies = {
    "http": "218.75.38.154:9091",
  }
  urlFormat = "http://stockpage.10jqka.com.cn/"
  def __init__(self,):
    self.dbHandler = DbHandler()
  
  def __call__(self):
    self.rushData(minMax=[877199, 949999])
  
  @classmethod
  def praseData(self, context):
    return HtmlParser.praseCompany_info(context)
  
  def requsetData(self, company_code):
    url = f"{self.urlFormat}{company_code}/"
    try:
      response = requests.get(url, headers=self.headers, allow_redirects=False)
    except Exception as e:
      print(e)
      logging.error(f"[{company_code}] HTTP response code {e} ")
      return
    if response.status_code == 302:
      logging.warning(f"{company_code} HTTP response code {response.status_code}")
    elif response.status_code == 200:
      try:
        parsedData = self.praseData(response.text)
      except Exception as e:
        logging.error(f"[{company_code}] Error parse {e} ")
        return
      self.dbHandler.insert(parsedData)
    else:
      logging.error(f"[{company_code}] HTTP response code {response.status_code} ")
  def rushData(self, minMax):
    for i in range(minMax[0], minMax[1]):
      print(f"getting {str(i).zfill(6)}",end="", flush=True)
      self.requsetData(str(i).zfill(6))
      print(f"\b" * 14, end="", flush=True)
      self.proxies["http"] = ProxiesIps[i % len(ProxiesIps)]
      # time.sleep(1)

def test():
  task = CompanyInfoGetter()
  task()

if __name__ == "__main__":
  test()
  pass

