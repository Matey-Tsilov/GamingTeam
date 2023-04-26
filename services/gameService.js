const Game = require("../models/Game");

exports.create = async (data, ownerId) => {
  data.owner = ownerId;
  await Game.create(data);
};

exports.getAll = () => Game.find().lean();

exports.getById = (id) => Game.findById(id).lean();

exports.delete = (id) => Game.findByIdAndRemove(id);

exports.edit = (id, game) => Game.findByIdAndUpdate(id, game)

exports.buy = (id, game) => Game.findByIdAndUpdate(id, game)
