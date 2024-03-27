const jwt = require('jsonwebtoken');
require('dotenv').config()

//Authorization
exports.auth = async (req, res, next) => {
    try {
        //Extract JWT Token
        let token = req.body.token || req.cookies.token || req.header('Authorization').replace('Bearer ', '')
        
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Token not found...'
            });
        }

        //Verify Token
        try {
            let decodeToken = jwt.verify(token, process.env.JWT_TOKEN);
            console.log(decodeToken);
            req.user = decodeToken
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Token Invalid...'
            })
        }
        next();

    } catch (error) {
        console.error(401);
        return res.status().json({
            success: false,
            message: 'Something went wrong while validating the token...'
        })
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success: false,
                message: 'You are unauthorized to perform this action'
            })
        } 
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while authorizing the role...'
        })        
    }
}

//isInstructor
exports.isInstructor = async(req, res, next) => {
    try {
        if(req.user.role !== 'Instructor'){
            return res.status(401).json({
                success: false,
                message: 'You are unauthorized to perform this action'
            })
        } 
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while authorizing the role...'
        })        
    }    
}

//isAdmin
exports.isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: 'You are unauthorized to perform this action'
            })
        } 
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while authorizing the role...'
        })        
    }
}