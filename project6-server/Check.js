import Joi from "joi";

const Joi = require('joi');

const schemaUser = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object().keys({
    street: Joi.string().required(),
    suite: Joi.string().required(),
    city: Joi.string().required(),
    zipcode: Joi.string().required(),
    geo: Joi.object().keys({
      lat: Joi.string().required(),
      lng: Joi.string().required()
    }).required()
  }).required(),
  phone: Joi.string().required(),
  website: Joi.string().uri().required(),
  company: Joi.object().keys({
    name: Joi.string().required(),
    catchPhrase: Joi.string().required(),
    bs: Joi.string().required()
  }).required()
});

const schemaTodo = Joi.object().keys({
    userId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().required(),
    completed: Joi.boolean().required()
  });

const schemaPosts = Joi.object().keys({
    userId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required()
});

const schemaComments = Joi.object().keys({
    postId: Joi.number().required(),
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    body: Joi.string().required()
  });

const ObjectCheck = {
    "users": schemaUser,
    "todos": schemaTodo,
    "posts": schemaPosts,
    "comments": schemaComments
}

exports.check = function(type, object){
    return ObjectCheck[type].validate(object);
}

/** 
 * 
 * export function checkCourse(course){

    const schema = {
        id: Joi.number().required(),
        name: Joi.string().min(3).required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
    };
    
    return Joi.validate(object, schema);
}
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }

  // schemas.js 
const Joi = require('joi'); 
const schemas = { 
  blogPOST: Joi.object().keys({ 
    title: Joi.string().required(), 
    description: Joi.string().required(), 
    year: Joi.number() }), 
  blogLIST: { 
    page: Joi.number().required(), 
    pageSize: Joi.number().required() 
  } 
}; 
module.exports = schemas;*/