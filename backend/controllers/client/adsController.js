// controllers/bannerController.js
const {Banner} = require('../../models/adsModel');

module.exports = {
  getAllBanners: async (req, res) => {
    try {
      const banners = await Banner.findAll();
      if (!banners) {
        res.status(201).json({status:false,message:'Error fetching'})
      }
      res.json({status:true,message:'Fetch successfully',data:banners,cookie:req.cookies});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
