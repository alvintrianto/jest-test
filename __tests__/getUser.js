//endpoint 
const request = require('supertest');
const env = require('dotenv').config();
const api = request(process.env.baseUrl);
const getUser =  (id) => api.get(`/api/users/${id}`);

//jest json schema
const matchers  = require('jest-json-schema').matchers;
expect.extend(matchers);

//schema validator >> schema validator ini bisa kalian generate dari web ini : https://jsonschema.net/
const schemaUser = {
    "definitions": {},
    "type": "object",
    "title": "The Root Schema",
    "required": [
      "data"
    ],
    "properties": {
      "data": {
        "$id": "#/properties/data",
        "type": "object",
        "title": "The Data Schema",
        "required": [
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        ],
        "properties": {
          "id": {
            "$id": "#/properties/data/properties/id",
            "type": "integer",
            "title": "The Id Schema",
            "default": 0,
            "examples": [
              2
            ]
          },
          "email": {
            "$id": "#/properties/data/properties/email",
            "type": "string",
            "title": "The Email Schema",
            "default": "",
            "examples": [
              "janet.weaver@reqres.in"
            ],
            "pattern": "^(.*)$"
          },
          "first_name": {
            "$id": "#/properties/data/properties/first_name",
            "type": "string",
            "title": "The First_name Schema",
            "default": "",
            "examples": [
              "Janet"
            ],
            "pattern": "^(.*)$"
          },
          "last_name": {
            "$id": "#/properties/data/properties/last_name",
            "type": "string",
            "title": "The Last_name Schema",
            "default": "",
            "examples": [
              "Weaver"
            ],
            "pattern": "^(.*)$"
          },
          "avatar": {
            "$id": "#/properties/data/properties/avatar",
            "type": "string",
            "title": "The Avatar Schema",
            "default": "",
            "examples": [
              "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    }
  }

//body validator
const bodyUser = {
    "data": {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
    }
}

//request dan validate response(expect)
describe('Get User Scenario', () => {
    test('Get Single user', async () => {
    const response = await getUser(2);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchSchema(schemaUser);
    expect(response.body).toEqual(bodyUser);
    });
});