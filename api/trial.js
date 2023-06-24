const jwt = require('jsonwebtoken');

const payload = {
    name : 'viru',
    email : 'virendra.arekar@gmail.com',
    password : "n cige2r7923ry09cahdbjcaoidcadbkv",
    image : "cjbdabvouwlbvkjdwvjkbwjkv",
    role : 'manager'
}

const token = jwt.sign(payload, 'jwtWebToken')
console.log(token);