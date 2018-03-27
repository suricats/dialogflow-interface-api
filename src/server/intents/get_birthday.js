const helper = require('../routes/_helper.js');
const u = require('../lib/utils');

const get_birthday = (entities) => {
  let firstname = entities.firstname;
  return helper.searchSuricatsByFirstname(firstname)
  .then((suricats) => {
    let response = [];
    if(suricats.length > 1){
      suricats.forEach(function(suricat){
        response.push({"name": suricat.firstname + ' ' + suricat.name, "birthday": formatDate(suricat.birthdate)});
      });
    }else {
      response = {"name": suricats[0].firstname + ' ' + suricats[0].name, "birthday": formatDate(suricats[0].birthdate)};
    }
    return Promise.resolve(u.toSuccess(response));
  })
  .catch(error => {
    return Promise.resolve(u.toFailed(error));
  });
}

function formatDate (input) {
  if(!input){
    return input;
  }
  input = input.substring(0, 10).replace(/-/g, '/');
  return input;
}

module.exports = get_birthday;
