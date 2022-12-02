from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.dndMonsters  # select the database
dndUsers = db.users  # select the collection

user_list = [
          { 
            "name" : "Michael Cousins",
            "username" : "Michael",  
            "password" : b"Morrigan1",
            "email" : "mcousins59@gmail.com",
            "admin" : True
          },
          { 
            "name" : "Matt Mercer",
            "username" : "Matt",  
            "password" : b"Matt",
            "email" : "Matt@mercer.com",
            "admin" : False
          },
       ]

for new_user in user_list:
      new_user["password"] = bcrypt.hashpw(new_user["password"], bcrypt.gensalt())
      dndUsers.insert_one(new_user)
