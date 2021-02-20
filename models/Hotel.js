const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,

  },
  freeRooms: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
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