import db from '../db.js'

//validate if the body is empty. If so, then stops the request, and notify user
export const validateRegisterInput = (req, res, next) => {
    if(!req.body.email) return res.status(400).json("email cannot be empty");
    if(!req.body.username) return res.status(400).json("username cannot be empty");
    if(!req.body.password) return res.status(400).json("password cannot be empty");
    next();
}

//validate if the body is empty. If so, then stops the request, and notify user
export const validateLoginInput = (req, res, next) => {
    if(!req.body.username) return res.status(400).json("username cannot be empty");
    if(!req.body.password) return res.status(400).json("password cannot be empty");
    next();
}
//validate if a user with the same email already exists in the database
export const checkIfEmailAlreadyUsed = (req, res, next) => {
    const q = "SELECT * FROM users WHERE email=?";
    db.query(q, [req.body.email], (err, data)=>{
        if(err) return res.json(err);
        if(data.length > 0) return res.status(409).json('This email is already used');
        next();
    })
}

//validate if a user with the same username already exists in the database
export const checkIfUsernameAlreadyUsed = (req, res, next) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data)=>{
        if(err) return res.json(err);
        //if user exists
        if(data.length > 0) return res.status(409).json('This username is already used');
        next();
    })
}

//validate if a user with the username exists
export const checkIfUserExists = (req, res, next) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("user not found");
        next();
    })
}
