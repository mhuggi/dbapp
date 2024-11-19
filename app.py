# app.py
from flask import Flask, jsonify, request
import psycopg2
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from datetime import timedelta
from database_config import DATABASE, MONGODB
from bson.objectid import ObjectId


app = Flask(__name__)
CORS(app)

# Create a new client and connect to mongo server
client = MongoClient(MONGODB, server_api=ServerApi('1'))
mongo_db = client['videoplatform']


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

def get_vp1_connection():
    try:
        conn = psycopg2.connect(
            host=DATABASE['host'],
            database=DATABASE['database'],
            user=DATABASE['user'],
            password=DATABASE['password'],
            port=DATABASE['port']
        )
        return conn
    except psycopg2.Error as e:
        print(e)
        return None

@app.route('/users/mongo', methods=['GET'])
def get_mongo_users():
    try:
        collection = mongo_db["users"]
        data = list(collection.find())
        for doc in data:
            doc["_id"] = str(doc["_id"])
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/videos/mongo', methods=['GET'])
def get_mongo_videos():
    try:
        collection = mongo_db["videos"]
        data = list(collection.find())
        for doc in data:
            doc["_id"] = str(doc["_id"])
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/comments/mongo', methods=['GET'])
def get_mongo_comments():
    try:
        collection = mongo_db["comments"]
        data = list(collection.find())
        for doc in data:
            doc["_id"] = str(doc["_id"])
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/channels/mongo', methods=['GET'])
def get_mongo_channels():
    try:
        collection = mongo_db["channels"]
        data = list(collection.find())
        for doc in data:
            doc["_id"] = str(doc["_id"])
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})    
    
@app.route('/notifications/mongo', methods=['GET'])
def get_mongo_notifications():
    try:
        collection = mongo_db["notifications"]
        data = list(collection.find())
        for doc in data:
            doc["_id"] = str(doc["_id"])
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})    

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


@app.route('/users/all', methods=['GET'])
def get_all_users():
    try:
        # PostgreSQL: Fetch users
        conn = get_vp1_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT userid, username, email, country, subscriptioncount FROM usertable")
        postgres_users = cursor.fetchall()
        postgres_columns = [desc[0] for desc in cursor.description]
        postgres_users = [dict(zip(postgres_columns, user)) for user in postgres_users]
        cursor.close()
        conn.close()

        # MongoDB: Fetch users
        mongo_users = list(mongo_db["users"].find({}, {
            "_id": 1, "username": 1, "email": 1, "country": 1, "subscriptioncount": 1
        }))
        for user in mongo_users:
            user["_id"] = str(user["_id"])  # Convert ObjectId to string

        # Combine PostgreSQL and MongoDB users
        combined_users = [
            {
                "id": user.get("userid") or user["_id"],
                "username": user["username"],
                "email": user["email"],
                "country": user["country"],
                "subscriptioncount": user["subscriptioncount"]
            }
            for user in postgres_users + mongo_users
        ]

        return jsonify(combined_users)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/insert/user', methods=['POST'])
def insert_user_postgres():
    try:
        data = request.json
        conn = get_vp1_connection()
        cursor = conn.cursor()
        query = """
        INSERT INTO usertable (username, email, country, subscriptioncount, joindate, password, profilepicture)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            data['username'],
            data['email'],
            data['country'],
            data['subscriptioncount'],
            data['joindate'],  
            data['password'], 
            data['profilepicture'],  
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "User added to PostgreSQL successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/insert/user/mongo', methods=['POST'])
def insert_user_mongo():
    try:
        data = request.json
        mongo_db["users"].insert_one({
            "username": data["username"],
            "email": data["email"],
            "country": data["country"],
            "subscriptioncount": data["subscriptioncount"]
        })
        return jsonify({"message": "User added to MongoDB successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/delete/user/<int:userid>', methods=['DELETE'])
def delete_user_postgres(userid):
    try:
        conn = get_vp1_connection()
        cursor = conn.cursor()
        query = "DELETE FROM usertable WHERE userid = %s"
        cursor.execute(query, (userid,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": f"User with ID {userid} deleted from PostgreSQL successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/delete/user/mongo/<string:user_id>', methods=['DELETE'])
def delete_user_mongo(user_id):
    try:
        result = mongo_db["users"].delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            return jsonify({"error": f"No user found with ID {user_id} in MongoDB"})
        return jsonify({"message": f"User with ID {user_id} deleted from MongoDB successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/update/user/<int:userid>', methods=['PUT'])
def update_user_postgres(userid):
    try:
        data = request.json
        conn = get_vp1_connection()
        cursor = conn.cursor()
        query = """
        UPDATE usertable
        SET username = %s, email = %s, country = %s, subscriptioncount = %s, joindate = %s, password = %s, profilepicture = %s
        WHERE userid = %s
        """
        cursor.execute(query, (
            data['username'],
            data['email'],
            data['country'],
            data['subscriptioncount'],
            data['joindate'],
            data['password'],
            data['profilepicture'],
            userid
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": f"User with ID {userid} updated successfully in PostgreSQL!"})
    except Exception as e:
        return jsonify({"error": str(e)})

from bson.objectid import ObjectId

@app.route('/update/user/mongo/<string:user_id>', methods=['PUT'])
def update_user_mongo(user_id):
    try:
        data = request.json
        result = mongo_db["users"].update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {
                "username": data["username"],
                "email": data["email"],
                "country": data["country"],
                "subscriptioncount": data["subscriptioncount"],
                "joindate": data["joindate"],
                "password": data["password"],
                "profilepicture": data["profilepicture"]
            }}
        )
        if result.matched_count == 0:
            return jsonify({"error": f"No user found with ID {user_id} in MongoDB"})
        return jsonify({"message": f"User with ID {user_id} updated successfully in MongoDB!"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
