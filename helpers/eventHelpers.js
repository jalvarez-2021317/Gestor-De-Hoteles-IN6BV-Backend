const getHotelEvents = async (hotelId) => {
    const events = await Event.find({ hotel: hotelId });
  
    return events;
  };
  
  module.exports = { getHotelEvents };
  