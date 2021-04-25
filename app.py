from flask import *
import mysql.connector, json
from mysql.connector import errorcode
from collections import defaultdict
app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "lsdkfjlsdkfjlsdkfj",
    database = "website"
)

class create_dict(dict): 
    def __init__(self): 
        self = dict() 
    def add(self, key, value): 
        self[key] = value

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")


#API
@app.route("/api/attractions", methods = ["GET"])
def api_attractions():
	page = request.args.get('page')
	keywords =request.args.get('keywords')
	cursor = mydb.cursor(buffered=True)
	mydict = create_dict()
	if(page != None or keywords != None):
		nwpage = (int(page)+1)*12-12
		if(keywords != None):
			c_sql = "SELECT COUNT(*) FROM `attraction` WHERE `name` LIKE %s;"
			sql = "SELECT * FROM `attraction` WHERE `name` LIKE %s LIMIT %s, 12;"
			c_check = ("%"+keywords+"%",)
			check = ("%"+keywords+"%", nwpage)
			cursor.execute(c_sql, c_check)
			sum = cursor.fetchone()[0]
		else:
			c_sql = "SELECT COUNT(*) FROM `attraction`;"
			sql = "SELECT * FROM `attraction` LIMIT %s, 12;"
			check = (nwpage,)
			cursor.execute(c_sql)
			sum = cursor.fetchone()[0]
		cursor.execute(sql, check)
		if(sum > 12):
			c_sum = 12
		else:
			c_sum = sum
	else:
		c_sql = "SELECT COUNT(*) FROM `attraction`;"
		sql = "SELECT * FROM `attraction`;"
		cursor.execute(c_sql)
		sum = cursor.fetchone()[0]
		cursor.execute(sql)
		page = sum
		c_sum = sum

	data = cursor.fetchall()
	mydict = []
	i = 0
	for row in data:
		mydict.append(
		{
			"id":row[0], 
			"name":row[1], 
			"category":row[2], 
			"description":row[3], 
			"address":row[4], 
			"transport":row[5], 
			"mrt":row[6], 
			"latitude":row[7], 
			"longitude":row[8], 
			"images":row[9].split(",")
		})
		i = i+1

	if(mydict != []):
		for j in range(c_sum):		
			delete = mydict[j]["images"]
			del(delete[0])
			delete.pop()

	list = []
	if(mydict == list):
		mydict = None
	if((sum/12) < (int(page)+1)):
		stud_json = json.dumps({"nextPage":None,"data":mydict}, indent=2, ensure_ascii=False)
	else:
		stud_json = json.dumps({"nextPage":str(int(page)+1),"data":mydict}, indent=2, ensure_ascii=False)

	return stud_json

@app.route("/api/attraction/<attractionId>", methods = ["GET"])
def att_id(attractionId):
	cursor = mydb.cursor(buffered=True)
	mydict = create_dict()
	sql = "SELECT * FROM `attraction` WHERE `id` = %s;"
	check = (attractionId,)
	cursor.execute(sql, check)
	data = cursor.fetchall()
	mydict = []
	for row in data:
		mydict.append(
		{
			"id":row[0], 
			"name":row[1], 
			"category":row[2], 
			"description":row[3], 
			"address":row[4], 
			"transport":row[5], 
			"mrt":row[6], 
			"latitude":row[7], 
			"longitude":row[8], 
			"images":row[9].split(",")
		})
	if(mydict != []):
		delete = mydict[0]["images"]
		del(delete[0])
		delete.pop()

	stud_json = json.dumps({"data":mydict}, indent=2, ensure_ascii=False)
	return stud_json


app.run(host="0.0.0.0",port=3000)
