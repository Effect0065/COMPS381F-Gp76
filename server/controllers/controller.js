const Customer = require('../models/Customer');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const User = require("../models/Register");

const bodyParser = require('body-parser');
const { trace } = require('../routes/routes');

/** 
 *  GET /
 *  Login page
*/

exports.loginpage = async (req, res) => {
  const locals = {
    title: "Login"
  }
  const messages = await req.flash("info")
  try {
    res.render('index', {
      locals, 
      layout: './layouts/login', 
      messages
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 *  POST /
 *  Login page
 */

exports.postLogin = async (req, res) => {

  try {
    const check = await User.findOne({username: req.body.username});
    if (!check) {
      req.flash('info', 'Wrong Username')
      res.redirect("/");
    }

    // Compare hashed password from database with the plain text
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch) {
      req.session.isAuth = true;
      req.session.username = req.body.username;
      console.log("set to true")
      res.redirect('/dashboard')
    } else{
      req.flash('info', 'Wrong Password')
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
}

/** 
 *  GET /
 *  Signup page
*/

exports.signuppage = async (req, res) => {
  const locals = {
    title: "Signup"
  }
  const messages = await req.flash("info")
  try {
    res.render('signup', {
      locals, 
      layout: './layouts/login', 
      messages
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 *  POST /
 *  Signup page
 */

exports.postSignup = async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password
  }

  // Check if user alreadt exists
  const existingUser = await User.findOne({username: data.username});

  if (existingUser) {
    req.flash('info', 'Username has been used. Please choose a different username')
    res.redirect('/signup')
  } else {
    // Hash password
    const saltRounds = 10; //Number of salt round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    console.log(hashedPassword)
    data.password = hashedPassword; //Replace ori.pw with hashed password

    const userdata = await User.insertMany(data);
    console.log(userdata);
    res.redirect('/dashboard')
  }
}

/**
 *  POST /
 *  Signup page
 */

exports.postLogout = async (req, res) => {
  console.log("Logout")
  req.session.destroy((error) => {
    if (error) throw error;
    res.redirect('/');
  })
}

/**
 *  GET / 
 *  Dashboard page
 */ 

exports.dashboardpage = async (req, res) => {

  if (!req.session.isAuth) {
    return res.redirect('/')
  }

  const messages = await req.flash("info");
  const locals = {
      title: "Dashboard",
  }

  let perPage = 12;
  let page = req.query.page || 1;

  try {
      const customers = await Customer.aggregate([ { $sort: { updatedAt: -1 } } ])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();
      const count = await Customer.countDocuments({});

      res.render("dashboard", {
          locals,
          customers,
          current: page,
          pages: Math.ceil(count / perPage),
          messages,
          layout: './layouts/main'
          });
  } catch (error) {
    console.log(error);
  }

}
  
/**
 * GET /
 * Customer Data
 */
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const messages = await req.flash("info");

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
      messages,
      layout: './layouts/main'
    });
  } catch (error) {
    console.log(error);
  }
};
  
/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer",
  };

  res.render("customer/add", {locals, layout: './layouts/main'});
};
  
/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
  
/**
 * GET /
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const messages = await req.flash("info");

    const locals = {
      title: "Edit Customer Data",
    };

    res.render("customer/edit", {
      locals,
      customer,
      messages,
      layout: './layouts/main'
    });
  } catch (error) {
    console.log(error);
  }
};
  
  /**
   * GET /
   * Update Customer Data
   */
  exports.editPost = async (req, res) => {
    try {
      await Customer.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now(),
      });
      await req.flash("info", "Edit Success.");
      await res.redirect(`/view/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  };

/**
 * GET /
 * Delete Customer Data
 */
exports.delete = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Delete Customer Data",
    };

    res.render("customer/delete", {
      customer,
      locals,
      layout: './layouts/main'
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer Data
 */
exports.deletePost = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    await req.flash('info', "Customer record has been deleted.");
    res.redirect("/dashboard");
    console.log(req.params.id);
  } catch (error) {
    console.log(error);
  }
};
  
/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
      layout: './layouts/main'
    });
  } catch (error) {
    console.log(error);
  }
};
  
/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", {locals, layout: './layouts/main'});
  } catch (error) {
    console.log(error);
  }
};

/**
 *  Restful API
 */
exports.addAPI = async (req, res) => {
  console.log("API Post: Request")
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });
  try {
    const savedPost = await Customer.create(newCustomer);
    console.log("API Post Reply: " + savedPost)
    res.json(savedPost);
  } catch (error) {
    res.json({message: error});
  }
}

exports.searchAPI = async (req, res) => {
  console.log("API Search: Request")
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    console.log("API Search: Reply: " + customer)
    res.json(customer);
  } catch (error) {
    console.log("API Search: Failed: " + error)
  }
}

exports.updateAPI = async (req, res) => {
  console.log("API Update: Request")
  try {
    await Customer.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    
    const updatedPost = await Customer.findOne({ _id: req.params.id });
    console.log(updatedPost)
    res.json(updatedPost);
  } catch (error) {
    res.json(error);
  }
}

exports.deleteAPI = async (req, res) => {
  console.log("Delete API: Request");
  const customer = await Customer.findOne({ _id: req.params.id });
  if (customer){
    try {
      await Customer.deleteOne({ _id: req.params.id });
      console.log("Deleted: " + req.params.id);
      res.json("Deleted " + req.params.id);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json("Cannot find " + req.params.id);
  }
}