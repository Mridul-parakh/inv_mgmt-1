import Inventory from "../../models/inventory_model";

export default async (req, res) => {
  let data = req.body;
  res.end(data); //garbled headers included in form data req body
  //code not compiing beyond this point because of headers in req body
  var Inventory_values = new Inventory({
    inventory_ID: data.inventory_ID,
    serial_no: data.serial_no,
    $push: { type: data.type },
    $push: { category: data.category },
    $push: { brand: data.brand },
    $push: { model: data.model },
    RAM: data.RAM,
    Additional_RAM: data.Additional_RAM,
    DOP: data.DOP,
    invoice: data.invoice,
    $push: { status: data.status },
    assigned_to: data.assigned_to
  });

  var upsertData = Inventory_values.toObject();
  delete upsertData._id;
  await Inventory.updateOne(
    { _id: Inventory.id },
    upsertData,
    { upsert: true },
    function(err, data) {
      res.end("Failed :c ", err);
    }
  );
};

// export default /*async*/ (req, res) => {
//   let data = req.body;
//   console.log(
//     "THE DATA BODY LOOKS LIKE THIS ___________________________________________________",
//     data
//   );

//   upload.none()(req, {}, err => {
//     // do something with the file
//     res.end("some text data received I think :/");
//   });

//   //   res.send(data); //garbled headers included in form data req body
//   //code not compiing beyond this point because of headers in req body
//   var Inventory_model = new InventorySchema({
//     inventory_ID: data.inventory_ID,
//     serial_no: data.serial_no,
//     $push: { type: data.type },
//     $push: { category: data.category },
//     $push: { brand: data.brand },
//     $push: { model: data.model },
//     RAM: data.RAM,
//     Additional_RAM: data.Additional_RAM,
//     DOP: data.DOP,
//     invoice: data.invoice,
//     $push: { status: data.status },
//     assigned_to: data.assigned_to
//   });
//   var upsertData = Inventory_model.toObject();
//   delete upsertData._id;
//   /*await*/ Inventory_model.update(
//     { _id: Inventory_model.id },
//     upsertData,
//     { upsert: true },
//     function(err, data) {
//       console.log("ERROR! Failed to save data :c ", err);
//     }
//   ).then(console.log("Data Saved :D ", data));
// };

//===========================================================================================================

//   await InventoryModel.Inventory_values.findOneAndUpdate(
//     Inventory_values,
//     query,
//     { upsert: true },
//     function(err, doc) {
//       res.send("Psssttt!!!here!!");
//       if (err) return res.send(500, { error: err }, "Failed to insert :c ");
//       return res.send("Succesfully inserted values!.");
//     }
//   );

//   console.log(req.body); // The request body
//   Inventory_values.save()
//     .then(doc => {
//       res.status(200);
//       console.log(doc);
//       res.send("data successfully inserted!");
//     })
//     .catch(err => {
//       res.status(404);
//       console.error(err);
//       res.send("Failed to insert data :c ");
//     });
// };

// inventory_ID:data.inventory_ID,
// serial_no:data.serial_no,
// type:data.type,
// category:data.category,
// brand:data.brand,
// model:data.model,
// RAM:data.RAM,
// Additional_RAM:data.Additional_RAM,
// DOP:data.DOP,
// invoice:data.invoice,
// Status:data.Status,
// assigned_to:data.assigned_to,
