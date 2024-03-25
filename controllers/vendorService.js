const asyncHandler = require("express-async-handler");
const Service = require("../models/vendorServicesModel");

// This route accepts a POST request with service details in the request body. It checks if the user is logged in and authorized, then creates a new Service object with the provided data and saves it to the database.

const newServiceDetails = asyncHandler(async(req,res)=>{
    console.log(req.body)
    console.log(req.params)
    try {
        const { category = "", description = "", pricing = "", location = "", imageUrl = ""} = req.body;

        //check if the vendor is logged in and authorized to create service

        if (!req.params.vendor_id) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const newService = new Service({
            vendor: req.params.vendor_id,
            category,
            description,
            pricing,
            location,
            imageUrl
        });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

//To Get all services of the vendor (GET)
const retriveServices = asyncHandler(async(req,res)=>{
    try {
        const services = await Service.find().populate("vendor", "username");// populates user details
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

//To Get specific service(GET) This route retrieves a specific service based on the ID provided in the URL parameter.
const retriveService = asyncHandler(async(req,res)=>{
    try {
        const service = await Service.findById(req.params.id).populate("vendor", "username");
        if (!service) {
            return res.status(404).json({message: "Service not found"});
        }
        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

//To update a service(PUT)
const updateService = asyncHandler(async (req, res) => {
    try {
      const { category, description, pricing, location, imageUrl } = req.body;
  
      // Check if service exists
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        { category, description, pricing, location, imageUrl },
        { new: true } // Return the updated document
      );
  
      res.status(200).json(updatedService);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  module.exports = { newServiceDetails,retriveServices,retriveService,updateService};