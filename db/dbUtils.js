const mg = require('mongoose');

const userSchema = new mg.Schema({
    user_id: Number,
    username: {type:String, unique:true},
    password: String,
    wins: Number,
    losses: Number,
})
const UserModel = mg.model('User', userSchema);

async function openDB(){
    await mg.connect('mongodb://127.0.0.1:27017');
}

async function closeDB(){
    await mg.connection.close();
}

/*
userData: {username:<username>, password:<password>}
*/
async function insertUser(data){
    if(data == null || data.username == null || data.password == null){
        throw new Error('You fucking idiot, you didnt give a username or password');
    }

    data.user_id = Math.floor(Math.random()*100000);
    data.wins = 0;
    data.losses = 0;
    const userDocument = new UserModel(data);
    const userId = await userDocument.save();
    return userId;
}

/*
userData: {username:<username>}
*/
async function getUsers(userData){
    const users = await UserModel.find(userData);
    console.log(users);
    return users;
}

/*
userData: {username:<username>}
*/
async function incrementUserWins(userData){
    // Dont think too hard about this. I could figure out the update function so
    // Instead ima just delete the old one and insert a new one with correct value ;)
    const ud = await UserModel.findOneAndDelete(userData);
    const newUserData = new UserModel({username:ud.username, password:ud.password, user_id:ud.user_id, wins:ud.wins+1, losses:ud.losses});
    await newUserData.save();
}

/*
userData: {username:<username>}
*/
async function incrementUserLosses(userData){
    // Dont think too hard about this. I could figure out the update function so
    // Instead ima just delete the old one and insert a new one with correct value ;)
    const ud = await UserModel.findOneAndDelete(userData);
    const newUserData = new UserModel({username:ud.username, password:ud.password, user_id:ud.user_id, wins:ud.wins, losses:ud.losses+1});
    await newUserData.save();
}

async function eraseUsers(){
    await UserModel.deleteMany();
}

// openDB().then(() => insertUser({username:'LuLumio14', password:'Password123'}).then(() => closeDB()));
// openDB().then(() => incrementUserWins({username:'LuLumio13'}).then(() => closeDB()));
// openDB().then(() => incrementUserLosses({username:'LuLumio13'}).then(() => closeDB()));
openDB().then(() => getUsers().then(() => closeDB()));

module.exports = {
    insertUser,
}