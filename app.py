# app.py
from flask import Flask, jsonify, request
import psycopg2
from flask_cors import CORS
from datetime import timedelta
from database_config import DATABASE

app = Flask(__name__)
CORS(app)

# Function to connect to the PostgreSQL database
def get_db_connection(database_name):
    try:
        conn = psycopg2.connect(
            host=DATABASE['host'],
            database=database_name,
            user=DATABASE['user'],
            password=DATABASE['password'],
            port=DATABASE['port']
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
        return None

# Sample route to fetch users
@app.route('/users', methods=['GET'])
def get_users():
    database_name = request.args.get('database')
    conn = get_db_connection(database_name)
    
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM UserTable;")
    users = cursor.fetchall()
    
    # Close cursor and connection
    cursor.close()
    conn.close()

    # Convert results to JSON format
    users_list = []
    for user in users:
        users_list.append({
            "UserID": user[0],
            "Username": user[1],
            "Email": user[2],
            "JoinDate": user[4],
            "Country": user[6],
            "SubscriptionCount": user[7]
        })
    
    return jsonify(users_list)

@app.route('/videos', methods=['GET'])
def get_videos():
    database_name = request.args.get('database')
    conn = get_db_connection(database_name)
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Video;")
    videos = cursor.fetchall()
    
    # Close cursor and connection
    cursor.close()
    conn.close()

    # Convert results to JSON format
    videos_list = []
    for video in videos:
        duration = str(video[4]) if isinstance(video[4], timedelta) else video[4]
        videos_list.append({
            "VideoID": video[0],
            "Title": video[1],
            "Description": video[2],
            "UploadDate": video[3],
            "Duration": duration,
            "Resolution": video[5],
            "FileSize": video[6],
            "VideoFormat": video[7],
            "PrivacySetting": video[8],
            "CategoryID": video[9],
            "ChannelID": video[10],
            "LikesCount": video[11],
            "ViewsCount": video[12]
        })
    
    return jsonify(videos_list)

@app.route('/channels', methods=['GET'])
def get_channels():
    database_name = request.args.get('database')
    conn = get_db_connection(database_name)
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Channel;")
    channels = cursor.fetchall()
    
    # Close cursor and connection
    cursor.close()
    conn.close()

    # Convert results to JSON format
    channels_list = []
    for channel in channels:
        channels_list.append({
            "ChannelID": channel[0],
            "ChannelName": channel[1],
            "Description": channel[2],
            "OwnerID": channel[3],
            "CreatedDate": channel[4],
            "SubscriberCount": channel[5]
        })
    
    return jsonify(channels_list)

@app.route('/notifications', methods=['GET'])
def get_notifications():
    database_name = request.args.get('database')
    conn = get_db_connection(database_name)
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Notifications;")
    notifications = cursor.fetchall()
    
    # Close cursor and connection
    cursor.close()
    conn.close()

    # Convert results to JSON format
    notifications_list = []
    for notification in notifications:
        notifications_list.append({
            "NotiID": notification[0],
            "Text": notification[1],
            "Date": notification[2]
        })
    
    return jsonify(notifications_list)


if __name__ == '__main__':
    app.run(debug=True)
