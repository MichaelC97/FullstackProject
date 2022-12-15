from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)


client = MongoClient("mongodb://127.0.0.1:27017")
db = client.dndMonsters  # select the database
dndMonsters = db.monsters  # select the collection
dndUsers = db.users
blacklist = db.blacklist


def login():
    auth = request.authorization
    if auth:
        user = staff.find_one({'username': auth.username})
        if user is not None:
            if bcrypt.checkpw(bytes(auth.password, 'UTF-8'), user["password"]):
                token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                                    }, app.config['SECRET_KEY'])
                return make_response(jsonify({'token': token.decode('UTF-8')}), 200)
            else:
                return make_response(jsonify({'message': 'Bad password'}), 401)
        else:
            return make_response(jsonify({'message': 'Bad username'}), 401)
    return make_response(jsonify(
        {'message': 'Authentication required'}), 401)


@app.route("/api/v1.0/allmonsters", methods=["GET"])
def show_all_monsters():
    page_num, page_size = 1, 1000
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))
    data_to_return = []
    for monster in dndMonsters.find().skip(page_start).limit(page_size):
        monster['_id'] = str(monster['_id'])
        data_to_return.append(monster)

    return make_response(jsonify(data_to_return), 200)

#Show all encounters
@app.route("/api/v1.0/allEncounters/<string:email>", methods=["GET"])
def show_all_encounters(email):
    print("in here")
    encounter = dndUsers.find_one({"email": email})
    if encounter is not None:
        encounter["_id"] = str(encounter["_id"])
        return make_response(jsonify(encounter), 200)
    else:
        return make_response(jsonify({"error": "Invalid Monster ID"}), 404)

@app.route("/api/v1.0/monsters/<string:name>", methods=["GET"])
def show_one_monster(name):
    monster = dndMonsters.find_one({"name": name})
    if monster is not None:
        monster["_id"] = str(monster["name"])
        return make_response(jsonify(monster), 200)
    else:
        return make_response(jsonify({"error": "Invalid Monster ID"}), 404)

#internal show one function
def show_one_monster_internal(name):
    monster = dndMonsters.find_one({"name": name})
    if monster is not None:
        monster["_id"] = str(monster["name"])
        return monster
    else:
        return null
# Search for monster via CR
@app.route("/api/v1.0/monsterscr/<string:usrChallengeRating>", methods=["GET"])
def show_monster_challenge_rating(usrChallengeRating):
    data_to_return = []
    intCr = int(usrChallengeRating)
    for monster in dndMonsters.find({"challenge_rating": intCr}, {"_id": 1, "name": 1, "challenge_rating": 1}):
        data_to_return.append(monster)
    return make_response(jsonify(data_to_return), 200)


@app.route("/api/v1.0/monsters/<string:name>/actions", methods=["GET"])
def fetch_all_actions(name):
    data_to_return = []
    monsters = dndMonsters.find_one({"name": name}, {"actions": 1})
    if monsters is not None:
        monsters["name"] = str(monsters["actions"]["name"][0])
        monsters["desc"] = str(monsters["actions"]["desc"][0])
        data_to_return.append(monsters)
    return make_response(jsonify(data_to_return), 200)


@app.route("/api/v1.0/monsters/create", methods=["POST"])
def add_monster():
    if "name" in request.form:
        new_monster = {
            "name": request.form["name"],
            "size": request.form["size"],
            "type": request.form["type"],
            "subtype": request.form["subtype"],
            "alignment": request.form["alignment"],
            "armor_class": request.form["armor_class"],
            "hit_points": request.form["hit_points"],
            "hit_dice": request.form["hit_dice"],
            "speed": {"walk": request.form["WalkSpeed"], "swim": request.form["SwimSpeed"], "fly": request.form["FlySpeed"],
                        "climb": request.form["ClimbSpeed"], "burrow": request.form["BurrowSpeed"]},

            "strength": request.form["strength"],
            "dexterity": request.form["dexterity"],
            "constitution": request.form["constitution"],
            "intelligence": request.form["intelligence"],
            "wisdom": request.form["wisdom"],
            "charisma": request.form["charisma"],

            "damage_vunerabilities": request.form["damage_vinerabilities"],
            "damage_resistances": request.form["damage_resistances"],
            "damage_immunities": request.form["damage_immunities"],
            "condition_immunities": request.form["condition_immunities"],

            "senses": {"passive_perception": request.form["Passive_Perception"], "darkvision": request.form["DarkVison"], "truesight": request.form["Truesight"],
                        "tremorsense": request.form["Tremorsense"], "blindsight": request.form["Blindsight"]},

            "languages": request.form["languages"],
            "challenge_rating": request.form["challenge_rating"],

            "specialAbilities": {"name": request.form["special_abilities_name"], "description": request.form["special_abilities_desc"]},
            
            "actions": {"name": request.form["actions_name"], "desc": request.form["actions_desc"],},

            "legendary_actions": {"name": [request.form["legendary_actions_name"], request.form["legendary_actions_name2"], request.form["legendary_actions_name3"]],
                                   "desc": [request.form["legendary_actions_desc"], request.form["legendary_actions_desc2"], request.form["legendary_actions_desc3"]]}
        }

        new_monster_id = dndMonsters.insert_one(new_monster)
        new_monster_link = "http://localhost:5000/api/v1.0/monsters/" + \
            str(request.form["name"])
        return make_response(jsonify("New Monster Added"), 201)
    else:
        return make_response(jsonify(
            {"error": "Missing form data"}), 404)


@app.route("/api/v1.0/monsters/<string:name>/edit", methods=["PUT"])
def edit_monster(name):
    if "name" in request.form:
        result = dndMonsters.update_one({"name": name}, {
            "$set": {
                "index": reqest.form["name"].lower(),
                     "name": request.form["name"],
                     "size": request.form["size"],
                     "type": request.form["type"],
                     "subtype": request.form["subtype"],
                     "alignment": request.form["alignment"],
                     "armor_class": request.form["armor_class"],
                     "hit_points": request.form["hit_points"],
                     "hit_dice": request.form["hit_dice"],
                     "speed": request.form["speed"],

                     "strength": request.form["strength"],
                     "dexterity": request.form["dexterity"],
                     "constitution": request.form["constitution"],
                     "intelligence": request.form["intelligence"],
                     "wisdom": request.form["wisdom"],
                     "charisma": request.form["charisma"],

                     "damage_vunerabilities": request.form["damage_vinerabilities"],
                     "damage_resistances": request.form["damage_resistances"],
                     "damage_immunities": request.form["damage_immunities"],
                     "condition_immunities": request.form["condition_immunities"],

                     "Passive_Perception": request.form["Passive_Perception"],
                     "DarkVison": request.form["DarkVison"],
                     "Truesight": request.form["Truesight"],
                     "Tremorsense": request.form["Tremorsense"],
                     "Blindsight": request.form["Blindsight"],
                     "languages": request.form["languages"],
                     "challenge_rating": request.form["challenge_rating"],

                     "special_abilities_name": request.form["special_abilities_name"],
                     "special_abilities_desc": request.form["special_abilities_desc"],

                     "actions_name": request.form["actions_name"],
                     "actions_desc": request.form["actions_desc"],

                     "legendary_actions": [{"name": request.form["legendary_actions_name"], "name": request.form["legendary_actions_name2"], "name": request.form["legendary_actions_name3"],
                                            "desc": request.form["legendary_actions_desc"], "desc": request.form["legendary_actions_desc2"], "desc": request.form["legendary_actions_desc3"]}]
                     }
        })
        if result.matched_count == 1:
            edited_monster_link = "http://localhost:5000/api/v1.0/monster/" + id
            return make_response(jsonify(
                {edited_monster_link}), 200)
        else:
            return make_response(jsonify(
                {"error": "Invalid business ID"}), 404)
    else:
        return make_response(jsonify(
            {"error": "Missing form data"}), 404)


@app.route("/api/v1.0/monster/delete/<string:name>/<string:email>", methods=["DELETE"])
def delete_(name, email):
    print("in Python")
    result = dndUsers.update_one({ "email": email},{"$pull" : { "encounters" : {"name": name } } } )
    if result is not None:
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify(
            {"error": "Invalid business ID"}), 404)


@app.route("/api/v1.0/monster/<string:email>/<string:name>", methods=["GET"])
def addMonsterToEncounter(email, name):
    monsterObject = show_one_monster_internal(name)
    dndUsers.update_one({"email": email}, {
                          "$push": {"encounters": monsterObject}})

    return make_response(jsonify("Monster Added", 200))


@app.route("/api/v1.0/businesses/<bid>/reviews/<rid>", methods=["GET"])
def fetch_one_review(bid, rid):
    business = businesses.find_one(
        {"reviews._id": ObjectId(rid)},
        {"_id": 0, "reviews.$": 1})
    if business is None:
        return make_response(
            jsonify(
                {"error": "Invalid business ID or review ID"}), 404)
    business['reviews'][0]['_id'] = \
        str(business['reviews'][0]['_id'])

    return make_response(jsonify(
        business['reviews'][0]), 200)


@app.route("/api/v1.0/businesses/<bid>/reviews/<rid>",
           methods=["PUT"])
def edit_review(bid, rid):
    edited_review = {
        "reviews.$.username": request.form["username"],
        "reviews.$.comment": request.form["comment"],
        "reviews.$.stars": request.form['stars']
    }
    businesses.update_one(
        {"reviews._id": ObjectId(rid)},
        {"$set": edited_review})
    edit_review_url = \
        "http://localhost:5000/api/v1.0/businesses/" + \
        bid + "/reviews/" + rid
    return make_response(jsonify(
        {"url": edit_review_url}), 200)


if __name__ == "__main__":
    app.run(debug=True)
