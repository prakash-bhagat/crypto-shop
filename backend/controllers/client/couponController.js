// controllers/promoCodeController.js
const { PromoCode } = require('../../models/couponModel');

// Get one promo codes
exports.getPromoCodes = async (req, res) => {
    try {
        const {coupon} = req.body
      const promoCodes = await PromoCode.findAll({where:{code:coupon}});
      res.json(promoCodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
