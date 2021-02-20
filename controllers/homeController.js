const router = require('express').Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const hotelService = require('../services/hotelService');
const isAuth = require('../middlewares/isAuth');

const { COOKIE_NAME, SECRET } = require('../config/config')

router.get('/', auth, (req, res) => {
  let hotels = hotelService.findAll()
    .then(items => {
      res.render('home', { title: 'Home', items });

    })
});


router.get('/hotels/create', (req, res) => {
  res.render('create');
})
router.post('/hotels/create', auth, (req, res) => {
  let { name, city, freeRooms, imageUrl } = req.body;
  try {
    let creator = res.locals.user._id;

    hotelService.create({ name, city, freeRooms, imageUrl, creator });
  }
  catch {
    console.log('error');
  }
  res.redirect('/');
})

router.get('/hotels/:hotelId/details',isAuth, auth, (req, res) => {
  let currentUser = res.locals.user._id;

  hotelService.findOne(req.params.hotelId)
    .then(hotel => {
      let bookings = hotel.bookings;
      console.log(bookings);
      let hasBooked = bookings.includes(currentUser);
      let isCreator = currentUser == hotel.creator;
      res.render('details', { hotel, isCreator, hasBooked });
    })
})


module.exports = router;