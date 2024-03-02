const mongoose = require('./index');

// defining data structure
const Item = new mongoose.Schema ({
  title: String,
  description: String,
  owner: String,
  date: { type: Date, default: Date.now() },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },
  locationName: String,
  available: {type: Boolean, default: true},
  image: String
});

Item.index({ location: '2dsphere' });
const ItemModel = mongoose.model('items', Item);
module.exports = ItemModel;
