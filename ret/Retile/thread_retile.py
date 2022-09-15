import time
from threading import Thread, Lock, Semaphore, Condition


class MyPoolThread():
  """
    ## 模拟一个线程池
  """
  counter = 0

  def __init__(self, threadNum, task, arguments):
    self.s = Semaphore(threadNum)
    self.task = task
    self.arguments = arguments
  
  def __call__(self):
    self.runAll()
    while self.counter < len(self.arguments):
      pass
    print("finished all task")
  
  def funWarper(self, *args, **kwargs):
    self.s.acquire()
    time.sleep(2)
    print(f"  <{args[0]}>  ")
    self.task(*args, **kwargs)
    self.counter += 1
    self.s.release()
  
  def runAll(self):
    for arg in self.arguments:
      t = Thread(target=self.funWarper, args=([arg])).start()

def MyPoolThread_test():
  MyPoolThread(2, print, [1,2,3,4,5,6,7,8,9,10])()


if __name__ == '__main__':
  MyPoolThread_test()

