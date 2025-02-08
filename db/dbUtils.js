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
    data.user_id = Math.floor(Math.random()*100000);
    data.wins = 0;
    data.losses = 0;
    const userDocument = new UserModel(data);
    const userId = await userDocument.save();
    return userId;
}

module.exports = {
    insertUser,
}