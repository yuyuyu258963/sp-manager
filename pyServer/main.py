# -*- coding: UTF-8 -*-
import os
import json
from io import BytesIO

import sys
sys.path.append(r'C:\Users\Administrator\Desktop\sp-manager')

from flask import Flask, request, Blueprint, render_template, make_response, session, flash
from ret.dbHandler import DbHandler
from flask_mail import Mail, Message
from picture import validate_picture
import models




app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.urandom(24)

schema = DbHandler("fund_netVal").schema
id = schema.distinct('_id')

@app.route('/show', methods=['POST', 'GET'])
def getAllData():
    # id = getId()
    schema = DbHandler("fund_info").schema
    data = []
    index = 0
    for item in schema.find():
        if item["_id"] in id:
            index += 1
            item = dict((key, item[key]) for key in ["_id", "基金全称", "基金类型", "基金经理", "成立日期",
                                                     "成立规模", "份额规模", "首次最低金额（元）",
                                                     "托管费", "基金管理人", "最高认购费", "最高申购费", "最高赎回费"])
            data.append(item)
        if index == 100:
            break
    print("getAllData Success")
    return json.dumps(data, ensure_ascii=False)

@app.route('/trend/net', methods=['POST', 'GET'])
def getNetData():
    
    id = request.data.decode()
    id = id.split('"')[3]
    schema = DbHandler("fund_netVal").schema
    index = 0
    data = []
    net = schema.find({"_id":id})
    if net == []:
        print("getNetData Error")
    else:
        net = net[0]["netVal_path"]
        for time in net.keys():
            data.append([time, net[time]])
        print("getNetData Success")
    return data


cr_code = ""

@app.route('/rank', methods=['POST', 'GET'])
def getRankData():
    id = request.data.decode()
    id = id.split('"')[3]
    schema = DbHandler("fund_ranking").schema
    index = 0
    data = []
    rank = schema.find({"_id": id})
    if rank == []:
        print("getRankData Error")
    else:
        rank = rank[0]["rank_data"]
        for time in rank.keys():
            data.append([time, rank[time]])
        print("getRankData Success")
    return data


@app.route('/code', methods=['POST', 'GET'])
def get_code():
    image, str = validate_picture()
    # 将验证码图片以二进制形式写入在内存中，防止将图片都放在文件夹中，占用大量磁盘
    buf = BytesIO()
    image.save(buf, 'jpeg')
    buf_str = buf.getvalue()
    # 把二进制作为response发回前端，并设置首部字段
    response = make_response(buf_str)
    response.headers['Content-Type'] = 'image/gif'
    # 将验证码字符串储存在session中
    session['image'] = str
    print("code success")
    return {"response":response, "str":str}
    # return response


@app.route('/login', methods=['POST', 'GET'])
def login():
    signal = '1'
    username = request.form.get('username')
    password = request.form.get('password')
    schema = DbHandler("user").schema
    user = models.UserModel("a").User()

    if user == []:
        signal = '1'
        flash(u'用户不存在')
        print("login error")
        return signal

    if username == user[0] and password == user[1]:
        signal = '0'
        print("login success")

    else:
        signal = '2'
        flash(u'用户名或密码输入错误')
        print("login error")
    return signal

@app.route('/register', methods=['POST', 'GET'])
def register():
    signal = '0'
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        password2 = request.form.get('password2')
        code = request.form.get("code")

        if not all([username, password, password2]):
            signal = '1'
            flash(u'参数不完整')
            print("register error")
        elif password != password2:
            signal = '2'
            flash(u'两次密码不一致')
            print("register error")
        elif code != cr_code:
            signal = '3'
            flash(u'验证码有误')
            print("register error")
        else:
            handler = DbHandler("admin").insert({"username": username, "password": password})
            signal = '0'
            print("register success")

    return signal

if __name__ == '__main__':
    # getNetData()
    # getAllData()
    # getRankData()
    # get_code()
    app.run(host='0.0.0.0', port=5590)
