const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  freeRooms: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  bookings: [
    {
      type: String,
    }
  ]
});
module.exports = mongoose.model('Hotel', hotelSchema);