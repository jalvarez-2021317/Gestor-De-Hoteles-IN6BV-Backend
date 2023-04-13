const Event = require('./models/Event');

const getHotelEvents = async (hotelId) => {
  const events = await Event.find({ hotel: hotelId });

  return events;
};
