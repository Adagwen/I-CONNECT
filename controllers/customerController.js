//handles user-related actions
const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");


//@desc Get all customers
//@route Get /api/customers
//@access private
const getCustomers = asyncHandler(async(req,res) => {
    const customers = await Customer.find(); 
    res.status(200).json(customers);
});


//@desc Get customer
//@route POST /api/customer
//@access private
const getCustomer = asyncHandler(async(req,res) => {
    const customer = await Customer.findById(req.params.id);
     if(!customer){
        res.status(404);
        throw new Error("Customer not found");
     }
    res.status(200).json(customer);
});


//@desc Update customer
//@route PUT /api/customer/:id
//@access private
//in other to update a customers, you will need to fetch a customers
const updateCustomer = asyncHandler(async(req,res) => {
    const customer = await Customer.findById(req.params.id);
     if(!customer){
        res.status(404);
        throw new Error("Customer not found");
     }

     if(customer.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Customer do not have permission to update other customers");
     }

     const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
     );
    res.status(200).json(updatedCustomer);
});

//@desc delete customer
//@route DELETE /api/customer/:id
//@access private
const deleteCustomer = asyncHandler(async(req,res) => {
    const customer = await Customer.findById(req.params.id);
     if(!customer){
        res.status(404);
        throw new Error("Customer not found");
     }
     if(customer.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other customers");
     }

        await Customer.deleteOne({_id: req.params.id});
       res.status(200).json(customer);
  
     
    
});

module.exports = {
    getCustomers,  
    getCustomer,
    updateCustomer,
    deleteCustomer
};