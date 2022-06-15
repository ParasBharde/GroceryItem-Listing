const express = require('express')
const router = express.Router();
const groceryItemsModel = require('../models/groceryItemsModel')

router.post('/add', async function (request, response) {
    try {
        const additionResponse = await groceryItemsModel.create(request.body);
        console.log("additionResponse", additionResponse);
        response.send({ "result": "item added successfully" });
    } catch (err) {
        console.error("error occured in Adding Items", err)
    }
})
router.get("/list", async function (request, response) {
    try {
        const groceryList = await groceryItemsModel.find({}, { __v: 0 })
        response.send({ result: groceryList });

    } catch (err) {
        console.log("error occured in List", err);
    }

});

//Update Items
router.put("/update", async function (request, response) {
    try {
        //Step 1: Find the record
        const groceryItemRecord = await groceryItemsModel.findOne({
            _id: request.body._id
        });
        //Step 2: update the record/pbject
        groceryItemRecord.isPurchased = true;
        console.log('groceryItemRecord', groceryItemRecord);

        //Save the update back into database
        await groceryItemRecord.save();
        response.send({ result: "Item update success" });

    } catch (err) {
        console.log("error occured in List", err);

    }

})

//delete request
router.delete("/delete",async function (request, response) {
    try {
        //Use deleteOne method to delete the items
   const groceryItemsDelete = await groceryItemsModel.deleteOne({ _id: request.body._id })
            console.log('groceryItemsDelete',groceryItemsDelete);
           response.send({ result: "Item Deleted successfully" });
    }catch(e)
    {
        console.log('Error Occured', e)
    }
})

module.exports = router;


/*

*/

/**
 * router.delete('/:delete',async function(req, res) 
{
    try {
        const groceryItemsDelete = await res.deleteOne(req.body._id);
         console.log('groceryItemsDelete',groceryItemsDelete);
         response.send({ result: "Item Deleted successfully" });
         }catch(e)
         {
             console.log('Error Occured', e)
         }
    

});
 */
