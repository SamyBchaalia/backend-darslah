var admin = require("firebase-admin");

var serviceAccount = require("./dar-sllah-firebase-adminsdk-cfee2-bb7470bea6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dar-sllah-default-rtdb.firebaseio.com"
});
const dbR=admin.database();
module.exports = dbR;