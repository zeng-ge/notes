var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const persons = {
  1: { id: 1, name: 'sky', age: 20, address: { province: 'sx', city: 'xian'} },
  2: { id: 2, name: 'moon', age: 21, address: { province: 'sx1', city: 'xian1'} },
  3: { id: 3, name: 'tod', age: 22, address: { province: 'sx2', city: 'xian2'} },
}

var schema = buildSchema(`
  type Address {
    province: String
    city: String
  }

  type Person {
    id: Int  
    name: String
    age: Int
    address: Address
  }

  type Query {
    hello: String
    world: String
    gamer(id: Int!): Person
  }
`);

var root = {  
  gamer: (args, a, b, c) => {
    return persons[args.id];
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');