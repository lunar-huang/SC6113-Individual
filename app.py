from flask import Flask, render_template, request
import os
import mysql.connector
import mysql.connector.pooling

app=Flask(__name__)

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="34.66.188.87",   # 替换为你的Cloud SQL实例IP
            user="root",                # 数据库用户名
            password="root",        # 数据库密码
            database="sc6113"       # 数据库名称
        )
        if conn.is_connected():
            print("成功连接到数据库")
            return conn
    except mysql.connector.Error as e:
        print(f"连接数据库失败: {e}")
        return None


""" # 使用 Google Cloud SQL Connector 创建连接池
connector = Connector() """



@app.route('/',methods=["get","post"])
def index():
    return render_template('index.html')

@app.route('/main',methods=["get","post"])
def main():
    username = request.form.get("q")
    print(f"{username}")
    """     conn = get_db_connection()
        cursor = conn.cursor()
        # Insert the new user into the database
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        user = conn.fetchone()

        if user:
            # 用户已经存在，直接跳过插入
            print(f"User {username} already exists, skipping insert.")
        else:
            # 用户不存在，插入新用户并记录创建时间
            print(f"User {username} does not exist, inserting new user.")
            cursor.execute('INSERT INTO users (username) VALUES (?)', (username,))
            conn.commit()

        conn.close() """
    return render_template('main.html',username=username)

@app.route('/deposit',methods=["get","post"])
def deposit():
    return render_template('deposit.html')

@app.route('/borrow',methods=["get","post"])
def borrow():
    return render_template('borrow.html')




if __name__=='__main__':
    app.run()
