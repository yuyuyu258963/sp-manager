import hashlib
import os

from PIL import Image, ImageFont, ImageDraw, ImageFilter
import random
from random import randint

def get_random_color():
   # 随机颜色RGB
   return randint(120, 200), randint(120, 200), randint(120, 200)

def validate_picture():
    total = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345789'
    # 图片大小130 x 50
    width = 130
    heighth = 50
    # 先生成一个新图片对象
    im = Image.new('RGB',(width, heighth), 'white')
    # 设置字体
    font = ImageFont.truetype('consola.ttf', 40)
    # 创建draw对象
    draw = ImageDraw.Draw(im)
    str = ''
    # 输出每一个文字
    for item in range(4):
        text = random.choice(total)
        str += text
        draw.text((5+random.randint(4,7)+20*item,5+random.randint(3,7)), text=text, fill=get_random_color(),font=font )

    # 划几根干扰线
    for num in range(8):
        x1 = random.randint(0, width/2)
        y1 = random.randint(0, heighth/2)
        x2 = random.randint(0, width)
        y2 = random.randint(heighth/2, heighth)
        draw.line(((x1, y1),(x2,y2)), fill=get_random_color(), width=1)

    im = im.filter(ImageFilter.FIND_EDGES)
    return im, str

