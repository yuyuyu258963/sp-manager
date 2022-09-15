import sys
import json
from utils import *
from tkinter.filedialog import Open
import requests
from Retile import Retile
from bs4 import BeautifulSoup as soup
from dateutil import parser as dateutil_parser
from dbHandler import DbHandler
from thread_retile import MyPoolThread

from config import ProxiesIps

class FundParser(object):
  """
    ## 用于解析基金的信息
  """
  @classmethod
  def parse_fundInfo(self, context, **kwargs):
    """
      ## 解析基金简介
    """
    parser = soup(context, "html.parser")
    container = parser.find("div", class_="gener fund-module")
    tableInfo = container.find("ul", class_="g-dialog")
    tableData = {k.text:v.text for k, v in zip(tableInfo.find_all("span", class_="key"), tableInfo.find_all("span", class_="value")) }
    for k, v in zip(container.find_all("div", class_="o-title"), container.find_all("div", class_="g-article")):
      tableData.setdefault(
        k.find("p", class_="name").text, 
        v.find("p").text.strip()
      )
    tableData["_id"] = tableData.get("基金代码", "null")
    return tableData
  
  @classmethod
  def parse_fundManager(self, context, **kwargs):
    """
      ## 解析获得基金经理的信息
    """
    jsonData = json.loads(context).get("data", {})
    managerInfoDetails = jsonData.get("now", {})
    managerInfo_fun = {
      "last": jsonData.get("last", []),
      "now": list(managerInfoDetails.keys()),
    }
    managers = []
    for personId in managerInfoDetails:
      data = managerInfoDetails[personId]
      currentInfo = {
        "_id": personId,
        "name": data.get("name", ""),
        "age": data.get("age", ""),
        "intro": data.get("intro", ""),
        "photo": f'https://fund.10jqka.com.cn/photos/{data.get("photo", "")}',
        "manageFundList": data.get("other", {}),
      }
      managers.append(currentInfo)
    return managers, managerInfo_fun
  
  @classmethod
  def parse_fundNetVal(self, context, fund_code):
    """
      ## 解析获得基金走势的信息
    """
    context = context.replace(f"var ljjz_{fund_code}=", "")
    data = json.loads(context)
    fundNetValPath = {
      f"{item[0][:4]}-{item[0][4:6]}-{item[0][6:]}":float(item[1])
      for item in data
    }
    return {"_id":fund_code, "fund_code": fund_code, "netVal_path":fundNetValPath}
  
  @classmethod
  def parse_fundRanking(self, context, fund_code):
    data = json.loads(context)
    parsedData = {
      k: v
      for k, v in data.items()
    }
    return {"_id": fund_code, "fund_code": fund_code, "rank_data":parsedData}

class FundItemInfoGetter(Retile):
  UrlFormat = "https://fund.10jqka.com.cn/"
  counter = 0
  def __init__(self):
    pass
  
  def __call__(self, fund_code):
    self.start(fund_code)

  def requestFundInfo(self, fund_code="005062"):
    """
      爬取基金信息
    """
    response = requests.get(f"https://fund.10jqka.com.cn/{fund_code}/interduce.html#interduce", headers=self.headers, allow_redirects=False, proxies=self.proxies)
    response.encoding = "utf8"
    if response.status_code == 200:
      return FundParser.parse_fundInfo(response.text)
    else:
      if response.status_code == 500 or response.status_code == 502:
        try:
          ProxiesIps.remove(self.proxies["http"])
          logging.error(f"{fund_code} :: http error: {response.status_code} caused by {self.proxies['http']} " )
        except Exception as e:pass
      logging.warning(f"{fund_code} request requestFundInfo failed: {response.status_code}")
      return None

  def requsetFundManager(self, fund_code="005062"):
    response = requests.get(f"https://fund.10jqka.com.cn/interface/fund/managerInfo?code={fund_code}", headers=self.headers, allow_redirects=False, proxies=self.proxies)
    response.encoding = "utf8"
    if response.status_code == 200:
      return FundParser.parse_fundManager(response.text)
    else:
      if response.status_code == 500 or response.status_code == 502:
        try:
          ProxiesIps.remove(self.proxies["http"])
          logging.error(f"{fund_code} :: http error: {response.status_code} caused by {self.proxies['http']} " )
        except Exception as e:pass
      logging.warning(f"{fund_code} request requsetFundManager failed: {response.status_code}")
      return None, None

  def reqNetValPath(self, fund_code="005062"):
    response = requests.get(f"https://fund.10jqka.com.cn/{fund_code}/json/jsonljjz.json", headers=self.headers, allow_redirects=False, proxies=self.proxies)
    response.encoding = "utf8"
    if response.status_code == 200:
      return FundParser.parse_fundNetVal(response.text, fund_code)
    else:
      if response.status_code == 500 or response.status_code == 502:
        try:
          ProxiesIps.remove(self.proxies["http"])
          logging.error(f"{fund_code} :: http error: {response.status_code} caused by {self.proxies['http']} " )
        except Exception as e:pass
      logging.warning(f"{fund_code} request reqNetValPath failed: {response.status_code}")
      return None

  def reqFundRank(self, fund_code="005062"):
    response = requests.get(f"https://fund.10jqka.com.cn/ifindRank/commonTypeRankInfo_{fund_code}.json", headers=self.headers, allow_redirects=False, proxies=self.proxies)
    response.encoding = "utf8"
    if response.status_code == 200:
      return FundParser.parse_fundRanking(response.text, fund_code)
    else:
      if response.status_code == 500 or response.status_code == 502:
        try:
          ProxiesIps.remove(self.proxies["http"])
          logging.error(f"{fund_code} :: http error: {response.status_code} caused by {self.proxies['http']} " )
        except Exception as e:pass
      logging.warning(f"{fund_code} request reqFundRank failed: {response.status_code}")
      return None
  
  def start(self, fund_code):
    fund_info = self.requestFundInfo(fund_code)
    ManagerList, fund_manager = self.requsetFundManager(fund_code)
    if fund_info is not None and fund_manager is not None:
      fund_info_all = dict(fund_info, **fund_manager)
      DbHandler("fund_info").insert(fund_info_all)
      DbHandler("fund_manager").insert(ManagerList)

    fundNetValPath = self.reqNetValPath(fund_code)
    if fundNetValPath is not None:
      DbHandler("fund_netVal").insert(fundNetValPath)

    fundRank = self.reqFundRank(fund_code)
    if fundRank is not None:
      DbHandler("fund_ranking").insert(fundRank)
    self.counter += 1
    self.proxies["http"] = ProxiesIps[self.counter % len(ProxiesIps)]

def FundItemInfoGetter_code():
  with open("./data/fund_info/kfs_all.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    dataList = data.get("data", {}).get("data", {})
    return [ item[1:] for item in dataList]

def poolRetail_tasks():
  dataList = FundItemInfoGetter_code()
  MyPoolThread(2, FundItemInfoGetter().start, dataList[11:20])()

def test():
  FundItemInfoGetter().start("005062")
  pass



if __name__ == "__main__":
  poolRetail_tasks()
  pass
