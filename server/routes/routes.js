const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller.js')

/**
 *  Customer Routes
*/

router.get('/', Controller.loginpage);
router.post('/login', Controller.postLogin);

router.get('/signup', Controller.signuppage);
router.post('/signup', Controller.postSignup);

router.post('/logout', Controller.postLogout)

router.get('/dashboard', Controller.dashboardpage)
router.get('/about', Controller.about);

router.get('/add', Controller.addCustomer)
router.post('/add', Controller.postCustomer)

router.get('/view/:id', Controller.view);

router.get('/edit/:id', Controller.edit);
router.post('/edit/:id', Controller.editPost);

router.get('/delete/:id', Controller.delete);
router.post('/delete/:id', Controller.deletePost);

router.post('/search', Controller.searchCustomers);

// RESTful API
router.get('/api/search/:id', Controller.searchAPI)
router.post('/api/insert', Controller.addAPI)
router.patch('/api/update/:id', Controller.updateAPI)
router.delete('/api/delete/:id', Controller.deleteAPI)

module.exports = router;