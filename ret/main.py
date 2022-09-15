from http.cookies import SimpleCookie
import requests

def praseCookie(response):

  
  pass

proxiesIps = [
  "",
  "223.96.90.216:8085",
]

def test():
  proxies = {
    "http":"",
  }
  s = requests.Session()

  headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
  }
  
  url = "http://stockpage.10jqka.com.cn/600022/"
  response = s.get(url, headers=headers, allow_redirects=False, proxies=proxies )
  response.encoding = 'utf-8'
  print(response.cookies)
  print(response.headers)
  print(response.text)
  print(response.status_code)

  pass

if __name__ == '__main__':
  test()
  pass