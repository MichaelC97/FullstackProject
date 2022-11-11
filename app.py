from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.dndMonsters # select the database
dndMonsters = db.monsters # select the collection

@app.route("/api/v1.0/allmonsters", methods=["GET"])
def show_all_monsters():
    page_num, page_size = 1, 10
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))
    data_to_return = []
    for monster in dndMonsters.find().skip(page_start).limit(page_size):
        monster['_id'] = str(monster['_id'])
        data_to_return.append(monster)
    
    return make_response( jsonify(data_to_return), 200 )

@app.route("/api/v1.0/monsters/<string:name>", methods=["GET"])
def show_one_monster(name):
    monster = dndMonsters.find_one( {"name": name} )
    if monster is not None: 
        monster["_id"] = str(monster["name"])
        print
        return make_response( jsonify( monster ), 200)
    else:
        return make_response( jsonify( {"error" : "Invalid Monster ID"} ), 404)

#Search for monster via CR
@app.route("/api/v1.0/monsterscr/<string:usrChallengeRating>", methods=["GET"])
def show_monster_challenge_rating(usrChallengeRating):

    data_to_return = []
    intCr = int(usrChallengeRating)
    for monster in dndMonsters.find({"challenge_rating": intCr}, {"_id" : 1, "name": 1, "challenge_rating": 1}):

        data_to_return.append(monster)
    
    return make_response( jsonify(data_to_return), 200 )


@app.route("/api/v1.0/monsters", methods=["POST"])
def add_business():
    if "name" in request.form:
        new_monster = {
            "index": reqest.form["name"].lower(),
            "name" : request.form["name"],
            "size" : request.form["size"],
            "type" : request.form["type"],
            "subtype" : request.form["subtype"],
            "alignment" : request.form["alignment"],
            "armor_class" : request.form["armor_class"],
            "hit_points" : request.form["hit_points"],
            "hit_dice" : request.form["hit_dice"],
            "speed" : request.form["speed"],

            "strength" : request.form["strength"],
            "dexterity" : request.form["dexterity"],
            "constitution" : request.form["constitution"],
            "intelligence" : request.form["intelligence"],
            "wisdom" : request.form["wisdom"],
            "charisma" : request.form["charisma"],
            "proficiencies" : [],

            "damage_vinerabilities" : [],
            "damage_resistances" : [],
            "damage_immunities" : [],
            "condition_immunities" : [],
            "senses" : [],
            "languages" : request.form["languages"],
            "challenge_rating" : request.form["challenge_rating"],

            "special_abilities" : [],
            "actions" : [],
            "legendary_actions" : []
        }
        new_monster_id = monster.insert_one(new_monster)
        new_monster_link = "http://localhost:5000/api/v1.0/monster/" + str(new_monster_id.inserted_id)
        return make_response( jsonify(
            {"url": new_monster_link} ), 201)
    else:
        return make_response( jsonify(
            {"error":"Missing form data"} ), 404)

@app.route("/api/v1.0/businesses/<string:id>", methods=["PUT"])
def edit_business(id):
    if "name" in request.form and "town" in request.form and "rating" in request.form:
        result = businesses.update_one( { "_id" : ObjectId(id) }, {
        "$set" : { "name" : request.form["name"],
        "town" : request.form["town"],
        "rating" : request.form["rating"]
        }
    } )
        if result.matched_count == 1:
            edited_business_link = "http://localhost:5000/api/v1.0/businesses/" + id
            return make_response( jsonify(
            { "url":edited_business_link } ), 200)
        else:
            return make_response( jsonify(
            { "error":"Invalid business ID" } ), 404)
    else:
        return make_response( jsonify(
        { "error" : "Missing form data" } ), 404)


@app.route("/api/v1.0/businesses/<string:id>", methods=["DELETE"])
def delete_business(id):
 result = businesses.delete_one( { "_id" : ObjectId(id) } )
 if result.deleted_count == 1:
    return make_response( jsonify( {} ), 204)
 else:
    return make_response( jsonify( \
        { "error" : "Invalid business ID" } ), 404)

@app.route("/api/v1.0/businesses/<string:id>/reviews", methods=["POST"])
def add_new_review(id):
    new_review = {
        "_id" : ObjectId(),
        "username" : request.form["username"],
        "comment" : request.form["comment"],
        "stars" : request.form["stars"]
    }
    businesses.update_one( { "_id" : ObjectId(id) }, { "$push": { "reviews" : new_review } } )
    new_review_link ="http://localhost:5000/api/v1.0/businesses/" + id +"/reviews/" + str(new_review['_id'])
    return make_response( jsonify( \
        { "url" : new_review_link } ), 201 )


@app.route("/api/v1.0/businesses/<bid>/reviews/<rid>", methods=["GET"])
def fetch_one_review(bid, rid):
    business = businesses.find_one( \
        { "reviews._id" : ObjectId(rid) }, \
        { "_id" : 0, "reviews.$" : 1 } )
    if business is None:
        return make_response( \
        jsonify( \
        {"error":"Invalid business ID or review ID"}),404)
    business['reviews'][0]['_id'] = \
        str(business['reviews'][0]['_id'])

    return make_response( jsonify( \
        business['reviews'][0]), 200)

@app.route("/api/v1.0/businesses/<bid>/reviews/<rid>", \
 methods=["PUT"])
def edit_review(bid, rid):
    edited_review = {
        "reviews.$.username" : request.form["username"],
        "reviews.$.comment" : request.form["comment"],
        "reviews.$.stars" : request.form['stars']
    }
    businesses.update_one( \
        { "reviews._id" : ObjectId(rid) }, \
        { "$set" : edited_review } )
    edit_review_url = \
        "http://localhost:5000/api/v1.0/businesses/" + \
        bid + "/reviews/" + rid
    return make_response( jsonify( \
        {"url":edit_review_url} ), 200)

if __name__ == "__main__":
    app.run(debug=True)