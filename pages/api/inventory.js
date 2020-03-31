import dbConnect from "../../utils/dbConnect";
import Inventory_model from "../../models/inventory";

dbConnect();

export default async (req, res) => {
  if (req.method === "POST") {
    // Process a POST request
    if (!req.body.inventory_ID) {
      return res.status(400).json({
        status: "error",
        error: "req body cannot be empty"
      });
    }
    res.status(200).json({
      status: "succes",
      data: req.body
    });
    let data = req.body;

    // res.send(data); //garbled headers included in form data req body
    //code not compiing beyond this point because of headers in req body
    var Inventory_values = new Inventory_model({
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
    //The below upsert action is grabbed from 2nd answer here:
    // https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
    var upsertData = Inventory_values.toObject();
    delete upsertData._id;
    await Inventory_model.update(
      { _id: Inventory_values.id },
      upsertData,
      { upsert: true },
      function(err, data) {
        res.send("Failed :c ", err);
      }
    );
  }
};
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
