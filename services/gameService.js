const Game = require("../models/Game");

exports.create = (data, ownerId) => {
  data.owner = ownerId;
  Game.create(data);
};

exports.getAll = () => Game.find().lean();

exports.getById = (id) => Game.findById(id).lean();

exports.delete = (id) => Game.findByIdAndRemove(id);

exports.edit = async (id, game) => { 
  await Game.findByIdAndUpdate(id, game)
}
