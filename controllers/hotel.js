const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// POST /events
router.post('/events', async (req, res) => {
  const { hotel, nombre, descripcion, fecha } = req.body;
  try {
    const event = await Event.create({ hotel, nombre, descripcion, fecha });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// PUT /events/:id
router.put('/events/:id', async (req, res) => {
  const { hotel, nombre, descripcion, fecha } = req.body;
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndUpdate(id, { hotel, nombre, descripcion, fecha }, { new: true });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE /events/:id
router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const getHotelEvents = async (hotelId) => {
  const events = await Event.find({ hotel: hotelId });

  return events;
};

module.exports = (router), getHotelEvents;


