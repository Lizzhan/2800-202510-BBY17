import db from '../db.js'

export const checkLogin = async (req, res) => {
    res.status(200).json(req.session.username);
}

export const getSessionUser = async (req, res) => {
    res.status(200).json(req.session.username)
}