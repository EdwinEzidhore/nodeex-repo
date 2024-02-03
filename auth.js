const { users } = require("./user");

const details = (req,res,next) => {
    const { namee } = req.query;
    let Alluser=[...users]
    if (namee) {
        Alluser = Alluser.filter((user) => {
           return user.name.startsWith(namee.toLocaleUpperCase())
        })
    } else {
        res.status(401)
    }
    res.json(Alluser);
    next();
}
module.exports = details;