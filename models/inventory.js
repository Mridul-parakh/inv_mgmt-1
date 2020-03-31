const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  inventory_ID: {
    type: String,
    required: [true, "Please enter valid Inventory_ID"],
    unique: true,
    trim: true,
    maxLength: [8, "Max length of Inventory ID is 8 chars."]
  },

  serial_no: {
    type: String,
    required: [true, "Please enter valid serial number"],
    unique: true,
    trim: true
  },
  type: [
    {
      type: String,
      required: [true, "Please enter a type ( H/W, S/W )"]
    }
  ],
  category: [
    {
      type: String,
      required: [
        true,
        "Please enter a device ( Laptop/Keyboard/Mouse/Monitor )"
      ]
    }
  ],
  brand: [
    {
      type: String,
      required: [true, "Please enter a brand name (Dell/HP/Asus)"]
    }
  ],
  model: [
    {
      type: String,
      required: [true, "Please enter valid serial number"],
      trim: true
    }
  ],
  RAM: {
    type: Number,
    required: [true, "Please enter a RAM value ( 4/8/16 )"]
  },
  Additional_RAM: {
    type: Number,
    required: [true, "Please enter valid additional RAM value ( 0/2/4/8/16 )"]
  },
  DOP: { type: Date },
  invoice: { type: Buffer, disableMultipart: true },
  status: [
    {
      type: String,
      required: [true, "Please enter the current assignment status"]
    }
  ],
  assigned_to: {
    type: String,
    required: [true, "Please enter valid User_ID for referencing."]
  }
});

module.exports =
  mongoose.models.Inventory ||
  mongoose.model("Inventory_model", InventorySchema);
