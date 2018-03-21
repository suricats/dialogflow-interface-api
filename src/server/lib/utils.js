function extractDynamicWords (inputText){
    var regex = /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
}

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
      switch (intent) {
        case "get_phone":
          mappedWords = extractDynamicWords(fulfillment);
          if(!Array.isArray(message.body)){
            mappedWords.forEach(function(word) {
                speech = speech.replace('@'+ word, message.body[word]);
            });
          }else{
            speech = message.body.length + " personnes ont été trouvées dans la tribu ! ";
            message.body.forEach(function(item, key) {
                speech += `${item.name} `;
                speech += (item.phone) ? `${item.phone}. ` : "(pas de numéro connu). ";
            });
          }
          break;
      }
    }else{
      speech = message.body;
    }
    response = {"speech": speech, "displayText": speech};
    return session.status(200).send(response);
  }
}

module.exports = u
