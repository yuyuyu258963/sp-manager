from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from utils import *

class DbHandler(object):
  """
    ## 处理数据存入数据 

  """
  schema = None

  def __init__(self,schemaName="company_info"):
    self.connect(schemaName=schemaName)
  
  @property
  def db(self):
    assert self.schema is not None, "db is not set"
    return self.schema
  
  @classmethod
  def connect(self,ip="121.4.249.181",port="668",databaseName="Ywh",schemaName="company_info"):
    """
        :param url: ip地址
        :param port_id:连接数据库的端口  默认为688
        :param databaseName:  对应的数据库名字
        :param schemaName: 操作的表明
        :return schema: 表的实体
    """
    db = MongoClient(f"mongodb://root:ywh@{ip}:{port}")
    my_db = db[databaseName]           #打开对应的数据库
    schema = my_db[schemaName]         #打开数据库的中的表
    self.schema = schema
    return self
  
  def insert_one(self, itemData):
    try:
      self.schema.insert_one(itemData)
    except DuplicateKeyError:
      print("重复插入了")
      logging.warning(f"Error inserting_one repeat {itemData}")
    except Exception as e:
      logging.warning(f"Error inserting_one {itemData}")

  def insert(self, data):
    """
      ## 插入数据

      采用粒度化插入避免同时插入多条数据的时候出错
    """
    if isinstance(data, list):
      for itemData in data:
        self.insert_one(itemData)
    elif isinstance(data, dict):
      self.insert_one(data)

def DbHandler_test():
  handler = DbHandler().insert({"_id":"000001"})

if __name__ == "__main__":
  DbHandler_test()


