const Game = require("../models/Game");

exports.create = (data, ownerId) => {
  data.owner = ownerId;
  return Game.create(data);
};

exports.getAll = (query = '') => {
 
  return Game.find(
    {
      name: {$regex: new RegExp(query?.name, 'i')},
      platform: {$regex: new RegExp(query?.name, 'i')}
    })
    .lean()

};

exports.getById = (id) => Game.findById(id).lean();

exports.delete = (id) => Game.findByIdAndRemove(id);

exports.edit = (id, game) => Game.findByIdAndUpdate(id, game, {runValidators: true} )

exports.buy = (id, game) => Game.findByIdAndUpdate(id, game, {runValidators: true})
