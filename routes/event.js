const express = require('express');
const router = express.Router();
const { createEvent, updateEvent, deleteEvent, getEvents } = require('../controllers/event');
const { getHotelEvents } = require('../helpers/eventHelpers');


router.get('/get' ,getEvents);
// POST /events
router.post('/create', createEvent);

// PUT /events/:id
router.put('/edit/:id', updateEvent);

// DELETE /events/:id
router.delete('/delete/:id', deleteEvent);

module.exports = router;
