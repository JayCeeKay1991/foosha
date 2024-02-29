const ItemModel = require('../models/items');

// posting new item to database
exports.postItem = async (req, res) => {
  try {
    const item = req.body;
    const newItem = new ItemModel(item);
    newItem.save();
    res.send(newItem);
    res.status(201);
  } catch (error) {
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


// getting item by user
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