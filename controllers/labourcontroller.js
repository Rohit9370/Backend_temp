const LabourSchema = require("../Modal/labour") ;
const newConstruction = require('../Modal/newConstruction');
const {NewSite, GetData} = require("../controllers/dashboardController");

exports.addlabour = async(req, res) =>{
    const newLabour = new LabourSchema(req.body);
        try {
            const savedLabour = await newLabour.save();
            res.status(201).json(savedLabour);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
}

exports.getsites = async(req, res) =>{
    try {
            const sites = await newConstruction.find({}, 'siteName '); 
            res.json(sites);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
}

exports.getAllLabour = async(req, res) =>{
    try {
            const Name = await LabourSchema.find({}, ' Name'); 
            res.json(Name);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
}