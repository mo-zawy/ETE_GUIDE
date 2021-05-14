const bcrypt = require('bcryptjs')
const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'mohamed elsawy',
        email:'mohamed@example.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Ahmed elsawy',
        email:'ahmed@example.com',
        password:bcrypt.hashSync('123456',10)
    }
]

module.exports = users