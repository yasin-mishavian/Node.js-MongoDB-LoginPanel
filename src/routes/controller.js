const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');
const User = require('./../models/user')

module.exports = class {
  constructor(){
    autoBind(this) ;
    this.User = User ;
  }

  validationBody(req , res){
    const result = validationResult(req);
    if(!result.isEmpty()){
      const errors = result.array();
      const massages = [];
      errors.forEach(err => massages.push(err.msg));
      res.status(400).json({
        massages: 'validation error' ,
        data : massages
      })
      return false ;
    }
    return true ;
  }

  validate(req ,res ,next){
    if(!this.validationBody(req , res)){
      return;
    }
    next();
  }

  response({res , massage , code=200 , data={} }){
    res.status(code).json({
      massage,
      data
    });
  }
}