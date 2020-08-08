import os
from pymongo import MongoClient
from flask import Flask, request
# 调试使用
# from flask_cors import CORS
from bson.json_util import dumps


app = Flask(__name__, static_folder="../build", static_url_path="/")
# CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/add_user', methods=('POST', 'GET'))
def add_user():
    if request.method == 'POST':
        request_data = request.get_json()
        print(request_data)
        with MongoClient(os.getenv('MONGO_URI')) as c:
            users = c.ningxin.users
            if users.find_one({"id": request_data.get('id')}):
                return {'error': '重复的id'}
            else:
                users.insert_one(request_data)
                return {'success': request_data.get('user')}
    return {'add_user': None}


@app.route('/api', methods=('POST', 'GET'))
def api():
    if request.method == 'POST':
        request_data = request.get_json()
        print(request_data)
        if request_data.get('history'):
            id = request.get_json().get('history').get('id')
            with MongoClient(os.getenv('MONGO_URI')) as c:
                users = c.ningxin.users
                result = users.find_one({"id": id})
                result = result.get('data')
                print(result)
                return result

        date = request_data.get('transfer_date')
        with MongoClient(os.getenv('MONGO_URI')) as c:
            users = c.ningxin.users
            users.update_one({"id": request_data.get('id')}, {
                             "$set": {"data.{}".format(date): request_data.get('data').get(date)}})
            return {
                'success': '保存成功'
            }

    with MongoClient(os.getenv('MONGO_URI')) as c:
        users = c.ningxin.users
        db_data = users.find()
        db_data = dumps(db_data)
    return db_data
