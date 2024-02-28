const mongoose = require('mongoose');
const dbName = 'foosha';


// connecting to database
async function main() {
try {await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
console.log('Database successfully connected to server 🚀');
} catch (error) {console.log('🔥 Error in the database connection.');
}};

main();

module.exports = mongoose;