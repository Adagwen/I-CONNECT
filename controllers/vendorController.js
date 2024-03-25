const asyncHandler = require("express-async-handler");
const Vendor = require("../models/vendorModel");
//const passport = require("passport");


//@desc Get all vendors
//@route Get /api/vendors
//@access private
const getVendor = asyncHandler(async(req,res) => {
    const vendor = await Vendor.find({user_id: req.user.id});
    res.status(200).json(vendor);
});

//@desc Create New vendors
//@route POST /api/vendors
//@access private
const createVendor = asyncHandler(async(req,res) => {
    console.log("The request body is :", req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All the fields are mandatory !!");
    }
const vendor = await Vendor.create({
    name,
    email,
    phone,
    //skills,
    user_id: req.user.id
});
  res.status(201).json(vendor);
});

//@desc Get vendors
//@route POST /api/vendors
//@access private
const getVendors = asyncHandler(async(req,res) => {
    const vendor = await Vendor.findById(req.params.id);
     if(!vendor){
        res.status(404);
        throw new Error("Vendor not found");
     }
    res.status(200).json(vendor);
});

//@desc Update vendor
//@route PUT /api/vendor/:id
//@access private
//in other to update a vendor, you will need to fetch a vendor
const updateVendor = asyncHandler(async(req,res) => {
    const vendor = await Vendor.findById(req.params.id);
     if(!vendor){
        res.status(404);
        throw new Error("Vendor not found");
     }

     if(vendor.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other vendors");
     }

     const updatedVendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
     );
    res.status(200).json(updatedVendor);
});

//@desc delete vendor
//@route DELETE /api/vendor/:id
//@access private
const deleteVendor = asyncHandler(async(req,res) => {
    const vendor = await Vendor.findById(req.params.id);
     if(!vendor){
        res.status(404);
        throw new Error("Vendor not found");
     }
     if(vendor.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other vendors");
     }

        await Vendor.deleteOne({_id: req.params.id});
       res.status(200).json(vendor);
  
     
    
});

module.exports = {
    getVendor, 
    createVendor, 
    getVendors,
    updateVendor,
    deleteVendor
};