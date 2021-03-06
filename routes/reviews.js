const express = require('express');
const router = express.Router();
const models = require('../db/models/index');


//get route to render the review form
//using params to pass the tech_id to the view
router.get('/:id', function(req, res) {
  res.render('review/reviewform', {tech_id: req.params.id, user: req.user });
});

router.get('/:id/edit', function(req, res) {
  res.render('review/edit', {tech_id: req.params.id, user: req.user });
});

//post route to add review info to Reviews model
router.post('/', function(req, res) {
  models.Reviews.create({
    user_id: req.user.id,
    tech_id: req.body.techId,
    review_text: req.body.review_text,
    title: req.body.title
  }).then(() => {
    //redirect to the specific technology page where the id will be posted
    res.redirect(`/technologies/${req.body.techId}`)
  });
});



module.exports = router;
