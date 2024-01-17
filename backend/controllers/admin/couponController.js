// controllers/promoCodeController.js
const { PromoCode } = require('../../models/couponModel');

// Get all promo codes
exports.getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.findAll();
    res.json({status:true,data:promoCodes,message:'Fetch successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

// Create a new promo code
exports.createPromoCode = async (req, res) => {
  const { name, code, discount } = req.body;
  try {
    const newPromoCode = await PromoCode.create({ name, code, discount });
    res.json({status:true,data:newPromoCode,message:'Added successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a promo code by ID
exports.deletePromoCode = async (req, res) => {
  const promoCodeId = req.params.id;
  try {
    await PromoCode.destroy({
      where: {
        id: promoCodeId,
      },
    });
    res.json({ message: 'Promo code deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
