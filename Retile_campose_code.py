import json
import logging
import requests


class Retile():
  headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
  }
  urlFormat = "http://stockpage.10jqka.com.cn/"
  dataPools = []
  proxiesIps = [
    "",
    "223.96.90.216:8085",
  ]
  proxies = {
    "http":"",
  }
  def __init__(self):
    self.session = requests.Session()
  def __call__(self, saveFilename):
    self.getData()
    self.saveData(saveFilename)
  
  def saveData(self, saveFilename):
    """
      # 保存经过检查的公司代号
    """
    with open(f"./data/{saveFilename}", mode="w", encoding="utf-8") as f:
      json.dump(self.dataPools, f)

  def Geturl(self, code):
    return f"{self.urlFormat}{code}/"
  def check_status(self, code):
    """
      ## 检查公司代号是否存在
    """
    response = self.session.get(self.Geturl(code), headers=self.headers, allow_redirects=False, proxies=self.proxies )
    status_code = response.status_code
    if status_code != 200:
      print(f"{code} => err code : {status_code}")
    else:
      print(f"{code} => ok")
    return status_code == 200
  def changeConfig(self, index):
    self.proxies["http"] = self.proxiesIps[index % 2]
  def singleWork(self, idx):
    currentCode = str(idx).zfill(6)
    flag = self.check_status(currentCode)
    if flag:
      self.dataPools.append(currentCode)
    self.changeConfig(idx)
  def getData(self):
    for i in range(999999):
      self.singleWork(i)

def Retile_test():
  r = Retile()
  r("result.json")

if __name__ == '__main__':
  Retile_test()


