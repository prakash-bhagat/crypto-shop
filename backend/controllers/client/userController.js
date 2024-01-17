// controllers/userController.js
const { User, UserAddress } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller to get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to get a user by ID
async function getUserById(req, res) {
  const mobile = req.body.mobile;

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
      return res.status(404).json({status:false, message: 'User not found' });
    }else{
        res.json({status:true, data:user,message:'User details'});
    }
    // res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to create a new user
async function createUser(req, res) {
  const { mobile, password, name } = req.body;

  try {
    // const newUser = await User.create({ mobile, password });

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res.status(400).json({status:false, message: 'Mobile already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a JWT token
    const token = jwt.sign({ mobile: mobile }, process.env.JWT);
    
    // Create a new user
    const newUser = await User.create({name, mobile, password: hashedPassword,token:token });
    if (newUser) {
      const userAdd = await UserAddress.create({userId:newUser.id});
      if (userAdd) {
        res.status(201).json({status:true, message: 'User created successfully' });
      } else {
        res.status(201).json({status:false, message: 'User not created', });
      }
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to login user
async function loginUser(req,res){
  const { mobile, password } = req.body;

  if (mobile && password) {
  
  try {
    const user = await User.findAll({ where: { mobile:mobile } });
// console.log(user)
    if (!user || user.length === 0) {
      return res.status(201).json({ message: 'User not exist',status:false });
    }
// console.log(user[0].password)
    const passwordMatch = await bcrypt.compare(password, user[0].password);
// console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(201).json({ message: 'Invalid mobile or password',status:false });
    }
// console.log(process.env.JWT)
    const token = jwt.sign({ mobile: mobile }, process.env.JWT, { expiresIn: '2d' });

    res.status(200).json({ token:token,user:user,status:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error',status:false });
  }
} else {
  res.status(500).json({ message: 'Unauthorised access',status:false });
}
}

// Controller to update a user by ID
async function updateUser(req, res) {

  const { mobile,type } = req.body;

// return
  try {
    const user = await User.findOne({where:{mobile:mobile}});
    
    if (type === 'user') {
      const {name,email} = req.body;
      // const user = await User.findOne({where:{mobile:mobile}});

      if (!user) {
        return res.status(404).json({status:false, message: 'User not found' });
      }
  
      await user.update({ name, email, mobile });
      res.json({status:true, message: 'User updated successfully' });
    } else if(type === 'add'){
      const {street,city,state,postalCode,country} = req.body;
      // const user = await User.findOne({where:{mobile:mobile}});

      if (!user) {
        return res.status(404).json({status:false, message: 'User not found' });
      }
      await UserAddress.update({ street,city,state,postalCode,country },{where:{userId:user.dataValues.id}});
      res.json({status:true, message: 'User updated successfully' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to delete a user by ID
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
