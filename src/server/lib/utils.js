
const u = {
  toSuccess: body => { return { type: 'success', body: body } },
  toFailed: body => { return { type: 'failed', body: body } },
  random: array => { return array[Math.floor(Math.random() * array.length)] },
  delDuplicates: (array) => {
    const done = [];
    array.forEach(elem => {
      if (done.indexOf(elem) === -1) { done.push(elem) }
    })
    return done;
  },
  cleanText: (text) => {
    return (text.replace(/[\.;,:\?!]/gi, ' '))
  },
  formatResponse: (session, intent, entities, fulfillment, message) => {
    let response = {};
    let speech = fulfillment;
    let mappedWords;
    if(message.type == "success"){
      mappedWords = u.extractDynamicWords(fulfillment);
      switch (intent) {
        case "get_phone":
          if(!Array.isArray(message.body)){
            speech = u.formatSimpleResponse(mappedWords, speech, message);
          }else{
            speech = message.body.length + " personnes ont été trouvées dans la tribu ! ";
            message.body.forEach(function(item, key) {
                speech += `${item.name} `;
                speech += (item.phone) ? `${item.phone}. ` : "(pas de numéro connu). ";
            });
          }
          break;
        case "get_birthday":
          if(!Array.isArray(message.body)){
            if(!message.body.birthday){
              speech = 'L\'anniversaire de @name est @birthday';
            }
            speech = u.formatSimpleResponse(mappedWords, speech, message, 'inconnu');
          }else{
            speech = message.body.length + " personnes ont été trouvées dans la tribu ! ";
            message.body.forEach(function(item, key) {
                speech += `${item.name} `;
                speech += (item.birthday) ? `${item.birthday}. ` : "(date inconnue). ";
            });
          }
          break;
          case "get_mission":
            if(!Array.isArray(message.body)){
              if(!message.body.clients){
                speech = `${message.body.name} n’a pas de mission en ce moment.`;
              }else{
                speech = `${message.body.name} est en mission chez `;
                message.body.clients.forEach(function(value, index) {
                    //find the correct prefix
                    speech += u.prefix(index, message.body.clients.length);
                    speech += `${value}`;
                });
              }
            }else{
              speech = message.body.length + " personnes ont été trouvées dans la tribu ! ";
              message.body.forEach(function(item) {
                if(!item.clients){
                  speech += `${item.name} n’a pas de mission en ce moment. `;
                }else{
                  speech += `${item.name} est en mission chez `;
                  item.clients.forEach(function(value, index) {
                      //find the correct prefix
                      speech += u.prefix(index, item.clients.length);
                      speech += `${value}`;
                  });
                  speech += `.\n`;
                }
              });
            }
            break;
      }
    }else{
      speech = message.body;
    }
    response = {"speech": speech, "displayText": speech};
    return session.status(200).send(response);
  },
  formatSimpleResponse: function(mappedWords, speech, message, fallbackMessage = ''){
    mappedWords.forEach(function(word) {
        speech = speech.replace('@'+ word, (message.body[word]) ? message.body[word] : fallbackMessage);
    });
    return speech;
  },
  prefix: function(index, length){
    return (index == 0) ? '' : (index < length -1) ? ', ' : ' et ';
  },
  extractDynamicWords: function (inputText){
      var regex = /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm;
      var matches = [];
      var match;

      while ((match = regex.exec(inputText))) {
          matches.push(match[1]);
      }

      return matches;
  }
}

module.exports = u
