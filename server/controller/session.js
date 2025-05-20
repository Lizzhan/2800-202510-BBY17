import db from '../db.js'

export const checkLogin = async (req, res) => {
    console.log(req.session.username)
    res.status(200).json(req.session.username);
}

export const getSessionUser = async (req, res) => {
    console.log(req.session.username)
    console.log(req.session.email)
    console.log(req.session.userId)
    res.status(200).json(req.session.username)
}