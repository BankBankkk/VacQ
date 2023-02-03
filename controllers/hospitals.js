//@desc     Get all hospitals
//@route    Get /api/vi/hospitals
//@access   Public
exports.getHospitals=(req,res,next)=>{
    res.status(200).json({success:true, msg:'Get all hospitals'});
}

//@desc     Get single hospitals
//@route    Get /api/vi/hospitals/:id
//@access   Public
exports.getHospital=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Get hospital ${req.params.id}`});
}

//@desc     Create a hospital
//@route    Post /api/vi/hospitals
//@access   Private
exports.createHospital=(req,res,next)=>{
    res.status(200).json({success:true, msg:'Create a hospital'});
}

//@desc     Update single hospitals
//@route    PUT /api/vi/hospitals/:id
//@access   Private
exports.updateHospital=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Update hospital ${req.params.id}`});
}

//@desc     Delete single hospitals
//@route    DELETE /api/vi/hospitals/:id
//@access   Private
exports.deleteHospital=(req,res,next)=>{
    res.status(200).json({success:true, msg:`Delete hospital ${req.params.id}`});
}