const router = require('express').Router();
const auth = require('../middlewares/auth');
const hotelService = require('../services/hotelService');
const isAuth = require('../middlewares/isAuth');

router.get('/', auth, (req, res) => {
  let hotels = hotelService.findAll()
    .then(items => {
      res.render('home', { title: 'Home', items });

    })
});


router.get('/hotels/create', (req, res) => {
  res.render('create');
})
router.post('/hotels/create', auth, async (req, res, next) => {
  let { name, city, freeRooms, imageUrl } = req.body;
  try {
    let creator = res.locals.user._id;

    await hotelService.create({ name, city, freeRooms, imageUrl, creator });
  }
  catch (err) {
    next()
  }
  res.redirect('/');
})

router.get('/hotels/:hotelId/details', isAuth, auth, (req, res) => {
  let currentUser = res.locals.user._id;

  hotelService.findOne(req.params.hotelId)
    .then(hotel => {
      let bookings = hotel.bookings;
      let hasBooked = bookings.includes(currentUser);
      let isCreator = currentUser == hotel.creator;
      res.render('details', { hotel, isCreator, hasBooked });
    })
    .catch((err) => console.log(err));
})

router.get('/hotels/:hotelId/book', auth, async (req, res) => {
  let currentUser = res.locals.user._id;

  await hotelService.findOne(req.params.hotelId)
    .then(hotel => {
      hotelService.updateBookings(hotel._id, currentUser);
    })
    .then(x => res.redirect(`/hotels/${req.params.hotelId}/details`))
    .catch(err => console.log(err));
})
router.get('/hotels/:hotelId/delete', auth, (req, res) => {
  hotelService.findOne(req.params.hotelId)
    .then(hotel => {
      hotelService.deleteHotel(hotel._id);
    })
    .then(x => res.redirect(`/`))
    .catch(err => console.log(err));
});

router.get('/hotels/:hotelId/edit', (req, res) => {
  hotelService.findOne(req.params.hotelId)
    .then(hotel => {
      res.render('edit', hotel);
    });
})

router.post('/hotels/:hotelId/edit', (req, res) => {
  console.log(req.body);
  hotelService.updateHotel(req.params.hotelId, req.body)
  res.redirect(`/hotels/${req.params.hotelId}/details`);
});

module.exports = router;