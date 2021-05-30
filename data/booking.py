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
    CREATE TABLE booking(
    id BIGINT NOT NULL AUTO_INCREMENT,
    number varchar(255) NOT NULL,
    price int(255),
    attr_id int(255),
    attr_name varchar(255),
    attr_address varchar(255),
    attr_image varchar(255),
    date varchar(255),
    time varchar(255),
    contact_name varchar(255),
    contact_email varchar(255),
    contact_phone varchar(255),
    status int(10),
    PRIMARY KEY (id));
    """

cursor.execute(sql)