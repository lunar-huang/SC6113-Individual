from flask import Flask,render_template,request
import mariadb

app=Flask(__name__)


def get_db_connection():
    conn = mariadb.connect(
        user="root",  # Your MariaDB username
        password="root",  # Your MariaDB password
        host="localhost",
        database="SC6113"  # The database you created
    )
    return conn

@app.route('/',methods=["get","post"])
def index():
    return render_template('index.html')

@app.route('/main',methods=["get","post"])
def main():
    username = request.form.get("q")
    print(f"{username}")
    conn = get_db_connection()
    cursor = conn.cursor()
    # Insert the new user into the database
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()

    if user:
        # 用户已经存在，直接跳过插入
        print(f"User {username} already exists, skipping insert.")
    else:
        # 用户不存在，插入新用户并记录创建时间
        print(f"User {username} does not exist, inserting new user.")
        cursor.execute('INSERT INTO users (username) VALUES (?)', (username,))
        conn.commit()

    conn.close()
    return render_template('main.html',username=username)

@app.route('/deposit',methods=["get","post"])
def deposit():
    return render_template('deposit.html')

@app.route('/borrow',methods=["get","post"])
def borrow():
    return render_template('borrow.html')




if __name__=='__main__':
    app.run()
