const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require('express');
const app = express();
const PORT = 4001;

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.users.findByUsername(username, (err, user) => {
      if(err) return done (err);
      if(!user) return done (null, false);
      if(user.password != password) return done(null, false)
      return done(null, user)
    });
  })
);

let records = [];

function createUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = {
      id: getNewId(records),
      ... user,
    };
    records = [newUser, ...records];
    resolve(newUser);
  });
};

app.post("/login",
  passport.authenticate(" ",
  {failureRedirect: "/"}),
  (req, res) => {
    res.redirect("profile");
  }
);