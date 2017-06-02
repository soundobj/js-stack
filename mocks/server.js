var DB = require("./index");
var actions = require("./actions.json");
var users = require("./users.json");
var url = require("url");
var Cookies  = require("cookies");
var jsonServer = require("json-server");
var bodyParser = require("body-parser");
var UriTemplate = require("uri-template.js");
var db = DB();

var uuid = require("node-uuid");
var server = jsonServer.create();
var router = jsonServer.router(db);
var middlewares = jsonServer.defaults();

server.use(middlewares)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

// mock server config
var port = 4000;
var ip = "127.0.0.1";
var delay = 600;

// socket push server config
var app = require("express")();
var socketServer = require("http").createServer(app);
var io = require("socket.io")(socketServer);
socketServer.listen(3500);

io.on('connection', function(socket) {
  console.error("@ websocket connected", null);
});

server.use(function (req, res, next) {
  var pathname = req._parsedUrl.pathname;
  if(pathname === "/login") {
    next();
  } else if (canUserAccessPage(getAuthenticatedUser(req, res), pathname, req.method)) {
    // delay responses to mimic real life scenarios
    setTimeout(() => next(), delay);
  } else {
    res.status(403).send({ error: "Forbidden", status: 403 });
    res.end();
  }
});

function buildLinkUrl(link) {
   return `http://${ip}:${port}${link}`;
}

// Prepare app links with ip and port
Object.keys(actions).map((x) => {
  actions[x].rel = buildLinkUrl(actions[x].rel);
});

// bestow users with actions
var userActions = {
  "admin@ixxus.com": ["notes", "editNote", "board", "moveBoardItem"],
  "author@ixxus.com": ["notes", "editNote", "addNote", "fetchParticipants", "board", "moveBoardItem"],
  "editor@ixxus.com": ["board", "moveBoardItem"]
}

users = users.map((x) => {
  x.links = userActions[x.user].map(action => actions[action]);
  return x;
});

// USER MIDDLEWARE
function canUserAccessPage(user, path, method) {
  return users.find((x) => {
    if(x.user === user) {
      return x.links.find((link) => {
        var pathName = decodeURIComponent(url.parse(link.rel).pathname);
        var extractedURIParams = UriTemplate.extract(pathName, path);
        var rel = UriTemplate.expand(pathName, extractedURIParams);
        return rel === path && link.method === method;
        // return url.parse(link.rel).pathname === path && link.method === method; /* creates a 403 on edit note for testing notification */
      });
    }
  });
}

function getUserRoles(user) {
  return user.substring(0, user.indexOf("@"));
}

function getAuthenticatedUser(req, res) {
  var cookies = new Cookies(req, res);
  return cookies.get("user");
}

server.get("/login", function (req, res) {
  var cookies = new Cookies(req, res);
  var currentUser = users.find(user => user.user === req.query.user);
  if (currentUser) {
    var user = req.query.user;
    cookies.set( "user", user, { httpOnly: false } );
    res.jsonp({
      user: user,
      role: getUserRoles(user),
      links: currentUser.links,
      socket: "http://127.0.0.1:3500/",
    });
  } else {
    cookies.set( "user", "", { httpOnly: false } );
    res.jsonp({user: undefined, role: undefined});
  }
})
// USER MIDDLEWARE END

// NOTES MIDDLEWARE
server.post("/notes", function(req, res, next) {
  req.body.id = uuid.v1();
  req.body.createdDate = new Date(Date.now()).toISOString();
  req.body.links = [actions.editNote];

  // if (req.body.assignedTo.participant.email === getAuthenticatedUser(req, res)) {
    io.emit('pushBoardItem', {
      card: req.body,
      column: "OPEN"
    });
  // }

  next();
})

// intercept note edit to store a version of the original
server.put("/notes/:id", function(req, res, next) {
  var note = db.notes.find(x => x.id === req.params.id);
  if (!note) {
    res.status(500).send({ error: "Not in Database", status: 500 });
    res.end();
  }
  var version = Object.assign({}, note);
  delete version.versions;
  delete version.links;
  version.links = [actions.compareVersion];
  version.id = uuid.v1();
  req.body.versions.push(version);
  req.body.links = [actions.editNote, actions.compareVersion];
  req.body.createdDate = new Date(Date.now()).toISOString();
  next();
})

server.put("/board/:lastX/:lastY/:nextX/:nextY", function(req, res) {

  const { lastX, lastY, nextX, nextY } = req.params;
  var user = getAuthenticatedUser(req, res);
  var userBoard = db.userBoard[user];

  if (lastX === nextX) {
    userBoard.columns[lastX].cards.splice(nextY, 0, userBoard.columns[lastX].cards.splice(lastY, 1)[0]);
  } else {
    // move element to new place
    userBoard.columns[nextX].cards.splice(nextY, 0, req.body);
    // delete element from old place
    userBoard.columns[lastX].cards.splice(lastY, 1);
  }
  db.userBoard[user] = userBoard;
  res.jsonp(userBoard);
});

server.get("/board", (req, res) => {
  var user = getAuthenticatedUser(req, res);
  var board = Object.assign({}, db.board);
  if (db.userBoard[user]) {
    res.jsonp(db.userBoard[user]);
  } else {
    var userItems = db.notes.filter(x => x.assignedTo.participant.email === user);
    board.columns.map((c) => {
      // find the user's items belonging to this column
      c.cards = userItems.filter(i => c.id === i.status).map((x, index) => {
        x.position = index;
        return x;
      }).sort((a, b) => a.position - b.position);
      return c;
    });
    res.jsonp(board);
    db.userBoard[user] = board;
  }
})

router.render = function(req, res) {
  if (req.url.startsWith('/notes') && req.originalMethod === "GET") {
    var user = getAuthenticatedUser(req, res);
    // Decorate notes with relevant actions for user:
    var notes = res.locals.data.map((x) => {
      // if the notes author is the current user then add note actions
      if (x.author.participant.email === user) {
        x.links = [actions.editNote, actions.deleteNote, actions.assignNote, x.versions && actions.compareVersion];
      }
      // admin gets all actions for all notes
      else if (user === "admin@ixxus.com") {
        x.links = [actions.editNote, actions.deleteNote, actions.assignNote, x.versions && actions.compareVersion];
      } else {
        x.links = [];
      }
      return x;
    });
    res.jsonp(notes)
  } else {
    res.jsonp(res.locals.data)
  }
};
// NOTES MIDDLEWARE END

server.use(router)

server.listen(port, ip, function () {
  console.log("JSON Server running @ " + ip + ":" + port)
})

module.exports.getUserRoles = getUserRoles;