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
            "admin" : True,
            "encounters" : [],
            "monstersCreated" : []
          },
          { 
            "name" : "Matt Mercer",
            "username" : "Matt",  
            "password" : b"Matt",
            "email" : "Matt@mercer.com",
            "admin" : False,
            "encounters" : [],
            "monstersCreated" : []
          }
       ]

for new_user in user_list:
      dndUsers.insert_one(new_user)
