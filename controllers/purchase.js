const Purchase = require('../Modal/purchase')

exports.purchasePost = async (req, res) => {
    const newPurchase = new Purchase(req.body);  // Use the model to create a new document
    try {
        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
exports.GetData = async(req, res) =>{
    try {
        const purchases = await Purchase.find({}, 'ItemName Quantity Vendor DeliveryDate '); 
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}