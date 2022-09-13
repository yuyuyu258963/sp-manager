from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from utils import *

class DbHandler(object):
  """
    ## 处理数据存入数据 

  """
  connectStatus = False
  schema = None

  def __init__(self):
    self.connect()
  
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
    if self.connectStatus: return self
    db = MongoClient(f"mongodb://root:ywh@{ip}:{port}")
    my_db = db[databaseName]           #打开对应的数据库
    schema = my_db[schemaName]         #打开数据库的中的表
    self.schema = schema
    self.connectStatus = True
    return self

  def insert(self, data):
    """
      ## 插入数据
    """
    if isinstance(data, list):
      try:
        self.schema.insert_many(data)
      except DuplicateKeyError:
        logging.warning(f"Error inserting_one repeat {data}")
      except Exception as e:
        print(type(e.errmsg))
        logging.warning(f"Error inserting_many repeat {data}")
    elif isinstance(data, dict):
      try:
        self.schema.insert_one(data)
      except DuplicateKeyError:
        print("重复插入了")
        logging.warning(f"Error inserting_one repeat {data}")
      except Exception as e:
        logging.warning(f"Error inserting_one {data}")

def DbHandler_test():
  handler = DbHandler().insert({"_id":"000001"})

if __name__ == "__main__":
  DbHandler_test()


