const User = require("../models/User");
const { generateToken } = require("../lib/jwt");

const register = async (req, res) => {
  try {
    // TODO: CREATE A REGISTER FUNCTION HERE
    // STEP 1: Extract data from req.body (firstName, middleName, lastName, email, phone, role, password)
    // STEP 2: Validate all the incoming data (check if required fields are present and in correct format)
    // STEP 3: Verify that the role exists in the database (validate role against Role model)
    // STEP 4: Check if email is already registered in the database (prevent duplicate email)
    // STEP 5: Check if phone is already registered in the database (prevent duplicate phone)
    // STEP 6: Hash the password using bcrypt or similar
    // STEP 7: Save the new user in the database with status as pending/inactive
    // STEP 8: Send success response "User registered successfully" with user details (without password)
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    // TODO: CREATE A LOGIN FUNCTION HERE
    // STEP 1: Extract data from req.body (email, password)
    // STEP 2: Validate that email and password are provided
    // STEP 3: Check if user exists in the database with the provided email
    // STEP 4: Verify that user status is approved/active (not pending or rejected)
    // STEP 5: Compare the provided password with stored hashed password
    // STEP 6: If password matches, generate JWT token using generateToken function
    // STEP 7: Send success response with token and user information (without password)
    // STEP 8: Send error response for invalid email or password
  } catch (error) {}
};

const getMe = async (req, res) => {
  try {
    // TODO: CREATE A GET ME FUNCTION HERE
    // STEP 1: Extract user ID from req.user (from JWT middleware/token)
    // STEP 2: Fetch user details from the database using user ID
    // STEP 3: Populate or include related data like role and permissions if needed
    // STEP 4: Exclude sensitive data like password from the response
    // STEP 5: Send success response with complete user profile information
    // STEP 6: Send error response if user not found or not authenticated
  } catch (error) {}
};

const approveUser = async (req, res) => {
  try {
    // TODO: CREATE AN APPROVE USER FUNCTION HERE (ADMIN ONLY)
    // STEP 1: Extract admin ID from req.user to verify admin authorization
    // STEP 2: Extract user ID from req.params or req.body to identify which user to approve
    // STEP 3: Verify that the requester has admin role/permissions
    // STEP 4: Fetch the user from the database using user ID
    // STEP 5: Check if user exists and is currently in pending/inactive status
    // STEP 6: Verify the user's role to ensure only teacher and student roles can be approved (not other roles)
    // STEP 7: Update the user's status to approved/active in the database
    // STEP 8: Send success response "User approved successfully" with user details
    // STEP 9: Send appropriate error responses for invalid user, already approved, or unauthorized admin
  } catch (error) {}
};
