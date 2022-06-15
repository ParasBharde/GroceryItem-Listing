const mongoose = require('mongoose');
const groceryItemSchema = new mongoose.Schema(
    {
      itemName: String,
      isPurchased: Boolean,
},
{collection: "groceryItemCollection"}
);

const model = mongoose.model('groceryItemModel',groceryItemSchema);

module.exports = model;






