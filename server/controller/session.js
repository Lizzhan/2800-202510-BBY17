import db from '../db.js'

export const checkLogin = async (req, res) => {
    console.log(req.session.username)
    res.status(200).json(req.session.username);
}