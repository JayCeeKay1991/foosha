const UserModel = require('../models/users');
const bcrypt = require('bcrypt');


// sign up: create a new user
exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  const userInDb = await UserModel.findOne({ email: email });
  if (userInDb)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201)
    res.send(user);
  } catch (error) {
    res.status(400)
    res.send({ error, message: 'Could not create user' });
  }
};

// getting the logged in user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    res.status(200).send(user);
  } catch (error) {
    res.status(401);
    res.send({ error: '401', message: 'Username or password is incorrect' });
  }
};

// edit user details
exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, email, password, status, image, preferences} = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      {_id: id},
      {$set: {
        name: name,
        email: email,
        password: password,
        status: status,
        image: image,
        preferences: preferences
    }},
      {new: true}
    );
    res.send(updatedUser);
    res.status(201);
  } catch (error) {
    console.error();
    res.status(500);
    res.send(error);
  }
}
