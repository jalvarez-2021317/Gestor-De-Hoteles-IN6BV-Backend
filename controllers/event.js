const Event = require('../models/event');


const getEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const createEvent = async (req, res) => {
  const { hotel, nombre, descripcion, fecha } = req.body;
  try {
    const event = await Event.create({ hotel, nombre, descripcion, fecha });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { hotel, nombre, descripcion, fecha } = req.body;
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndUpdate(id, { hotel, nombre, descripcion, fecha }, { new: true });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createEvent, updateEvent, deleteEvent,getEvents };
