const ItemModel = require('../models/items');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  // fixme: store these safely!
  // CLOUDINARY_CONFIG
  cloud_name: 'dkvrbsh2c',
  api_key: '418961749584279',
  api_secret: 'yPb8oSjTEUfvC0GeqS8DU7-6Pew'
});


// posting new item to database
exports.postItem = async (req, res) => {
  try {
    const { title, description, owner, date, available, locationName, image } = req.body;
    const { lat, lng } = req.body.location;
    const newItem = new ItemModel({
      title,
      description,
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      locationName,
      owner,
      date,
      available,
      image
    });
    newItem.save();
    res.send(newItem);
    res.status(201);
    console.log('😍', newItem, image);
  }
  catch (error) {
    console.error(error);
    res.send(error);
    res.status(500);
  }
}

// getting all items from database
exports.allItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error(error);
    res.send(error);
    res.status(500);
  }
}

// getting item by id
exports.itemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await ItemModel.findById(id);
    res.send(item);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error(error);
    res.send(error);
    res.status(500);
  }
}


//getting item by user
exports.itemByOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const items = await ItemModel.find({owner: ownerId});
    res.send(items);
    res.status(200);
    return res.body;
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
}

// edit item
exports.editItem = async (req, res) => {
  try {
    const id = req.params.id;
    const {title, description, date, location, available, image, specialDiet} = req.body;
    const updatedItem = await ItemModel.findOneAndUpdate(
      {_id: id},
      {$set: {
        title: title,
        description: description,
        date: date,
        location: location,
        available: available,
        image: image,
        specialDiet: specialDiet
    }},
      {new: true}
    );
    res.status(201);
    res.send(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
}

// delete item
exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await ItemModel.deleteOne({_id: id});
    res.status(200);
    res.send('Item successfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
}