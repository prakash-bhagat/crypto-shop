const {Carousel} = require('../../models/carouselModel');

module.exports = {
  getAllItems: async (req, res) => {
    try {
      const items = await Carousel.findAll();
      res.json({status:true,items:items});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}