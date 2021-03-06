const Avatar = require("../models/avatar");

const isAdmin = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const avatar = await Avatar.findById(userId);
        avatar.isAdmin ? next() : res.status(400).json({ error: "not admin" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.isAdmin = isAdmin;