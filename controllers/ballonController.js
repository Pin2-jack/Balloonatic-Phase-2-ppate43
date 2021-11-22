"use strict";

const httpStatus = require("http-status-codes");
var fs = require('fs');
var file= "/js/balloonatic-users.json";


exports.home = (req, res) => {
  res.render("home");
};

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
  };
exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  if (errorCode == 404){
    res.render("error_not_found");
  }else{
    res.render("iternal_server_error");
  }
};

exports.pro_list = (req, res) => {
  var data=fs.readFileSync("balloonatic-products.json");
  var data_json = JSON.parse(data);
  res.render("product_list",{ product_list: data_json});
};

exports.contact = (req, res) => {
  res.render("contact");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.register = (req, res) => {
  res.render("register");
};

exports.about = (req, res) => {
  res.render("about");
};

exports.register_post = (req, res) => {
  var email = req.body.email;
  var password1 = req.body.password1;
  var fName = req.body.fName;
  var lName = req.body.lName;
  var address = req.body.address;
  var City = req.body.City;
  var State = req.body.State;
  var pCode = req.body.pCode;
  var country= req.body.country;
  var phone = req.body.phone;

  var obj = { form_data: [] };
 
  var new_data = JSON.stringify(obj);

  fs.readFile('balloonatic-users.json',function readFileCallback(err, data){
  
    obj = JSON.parse(data);
    obj.push({email: email , password: password1, firstName: fName,lastName:lName,address:address,city:City,state:State,postalCode:pCode,country:country,phone:phone })
    new_data = JSON.stringify(obj);
    fs.writeFile('balloonatic-users.json', new_data, (err) => { 
      if (err) { console.log(err); } 
    }); 
   

  });

  res.end(res.render("home"));
};
