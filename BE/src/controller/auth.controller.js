const User = require("../models/User");
const { generateToken } = require("../lib/jwt");

const register = async (req, res) => {
  try {
    // TODO: CREATE A REGISTER FUNCTION HERE
    // USE THE BODY AS firstName, middleName, lastName, email, phone, role, password
    //validate all the data comming and also check the role exists in the database with the role
    // then check the email and phone is not already present in the database
    // then save the user in the database
    // send only one message in response register user successfully
  } catch (error) {}
};

const approve = async (req, res) => {};

const login = async (req, res) => {};
