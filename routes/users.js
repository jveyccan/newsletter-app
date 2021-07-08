const router = require('express').Router();
const apiController = require("../controllers/api.controller");

router.post(
  '/user',
  function(req, res){
    apiController.new(req,res)
  }
)

router.post(
  '/send',
  function(req, res){
    apiController.send(req,res)
  }
)

// Export API routes
module.exports = router;
