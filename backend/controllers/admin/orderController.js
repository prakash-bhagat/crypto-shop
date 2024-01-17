// controllers/orderController.js
const { Order, OrderDetails, OrderPayment } = require('../../models/orderModel');
const { User } = require('../../models/userModel');

// Get all orders
async function getAllOrders(req, res) {

//   const { mobile } = req.body;

  try {
    // const user = await User.findOne({ where: { mobile: mobile } });
    // if (!user) {
    //   return res.status(404).json({ message: 'Order not found' });
    // } else {

      const order = await Order.findAll({
        // where: { userId: user.id },
        include: [{
          model: OrderDetails,
          as: 'orderDetail',
          attributes: ['orderId', 'productId', 'quantity', 'price'], // specify the attributes you want
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
        attributes: ['orderId', 'productId', 'quantity', 'price'], // specify the attributes you want
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
async function createOrder(req, res) {

  const payMethod = [
    { key: 'cod', value: '3' },
    { key: 'inr', value: '1' },
    { key: 'crypto', value: '2' }];

  let orderID;
  let orderNumber = '';
  const { mobile, total_amount, product, method } = req.body;

  try {
    const user = await User.findOne({ where: { mobile: mobile } })
    // console.log(user)
    if (!user) {
      res.status(201).json({ status: false, message: 'User not present' });
    }

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

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an existing order by ID
async function updateOrder(req, res) {
  // const orderId = req.params.id;
  const { orderId } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({status:false, message: 'Order not found' });
    }

    await order.update({ userId, productId, quantity });
    res.json({status:true, message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an existing order by ID
async function updateOrderAccept(req, res) {
  const typeValue=[
    {id:'1',value:'accepted'},
    {id:'2',value:'declined'},
  ]
  const { orderId,type } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({status:false, message: 'Order not found' });
    }

    typeValue.filter(async t=>{
      if (type===t.id) {
        const updatedOrder = await order.update({ orderStatus:t.value });
        if (!updatedOrder) {
          res.json({status:false, message: 'Order not updated' });
        } else {
          res.json({status:true, message: 'Order updated successfully' }); 
        }
      }
    })
    
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
  createOrder,
  updateOrder,
  updateOrderAccept,
  deleteOrder,
};
