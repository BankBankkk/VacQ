const { Query } = require('mongoose');
const Hospital = require('../models/Hospital');
//@desc     Get all hospitals
//@route    Get /api/vi/hospitals
//@access   Public
exports.getHospitals= async (req,res,next)=>{
    let query;

    //Copy req.query
    const reqQuery = {...req.query};

    //Frields to exclude
    const removeFields = ['select','sort','page','limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    //Create query string
    let queryStr=JSON.stringify(reqQuery);

    //Create operators ($gt, $gte, etc)
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);

    //finding resource
    query=Hospital.find(JSON.parse(queryStr)).populate('appointments');

    //Select Fields
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
    }
    //Sort
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    }else{
        query=query.sort('-createdAt');
    }

    //Pagination
    const page=parseInt(req.query.page,10)||1;
    const limit=parseInt(req.query.limit,10)||25;
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;

    try{
        const total=await Hospital.countDocuments();
        query=query.skip(startIndex).limit(limit);

        //Execute query
        const hospitals = await query;

        //Pagination result
        const pagination={};

        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }

        res.status(200).json({success:true, count:hospitals.length, data:hospitals});
        //res.status(200).json({success:true, count:hospitals.length, pagination, data:hospitals});
    } catch(err){
        res.status(400).json({success:false});
    }
    
};

//@desc     Get single hospitals
//@route    Get /api/vi/hospitals/:id
//@access   Public
exports.getHospital= async (req,res,next)=>{
    try{
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:hospital});
    } catch(err){
        res.status(400).json({success:false});
    }
    
};

//@desc     Create a hospital
//@route    Post /api/vi/hospitals
//@access   Private
exports.createHospital= async(req,res,next)=>{
    //console.log(req.body);
    const hospital = await Hospital.create(req.body);
    res.status(201).json({success:true, data:hospital});
}

//@desc     Update single hospitals
//@route    PUT /api/vi/hospitals/:id
//@access   Private
exports.updateHospital= async (req,res,next)=>{
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidation:true
        });
        if(!hospital){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:hospital});
    } catch(err){
        res.status(400).json({success:false});
    }
};

//@desc     Delete single hospitals
//@route    DELETE /api/vi/hospitals/:id
//@access   Private
exports.deleteHospital= async (req,res,next)=>{
    try{
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital)
            res.status(400).json({success:false});
        
        hospital.remove();
        res.status(200).json({success:true, data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};