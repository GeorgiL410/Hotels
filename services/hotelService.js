const Hotel = require('../models/Hotel');

const create = async function (name, city, rooms, imageUrl, creator) {
  let hotel = await new Hotel(name, city, rooms, imageUrl, creator);
  return hotel.save();

};
const findAll = async function () {
  let hotels = await Hotel.find({}).lean();

  return hotels;
}

const findOne = async function (id) {
  let hotel = await Hotel.findOne({_id: id}).lean();

  return hotel;
}



module.exports = {
  create,
  findAll,
  findOne,
};