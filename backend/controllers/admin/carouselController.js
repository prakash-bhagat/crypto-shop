// controllers/carouselController.js
const {Carousel} = require('../../models/carouselModel');

module.exports = {
  getAllItems: async (req, res) => {
    try {
      const items = await Carousel.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createItem: async (req, res) => {
    try {
      const newItem = await Carousel.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getItemById: async (req, res) => {
    try {
      const item = await Carousel.findByPk(req.params.id);
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json(item);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateItem: async (req, res) => {
    try {
      const [updatedCount, updatedItems] = await Carousel.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedCount === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json(updatedItems[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const deletedCount = await Carousel.destroy({
        where: { id: req.params.id },
      });

      if (deletedCount === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
