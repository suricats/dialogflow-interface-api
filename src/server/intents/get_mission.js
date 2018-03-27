const helper = require('../routes/_helper.js');
const u = require('../lib/utils');

const get_mission = (entities) => {
  let firstname = entities.firstname;
  let response = [];
  return helper.searchSuricatsByFirstname(firstname)
  .then((suricats) => {
    if(suricats.length > 1){
      suricats.forEach(function(suricat){
        response.push({"name": suricat.firstname + ' ' + suricat.name, "email": suricat.email});
      });
    }else {
      response = {"name": suricats[0].firstname + ' ' + suricats[0].name, "email": suricats[0].email};
    }
    return Promise.resolve(response);
  })
  .then((suricats) => {
    if(!Array.isArray(suricats)){
      return helper.getSuricatMissions(suricats.email);
    }
    let promises = suricats.map(function (suricat) {
      return helper.getSuricatMissions(suricat.email);
    });
    return Promise.all(promises);
  })
  .then((missions) => {
    if(!Array.isArray(response)){
      if(missions.data.length > 0){
        response.clients = [];
        missions.data.forEach(function(mission){
          response.clients.push(mission.client_name);
        });
      }
    }else{
      response.forEach(function(suricat){
        missions.forEach(function(mission){
          if(mission.email == suricat.email && mission.data.length > 0){
            suricat.clients = [];
            mission.data.forEach(function(item){
              suricat.clients.push(item.client_name);
            });
          }
        });
      });
    }
    return Promise.resolve(u.toSuccess(response));
  })
  .catch(error => {
    return Promise.resolve(u.toFailed(error));
  });
}

module.exports = get_mission;
