const { Types } = require('mongoose');
const BaseService = require('../services/BaseService');
const UserModel = require("../models/User")
const csvd = require('csvtojson');
const formidable = require('formidable');

const { ResourceNotFound } = require('../errors');

/**
 * @typedef {import('mongoose').Document} MongooseDocument
 * @typedef {import('mongoose').Types.ObjectId} ObjectId
 */

class ApiService extends BaseService {

  /**
   * @param {object} user 
   * @returns {Promise<Array<MongooseDocument>>} inserted users
   */
  async sendEmail(req) {
    const form = new formidable.IncomingForm();
    try{
    form.parse(req, async function (err, fields, files) {
      console.log(err);

      if (err) throw TypeError("Invalid Data provided")

      if (files.details) {
        var iteratedList = [];
        const converter = await csvd()
              .fromFile(files.details.path)
              .then((tempData) => {
                  iteratedList = iteratedList.concat(tempData);
              })
          var allUsersData = await UserModel.find({}).exec();
          var allUsers = {}
          for (a in allUsersData) {
            allUsers[allUsersData[a].email.toLowerCase()] = allUsersData[a]
          }
         
          for (let row of iteratedList) {
                  console.log(row);
          }
            
      };

  });
}catch(e){
  console.log(e);
}
  }

    /**
   * @param {object} user 
   * @returns {Promise<Array<MongooseDocument>>} inserted users
   */
     async addUser(user) {
      const { firstname, lastname, email, age } = user;
      if(!firstname || firstname.trim() == "") throw new TypeError('Please enter a valid firstname');
      if(!lastname || lastname.trim() == "") throw new TypeError('Please enter a valid lastname');
      if(!email || email.trim() == "") throw new TypeError('Please enter a valid email');
      if(!age || age == "" || age<0) throw new TypeError('Please enter a valid age');
  
      var newUser = new UserModel();
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.email = email;
      newUser.age = age;
      console.log(newUser);
      return newUser.save()
  
    }
 
}

module.exports = new ApiService(UserModel);