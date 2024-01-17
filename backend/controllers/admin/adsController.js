// controllers/bannerController.js
const {Banner} = require('../../models/adsModel');

module.exports = {
  getAllBanners: async (req, res) => {
    try {
      const banners = await Banner.findAll();
      if (!banners) {
        res.json({status:false,message:'Error fetching'});  
      }
      res.json({status:true,message:'Fetch successfully',data:banners});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createBanner: async (req, res) => {
    try {
      const newBanner = await Banner.create(req.body);
      res.status(201).json({status:true,message:'Added successfully',data:newBanner});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBannerById: async (req, res) => {
    try {
      const banner = await Banner.findByPk(req.params.id);
      if (!banner) {
        res.status(404).json({ error: 'Banner not found' });
      } else {
        res.json(banner);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateBanner: async (req, res) => {
    try {
      const [updatedCount, updatedBanners] = await Banner.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedCount === 0) {
        res.status(404).json({ error: 'Banner not found' });
      } else {
        res.json(updatedBanners[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteBanner: async (req, res) => {
    try {
      const deletedCount = await Banner.destroy({
        where: { id: req.body.id },
      });

      if (deletedCount === 0) {
        res.status(404).json({status:false, message: 'Banner not found' });
      } else {
        res.status(201).json({status:true, message: 'Banner deleted' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
