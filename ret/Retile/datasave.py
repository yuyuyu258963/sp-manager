import os
import sys
import json

class DataSaver(object):
  @classmethod
  def save_json(self, filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
      json.dump(data, f, ensure_ascii=False)
    
  
  pass




