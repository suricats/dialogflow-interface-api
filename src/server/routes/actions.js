const express = require('express');
const router = express.Router();
const u = require('../lib/utils');
const INTENTS = require('../intents');
//const validate = require('./validation');
const noMemoryIntents = [
  'get_phone',
  'get_birthday'
];

router.post('/',
(req, res, next) => {
  let intent = req.body.result.metadata.intentName;
  let entities = req.body.result.parameters;
  let fulfillments = new Array();
  if(req.body.result.fulfillment.speech){
    fulfillments.push(req.body.result.fulfillment.speech);
    req.body.result.fulfillment.messages.forEach(item => {
      fulfillments.push(item.speech);
    });
  }
  if (intent && noMemoryIntents.indexOf(intent) === -1) {
    return res.status(400).json({});
  }
  INTENTS[intent](entities)
  .then((reply) => {
    u.formatResponse(res, intent, entities, u.random(fulfillments), reply)
  })
  .catch((error) => console.log('ERROR', error));
});

module.exports = router;
