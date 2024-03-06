const mongoose = require('mongoose');
const config = require('../config');


// connecting to database
async function main() {
try {await mongoose.connect(`${config.dbUrl}/${config.dbName}`);
console.log('Database successfully connected to server 🚀');
} catch (error) {console.log('🔥 Error in the database connection.');
}};

main();

module.exports = mongoose;