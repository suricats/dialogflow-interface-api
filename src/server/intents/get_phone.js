const helper = require('../routes/_helper.js');
const u = require('../lib/utils');

const get_phone = (entities) => {
  let firstname = entities.firstname;
  return helper.searchSuricatsByFirstname(firstname)
  .then((suricats) => {
    let response = [];
    if(suricats.length > 1){
      suricats.forEach(function(suricat){
        response.push({"name": suricat.firstname + ' ' + suricat.name, "phone": suricat.phone});
      });
    }else {
      response = {"name": suricats[0].firstname + ' ' + suricats[0].name, "phone": suricats[0].phone};
    }
    return Promise.resolve(u.toSuccess(response));
  })
  .catch(error => {
    return Promise.resolve(u.toFailed(error));
  });
}

module.exports = get_phone;
