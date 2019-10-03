const Sport = require("../models/Spot");
const User = require("../models/User");
module.exports = {
  async index(req, res) {
    const { tech } = req.query;
    const spots = await Sport.find({ techs: tech });
    return res.json(spots);
  },
  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { userid } = req.headers;
    const user = await User.findById(userid);
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: " User not exists" });
    }
    const spot = await Sport.create({
      user: userid,
      thumbnail: filename,
      company,
      techs: techs.split(",").map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  }
};
