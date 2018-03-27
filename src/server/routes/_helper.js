const request = require('superagent');
const options = {
  uri : process.env.SURICAT_API_URI,
  token : process.env.SURICAT_API_TOKEN
}

const helper = {
  searchSuricatsByFirstname : async function searchSuricatsByFirstname(firstname) {
    return new Promise((resolve, reject) => {
      request.get(options.uri +"/v1/suricats")
      .set('Authorization', "Bearer " + options.token)
      .query({ "search" : firstname})
      .end((err, res) => {
        if (err) { return reject('Sorry, the Suricat Api is not reachable. Try again later!') }
        if(res.body.data.length == 0){
          return reject('Sorry, we couldn\'t find a suricat with that firstname');
        }
        resolve(res.body.data);
      })
    });
  },
  getSuricat : async function getSuricat(email) {
    return new Promise((resolve, reject) => {
      request.get(options.uri + `/v1/suricats/${email}`)
      .set('Authorization', "Bearer " + options.token)
      .end((err, res) => {
        if (err) { return reject('Sorry, the Suricat Api is not reachable. Try again later!'); }
        resolve(res.body.data);
      })
    });
  },
  getSuricatMissions : async function getSuricatMissions(email) {
    return new Promise((resolve, reject) => {
      request.get(options.uri + `/v1/suricats/${email}/missions`)
      .set('Authorization', "Bearer " + options.token)
      .end((err, res) => {
        if (err) { return reject('Sorry, the Suricat Api is not reachable. Try again later!'); }
        let response = {};
        response.email = email;
        response.data = res.body.data;
        resolve(response);
      })
    });
  }
}

module.exports = helper;
