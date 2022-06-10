const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  registerValidator(){
    return [
      check('email')
        .isEmail()
        .withMessage('ایمیل به درستی وارد نشده است'),
      check('name')
        .not()
        .isEmpty()
        .withMessage('نام خالی است'),
      check('password')
        .not()
        .isEmpty()  
        .withMessage('پسود به درستی وارد نشده است')
    ]
  }

  loginValidator(){
    return [
      check('email')
        .isEmail()
        .withMessage('ایمیل به درستی وارد نشده است'),
      check('password')
        .not()
        .isEmpty()  
        .withMessage('پسود به درستی وارد نشده است')
    ]
  }
}