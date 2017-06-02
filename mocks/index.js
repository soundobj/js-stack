var faker = require("faker");
var _ = require("lodash");
var users = require("./users.json");
var board = require("./board.json");
var uuid = require("node-uuid");
var participants = users.map(x => x.participant);

var availableStatuses = board.columns.map((x) => {
  return x.id;
});

var notes = _.times(10, function () {
  return {
    id:  uuid.v1(),
    createdDate: faker.date.recent(),
    author: {
      participant: participants[Math.floor((Math.random() * participants.length))],
    },
    assignedTo: {
      participant: participants[Math.floor((Math.random() * participants.length))],
    },
    text: faker.lorem.sentence(),
    versions: [],
    status: availableStatuses[Math.floor(Math.random() * 3)], // allow only "OPEN", "COMPLETED" and "REVIEW" statuses
  }
});

module.exports = function() {
  return Object.assign({},
    {notes: notes},
    {participants: participants},
    {board: board},
    {userBoard: []} // user note position on board lookup
  );
}
//   participant: {
//     name: faker.na^me.firstName(),
//     surname: faker.name.lastName(),
//     suffix: faker.name.suffix(),
//     email: faker.internet.email(),
//     address: {
//       streetName: faker.address.streetName(),
//       streetAddress: faker.address.streetAddress(),
//       country: faker.address.country(),
//       countryCode: faker.address.countryCode()
//     }
//   },