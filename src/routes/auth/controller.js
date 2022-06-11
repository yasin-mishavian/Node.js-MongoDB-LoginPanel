const controller = require('./../controller');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = new (class extends controller {

  async register(req , res){
    let user = await this.User.findOne({email: req.body.email});
    if(user){
      return this.response({
        res , code:400 , massage: 'ایمیل قبلا وارد شده است'
      })
    }
    // const {email , name , password} = req.body ;
    // user = new this.User({email , name , password})
    user = new this.User(_.pick(req.body , [ "email" , "name" , "password" ]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);

    await user.save();

    this.response({
      res , massage: 'کاربر با موفقیت اضافه شد',
      data : _.pick(user , [ "_id" , "name" , "email" ])
    });
  }

  async login(req , res){
    const user = await this.User.findOne({email : req.body.email});
    if(!user){
      return this.response({
        res , code:400 , massage: 'ایمیل یا پسورد صحیح نمیباشد'
      });
    }
    const isValid = await bcrypt.compare(req.body.password , user.password);
    if(!isValid){
      return this.response({
        res , code:400 , massage:'ایمیل یا پسورد صحیح نمیباشد'
      });
    }
    const token = jwt.sign({_id : user.id} , config.get('jwt_key'));
    this.response({
      res , massage : 'ورود با موفقیت انجام شد' , data:{token}
    })
  }
})();