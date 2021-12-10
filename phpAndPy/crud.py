import mysql.connector

mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="users"
)

if mydb == False:
    print("Failed to connect to database")

mycursor = mydb.cusror()

class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def create(self):
        sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
        val = (self.name, self.age)
        mycursor.execute(sql, val)
        mydb.commit()
        print("Successfully registered new user")

    def update(self, id):
        sql = "UPDATE user SET name = " + self.name + ", age = " + self.age + " WHERE id = " + id
        mycursor.execute(sql)
        mydb.commit()
        print("Successfully updated a user")



def getAll():
    mycursor.execute("SELECT name, createdAt FROM user")
    myresult = mycursor.fetchall()
    print("User list")
    for x in myresult:
        print(x)


def getOne(id):
    mycursor.execute("SELECT name, age, reatedAt FROM user WHERE id= " + id)
    myresult = mycursor.fetchall()
    print("User data")
    print(myresult)


def delete(id):
    sql = "DELETE FROM user WHERE id = " + id
    mycursor.execute(sql)
    mydb.commit()
    print("Successfully delete the data")

if "input" == "a" or "input" == "A":
    newUser = User("Chelsea Olivia", 21)
    newUser2 = User("Tatjana Saphira", 23)
    newUser.create()
    newUser2.create()

if "input" == "b" or "input" == "B":
    getAll()

if "input" == "c" or "input" == "C":
    getOne(id)

if "input" == "d" or "input" == "D":
    updateUser = User("Chelsea Olivia", 22)
    updateUser.update(id)

if "input" == "e" or "input" == "E":
    delete(id)

if "input" == "q" or "input" == "Q":
    print("Thank you and see you again")