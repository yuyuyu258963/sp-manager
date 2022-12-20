from ret.dbHandler import DbHandler

class UserModel():
    def __init__(self, username):
        self.username = username

    def User(self):
        user = []
        user = list(DbHandler("user").schema.find({"username": self.username}))
        if user != []:
            user = user[0]
            user = list((user[k])for k in ["username", "password"])
        return user

if __name__ == '__main__':
    user = UserModel("a").User()
    print(user)