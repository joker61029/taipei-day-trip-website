import mysql.connector, json
from mysql.connector import errorcode


mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "GhbI!Abg1329",
    database = "website"
)
cursor = mydb.cursor(buffered=True)
sql ="""
    CREATE TABLE attraction(
    id BIGINT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    category varchar(255),
    description LONGTEXT,
    address LONGTEXT,
    transport LONGTEXT,
    mrt varchar(255),
    latitude FLOAT,
    longitude FLOAT,
    images LONGTEXT,
    PRIMARY KEY (id));
    """
cursor.execute(sql)

sql ="""
    CREATE TABLE user(
    id BIGINT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id));
 """
cursor.execute(sql)

url = open(r"taipei-attractions.json", "r", encoding="UTF-8")
attract = url.read()
tmp = json.loads(attract)
list = tmp['result']['results']
num = len(tmp['result']['results'])
i = 0
delete = (".mp3",".flv")
while i < num:
    stitle = list[i]["stitle"]
    category = list[i]["CAT2"]
    description = list[i]["xbody"]
    address = list[i]["address"]
    transport = list[i]["info"]
    mrt = list[i]["MRT"]
    latitude = list[i]["latitude"]
    longitude = list[i]["longitude"]
    images = list[i]["file"].split("http")
    len_images = len(images)
    j = 0
    images_list = ""
    while j < len_images-1:
        j = j+1
        if(images[j].endswith(delete) == False):
            images_list = images_list+(str(",http"+images[j]))
    
    images_list = images_list+str(",")
    images_json = json.dumps(images_list)
    sql = "INSERT INTO `attraction` (name, category, description, address, transport, mrt, latitude, longitude, images) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s);"
    cursor.execute(sql,(stitle, category, description, address, transport, mrt, latitude, longitude, images_json))
    mydb.commit()
    i = i+1


