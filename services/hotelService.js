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
  let hotel = await Hotel.findOne({ _id: id }).lean();

  return hotel;
}

const updateBookings = async function (hotelId, bookerId) {
  let hotel = await Hotel.findOne({ _id: hotelId });
  hotel.bookings.push(bookerId);
  return hotel.save();
};
const deleteHotel = async function (hotelId) {
 return await Hotel.deleteOne({_id: hotelId});
};

const updateHotel =  async function (hotelId, data) {
  return hotel = await Hotel.updateOne({ _id: hotelId }, data);
};

module.exports = {
  create,
  findAll,
  findOne,
  updateBookings,
  deleteHotel,
  updateHotel,
};