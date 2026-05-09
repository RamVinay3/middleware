exports.createProfile=(req,res,next)=>{


    return res.json({"action":"created Profile"});
}

exports.getProfile=(req,res,next)=>{


    return res.json({"action":"fetching Profile"});
}
exports.updateProfile=(req,res,next)=>{


    return res.json({"action":"updated Profile"});
}

exports.deleteProfile=(req,res,next)=>{


    return res.json({"action":"deleted Profile"});
}





