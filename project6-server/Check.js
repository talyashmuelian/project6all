//import Joi from "joi";

const Joi = require("joi");

const schemaUser = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),

  phone: Joi.string().required(),
  website: Joi.string().uri().required(),
  rank: Joi.string().required(),
  api_key: Joi.string().required(),
});

const schemaTodo = Joi.object().keys({
  userId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().required(),
  completed: Joi.number().valid(0, 1).required(),
});

const schemaPosts = Joi.object().keys({
  userId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const schemaComments = Joi.object().keys({
  postId: Joi.number().required(),
  id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  body: Joi.string().required(),
});

const ObjectCheck = {
  users: schemaUser,
  todos: schemaTodo,
  posts: schemaPosts,
  comments: schemaComments,
};

exports.check = function (type, object) {
  const schema = ObjectCheck[type];
  console.log(schema);
  return schema.validate(object);
};
// const { error } = check("todos", {
//   userId: 3,
//   id: 1000,
//   title: "pruject6",
//   completed: 0,
// });
//console.log(error.message);
// if (error) {
//   console.log(error.details[0].message);
// }

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
