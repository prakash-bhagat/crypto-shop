// controllers/orderController.js
const { Order, OrderDetails, OrderPayment } = require('../../models/orderModel');
const { User,UserAddress } = require('../../models/userModel');
// const {getCurrencies} = require('./nowPaymentsController');

const NowPaymentsApi = require('@nowpaymentsio/nowpayments-api-js');
const api = new NowPaymentsApi({ apiKey: process.env.NOW_PAYMENTS })

// Get all orders
async function getAllOrders(req, res) {

  const { mobile } = req.body;

  try {
    const user = await User.findOne({ where: { mobile: mobile } });
    if (!user) {
      return res.status(404).json({ message: 'Order not found' });
    } else {

      const order = await Order.findAll({
        where: { userId: user.id },
        include: [{
          model: OrderDetails,
          as: 'orderDetail',
          attributes: ['orderId', 'productId', 'productName', 'categoryName', 'quantity', 'price'], // specify the attributes you want
          required: true,
          // where: {year_birth: 1984}
        },
        {
          model: OrderPayment,
          as: 'paymentDetail', // Alias for the PaymentDetail association
          attributes: ['orderId', 'paymentMethod', 'amount', 'transactionId', 'transactionStatus'], // specify the attributes you want
          required: true,
          // Add any additional attributes or conditions for the join here
        },],
        order:[
          ['orderNumber','DESC']
        ]
      });
      if (!order) {
        res.status(201).json({ status: false, message: 'Order not found' })
      }
      res.status(201).json({ status: true, message: 'Order fetched successfylly', data: order });
    }
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get order by ID
async function getOneOrder(req, res) {
  const { orderinfo } = req.body;

  try {
    // const user = await User.findOne({ where: { mobile: mobile } });
    // if (!user) {
    //   return res.status(404).json({ message: 'Order not found' });
    // } else {

    const order = await Order.findOne({
      where: { id: orderinfo },
      include: [{
        model: OrderDetails,
        as: 'orderDetail',
        attributes: ['orderId', 'productId', 'productName', 'categoryName', 'quantity', 'price'], // specify the attributes you want
        required: true,
        // where: {year_birth: 1984}
      },
      {
        model: OrderPayment,
        as: 'paymentDetail', // Alias for the PaymentDetail association
        attributes: ['orderId', 'paymentMethod', 'amount', 'transactionId', 'transactionStatus'], // specify the attributes you want
        required: true,
        // Add any additional attributes or conditions for the join here
      },]
    });
    if (!order) {
      res.status(201).json({ status: false, message: 'Order not found' })
    }
    res.status(201).json({ status: true, message: 'Order fetched successfylly', data: order });
    // }
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new order
async function createCODOrder(req, res) {

  const payMethod = [
    { key: 'cod', value: '3' },
    { key: 'inr', value: '1' },
    { key: 'crypto', value: '2' }];

  let orderID;
  let orderNumber = '';
  const { mobile, total_amount, product, method } = req.body;

  try {
    const user = await User.findOne({ 
      where: { mobile: mobile },
      include: [{
        model: UserAddress,
        as: 'userAddress',
        attributes: ['userId', 'street', 'city', 'state', 'postalCode', 'country'], // specify the attributes you want
        required: true,
      },
    ]
     })

     if (!user) {
      res.status(201).json({ status: false, message: 'User not present' });
    }else{
     if (
      user.userAddress.dataValues.street===null && 
      user.userAddress.dataValues.city===null &&
      user.userAddress.dataValues.state===null &&
      user.userAddress.dataValues.postalCode===null &&
      user.userAddress.dataValues.country===null) 
      {
      res.status(201).json({status:false,message:'User address required'})
     } else {
    //  console.log(user.userAddress.dataValues.street)
    // return res.json({status:true,user:user,b:req.body});

    const lastOrder = await Order.findOne({
      // where: {
      order: [['createdAt', 'DESC']],
      // }
    })
      .then((lastData) => {
        if (lastData.dataValues !== null) {
          const lastOrderNumber = lastData.getDataValue('orderNumber');
          const lastOrderNumberWithoutPrefix = parseInt(lastOrderNumber.replace('CS', ''), 10);
          orderNumber = `CS${lastOrderNumberWithoutPrefix + 1}`;
          // console.log("in",orderNumber)
        } else {
          // If it's the first order, start with 'CS100'
          orderNumber = 'CS100';
          // console.log("else",orderNumber)
        }
      })
      .then(async(orde) => {
        const order = await Order.create({ userId: user.id, orderNumber: orderNumber, totalAmount: total_amount }) //create order
        
        if (!order) {
          res.status(201).json({ status: false, message: 'Order not placed' });
        }
        orderID = order.dataValues.id;
      })
      .then(async (orderDetail) => {
        await product.forEach(prod => {
          prod.orderId = orderID;
        });
        const orderDetails = await OrderDetails.bulkCreate(product); //create order details
        if (!orderDetails) {
          res.status(201).json({ status: true, message: 'Order not placed' });
        }
      })
      .then(async (payment) => {
        payMethod.filter(async (type) => {
          if (type.value === method) {
            const paymentDetails = await OrderPayment.create({ orderId: orderID, paymentMethod: type.key, amount: total_amount }); //create payment details
            if (!paymentDetails) {
              res.status(201).json({ status: false, message: 'Order not placed' })
            } else {
              res.status(201).json({ status: true, message: 'Order placed successfully',data:orderNumber});
            }
          }
        })
      });
    }
    }//not present

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getCurrencies(req,res) {
  try {
    await api.getCurrencies()
    .then(currency=>{
      if (!currency) {
        res.status(200).json({message:'Error',status:false});
      }
      res.status(200).json({message:'Success',status:true,data:currency.currencies});
    })

  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getMinimumPaymentAmount(req,res){
  const currency_to= 'inr'
  const {currency_from,amount} = req.body;

  try {
    await api.getMinimumPaymentAmount({currency_from:currency_from,currency_to:currency_to})
    .then(async minAmnt=>{
      const estimate = await api.getEstimatePrice({amount:amount,currency_from:currency_from,currency_to:currency_to})
      if (!minAmnt) {
        res.status(200).json({message:'Error',status:false});
      }
      console.log(minAmnt,estimate);
      if (Number(minAmnt.min_amount)< Number(estimate.estimated_amount)) {
        res.status(200).json({message:'Error',status:false,estimated_amount:Number(estimate.estimated_amount),min_pay:minAmnt.min_amount});
      } else {
        res.status(200).json({message:'Success',status:true,estimated_amount:Number(estimate.estimated_amount),min_pay:minAmnt.min_amount});
      }
    })
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createPaymentInvoice(req,res){
  const {price_amount,price_currency,pay_currency,order_id} = req.body;
  const payload = {
    price_amount:price_amount,
    price_currency:'INR',//price_currency,
    pay_currency:pay_currency,
    // ipn_callback_url:ipn_callback_url,
    order_id:order_id,
    // order_description:order_description,,order_description,ipn_callback_url,success_url,cancel_url
    // success_url:success_url,
    // cancel_url:cancel_url,
    is_fee_paid_by_user:true,
    is_fixed_rate:true,
  }
  // console.log(payload)
  try {
    await api.createInvoice(payload)
    .then(invoice=>{
      console.log(invoice)
      if (!invoice) {
        res.status(200).json({message:'Error',status:false});
      }
      res.status(200).json({message:'Success',status:true,data:invoice});
    })
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createPayment(req,res){
  const { price_amount, pay_currency, order_id, order_description } = req.body;
  const price_currency='eth';
  const ipn_callback_url='';
  const fixed_rate=true; 
  const is_fee_paid_by_user=true;
  const payload = {
    price_amount:price_amount,
    price_currency:'INR',//price_currency,
    pay_currency:pay_currency,
    // ipn_callback_url:ipn_callback_url,
    order_id:order_id,
    // order_description:order_description,,order_description,ipn_callback_url,success_url,cancel_url
    // success_url:success_url,
    // cancel_url:cancel_url,
    is_fee_paid_by_user:true,
    is_fixed_rate:true,
  }
  // console.log(payload)
  try {
    await api.createPayment({price_amount,price_currency,pay_currency,order_id,order_description,fixed_rate,is_fee_paid_by_user})
    .then(payment=>{
      // console.log(payment)
      if (!payment) {
        res.status(200).json({message:'Error',status:false});
      }
      res.status(200).json({message:'Success',status:true,data:payment});
    })
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function paymentStatus(req,res){
  const { payment_id } = req.body;
  try {
    await api.getPaymentStatus({ payment_id })
    .then(payment=>{
      // console.log(payment)
      if (!payment) {
        res.status(200).json({message:'Error',status:false});
      }
      res.status(200).json({message:'Success',status:true,data:payment});
    })
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createCryptoOrder(req, res) {

  const payMethod = [
    { key: 'cod', value: '3' },
    { key: 'inr', value: '1' },
    { key: 'crypto', value: '2' }];

  let orderID;
  let orderNumber = '';
  const { mobile, total_amount, product, method } = req.body;

  try {
    const user = await User.findOne({ 
      where: { mobile: mobile },
      include: [{
        model: UserAddress,
        as: 'userAddress',
        attributes: ['userId', 'street', 'city', 'state', 'postalCode', 'country'], // specify the attributes you want
        required: true,
      },
    ]
     })

     if (!user) {
      res.status(201).json({ status: false, message: 'User not present' });
    }else{
     if (
      user.userAddress.dataValues.street===null && 
      user.userAddress.dataValues.city===null &&
      user.userAddress.dataValues.state===null &&
      user.userAddress.dataValues.postalCode===null &&
      user.userAddress.dataValues.country===null) 
      {
      res.status(201).json({status:false,message:'User address required'})
     } else {
    console.error('err')
    return res.json({status:true,user:user});

    const lastOrder = await Order.findOne({
      // where: {
      order: [['createdAt', 'DESC']],
      // }
    })
      .then((lastData) => {
        if (lastData.dataValues !== null) {
          const lastOrderNumber = lastData.getDataValue('orderNumber');
          const lastOrderNumberWithoutPrefix = parseInt(lastOrderNumber.replace('CS', ''), 10);
          orderNumber = `CS${lastOrderNumberWithoutPrefix + 1}`;
          // console.log("in",orderNumber)
        } else {
          // If it's the first order, start with 'CS100'
          orderNumber = 'CS100';
          // console.log("else",orderNumber)
        }
      })
      .then(async(orde) => {
        const order = await Order.create({ userId: user.id, orderNumber: orderNumber, totalAmount: total_amount }) //create order
        
        if (!order) {
          res.status(201).json({ status: false, message: 'Order not placed' });
        }
        orderID = order.dataValues.id;
      })
      .then(async (orderDetail) => {
        await product.forEach(prod => {
          prod.orderId = orderID;
        });
        const orderDetails = await OrderDetails.bulkCreate(product); //create order details
        if (!orderDetails) {
          res.status(201).json({ status: true, message: 'Order not placed' });
        }
      })
      .then(async (payment) => {
        payMethod.filter(async (type) => {
          if (type.value === method) {
            const paymentDetails = await OrderPayment.create({ orderId: orderID, paymentMethod: type.key, amount: total_amount }); //create payment details
            if (!paymentDetails) {
              res.status(201).json({ status: false, message: 'Order not placed' })
            } else {
              res.status(201).json({ status: true, message: 'Order placed successfully' });
            }
          }
        })
      });
    }
    }//not present

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an existing order by ID
async function updateOrder(req, res) {
  const orderId = req.params.id;
  const { userId, productId, quantity } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({ userId, productId, quantity });
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete an order by ID
async function deleteOrder(req, res) {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllOrders,
  getOneOrder,
  createCODOrder,
  getCurrencies,
  getMinimumPaymentAmount,
  createPaymentInvoice,
  createPayment,
  paymentStatus,
  createCryptoOrder,
  updateOrder,
  deleteOrder,
};
