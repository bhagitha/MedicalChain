var express = require('express');

class minors {
  constructor() { }
  
 async validateLogin(data) {
    console.log("login data",data)
    console.log("message",message.methods)
    message.methods.getLogin(data.username)
      .call({ from: coinbase }).then((response) => {
        console.log("server response",response);
        return response;
      })
  }

  registerUser(data) {
    message.methods.setActorProfile(data.name, data.age,
      data.phone, data.gender, data.address, data.password, data.actor)
      .call({ from: coinbase }).then((response) => {
        console.log(response);
        return response;
      })
  }

}

module.exports = minors;
