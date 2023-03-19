"use strict";
var https = require("https");
var mongoose = require("mongoose");
var objectid = require("mongoose").ObjectID;
var crypto = require("crypto"),
  algorithm = "aes-256-ctr";
var session = require("express-session");
var mime = require("mime-types");
var lookup = require("mime-types").lookup;
var express = require("express"),
  expressSanitized = require("express-sanitize-escape");
const app = express();
var multer = require("multer");
var bodyParser = require("body-parser");
var server = require("http").createServer(app);
var socketapp = require("socket.io")(server);
var entities = require('html-entities').AllHtmlEntities;
var fs = require("fs");
var vm = require("vm");
var FB = require("fb");
var sm = require('sitemap');
FB.setAccessToken(
  ""
);
var cookieParser = require("cookie-parser");
var async = require("async");
var path = require("path");
var schedule = require("node-schedule");
const Vue = require("vue");
const renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./template.vue", "utf-8")
});
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var paypal = require("paypal-rest-sdk");
var axios = require("axios");
var Roll = require("roll"),
  roller = new Roll();
var url = require("url");
const gcsSharp = require("multer-sharp");
paypal.configure({
  mode: "live", //sandbox or live
  client_id: "",
  client_secret: ""
});
let rawdata = fs.readFileSync("config.json");
let dbinfo = JSON.parse(rawdata);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  ""
);
const helmet = require("helmet");

var twister = require("./twister.js"),
  m = new twister();

//headers
app.get("*.css", (req, res, next) => {
  res.setHeader("Content-Type", "text/css; charset=utf-8");
  next();
});
app.get("*.js", (req, res, next) => {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  next();
});
app.get("*.png", (req, res, next) => {
  res.setHeader("Content-Type", "image/png; charset=utf-8");
  next();
});
app.get("*.jpg", (req, res, next) => {
  res.setHeader("Content-Type", "image/jpeg; charset=utf-8");
  next();
});

app.get("*.jpeg", (req, res, next) => {
  res.setHeader("Content-Type", "image/jpeg; charset=utf-8");
  next();
});
app.get("*.jpg", (req, res, next) => {
  res.setHeader("Content-Type", "image/gif; charset=utf-8");
  next();
});
//settings
app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
);
app.use(helmet());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(expressSanitized.middleware());
app.set("trust proxy", 1);
app.disable("x-powered-by");
expressSanitized.sanitizeParams(app, ["id", "name"]);

const cookie_expiryDate = new Date(Date.now() + 60 * 60 * 60 * 1000); // 24 hour
app.use(
  require("cookie-session")({
    name: "rafflestore_acc",
    keys: [
      "3D7B97B5CC044AC6B38E2242E089E62BBF3876C446478E7DBE81D0C774E2177C",
      "rafflestore_com",
      "8766632c3ac8dc8eb2897fcf79e009f58f996755b5456e5eb0c08e02ab36eec301f3ae59594bfc54fb386866985add2236a92326fe6143377dabc48621a3f525",
      "af0caa90b01061768861251ee272d6901858cc1c00185ba70eed957668be93a32c54746a1556795fb7fd7d90fc50f19f3d05cf3b4ea1be9327727e021727f45b"
    ],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "rafflestore.com",
      path: "./",
      expires: cookie_expiryDate
    }
  })
);
app.use(cookieParser());

//Mongoose settings
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var dburl = dbinfo.dbhost;
mongoose.connect(
  dburl, {
  useNewUrlParser: true
}
);
mongoose.connection.on("error", function(err, res) {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function() {
  console.log("Successfully connected to the database");
});

//compress images

//schemas
var pdata = mongoose.Schema({
  productname: String,
  size: {
    eu: String,
    uk: String,
    us: String,
    streetwearsize: String,
    other: String,
  },
  sizefrom: String,
  tickets: Number,
  price: Number,
  ticketprice: Number,
  category: String,
  boughtfrom: String,
  model: String,
  condition: String,
  shipping: String,
  description: String,
  images: [String],
  createdby: String,
  thumbnail: String,
  ticketsbought: Number,
  ticketsfree: Number,
  link: String,
  productid: String,
  startdate: String,
  endate: String,
  raffleid: String,
  boughtby: String,
  winner: String,
  drawn: String,
  trackingnumber: String,
  status: String,
  priority: String,
  brand: String,
  selleremail: String,
  sellername: String,
  receiptorbox: String,
  date: Date,
  viewed: Number,
  userviewed: String,
  verified: String,
  rafflesold: {
    total: Number,
    users: [String]
  },
  has_receipt_or_box: String,
});

var sendproductschema = mongoose.Schema({
  user: String,
  coins: String,
  email: String,
  productid: String,
  buyer: String
});

var raffleschema = mongoose.Schema({
  raffleby: String,
  joined: [String],
  raffleproduct: String,
  endate: String,
  startdate: String,
  raffleid: String,
  drawn: String,
  winner: String,
  endtime: String
});

var verifyschema = mongoose.Schema({
  user: String,
  images: String,
  fullname: String
});

var UserSchema = mongoose.Schema({
  password: String,
  email: String,
  fbid: String,
  joined: String,
  fullname: {
    firstname: String,
    surname: String
  },
  rafflescreated: String,
  raffleswon: String,
  coinflips: String,
  profileimage: [String],
  coins: Number,
  dopeone: String,
  visitors: String,
  uservisitors: Array,
  reputation: {
    god: Number,
    bad: Number,
    users: String
  },
  verified: String,
  rafflesplayed: String,
  dicethrown: String,
  BiggestWin: String,
  personumber: String,
  address: {
    street: String,
    postnumber: String,
    city: String,
    country: String
  },
  telefon: String,
  country: String,
  dicewon: Number,
  emailverified: Boolean,
  betacodes: Array,
  rafflesold: {
    total: Number
  }
});

var PaypalTransaction = mongoose.Schema({
  User: String,
  PaymentID: String,
  price: String,
  token: String,
  productid: String,
  productname: String,
  mail: String,
  coins: Number,
  token: String,
  PayerID: String,
  userhandle: String,
  userfullname: String,
  date: String,
  status: String,
  type: String,
  balance: Number,
  dicepicked: Number,
  rollednumber: Number,
  rolledtype: String,
  rolledtimes: Number,
  selleremail: String,
  sellername: String,
  rolledside: String,
  code: {
    type: String,
    default: ''
  }
});
var transactions = mongoose.Schema({
  User: String,
  PaymentID: String,
  price: String,
  token: String,
  mail: String,
  token: String,
  PayerID: String,
  forproduct: String,
  user: String,
  date: String,
  userfullname: String,
  betacode: {
    type: String,
    default: ''
  }
});

var fpassword = mongoose.Schema({
  Token: String,
  Email: String
});
var verifytokens = mongoose.Schema({
  Token: String,
  Email: String
});
var changesecurity = mongoose.Schema({
  Token: String,
  Email: String,
  newpassword: String,
  newemail: String
});

var deleteuser = mongoose.Schema({
  Token: String,
  Email: String
});

var withdraw_schema = mongoose.Schema({
  user: String,
  coins: String,
  email: String,
  status: String,
});

var themeschema = mongoose.Schema({
  botamount: String,
  brands: [String],
  information: [String],
  privacy: String,
  terms: String,
  newsletters: String
});

var verifyemail = mongoose.Schema({
  token: String,
  email: String,
  code: String
});

var auth = function(req, res, next) {
  if (req.session) {
    if (req.session.user) {
      mongoose.connect(
        dburl, {
        useNewUrlParser: true
      },
        function(err, db) {
          db.collection("users").findOne({
            _id: mongoose.Types.ObjectId(req.session.user)
          },
            function(err, user) {
              if (!user) {
                res.clearCookie("rafflestore_acc");
                res.redirect("/");
              } else {
                next();
              }
            }
          );
        }
      );
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};

var loggedin = function(req, res, next) {
  if (req.session) {
    if (req.session.user) {
      res.redirect("/customer/" + req.session.user);
    } else {
      next();
    }
  } else {
    next();
  }
};

let soon = (req, res, next) => {
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/soon.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });
          const context = {
            pagetitle: "Rafflestore - Terms",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(`${html}`);
          });
        }
      );
    }
  );
};
// mongoose schemas

//encryption

const key = Buffer.from(
  "404E635266556A586E327235753878214125442A472D4B6150645367566B5970",
  "hex"
);
const iv = Buffer.from("432A46294A404E635266556A586E3272", "hex");

function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, key, iv);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function decrypt(text) {
  var decipher = crypto.createDecipheriv(algorithm, key, iv);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

//multer upload fix

var spaces_options = {
  'endpoint': 'https://ams3.digitaloceanspaces.com',
  'accessKeyId': 'ZA7PYUMNAOG7NFTWLWOD',
  'secretAccessKey': 'ik/yyHX3Wbu63RTfXABRQ2uaJXG8eb0UTYroVUYUUQ4',
  'region': 'ams3',
};
const s3 = new aws.S3(spaces_options);

const upload_cdn = multer({
  fileFilter: function(req, file, cb) {
    if (file.mimetype == "image/png") {
      cb(null, true);
    } else if (file.mimetype == "image/jpeg") {
      cb(null, true);
    } else if (file.mimetype == "image/jpg") {
      cb(null, true);
    } else {
      return cb(null, false);
    }
  },
  storage: multerS3({
    s3: s3,
    bucket: 'rafflestore',
    acl: 'public-read',
    contentType: function(req, file, cb) {
      cb(null, 'image/png')
    },
    metadata: function(req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function(req, file, cb) {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1;
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();
      var newdate = year + "-" + month + "-" + day;
      let minutes = dateObj.getMinutes()
      let seconds = dateObj.getSeconds()
      let mili = dateObj.getMilliseconds()
      var token = crypto.randomBytes(100).toString("hex");
      var newdate = year + "-" + month + "-" + day + '-' + minutes + '-' + seconds + '-' + mili;
      if (req.session) {
        if (req.session.user) {
          var user = req.session.user;
        } else {
          var user = "none";
        }
      } else {
        var user = "none";
      }

      cb(null, user + encrypt(newdate) + token + encrypt(file.originalname) + mime.extension(file.extension));
    },

  })
})


// under construction

const cunstruction = function(req, res, next) {
  if (dbinfo.constrution == "yes") {
    if (req.session.constrution) {
      next();
    } else {
      res.redirect("/getaccess");
    }
  } else {
    next();
  }
};

app.get("/getaccess", (req, res) => {
  res.send(
    '<html><head><title>Rafflestore</title></head><body><form action="/getaccess" method="post"><input type="text" placeholder="password" name="anv"><input type="password" name="pw" placeholder="password"><input type="submit"></form></body></html>'
  );
});

app.post("/getaccess", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.body.anv == "rsbeta1337" && req.body.pw == "Koddebullar1337") {
    req.session.constrution = String("true");
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

//cors


//sitemap

app.get('/sitemap.xml', (req, res) => {
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("products").find({}).toArray(function(usererr, products) {
        db.collection("users").find({}).toArray(function(usererr, users) {



          var sitemap = sm.createSitemap({
            hostname: 'https://rafflestore.com',
            cacheTime: 600000
          });

          products.forEach(data => {
            sitemap.add({
              url: '/product/' + data.productid,
              changefreq: 'monthly',
              priority: 0.5
            });
          })


          users.forEach(data => {
            sitemap.add({
              url: '/customer/' + data._id,
              changefreq: 'monthly',
              priority: 0.5
            });
          })

          sitemap.add({
            url: '/allraffles/',
            changefreq: 'monthly',
            priority: 0.7
          });
          sitemap.add({
            url: '/help/',
            changefreq: 'monthly',
            priority: 0.7
          });
          sitemap.add({
            url: '/information/',
            changefreq: 'monthly',
            priority: 0.7
          });
          sitemap.add({
            url: '/about/',
            changefreq: 'monthly',
            priority: 0.7
          });
          sitemap.add({
            url: '/contact/',
            changefreq: 'monthly',
            priority: 0.7
          });
          sitemap.add({
            url: '/privacy/',
            changefreq: 'monthly',
            priority: 1
          });
          sitemap.add({
            url: '/terms/',
            changefreq: 'monthly',
            priority: 1
          });
          sitemap.add({
            url: '/login/',
            changefreq: 'monthly',
            priority: 1
          });
          sitemap.add({
            url: '/register/',
            changefreq: 'monthly',
            priority: 1
          });
          sitemap.add({
            url: '/settings/',
            changefreq: 'monthly',
            priority: 1
          });
          sitemap.add({
            url: '/',
            changefreq: 'monthly',
            priority: 1
          });

          sitemap.toXML(function(err, xml) {
            if (err) {
              return res.status(500).end();
            }
            res.header('Content-Type', 'application/xml');
            res.send(xml);
          });

        })
      })
    })
})


//index

app.get("/", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      if (req.session) {
        var usersdata;
        if (req.session.user) {
          var log = true;
          var user = mongoose.Types.ObjectId(req.session.user);
        } else {
          var log = false;
          var user = "none";
        }
      } else {
        var log = false;
        var user = "none";
      }

      db.collection("users").findOne({
        _id: user
      },
        function(usererr, userresult) {
          if (usererr) return console.log("users error = " + usererr);
          db.collection("products")
            .find({
              drawn: "no"
            })
            .sort({
              date: -1
            })
            .limit(8)
            .toArray(function(err, productsresult) {
              db.collection("products")
                .find({
                  priority: "PREMIUM",
                  drawn: "no"
                })
                .toArray(function(err, premium) {
                  db.collection("products")
                    .find({
                      drawn: "no"
                    })
                    .sort({
                      viewed: -1
                    })
                    .limit(4)
                    .toArray(function(err, mostviews) {
                      if (err) return console.log("products error = " + err);
                      // get leaderboard users
                      db.collection("users")
                        .find()
                        .sort({
                          raffleswon: -1
                        })
                        .limit(10)
                        .toArray(function(rafflerr, raffleinfo) {
                          db.collection("users")
                            .find()
                            .sort({
                              BiggestWin: -1
                            })
                            .limit(10)
                            .toArray(function(rafflerr, dice) {
                              if (req.session) {
                                if (req.session.user) {
                                  var coins = userresult.coins;
                                } else {
                                  var coins = 0;
                                }
                              } else {
                                var coins = 0;
                              }
                              var data = new Vue({
                                template: require("fs").readFileSync(
                                  "./public/hello.vue",
                                  "utf-8"
                                ),
                                data: {
                                  login: log,

                                  user: user,
                                  coi: coins,
                                  products: productsresult,
                                  userdata: userresult,
                                  domain: dbinfo.domain,
                                  raffleinfo: raffleinfo,
                                  premium: premium,
                                  mostviews: mostviews,
                                  dice: dice
                                }
                              });
                              const context = {
                                pagetitle: "Rafflestore",
                                userdata: userresult,
                                login: log,
                                coi: coins,
                                domain: dbinfo.domain
                              };
                              renderer.renderToString(
                                data,
                                context,
                                (err, html) => {
                                  if (err) {
                                    console.log(err);
                                    return;
                                  }
                                  res.send(html);
                                }
                              );
                            });
                        });
                    });
                });
            });
        }
      );
    }
  );
});

app.get("/search_products", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.query.search) {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("products")
          .find({
            productnametolowercase: {
              $regex: req.query.search
            }
          })
          .limit(3)
          .toArray((error, data) => {
            var searchresult = [];
            data.forEach(e => {
              if (e.drawn == 'no' && (e.tickets - e.ticketsbought) >= 1) {
                let ticketsLeft;
                let ticketsLeftNumber =
                  Number(e.tickets) - Number(e.ticketsbought);
                if (ticketsLeftNumber <= 0) {
                  ticketsLeft = "No tickets left";
                } else {
                  ticketsLeft = "Tickets Left: " + ticketsLeftNumber;
                }
                searchresult.push({
                  productname: e.productname,
                  thumbnail: e.thumbnail,
                  price: e.price,
                  url: "/product/" + e.productid,
                  tickets: ticketsLeft
                });
              }
            })
            if (searchresult.length < 0) {
              res.end(
                JSON.stringify({
                  products: "none"
                })
              );
            } else {
              res.end(
                JSON.stringify({
                  products: "yes",
                  data: searchresult
                })
              );
            }

          });
      }
    );
  } else {
    res.end(
      JSON.stringify({
        products: "none"
      })
    );
  }
});

app.get("/allraffles", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      if (req.session) {
        var usersdata;
        if (req.session.user) {
          var log = true;
          var user = mongoose.Types.ObjectId(req.session.user);
        } else {
          var log = false;
          var user = "none";
        }
      } else {
        var log = false;
        var user = "none";
      }

      db.collection("users").findOne({
        _id: user
      },
        function(usererr, userresult) {
          if (usererr) return console.log("users error = " + usererr);
          db.collection("products")
            .find({})
            .sort({
              date: -1
            })
            .toArray(function(err, productsresult) {
              if (err) return console.log("products error = " + err);
              if (req.session) {
                if (req.session.user) {
                  var coins = userresult.coins;
                } else {
                  var coins = 0;
                }
              } else {
                var coins = 0;
              }

              var data = new Vue({
                template: require("fs").readFileSync(
                  "./public/raffles.vue",
                  "utf-8"
                ),
                data: {
                  user: user,
                  login: log,
                  coi: coins,
                  products: productsresult,
                  userdata: userresult,
                  domain: dbinfo.domain
                },
                methods: {
                  ifSold: function(value) {
                    if (value === 0) {
                      return "sold";
                    } else {
                      return "notSold";
                    }
                  }
                }
              });
              const context = {
                pagetitle: "Rafflestore - All Raffles",
                userdata: userresult,
                login: log,
                coi: coins,
                domain: dbinfo.domain
              };
              renderer.renderToString(data, context, (err, html) => {
                if (err) {
                  console.log(err);
                  return;
                }
                res.end(`${html}`);
              });
            });
        }
      );
    }
  );
});

//Get data from database

//add product

app.get("/addproduct", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (result) {
            var customer = new Vue({
              template: require("fs").readFileSync(
                "./public/customers/addproduct.vue",
                "utf-8"
              ),
              data: {
                coi: result.coins,
                domain: dbinfo.domain,
                userdata: result,
                login: true
              }
            });
            const context = {
              pagetitle: "Rafflestore -  Add product",
              userdata: result,
              login: true,
              coi: result.coins,
              domain: dbinfo.domain
            };
            renderer.renderToString(customer, context, (err, html) => {
              if (err) {
                console.log(err);
                return;
              }
              res.end(`${html}`);
            });
          } else {
            res.redirect("/");
          }
        }
      );
    }
  );
});

app.post("/checkbeta", cunstruction, (req, res) => {
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("betacodes").findOne({
        betacode: req.body.code
      },
        function(err, result) {
          if (result) {
            res.json({
              response: 'code',
              code_price: result.amount,
              percentage: result.percentage,
              amount: result.amount
            })
          } else {
            res.json({
              response: 'no_code'
            })
          }
        });
    });
});




app.post("/addproduct", cunstruction, upload_cdn.array("images"), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.body.productname) {
    res.json("Please add the produt name");
    return;
  } else if (!req.body.tickets) {
    res.json("Please add the amount of tickets for the product");
    return;
  } else if (!req.body.tickets >= 10) {
    res.json("You should have atleast 10 tickets");
    return;
  } else if (req.body.tickets > 100) {
    res.json("Max amount of tickets is 100");
    return;
  } else if (req.body.tickets < 10) {
    res.json("Min amount of tickets is 10");
    return;
  } else if (!req.body.price) {
    res.json("Please add a price for the product");
    return;
  } else if (!req.body.category) {
    res.json("Please specifiy a category for the product");
    return;
  } else if (!req.body.premium) {
    res.json(
      "Please specifiy if the product is in the premium category or not"
    );
    return;
  } else if (!req.body.boughtfrom) {
    res.json("Please specify where you bought the product from");
    return;
  } else if (!req.body.shipping) {
    res.json("Please add shipping service");
    return;
  } else if (!req.body.brand) {
    res.json("please specifiy the products brand");
    return;
  } else if (req.files.length < 5) {
    res.json("We need atleast 5 images");
    return;
  } else {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("users").findOne({
          _id: mongoose.Types.ObjectId(req.session.user)
        },
          function(err, result) {
            db.collection("betacodes").findOne({
              betacode: req.body.betacode
            },
              function(err, betacode) {
                var numberamount;
                //if use of premium
                if (req.body.premium == "yes") {
                  numberamount = 10;
                } else {
                  numberamount = 5;
                }
                //if is betacode
                if (betacode) {
                  if (betacode.only_use_ones == true) {
                    if (!result.betacodes.includes(req.body.betacode)) {
                      if (betacode.foreveryone == "no") {
                        if (betacode.email.includes(decrypt(result.email))) {
                          if (betacode.percentage) {
                            numberamount = Number(numberamount) -
                              (Number(numberamount) *
                                Number(betacode.amount / 100))
                          } else {
                            numberamount =
                              Number(numberamount) - Number(betacode.amount);
                          }
                        }
                      } else {
                        if (betacode.percentage) {
                          numberamount = Number(numberamount) -
                            (Number(numberamount) *
                              Number(betacode.amount / 100))
                        } else {
                          numberamount =
                            Number(numberamount) - Number(betacode.amount);
                        }
                      }
                    }
                  } else {
                    if (betacode.foreveryone == "no") {
                      if (betacode.email.includes(decrypt(result.email))) {
                        if (betacode.percentage) {
                          numberamount = Number(numberamount) -
                            (Number(numberamount) *
                              Number(betacode.amount / 100))
                        } else {
                          numberamount =
                            Number(numberamount) - Number(betacode.amount);
                        }
                      }
                    } else {
                      if (betacode.percentage) {
                        numberamount = Number(numberamount) -
                          (Number(numberamount) *
                            Number(betacode.amount / 100))
                      } else {
                        numberamount =
                          Number(numberamount) - Number(betacode.amount);
                      }
                    }
                  }

                }

                var user_beta_codes = result.betacodes || []
                if (req.body.betacode) {
                  user_beta_codes.push(req.body.betacode)
                }
                if (result) {
                  if ((result.coins - numberamount) >= 0) {

                    var items = {
                      coins: Number(result.coins) - Number(numberamount),
                      betacodes: user_beta_codes
                    };

                    db.collection("users").updateOne({
                      _id: mongoose.Types.ObjectId(req.session.user)
                    }, {
                      $set: items
                    },
                      function(err, updated) {
                        if (err) {
                          res.send("Sorry, there has been an error");
                          console.log(err);
                        } else {
                          var imagesfiles = [];
                          if (req.session) {
                            if (req.session.user) {
                              var user = req.session.user;
                            } else {
                              var user = "none";
                            }
                          } else {
                            var user = "none";
                          }
                          let dateObj = new Date();
                          let month = dateObj.getUTCMonth() + 1;
                          let day = dateObj.getUTCDate();
                          let year = dateObj.getUTCFullYear();
                          var newdate = year + "-" + month + "-" + day;
                          req.files.forEach(function(file) {
                            imagesfiles.push("https://rafflestore.ams3.cdn.digitaloceanspaces.com/" + file.key);
                          });
                          var thumbnail = "https://rafflestore.ams3.cdn.digitaloceanspaces.com/" + req.files[0].key;
                          var form = req.body;
                          var products = mongoose.model("tobeaccepteds", pdata);
                          if (req.body.premium == "yes") {
                            var premium = "PREMIUM";
                          } else {
                            var premium = "none";
                          }
                          var ticketprice = Math.floor(
                            (Number(form.price) / Number(form.tickets)) *
                            Number(10)
                          );

                          //Automatic sizes
                          var size;

                          if (req.body.category.toLowerCase() == "streetwear") {
                            size = {
                              streetwearsize: req.body.size
                            };
                          } else if (
                            req.body.category.toLowerCase() == "shoes"
                          ) {
                            //start pick size
                            //nike sizes. Source = https://www.nike.com/se/sv_se/sfg/mens-shoe-sizing-chart
                            var NikeUsSize = [
                              "All",
                              "6",
                              "6.5",
                              "7",
                              "7.5",
                              "8",
                              "8.5",
                              "9",
                              "9.5",
                              "10",
                              "10.5",
                              "11",
                              "11.5",
                              "12",
                              "12.5",
                              "13",
                              "13.5",
                              "14",
                              "15",
                              "16",
                              "17",
                              "18",
                              "Other"
                            ];
                            var NikeEuSize = [
                              "All",
                              "38.5",
                              "39",
                              "40",
                              "40.5",
                              "41",
                              "42",
                              "42.5",
                              "43",
                              "44",
                              "44,5",
                              "45",
                              "45.5",
                              "46",
                              "47",
                              "47.5",
                              "48",
                              "48.5",
                              "49.5",
                              "50.5",
                              "51.5",
                              "52.5",
                              "Other"
                            ];
                            var NikeUkSizes = [
                              "All",
                              "5.5",
                              "6",
                              "6.5",
                              "7",
                              "7.5",
                              "8",
                              "7.5",
                              "8",
                              "8.5",
                              "9",
                              "9.5",
                              "10",
                              "10.5",
                              "11",
                              "11.5",
                              "12",
                              "12.5",
                              "13",
                              "14",
                              "15",
                              "16",
                              "17",
                              "Other"
                            ];

                            // Adidas Size. Source = https://www.adidas.com/us/help/size_charts

                            var AdidasUsSize = ["All", "4", "4.5", "5", "5.5", "6", "6.5", 7, "7.5",
                              "8",
                              "8.5",
                              "9",
                              "9.5",
                              "10",
                              "10.5",
                              "11",
                              "11.5",
                              "12",
                              "12.5",
                              "13",
                              "13.5",
                              "14",
                              "14.5",
                              "15",
                              "15.5",
                              "Other"
                            ];
                            var AdidasEuSize = [
                              "All",
                              "36",
                              "36 2/3",
                              "37 1/3",
                              "38",
                              "38 2/3",
                              "39 1/3",
                              "40",
                              "40 2/3",
                              "41 1/3",
                              "42",
                              "42 2/3",
                              "43 1/3",
                              "44",
                              "44 2/3",
                              "45 1/3",
                              "46",
                              "46 2/3",
                              "47 1/3",
                              "48",
                              "48 2/3",
                              "49 1/3",
                              "50",
                              "51 1/3",
                              "52 2/3",
                              "53 1/3",
                              "54 2/3",
                              "Other"
                            ];
                            var AdidasUkSize = ["All", "3.5", "4", "4.5", "5", "5.5", "6",
                              "6.5",
                              "7",
                              "7.5",
                              "8",
                              "8.5",
                              "9",
                              "9.5",
                              "10",
                              "10.5",
                              "11",
                              "11.5",
                              "12",
                              "12.5",
                              "13",
                              "13.5",
                              "14",
                              "14.5",
                              "15",
                              "16",
                              "17",
                              "18",
                              "Other"
                            ];


                            if (req.body.size == "Other") {
                              size = {
                                us: req.body.us_size,
                                uk: req.body.uk_size,
                                eu: req.body.eu_size
                              };
                            } else {
                              if (req.body.brand == "adidas") {
                                if (req.body.sizecountry == "us") {
                                  let choosen_size = AdidasUsSize.indexOf(req.body.size);
                                  size = {
                                    us: AdidasUsSize[choosen_size],
                                    uk: AdidasUkSize[choosen_size],
                                    eu: AdidasEuSize[choosen_size]
                                  };
                                } else if (req.body.sizecountry == "uk") {
                                  let choosen_size = AdidasUkSize.indexOf(req.body.size);
                                  size = {
                                    us: AdidasUsSize[choosen_size],
                                    uk: AdidasUkSize[choosen_size],
                                    eu: AdidasEuSize[choosen_size]
                                  };
                                } else if (req.body.sizecountry == "eu") {
                                  let choosen_size = AdidasEuSize.indexOf(
                                    req.body.size + 1
                                  );
                                  size = {
                                    us: AdidasUsSize[choosen_size],
                                    uk: AdidasUkSize[choosen_size],
                                    eu: AdidasEuSize[choosen_size]
                                  };
                                } else {
                                  size = {
                                    eu: null,
                                    us: null,
                                    uk: null,
                                    streetwearsize: null
                                  };
                                }
                              } else if (req.body.brand == "nike") {
                                if (req.body.sizecountry == "us") {
                                  let choosen_size = NikeUsSize.indexOf(
                                    req.body.size
                                  );
                                  size = {
                                    us: NikeUsSize[choosen_size],
                                    uk: NikeUkSizes[choosen_size],
                                    eu: NikeEuSize[choosen_size]
                                  };
                                } else if (req.body.sizecountry == "uk") {
                                  let choosen_size = NikeUkSizes.indexOf(
                                    req.body.size
                                  );
                                  size = {
                                    us: NikeUsSize[choosen_size],
                                    uk: NikeUkSizes[choosen_size],
                                    eu: NikeEuSize[choosen_size]
                                  };
                                } else if (req.body.sizecountry == "eu") {
                                  let choosen_size = NikeEuSize.indexOf(
                                    req.body.size
                                  );
                                  size = {
                                    us: NikeUsSize[choosen_size],
                                    uk: NikeUkSizes[choosen_size],
                                    eu: NikeEuSize[choosen_size]
                                  };
                                } else {
                                  size = {
                                    eu: null,
                                    us: null,
                                    uk: null,
                                    streetwearsize: null
                                  };
                                }
                              } else { }
                            }

                            //end pick size
                          } else if (req.body.category.toLowerCase() == 'other') {
                            size = {
                              eu: null,
                              us: null,
                              uk: null,
                              streetwearsize: req.body.streetwear
                            }
                          } else {
                            size = {
                              eu: null,
                              us: null,
                              uk: null,
                              streetwearsize: null
                            };
                          }
                          var productsdata = new products({
                            productname: form.productname,
                            size: size,
                            tickets: form.tickets,
                            price: form.price,
                            ticketprice: ticketprice,
                            category: form.category,
                            boughtfrom: form.boughtfrom,
                            model: form.model,
                            condition: form.condition,
                            shipping: form.shipping,
                            description: form.description,
                            images: imagesfiles,
                            createdby: result._id,
                            thumbnail: thumbnail,
                            ticketsbought: 0,
                            link: form.productname.split(" ").join("_"),
                            domain: dbinfo.domain,
                            trackingnumber: "Not set",
                            status: "Not sold yet",
                            brand: req.body.brand,
                            priority: premium,
                            has_receipt_or_box: form.receipt
                          });
                          if (req.files) {
                            productsdata
                              .save()
                              .then(item => {
                                var transaction = mongoose.model(
                                  "transaction",
                                  PaypalTransaction
                                );
                                var d = new Date(),
                                  month = "" + (d.getMonth() + 1),
                                  day = "" + d.getDate(),
                                  year = d.getFullYear(),
                                  hour = d.getHours(),
                                  minuts = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                                if (month.length < 2) month = "0" + month;
                                if (day.length < 2) day = "0" + day;
                                var date = [year, month, day].join("-") +
                                  " " + [hour, minuts].join(":");
                                var transactionpaypal = new transaction({
                                  User: req.session.user,
                                  date: date,
                                  status: "minus",
                                  type: "Sent product for review",
                                  balance: items.coins,
                                  userhandle: result.email,
                                  userfullname: result.fullname.firstname + " " + result.fullname.surname,
                                  coins: numberamount,
                                  code: req.body.betacode
                                });
                                transactionpaypal
                                  .save()
                                  .then(item => {
                                    const msg = {
                                      from: dbinfo.smtpfrom,
                                      to: decrypt(result.email),
                                      subject: "Rafflestore Support - Add product",
                                      html: '<h3>Hello, Thank you for adding ' + form.productname + ' to Rafflestore market .</h3> <p> We will review your product and get in touch with more information when review have been done.</p> <br><br> Dear, <br>Rafflestore Support  <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> '
                                    };
                                    sgMail.send(msg, (error, data) => {
                                      if (error) {
                                        res.send("Sorry, something happend. Please try again");
                                        console.log(error);
                                      } else {
                                        res.json("success");

                                      }
                                    });
                                  })
                                  .catch(err => {
                                    res.json(
                                      "Sorry,There has been an error while adding product"
                                    );
                                    console.error(err);
                                  });
                              })
                              .catch(err => {
                                res.json(
                                  "Sorry,There has been an error while adding product"
                                );
                                console.error(err);
                              });
                          } else {
                            res.json("Sorry, We are missing somefiles");
                          }
                        }
                      }
                    );
                  } else {
                    res.json("Sorry, You dont have enough coins");
                  }
                } else {
                  res.send("Sorry, there has been an error");
                }
              })

          }
        );
      }
    );
  }
});

//legitchecks

app.get("/legitcheck", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (result) {
            var customer = new Vue({
              template: require("fs").readFileSync(
                "./public/customers/legitchecks.vue",
                "utf-8"
              ),
              data: {
                coi: result.coins,
                domain: dbinfo.domain,
                userdata: result,
                login: true
              }
            });
            const context = {
              pagetitle: "Rafflestore -  Legit Checks",
              userdata: result,
              login: true,
              coi: result.coins,
              domain: dbinfo.domain
            };
            renderer.renderToString(customer, context, (err, html) => {
              if (err) {
                console.log(err);
                return;
              }
              res.end(`${html}`);
            });
          } else {
            res.redirect("/");
          }
        }
      );
    }
  );
});

app.post("/legitcheck", cunstruction, upload_cdn.array("images"), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (!req.body.productname) {
    res.json("Please add the produt name");
    return;
  } else if (!req.body.price) {
    res.json("Please add a price");
    return;
  } else if (!req.body.desc) {
    res.json("Please add a description");
    return;
  } else if (req.files.length < 5) {
    res.json("We need minimum 5 files");
    return;
  } else {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("users").findOne({
          _id: mongoose.Types.ObjectId(req.session.user)
        },
          function(err, result) {
            if (result) {
              if (result.coins >= 0) {
                var items = {
                  coins: Number(result.coins) - Number(0)
                };
                db.collection("users").updateOne({
                  _id: mongoose.Types.ObjectId(req.session.user)
                }, {
                  $set: items
                },
                  function(err, updated) {
                    if (err) {
                      res.send("Sorry, there has been an error");
                      console.log(err);
                    } else {
                      var imagesfiles = [];
                      if (req.session) {
                        if (req.session.user) {
                          var user = req.session.user;
                        } else {
                          var user = "none";
                        }
                      } else {
                        var user = "none";
                      }
                      let dateObj = new Date();
                      let month = dateObj.getUTCMonth() + 1;
                      let day = dateObj.getUTCDate();
                      let year = dateObj.getUTCFullYear();
                      var newdate = year + "-" + month + "-" + day;
                      req.files.forEach(function(file) {
                        imagesfiles.push("https://rafflestore.ams3.cdn.digitaloceanspaces.com/" + file.key);
                      });
                      var thumbnail = "https://rafflestore.ams3.cdn.digitaloceanspaces.com/" + req.files[0].key;
                      var form = req.body;
                      var legitcheck = mongoose.model("legitcheck", pdata);
                      var ticketprice = Math.floor(
                        (Number(form.price) / Number(form.tickets)) * Number(10)
                      );
                      var productsdata = new legitcheck({
                        productname: form.productname,
                        price: form.price,
                        description: form.description,
                        images: imagesfiles,
                        createdby: req.session.user
                      });
                      if (req.files) {
                        productsdata
                          .save()
                          .then(item => {
                            var transaction = mongoose.model(
                              "transaction",
                              PaypalTransaction
                            );
                            var d = new Date(),
                              month = "" + (d.getMonth() + 1),
                              day = "" + d.getDate(),
                              year = d.getFullYear(),
                              hour = d.getHours(),
                              minuts = d.getMinutes();
                            if (month.length < 2) month = "0" + month;
                            if (day.length < 2) day = "0" + day;
                            var date = [year, month, day].join("-") +
                              " " + [hour, minuts].join(":");
                            var transactionpaypal = new transaction({
                              User: req.session.user,
                              date: date,
                              status: "minus",
                              type: "Sent product for review",
                              balance: items.coins,
                              coins: "5"
                            });
                            transactionpaypal
                              .save()
                              .then(item => {
                                const msg = {
                                  from: dbinfo.smtpfrom,
                                  to: decrypt(result.email),
                                  subject: "Rafflestore Support - LEgit check",
                                  html: '<h3>Hello, Thank you for sending ' + form.productname + ' to Rafflestore. </h3><p> We will review your product and get in touch with more information when legit check have been done. </p><br><br> Dear, <br>Rafflestore Support <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p>  '
                                };
                                sgMail.send(msg, (error, data) => {
                                  if (error) {
                                    res.send("Sorry, something happend. Please try again");
                                    console.log(error);
                                  } else {
                                    res.json("success");
                                  }
                                });
                              })
                              .catch(err => {
                                res.json(
                                  "Sorry,There has been an error while sending product for legit check"
                                );
                                console.log(err);
                              });
                          })
                          .catch(err => {
                            res.json(
                              "Sorry,There has been an error while adding product"
                            );
                            console.log(err);
                          });
                      } else {
                        res.json("Sorry, We are missing somefiles");
                      }
                    }
                  }
                );
              } else {
                res.json("Sorry, You dont have enough coins");
              }
            } else {
              res.send("Sorry, there has been an error");
            }
          }
        );
      }
    );
  }
});

// Customer
app.get("/customer", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.redirect("/customer/" + req.session.user);
});

//Show customers page
app.get("/customer/:name", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.params.name)
      },
        function(err, result) {
          if (result) {
            if (req.session.user) {
              var viewdusers = result.uservisitors;
              if (viewdusers.includes(req.session.user) == false) {
                viewdusers.push(req.session.user);
                var visit = {
                  visitors: Number(result.visitors) + Number(1),
                  uservisitors: viewdusers
                };
              } else {
                var visit = {
                  visitors: Number(result.visitors),
                  uservisitors: viewdusers
                };
              }
            } else {
              var visit = {
                visitors: Number(result.visitors)
              };
            }

            db.collection("users").updateOne({
              _id: mongoose.Types.ObjectId(req.params.name)
            }, {
              $set: visit
            },
              function(err, updated) {
                db.collection("users").findOne({
                  _id: mongoose.Types.ObjectId(req.session.user)
                },
                  function(err, userdata) {
                    if (userdata) {
                      var anvdata = userdata;
                    } else {
                      var anvdata = "";
                    }
                    db.collection("products")
                      .find({
                        "winner.id": req.session.user
                      })
                      .toArray(function(err, product) {
                        db.collection("products")
                          .find({
                            createdby: req.session.user,
                            drawn: "no"
                          })
                          .toArray(function(err, onMarket) {
                            db.collection("raffles")
                              .find({
                                "joined.id": {
                                  $in: [req.session.user]
                                },
                                drawn: "no"
                              })
                              .toArray(function(err, raffle) {
                                let data = [];
                                if (raffle) {
                                  raffle.forEach(item => {
                                    data.push(item.raffleproduct);
                                  });
                                }

                                db.collection("products")
                                  .find({
                                    productid: {
                                      $in: data
                                    }
                                  })
                                  .toArray(function(err, raffleproducts) {
                                    if (raffleproducts) {
                                      var rproducts = raffleproducts;
                                    } else {
                                      var rproducts = "";
                                    }
                                    db.collection("products")
                                      .find({
                                        createdby: req.session.user,
                                        drawn: "yes"
                                      })
                                      .toArray(function(err, soldproducts) {
                                        if (soldproducts) {
                                          var sproduct = soldproducts;
                                        } else {
                                          var sproduct = "";
                                        }
                                        db.collection("tobeaccepteds")
                                          .find({
                                            createdby: req.session.user
                                          })
                                          .toArray(function(
                                            err,
                                            tobeaccepteds
                                          ) {
                                            if (tobeaccepteds) {
                                              var tba = tobeaccepteds;
                                            } else {
                                              var tba = "";
                                            }

                                            if (!result) {
                                              res.redirect("/");
                                            } else {
                                              if (req.session) {
                                                if (req.session.user) {
                                                  var user_coins = userdata.coins
                                                  var log = true;
                                                } else {
                                                  var log = false;
                                                  var user_coins = ''
                                                }
                                              } else {
                                                var log = false;
                                                var user_coins = ''
                                              }
                                              if (result.dopeone === "yes") {
                                                var rank = "Admin";
                                              } else {
                                                if (
                                                  result.rafflescreated > 10 &&
                                                  result.rafflescreated < 30
                                                ) {
                                                  var rank = "Trusted";
                                                } else if (
                                                  result.rafflescreated > 30
                                                ) {
                                                  var rank = "Veteran";
                                                } else {
                                                  var rank = "New user";
                                                }
                                              }

                                              var reputation_math = Math.floor(Number(100) - (Number((result.reputation.bad / result.reputation.god)) * 100))


                                              var customer = new Vue({
                                                template: require("fs").readFileSync(
                                                  "./public/customers/customer.vue",
                                                  "utf-8"
                                                ),
                                                data: {
                                                  verified: result.verified,
                                                  fullname: result.fullname.firstname +
                                                    " " +
                                                    result.fullname.surname,
                                                  params: req.params.name,
                                                  from: result.address,
                                                  city: decrypt(
                                                    result.address.city
                                                  ),
                                                  country: decrypt(
                                                    result.address.country
                                                  ),
                                                  time: result.joined,
                                                  rafflesold: result.rafflesold,
                                                  raffleswon: result.raffleswon,
                                                  coinflips: result.coinflips,
                                                  userid: result._id,
                                                  image: result.profileimage,
                                                  rank: rank,
                                                  signedinuser: req.session.user,
                                                  coins: result.coins,
                                                  coi: user_coins,
                                                  login: log,
                                                  domain: dbinfo.domain,
                                                  god: result.reputation.god,
                                                  bad: result.reputation.bad,
                                                  visitor: result.visitors,
                                                  userdata: anvdata,
                                                  soldproducts: sproduct,
                                                  tobeaccepted: tba,
                                                  products: product,
                                                  raffles: rproducts,
                                                  myproductsonmarket: onMarket,
                                                  reputation: reputation_math
                                                }
                                              });
                                              const context = {
                                                pagetitle: "Rafflestore",
                                                userdata: result,
                                                login: log,
                                                coi: result.coins,
                                                domain: dbinfo.domain
                                              };
                                              renderer.renderToString(
                                                customer,
                                                context,
                                                (err, html) => {
                                                  if (err) {
                                                    console.log(err);
                                                    return res.redirect("/");
                                                  }
                                                  res.end(`${html}`);
                                                }
                                              );
                                            }
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  }
                );
              }
            );
          } else {
            res.redirect("/");
          }
        }
      );
    }
  );
});

app.get("/settings", cunstruction, auth, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (result) {
            if (req.session) {
              if (req.session.user) {
                var user = req.session.user;
                var login = true;
                var coins = result.coins;
              } else {
                var user = null;
                var login = false;
                var coins = 0;
              }
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }



            var customer = new Vue({
              template: require("fs").readFileSync(
                "./public/customers/settings.vue",
                "utf-8"
              ),
              data: {
                username: user,
                coi: coins,
                login: login,
                domain: dbinfo.domain,
                userdata: result,
                email: entities.decode(decrypt(result.email)),
                address: entities.decode(decrypt(result.address.street)),
                postnumber: entities.decode(decrypt(result.address.postnumber)),
                city: entities.decode(decrypt(result.address.city)),
                country: entities.decode(decrypt(result.address.country)).toUpperCase(),
                user_firstname: entities.decode(result.fullname.firstname),
                user_surname: entities.decode(result.fullname.surname)



              }
            });

            const context = {
              pagetitle: "Rafflestore",
              userdata: result,
              login: login,
              coi: coins,
              domain: dbinfo.domain
            };

            renderer.renderToString(customer, context, (err, html) => {
              if (err) {
                console.log(err);
                return;
              }
              res.end(`${html}`);
            });
          } else {
            res.redirect("/customer");
          }
        }
      );
    }
  );
});
//xhange user information
app.post("/updatesettings", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (result) {
            if (req.body.firstname) {
              if (req.body.country) {
                if (req.body.surname) {
                  if (req.body.street) {
                    if (req.body.postnumber) {
                      if (req.body.city) {
                        var items = {
                          fullname: {
                            firstname: req.body.firstname,
                            surname: req.body.surname
                          },
                          address: {
                            street: encrypt(req.body.street),
                            postnumber: encrypt(req.body.postnumber),
                            city: encrypt(req.body.city),
                            country: encrypt(req.body.country.toLowerCase())
                          },
                          country: req.body.country.toLowerCase()
                        };
                        db.collection("users").updateOne({
                          _id: mongoose.Types.ObjectId(req.session.user)
                        }, {
                          $set: items
                        },
                          function(err, result) {
                            if (err) {
                              res.send(
                                "Sorry, We Coudlnt update your settings"
                              );
                              console.log(err);
                            } else {
                              res.send("Your settings have been updated");
                            }
                          }
                        );
                      } else {
                        res.send("Please dont leave city blank");
                      }
                    } else {
                      res.send("Please dont leave postnumber blank");
                    }
                  } else {
                    res.send("Please dont leave address blank");
                  }
                } else {
                  res.send("Please dont leave surname blank");
                }
              } else {
                res.send("Please dont leave country blank");
              }
            } else {
              res.send("Please dont leave First name blank");
            }
          } else {
            res.send("Sorry, an error happend.");
          }
        }
      );
    }
  );
});

//change user image
app.post("/changeimage", cunstruction, upload_cdn.single("image"), function(req, res) {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (result) {
            if (req.file) {
              var image = "https://rafflestore.ams3.cdn.digitaloceanspaces.com/" + req.file.key;
            } else {
              var image = result.profileimage;
            }

            var items = {
              profileimage: image
            };
            db.collection("users").updateOne({
              _id: mongoose.Types.ObjectId(req.session.user)
            }, {
              $set: items
            },
              function(err, result) {
                if (err) {
                  res.send("Sorry, We cant update your image");
                  console.log(err);
                } else {
                  res.send("Image uploaded");
                }
              }
            );
          } else {
            res.send("Sorry, an error happend");
          }
        }
      );
    }
  );
});

//update security
app.post("/updatesecurity", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (result) {
            if (req.body.password.length > 0) {
              var password = encrypt(req.body.password);
            } else {
              var password = result.password;
            }
            if (req.body.email.length > 0) {
              var email = encrypt(req.body.email.toLowerCase());
            } else {
              var email = result.email;
            }
            if (err) {
              res.send("Sorry, there has been an error updating your email");
            } else {
              var sectoken = mongoose.model("changesecurity", changesecurity);
              var Passwordtoken = crypto.randomBytes(100).toString("hex");
              var newsecurity = new sectoken({
                Token: Passwordtoken,
                Email: result.email,
                newpassword: password,
                newemail: email
              });
              newsecurity.save(function(err, data) {
                if (err) {
                  res.send("Sorry, an uknow error occured");
                } else {
                  const msg = {
                    from: dbinfo.smtpfrom,
                    to: decrypt(result.email),
                    subject: "Rafflestore Support - Change password or email",
                    html: '<h3>Hello, this is your link to change your password or email:</h3> <a href="' +
                      dbinfo.domain +
                      "/updatesecurity?token=" +
                      Passwordtoken +
                      "&email=" +
                      decrypt(result.email) +
                      '">' +
                      dbinfo.domain +
                      "/updatesecurity?token=" +
                      Passwordtoken +
                      "&email=" +
                      decrypt(result.email) +
                      "</a><br><br> Dear, <br><b>RaffleStore Support</b> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> "
                  };
                  sgMail.send(msg, (error, data) => {
                    if (error) {
                      res.send("Sorry, something happend. Please try again");
                      console.log(error);
                    } else {
                      res.send(
                        "We have sent an confermation email to be able to change your password or email"
                      );
                    }
                  });
                }
              });
            }
          } else {
            res.send("Sorry, an error happend");
          }
        }
      );
    }
  );
});

app.get("/updatesecurity", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.query.token && req.query.email) {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("changesecurities").findOne({
          Token: req.query.token,
          Email: encrypt(req.query.email)
        },
          function(err, result) {
            if (result) {
              if (req.session) {
                if (req.session.user) {
                  var user = req.session.user;
                  var login = true;
                  var coins = result.coins;
                } else {
                  var user = null;
                  var login = false;
                  var coins = 0;
                }
              } else {
                var user = null;
                var login = false;
                var coins = 0;
              }
              db.collection("changesecurities").findOneAndDelete({
                Token: req.query.token,
                Email: encrypt(req.query.email)
              },
                function(err, removedata) {
                  var items = {
                    email: result.newemail,
                    password: result.newpassword
                  };
                  db.collection("users").updateOne({
                    email: result.Email
                  }, {
                    $set: items
                  },
                    function(err, updateresult) {
                      if (err) {
                        res.send("We couldnt update your settings");
                      } else {
                        const msg = {
                          from: dbinfo.smtpfrom,
                          to: decrypt(result.Email),
                          subject: "Rafflestore Support - Change password or email",
                          html: "<h3>Hello, Your settings has been updated</h3> <br><br><b>If this was not you, please contact the support at support@" +
                            dbinfo.domain +
                            "</b><br><br> Dear, <br><b>RaffleStore Support</b> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> "
                        };
                        sgMail.send(msg, (error, data) => {
                          if (error) {
                            res.send(
                              "Sorry, something happend. Please try again"
                            );
                          } else {

                            res.clearCookie("rafflestore_acc", function(err) {
                              if (err) return console.log(err);
                              res.send(
                                "Your settings has been updated, Please login again"
                              );
                            });
                          }
                        });
                      }
                    }
                  );
                }
              );
            } else {
              res.redirect("/");
            }
          }
        );
      }
    );
  } else {
    res.redirect("/");
  }
});

//verify email

app.get("/verify_email", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("verify_emails").findOne({
        token: req.query.token,
        email: req.query.u,
        code: req.query.code
      },
        function(err, code) {
          db.collection("users").findOne({
            _id: mongoose.Types.ObjectId(req.session.user)
          },
            function(err, userdata) {

              if (code) {
                db.collection("users").findOne({
                  _id: mongoose.Types.ObjectId(code.code)
                },
                  function(err, user) {
                    if (user) {
                      db.collection("users").updateOne({
                        email: code.email,
                        _id: mongoose.Types.ObjectId(code.code)
                      }, {
                        $set: {
                          emailverified: true
                        }
                      },
                        function(err, updatedUser) {
                          //delete token
                          db.collection("verify_emails").findOneAndDelete({
                            token: req.query.token,
                            email: req.query.u,
                            code: req.query.code
                          },
                            function(err, delete_token) {
                              if (req.session.user) {
                                var login = true;
                                var coins = userdata.coins;
                              } else {
                                var login = false;
                                var coins = "";
                              }

                              var data = new Vue({
                                template: require("fs").readFileSync(
                                  "./public/customers/verify.vue",
                                  "utf-8"
                                ),
                                data: {
                                  login: login,
                                  userdata: userdata,
                                  coi: coins,
                                  verifyuser: user,
                                  email: req.query.u,
                                  code: req.query.code,

                                }
                              });
                              const context = {
                                pagetitle: "Rafflestore Verify",
                                domain: dbinfo.domain
                              };
                              renderer.renderToString(
                                data,
                                context,
                                (err, html) => {
                                  if (err) {
                                    console.log(err);
                                    return;
                                  }
                                  res.end(`${html}`);
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  }
                );
              } else {
                res.redirect("/");
              }
            }
          );
        }
      );
    }
  );
});

app.post('/verify_email', cunstruction, (req, res) => {
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      var token = crypto
        .randomBytes(128)
        .toString("hex");
      let new_verify_email = mongoose.model(
        "verify_email",
        verifyemail
      );
      let save_verify_email = new new_verify_email({
        token: token,
        email: req.body.email,
        code: req.body.code
      });

      save_verify_email
        .save()
        .then(data => {
          const msg = {
            from: dbinfo.smtpfrom,
            to: decrypt(
              req.body.email
            ),
            subject: "Rafflestore Support - Welcome",
            html: '<h3>Welcome to Rafflestore!</h3><br><br><p>Please verify your email: <a href="' + dbinfo.domain + "/verify_email?token=" +
              token +
              "&u=" +
              req.body.email +
              "&code=" +
              req.body.code +
              '">' +
              dbinfo.domain +
              "?token=" +
              token +
              "&u=" +
              req.body.email +
              "&code=" +
              req.body.code +
              '</a></p><br><br><p>Have any questions? Consider contact us via <a href="support@rafflestore.com">support@rafflestore.com</a></p><br><br><p>Dear, <br>Rafflestore</p> '
          };
          sgMail.send(
            msg,
            (error, data) => {
              if (error) {
                res.send(
                  "Sorry, something happend. Please try again"
                );
              } else {
                res.writeHead(
                  200, {
                  "Content-Type": "text/html"
                }
                );
                res.end(
                  "Mail sent"
                );
              }
            }
          );
        })
        .catch(err => {
          res.json("Sorry, something happend. Please try again");
        });
    });
})

app.post("/requestdata", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, user) {
          if (user) {
            db.collection("products")
              .find({
                createdby: req.session.user
              })
              .toArray(function(err, products) {
                db.collection("tobeaccepteds")
                  .find({
                    createdby: req.session.user
                  })
                  .toArray(function(err, tba) {
                    var dataimages = [];

                    function images(data) {
                      if (data.length > 0) {
                        data.forEach(element => {
                          element.images.forEach(doc => {
                            dataimages.push(
                              '<a href="' + doc + '">' + doc + "</a><br>"
                            );
                          });
                        });
                      }
                    }
                    images(products);
                    images(tba);
                    const msg = {
                      from: dbinfo.smtpfrom,
                      to: decrypt(user.email),
                      subject: "Rafflestore Support - Request data",
                      html: "<h3>Hello, You have requested some data</h3> <br><br> This is the data we have about you: <br><strong>User data</strong> <br> Name:" +
                        user.fullname.firstname +
                        " " +
                        user.fullname.surname +
                        ", <br>Email: " +
                        decrypt(user.email) +
                        " <br> When you joined: " +
                        user.joined +
                        " <br>Your address: " +
                        decrypt(user.address.street) +
                        " " +
                        decrypt(user.address.postnumber) +
                        " " +
                        decrypt(user.address.city) +
                        " " +
                        decrypt(user.address.country) +
                        " <br><br> <strong>Transactions</strong><br> Mail: " +
                        decrypt(user.email) +
                        ' <br><strong>Your images</strong><br> Your profile image:<a href="' +
                        dbinfo.domain +
                        user.profileimage +
                        '">' +
                        dbinfo.domain +
                        user.profileimage +
                        "</a><br> Other images:<br> " +
                        dataimages +
                        " <br><strong>If you have more questions, please respond support@rafflestore.com<br></strong>  Dear, <br><b>RaffleStore Support</b> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> "
                    };
                    sgMail.send(msg, (error, data) => {
                      if (error) {
                        res.send("Sorry, something happend. Please try again");
                      } else {
                        res.json("We have sent an mail with more information.");
                      }
                    });
                  });
              });
          } else {
            res.send("Sorry, an error happend");
          }
        }
      );
    }
  );
});

app.post("/deleteme", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, user) {
          if (user) {
            var deletedata = mongoose.model("deleteuser", deleteuser);
            var token = crypto.randomBytes(100).toString("hex");
            var del = new deletedata({
              Token: token,
              Email: req.session.user
            });

            del.save(function(err, data) {
              if (err) {
                res.send("Sorry, an uknow error occured");
              } else {
                const msg = {
                  from: dbinfo.smtpfrom,
                  to: decrypt(user.email),
                  subject: "Rafflestore Support - Delete user from rafflestore",
                  html: '<h3>Hello, this is your link to delete your account from rafflestore:</h3> <a href="' +
                    dbinfo.domain +
                    "/deleteme?token=" +
                    token +
                    "&u=" +
                    req.session.user +
                    '">' +
                    dbinfo.domain +
                    "/deleteme?token=" +
                    token +
                    "&u=" +
                    req.session.user +
                    "</a> <br><br><strong>We hope we see you soon again!</strong><br><br> Dear, <br><b>RaffleStore Support</b> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> "
                };
                sgMail.send(msg, (error, data) => {
                  if (error) {
                    res.send("Sorry, something happend. Please try again");
                  } else {
                    res.send(
                      "We have sent an confermation email to be able to delete your account from Rafflestore"
                    );
                  }
                });
              }
            });
          } else {
            res.send("Error");
          }
        }
      );
    }
  );
});

app.get("/deleteme", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.query.token && req.query.u) {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("deleteusers").findOne({
          Token: req.query.token,
          Email: req.query.u
        },
          function(err, result) {
            if (result) {
              if (req.session) {
                if (req.session.user) {
                  var user = req.session.user;
                  var login = true;
                  var coins = result.coins;
                } else {
                  var user = null;
                  var login = false;
                  var coins = 0;
                }
              } else {
                var user = null;
                var login = false;
                var coins = 0;
              }
              db.collection("users").findOneAndDelete({
                email: req.query.u
              },
                function(err, removedata) {
                  console.log(removedata)
                  db.collection("deleteusers").findOneAndDelete({
                    Token: req.query.token,
                    Email: req.query.u
                  },
                    function(err, removedata) {
                      res.clearCookie("rafflestore_acc")
                      if (err) return console.log(err);
                      res.send("User deleted");

                    }
                  );
                }
              );
            } else {
              res.redirect("/");
            }
          }
        );
      }
    );
  } else {
    res.redirect("/");
  }
});

//my transcations

app.get("/mytransactions", cunstruction, auth, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          db.collection("transactions")
            .find({
              User: req.session.user
            })
            .sort({
              date: -1
            })
            .toArray((err, transaction) => {
              if (req.session) {
                if (req.session.user) {
                  var user = req.session.user;
                  var login = true;
                  var coins = result.coins;
                } else {
                  var user = null;
                  var login = false;
                  var coins = 0;
                }
              } else {
                var user = null;
                var login = false;
                var coins = 0;
              }
              var transactionsdata = [];
              transaction.forEach(item => {
                let uh;
                if (item.userhandle) {
                  uh = decrypt(item.userhandle);
                } else {
                  uh = "none";
                }
                let se;
                if (item.selleremail) {
                  se = decrypt(item.selleremail);
                } else {
                  se = "none";
                }
                let sellername;
                if (item.sellername) {
                  sellername = item.sellername;
                } else {
                  sellername = "none";
                }
                let code;
                if (item.code) {
                  code = item.code;
                } else {
                  code = "none";
                }
                let product_name;
                if (item.productname) {
                  product_name = item.productname
                } else {
                  product_name = ''
                }
                let productid
                if (item.productid) {
                  productid = item.productid
                } else {
                  productid = ''
                }

                let sn;
                if (item.sellername) {
                  sn = decrypt(item.sellername);
                } else {
                  sn = "none";
                }
                var email;
                if (item.mail) {
                  email = decrypt(item.mail);
                } else {
                  email = "none";
                }
                transactionsdata.push({
                  id: String(item._id),
                  User: item.User,
                  PaymentID: item.PaymentID,
                  product_name: product_name,
                  productid: productid,
                  price: item.price,
                  code: code,
                  mail: email,
                  coins: item.coins,
                  token: item.token,
                  PayerID: item.PayerID,
                  userhandle: uh,
                  userfullname: item.userfullname,
                  selleremail: se,
                  sellername: sellername,
                  date: item.date,
                  status: item.status,
                  type: item.type,
                  balance: item.balance,
                  rollednumber: item.rollednumber,
                  dicepicked: item.dicepicked,
                  rolledtype: item.rolledtype,
                  rolledtimes: item.rolledtimes,
                  rolledside: item.rolledside
                });
              });

              let date = new Date();
              let todaysdate = date
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "-");
              let previusDate = date.getFullYear();
              let DateOneYearBack = new Date(
                previusDate - 1,
                date.getMonth(),
                date.getDate()
              );
              var data = new Vue({
                template: require("fs").readFileSync(
                  "./public/customers/transactions.vue",
                  "utf-8"
                ),
                data: {
                  transactions: transactionsdata,
                  login: true,
                  userdata: result,
                  coi: result.coins,
                  todaysdate: todaysdate,
                  DateOneYearBack: DateOneYearBack.getFullYear() +
                    "-" +
                    DateOneYearBack.getMonth() +
                    "-" +
                    DateOneYearBack.getDate()
                }
              });
              const context = {
                pagetitle: "Rafflestore",
                userdata: result,
                login: true,
                domain: dbinfo.domain
              };
              renderer.renderToString(data, context, (err, html) => {
                if (err) {
                  console.log(err);
                  return;
                }
                res.end(`${html}`);
              });
            });
        }
      );
    }
  );
});

app.post("/verify", cunstruction, upload_cdn.array("images"), auth, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, user) {
          if (req.session.user) {
            const imagesdata = [];
            req.files.forEach(data => {
              imagesdata.push('https://rafflestore.ams3.cdn.digitaloceanspaces.com/' + data.key);
            });
            var verifyschemas = mongoose.model("verify", verifyschema);
            var verify = new verifyschemas({
              user: req.session.user,
              images: imagesdata,
              fullname: user.fullname.firstname + " " + user.fullname.surname
            });
            verify
              .save()
              .then(data => {
                res.send("Verify request has been sent");
              })
              .catch(err => {
                if (err) {
                  console.log(err);
                }
              });
          } else {
            res.send("You need to be signed in to verify yourself");
          }
        }
      );
    }
  );
});
//withdraw
app.post("/withdraw", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  if (req.body.coins) {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("users").findOne({
          _id: mongoose.Types.ObjectId(req.session.user)
        },
          function(err, result) {
            if (result) {
              if (result.verified == 'true') {
                if (Number(result.coins) - Number(req.body.coins) >= 0) {
                  db.collection('users').updateOne({
                    _id: mongoose.Types.ObjectId(req.session.user)
                  }, { $set: { coins: Number(result.coins) - Number(req.body.coins) } }, function(err, data) {
                    if (err) {
                      res.send("An error occurred. Please try again");
                    } else {
                      var transaction = mongoose.model("withdraw", withdraw_schema);
                      var withdraw_data = new transaction({
                        user: req.session.user,
                        coins: req.body.coins,
                        email: result.email,
                        status: "not done"
                      })

                      withdraw_data.save()
                        .then(data => {
                          res.send("Thank you! We will reply with more information")
                        })
                        .catch(err => {
                          res.send("An error occurred. Please try again");
                        })
                    }
                  })
                } else {
                  res.send("You don't have enough coins")
                }
              } else {
                res.send("You need to be verified to withdraw coins");
              }

            } else {
              res.send("An error occurred. Please try again");
            }
          });
      })
  } else {
    res.send("An error occurred. Please try again");
  }
});
//add coins payments
app.post("/addcoins", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  if (req.body.coinsamount) {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("users").findOne({
          _id: mongoose.Types.ObjectId(req.session.user)
        },
          function(err, result) {
            if (err) {
              res.redirect("/?error=uknown");
              return console.log(err);
            }
            var invoice = Math.floor(m.random() * 1000000000);
            var price = Number(req.body.coinsamount);
            var create_payment_json = {
              intent: "sale",
              payer: {
                payment_method: "paypal"
              },
              redirect_urls: {
                return_url: dbinfo.paypalmade,
                cancel_url: dbinfo.paymentcaneld
              },
              transactions: [{
                item_list: {
                  items: [{
                    name: "item",
                    sku: "item",
                    price: price,
                    currency: "USD",
                    quantity: 1
                  }]
                },
                amount: {
                  currency: "USD",
                  total: price
                },
                description: "Payment for coins at rafflestore for customer " +
                  decrypt(result.email)
              }]
            };

            paypal.payment.create(create_payment_json, function(
              error,
              payment
            ) {
              if (error) {
                res.redirect("/?error=uknown");
                console.log(error);
              } else {
                var transaction = mongoose.model(
                  "pendingTransactions",
                  PaypalTransaction
                );
                var paypaldata = new transaction({
                  User: req.session.user,
                  PaymentID: payment.id,
                  price: price,
                  mail: result.email,
                  coins: Number(req.body.coinsamount)
                });
                paypaldata
                  .save()
                  .then(item => {
                    res.redirect(payment.links[1].href);
                  })
                  .catch(err => {
                    res.redirect("/addproduct?error=uknown");
                    console.log("error paypl payment = " + err);
                  });
              }
            });
          }
        );
      }
    );
  } else {
    res.redirect("/?error=specifiyamount");
  }
});

app.get("/PaymentMade", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.session) {
    if (req.session.user) {
      mongoose.connect(
        dburl, {
        useNewUrlParser: true
      },
        function(err, db) {

          var paymentId = req.query.paymentId;
          var payerId = {
            payer_id: req.query.PayerID
          };

          paypal.payment.execute(paymentId, payerId, function(error, payment) {
            if (error) {
              res.redirect("/?error=payment_declined");
            } else {
              if (payment.state == 'approved') {

                //get information from pending transactions
                db.collection("pendingtransactions").findOne({
                  PaymentID: req.query.paymentId
                },
                  function(err, pendingtransactiondata) {
                    //get user data
                    db.collection("users").findOne({
                      _id: mongoose.Types.ObjectId(req.session.user)
                    },
                      function(err, userdata) {
                        //delete information from pending transactions
                        db.collection("pendingtransactions").findOneAndDelete({
                          PaymentID: encrypt(req.query.paymentId)
                        },
                          function(err, removedata) {
                            if (err) {
                              res.redirect("/error=uknown");
                            } else {
                              if (pendingtransactiondata === "null") {
                                res.redirect("/error=uknown");
                                console.log(
                                  "error adding payment for user" +
                                  decrypt(req.session.user) +
                                  " = " +
                                  err
                                );
                              } else {
                                var d = new Date(),
                                  month = "" + (d.getMonth() + 1),
                                  day = "" + d.getDate(),
                                  year = d.getFullYear(),
                                  hour = d.getHours(),
                                  minuts = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                                if (month.length < 2) month = "0" + month;
                                if (day.length < 2) day = "0" + day;
                                var date = [year, month, day].join("-") +
                                  " " + [hour, minuts].join(":");

                                //transfer data to transactions map
                                var transaction = mongoose.model(
                                  "transaction",
                                  PaypalTransaction
                                );
                                var transactionpaypal = new transaction({
                                  User: req.session.user,
                                  PaymentID: pendingtransactiondata.PaymentID,
                                  price: pendingtransactiondata.price,
                                  mail: pendingtransactiondata.mail,
                                  coins: pendingtransactiondata.coins,
                                  token: req.query.token,
                                  PayerID: req.query.PayerID,
                                  userhandle: userdata.email,
                                  userfullname: userdata.fullname.firstname +
                                    " " +
                                    userdata.fullname.surname,
                                  date: date,
                                  status: "plus",
                                  type: "Bought coins",
                                  balance: Number(userdata.coins) +
                                    Number(pendingtransactiondata.coins)
                                });

                                transactionpaypal
                                  .save()
                                  .then(item => {
                                    db.collection("users").findOne({
                                      _id: mongoose.Types.ObjectId(req.session.user)
                                    },
                                      function(err, userresult) {
                                        var items = {
                                          coins: Number(userresult.coins) +
                                            Number(pendingtransactiondata.coins)
                                        };
                                        db.collection("users").updateOne({
                                          _id: mongoose.Types.ObjectId(
                                            req.session.user
                                          )
                                        }, {
                                          $set: items
                                        },
                                          function(err, result) {
                                            if (err) {
                                              res.redirect("/error=uknown");
                                            } else {
                                              db.collection("transactions").findOne({
                                                PaymentID: req.query.paymentId
                                              },
                                                function(err, transa) {
                                                  const msg = {
                                                    from: dbinfo.smtpfrom,
                                                    to: decrypt(userresult.email),
                                                    subject: "Rafflestore Support - Receipt",
                                                    html: "<h3>Hello, Thank you  for buying coins at " +
                                                      dbinfo.domain +
                                                      ". Your coins have been added to your account. </h3><br> <p>Rafflestore payment id:   " +
                                                      transa._id +
                                                      "</p> <p> Paypal PaymentID: " +
                                                      transa.PaymentID +
                                                      "</p><p>Amount: " +
                                                      transa.price +
                                                      "$.</p><p>Billed to: " +
                                                      decrypt(transa.mail) +
                                                      "</p><br><br><h3>If you have an quiestions. Please contact us att support@" +
                                                      dbinfo.domain +
                                                      "</h3><br><br> Dear, <br><b>RaffleStore Support</b> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> "
                                                  };
                                                  sgMail.send(msg, (error, data) => {
                                                    if (error) {
                                                      res.send(
                                                        "Sorry, something happend. Please try again"
                                                      );
                                                    } else {
                                                      res.redirect(
                                                        "/?success=CoinsBought"
                                                      );
                                                    }
                                                  });
                                                }
                                              );
                                            }
                                          }
                                        );
                                      }
                                    );
                                  })
                                  .catch(err => {
                                    res.redirect("/?error=uknown");
                                    console.log("error saving payment = " + err);
                                  });
                              }
                            }
                          }
                        );
                      }
                    );
                  }
                );
              } else {
                res.redirect("/?error=payment_declined");
              }
            }
          });
        }
      );
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

//send register user form
app.get("/register", cunstruction, loggedin, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  var date = new Date();
  var data = new Vue({
    template: require("fs").readFileSync(
      "./public/customers/userregister.vue",
      "utf-8"
    ),
    data: {
      todaysyear: date.getFullYear(),
      login: false
    },
    methods: {
      range: function(start, end) {
        return Array(end - start + 1)
          .fill()
          .map((_, idx) => start + idx);
      },
      reverse: function(array) {
        return array.slice().reverse();
      }
    }
  });

  const context = {
    pagetitle: "Rafflestore - Register",
    domain: dbinfo.domain
  };
  renderer.renderToString(data, context, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(`${html}`);
  });
});

//check register

app.post("/checkuser", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.body.email.length > 0) {
    if (req.body.password.length > 0) {
      if (req.body.passwordagain.length > 0) {
        var email = req.body.email.toLowerCase();
        mongoose.connect(
          dburl, {
          useNewUrlParser: true
        },
          function(err, db) {
            db.collection("users").findOne({
              email: encrypt(email)
            },
              function(err, user) {
                if (user) {
                  res.send("User already exists");
                } else {
                  if (req.body.password.length >= 8) {
                    if (req.body.password == req.body.passwordagain) {
                      if (req.body.password.match(/(\d+)/) < 2) {
                        res.send(
                          "You need to have at least 2 numbers in password"
                        );
                      } else {
                        res.send("success");
                      }
                    } else {
                      res.send("Password dose not match");
                    }
                  } else {
                    res.send(
                      "You need to have at least 8 digits in your password"
                    );
                  }
                }
              }
            );
          }
        );
      } else {
        res.send("Please fill your password again");
      }
    } else {
      res.send("Please fill your password");
    }
  } else {
    res.send("Please fill your email");
  }
});

//register user
app.post("/register", cunstruction, function(req, res) {
  var today = new Date();
  var date = new Date(req.body.year, req.body.month, req.body.day);
  var checkdate = Math.abs(today - date);
  var diffdays = Math.ceil(checkdate / (1000 * 3600 * 24));
  if (req.body.year) {
    if (req.body.month) {
      if (req.body.day) {
        if (req.body.firstname) {
          if (req.body.lastname) {
            if (req.body.address) {
              if (req.body.postnumber) {
                if (req.body.city) {
                  if (req.body.country) {
                    if (req.body.mail) {
                      if (req.body.password) {
                        if (req.body.phonecountry) {
                          if (req.body.password.length >= 8) {
                            if (req.body.phone) {
                              if (req.body.terms == "on") {

                                if (diffdays / Number(365) > 18) {
                                  mongoose.connect(
                                    dburl, {},
                                    function(err, db) {
                                      db.collection("users").findOne({
                                        email: encrypt(
                                          req.body.mail.toLowerCase()
                                        )
                                      },
                                        function(err, user) {
                                          if (user) {
                                            res.json("User already exists");
                                          } else {
                                            var joined = new Date();
                                            var month = joined.getMonth() + 1;
                                            var day = joined.getDate();
                                            var year = joined.getFullYear();
                                            var fulljoined =
                                              month + "-" + day + "-" + year;
                                            var user = mongoose.model(
                                              "users",
                                              UserSchema
                                            );
                                            var registeruser = new user({
                                              password: encrypt(
                                                req.body.password
                                              ),
                                              email: encrypt(req.body.mail.toLowerCase()),
                                              joined: fulljoined,
                                              fullname: {
                                                firstname: req.body.firstname,
                                                surname: req.body.lastname
                                              },
                                              personumber: encrypt(
                                                req.body.year +
                                                "-" +
                                                req.body.month +
                                                "-" +
                                                req.body.day
                                              ),
                                              address: {
                                                street: encrypt(
                                                  req.body.address
                                                ),
                                                postnumber: encrypt(
                                                  req.body.postnumber
                                                ),
                                                city: encrypt(req.body.city),
                                                country: encrypt(
                                                  req.body.country.toLowerCase()
                                                )
                                              },
                                              rafflescreated: 0,
                                              rafflesold: {
                                                total: 0
                                              },
                                              raffleswon: 0,
                                              coinflips: 0,
                                              profileimage: "/img/defaultprofileimg.png",
                                              rank: "default",
                                              dopeone: "no",
                                              coins: "0",
                                              visitors: "0",
                                              uservisitors: ["none"],
                                              betacodes: [],
                                              reputation: {
                                                god: 1,
                                                bad: 1,
                                                users: []
                                              },
                                              rafflesplayed: "0",
                                              dicethrown: "0",
                                              raffleswon: "0",
                                              telefon: "+" +
                                                req.body.phonecountry +
                                                " " +
                                                req.body.phone,
                                              country: req.body.country.toLowerCase(),
                                              dicewon: 0,
                                              emailverified: false
                                            });
                                            registeruser.save(function(
                                              err,
                                              data
                                            ) {
                                              if (err) {
                                                console.log(
                                                  "error register user = " +
                                                  err
                                                );
                                                res.json(
                                                  "Sorry, there has been an error"
                                                );
                                              } else {
                                                db.collection(
                                                  "users"
                                                ).findOne({
                                                  email: encrypt(
                                                    req.body.mail.toLowerCase()
                                                  )
                                                },
                                                  function(err, newuser) {
                                                    req.session.user =
                                                      newuser._id;
                                                    var token = crypto
                                                      .randomBytes(128)
                                                      .toString("hex");
                                                    let new_verify_email = mongoose.model(
                                                      "verify_email",
                                                      verifyemail
                                                    );
                                                    let save_verify_email = new new_verify_email({
                                                      token: token,
                                                      email: newuser.email,
                                                      code: newuser._id
                                                    });

                                                    save_verify_email
                                                      .save()
                                                      .then(data => {
                                                        const msg = {
                                                          from: dbinfo.smtpfrom,
                                                          to: decrypt(
                                                            newuser.email
                                                          ),
                                                          subject: "Rafflestore Support - Welcome",
                                                          html: '<h3>Welcome to Rafflestore!</h3><br><br><p>Please verify your email: <a href="' +
                                                            dbinfo.domain +
                                                            "/verify_email?token=" +
                                                            token +
                                                            "&u=" +
                                                            newuser.email +
                                                            "&code=" +
                                                            newuser._id +
                                                            '">' +
                                                            dbinfo.domain +
                                                            "?token=" +
                                                            token +
                                                            "&u=" +
                                                            newuser.email +
                                                            "&code=" +
                                                            newuser._id +
                                                            '</a></p><br><br><p>Have any questions? Consider contact us via <a href="support@rafflestore.com">support@rafflestore.com</a></p><br><br><p>Dear, <br>Rafflestore</p> '
                                                        };
                                                        sgMail.send(
                                                          msg,
                                                          (error, data) => {
                                                            if (error) {
                                                              res.send(
                                                                "Sorry, something happend. Please try again"
                                                              );
                                                            } else {
                                                              res.writeHead(
                                                                200, {
                                                                "Content-Type": "text/html"
                                                              }
                                                              );
                                                              res.end(
                                                                "success"
                                                              );
                                                            }
                                                          }
                                                        );
                                                      })
                                                      .catch(err => {
                                                        res.json("Error");
                                                      });
                                                  }
                                                );
                                              }
                                            });
                                          }
                                        }
                                      );
                                    }
                                  );
                                } else {
                                  res.json(
                                    "You need to be at least 18 years old to use this site"
                                  );
                                }

                              } else {
                                res.json(
                                  "You need to accept Terms of Use to use Rafflestore"
                                );
                              }
                            } else {
                              res.json("Please specifiy your phone number");
                            }
                          } else {
                            res.json("Password needs to be atleast 8 digits");
                          }
                        } else {
                          res.json(
                            "Please specifiy which country you are from"
                          );
                        }
                      } else {
                        res.json("Please add your password");
                      }
                    } else {
                      res.json("Please add your email");
                    }
                  } else {
                    res.json("Please add your post number");
                  }
                } else {
                  res.json("Please add your city");
                }
              } else {
                res.json("Please add your post number");
              }
            } else {
              res.json("Please add your address");
            }
          } else {
            res.json("Please add your last name");
          }
        } else {
          res.json("Please add your first name");
        }
      } else {
        res.json("Please specifiy the day you are born");
      }
    } else {
      res.json("Please specifiy the month you are born");
    }
  } else {
    res.json("Please specifiy the year you are born");
  }
});

//send login form file
app.get("/login", cunstruction, loggedin, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  var data = new Vue({
    template: require("fs").readFileSync(
      "./public/customers/userlogin.vue",
      "utf-8"
    ),
    data: {
      coi: 0,
      login: false
    }
  });
  const context = {
    pagetitle: "Rafflestore Login",
    domain: dbinfo.domain
  };
  renderer.renderToString(data, context, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(`${html}`);
  });
});

//fb login

app.get("/fblogin", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  FB.api(
    "/me", {
    fields: ["email", "id", "name", "picture"]
  },
    function(fbReq) {
      if (!fbReq || fbReq.error) {
        console.log(!res ? "error occurred" : fbReq.error);
        return;
      }
      mongoose.connect(
        dburl, {
        useNewUrlParser: true
      },
        function(err, db) {
          db.collection("users").findOne({
            email: encrypt(fbReq.email.toLowerCase())
          },
            function(err, user) {
              if (!user) {
                res.redirect("/login?error=UserNoExist");
              } else {
                var password = decrypt(user.password);
                if (req.body.password === password) {
                  req.session.user = user._id;
                  res.redirect("/customer");
                } else {
                  res.redirect("/login?error=UserNoExist");
                }
              }
            }
          );
        }
      );
    }
  );
});

//logg in user
app.post("/login", cunstruction, function(req, res) {
  if (!req.body.email) {
    res.send("Please fill your email");
  } else if (!req.body.password) {
    res.send("Please fill your password");
  } else {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("users").findOne({
          email: encrypt(req.body.email.toLowerCase())
        },
          function(err, user) {
            if (!user) {
              res.send("Sorry. Wrong username or password");
            } else {
              var password = decrypt(user.password);
              if (req.body.password === password) {
                req.session.user = user._id;
                res.setHeader("Content-Type", "text/html");
                res.send("success");
              } else {
                res.send("Sorry. Wrong username or password");
              }
            }
          }
        );
      }
    );
  }
});
//fb get

app.get("/logout", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.clearCookie("rafflestore_acc");
  res.redirect("/");
});

//products
app.get("/product/:id", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      if (req.session) {
        if (req.session.user) {
          var log = true;
          var user = mongoose.Types.ObjectId(req.session.user);
        } else {
          var log = false;
          var user = "none";
        }
      } else {
        var log = false;
        var user = "none";
      }
      //users
      db.collection("users").findOne({
        _id: user
      },
        function(usererr, userresult) {
          if (usererr) return console.log("users error = " + usererr);
          //raffles
          if (req.session) {
            if (req.session.user) {
              var coins = userresult.coins;
            } else {
              var coins = 0;
            }
          } else {
            var coins = 0;
          }
          var twoweeks = 1209600000;
          var total = new Date().getTime() - twoweeks;
          var date = new Date(total);
          var startdate =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
          var dateobj = new Date();
          var todaysdate =
            dateobj.getFullYear() +
            "-" +
            (dateobj.getMonth + 1) +
            "-" +
            dateobj.getDate();
          db.collection("products")
            .find({
              drawn: "no"
            })
            .sort({
              date: -1
            })
            .limit(10)
            .toArray(function(err, raffles) {
              if (err) {
                res.redirect("/error=uknown");
                return console.log("raffles error = " + err);
              }
              //products
              db.collection("products").findOne({
                productid: req.params.id
              },
                function(err, productresult) {
                  if (productresult) {
                    if (req.session.user) {
                      var viewdusers = [productresult.viewdusers];
                      if (viewdusers.includes(req.session.user) == false) {
                        viewdusers.push(req.session.user);
                        var updateprodctitems = {
                          viewed: Number(productresult.viewed) + Number(1),
                          userviewed: viewdusers
                        };
                      } else {
                        var updateprodctitems = {
                          viewed: Number(productresult.viewed),
                          userviewed: viewdusers
                        };
                      }
                    } else {
                      var updateprodctitems = {
                        viewed: Number(productresult.viewed)
                      };
                    }
                    db.collection("products").updateOne({
                      productid: req.params.id
                    }, {
                      $set: updateprodctitems
                    },
                      function(err, productupdatesview) {
                        if (err) {
                          res.redirect("/error=uknown");
                          return console.log("products error = " + err);
                        }
                        //single raffle connected to product
                        db.collection("raffles").findOne({
                          raffleid: req.params.id
                        },
                          function(err, singleraffle) {
                            db.collection("users").findOne({
                              _id: mongoose.Types.ObjectId(
                                productresult.createdby
                              )
                            },
                              function(err, singleuser) {
                                //get all joined users
                                var peoplejoinedraffle = [];
                                singleraffle.joined.forEach(element => {
                                  peoplejoinedraffle.push({
                                    name: element.name,
                                    id: element.id
                                  });
                                });

                                //

                                db.collection("users")
                                  .find({
                                    _id: {
                                      $in: peoplejoinedraffle
                                    }
                                  })
                                  .toArray(function(err, joinedusers) {

                                    if (singleraffle.winner) {
                                      var singleuserwinnername = singleraffle.winner.name;
                                      var singlerafflewinneruser = mongoose.Types.ObjectId(
                                        singleraffle.winner.id
                                      );
                                    } else {
                                      var singleuserwinnername = 'none'
                                      var singlerafflewinneruser = "none";
                                    }
                                    db.collection("users").findOne({
                                      _id: singlerafflewinneruser
                                    },
                                      function(err, raffleinfo) {
                                        if (raffleinfo) {
                                          var winner = raffleinfo;
                                        } else {
                                          var winner = "User dosen´t exist";
                                        }
                                        var date = new Date(Date.now());
                                        var datenow =
                                          date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


                                        if (productresult.has_receipt_or_box) {
                                          var has_receipt_or_box = productresult.has_receipt_or_box
                                        } else {
                                          var has_receipt_or_box = ''
                                        }
                                        //content
                                        var productdata = new Vue({
                                          template: require("fs").readFileSync(
                                            "./public/customers/singleproduct.vue",
                                            "utf-8"
                                          ),

                                          data: {
                                            login: log,
                                            coi: coins,
                                            raffle: raffles,
                                            productdata: singleuser,
                                            productname: productresult.productname,
                                            productimages: productresult.images,
                                            by: productresult.createdby,
                                            singleraffleid: singleraffle.raffleid,
                                            price: productresult.price,
                                            desc: productresult.description,
                                            size: productresult.size,
                                            conid: productresult.condition,
                                            ticketprice: productresult.ticketprice,
                                            totaltickets: productresult.tickets,
                                            ticketsbought: productresult.ticketsbought,
                                            ticketfree: productresult.ticketsfree,
                                            sizefrom: productresult.sizefrom,
                                            id: productresult.productid,
                                            singlerafflewinner: singleraffle.winner,
                                            singleraffledrawn: singleraffle.drawn,
                                            endtime: singleraffle.endtime,
                                            joined: singleraffle.joined,
                                            verified: productresult.verified,
                                            category: productresult.category,
                                            product: productresult,
                                            this_url: 'https://rafflestore.com/product/' + req.params.name,
                                            has_receipt_or_box: has_receipt_or_box,
                                            datenow: datenow,
                                            userfullname: singlerafflewinneruser,
                                            winner: winner,
                                            singleuserwinnername: singleuserwinnername,
                                            joinedusers: peoplejoinedraffle,
                                            domain: dbinfo.domain,
                                            userdata: userresult
                                          }
                                        });
                                        const context = {
                                          pagetitle: "Rafflestore - " +
                                            productresult.productname,
                                          userdata: userresult,
                                          login: log,
                                          coi: coins,
                                          domain: dbinfo.domain
                                        };
                                        renderer.renderToString(
                                          productdata,
                                          context,
                                          (err, html) => {
                                            if (err) {
                                              console.log(err);
                                              return;
                                            }
                                            res.send(`${html}`);
                                          }
                                        );
                                      }
                                    );
                                  });
                              }
                            );
                          }
                        );
                      }
                    );
                  } else {
                    res.redirect("/allraffles");
                  }
                }
              );
            });
        }
      );
    }
  );
});

app.post("/buyticket", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("raffles").findOne({
        raffleid: req.body.productid,
        raffleby: req.session.user
      },
        function(err, checkifseller) {
          if (checkifseller) {
            res.send("You cant buy your own product");
          } else {
            //get the product info
            db.collection("products").findOne({
              productid: req.body.productid
            },
              function(err, productresult) {

                if (!productresult.ticketsfree <= 0) {
                  // get user info
                  if (productresult == null) {
                    res.redirect("/");
                  } else {
                    db.collection("users").findOne({
                      _id: mongoose.Types.ObjectId(req.session.user)
                    },
                      function(err, userdata) {
                        if (req.session) {
                          if (req.session.user) {
                            var coins = userdata.coins;
                          } else {
                            var coins = 0;
                          }
                        } else {
                          var coins = 0;
                        }

                        var coinsamount = Math.ceil(Number(coins) - Number((req.body.amount * productresult.ticketprice) * 1.1))
                        if (coinsamount >= 0) {
                          var items = {
                            coins: coinsamount,
                            rafflesplayed: Number(userdata.rafflesplayed + 1)
                          };
                          //coins for the user
                          db.collection("users").updateOne({
                            _id: mongoose.Types.ObjectId(req.session.user)
                          }, {
                            $set: items
                          },
                            function(err, userresult) {
                              if (err) {
                                console.log(
                                  "update coins for user" +
                                  decrypt(result.username) +
                                  " error = " +
                                  err
                                );
                                res.send("Sorry, We couldnt update your coins.");
                              } else {
                                var productcoins =
                                  Number(productresult.tickets) -
                                  Number(req.body.amount);
                                if (productcoins >= 0) {
                                  if (productcoins >= 0 || productcoins >= null) {
                                    var freetickets =
                                      Number(productresult.ticketsfree) -
                                      Number(req.body.amount);
                                  } else {
                                    var freetickets = 0;
                                  }
                                  var updateproduct = {
                                    ticketsfree: freetickets,
                                    ticketsbought: Number(productresult.ticketsbought) +
                                      Number(req.body.amount)
                                  };
                                  // coins of the product
                                  db.collection("products").updateOne({
                                    productid: req.body.productid
                                  }, {
                                    $set: updateproduct
                                  },
                                    function(err, result) {
                                      if (err) {
                                        console.log(
                                          "update coins for product = " +
                                          req.body.productid +
                                          "-" +
                                          err
                                        );
                                        res.send(
                                          "Sorry, We couldnt update the coins for this product"
                                        );
                                      } else {
                                        db.collection("raffles").findOne({
                                          raffleid: req.body.productid
                                        },
                                          function(err, raffleresult) {
                                            var PeopleJoined =
                                              raffleresult.joined;
                                            var AddUserToRaffle = {
                                              joined: []
                                            };
                                            PeopleJoined.forEach(function(doc) {
                                              AddUserToRaffle.joined.push(doc);
                                            });

                                            for (var i = 0; i < req.body.amount; i++) {


                                              AddUserToRaffle.joined.push({

                                                id: req.session.user,
                                                name: userdata.fullname.firstname +
                                                  " " +
                                                  userdata.fullname.surname,
                                                profileimage: userdata.profileimage
                                              });
                                            }

                                            db.collection("raffles").updateOne({
                                              raffleid: req.body.productid
                                            }, {
                                              $set: AddUserToRaffle
                                            },
                                              function(err, raffleupdate) {
                                                res.send(
                                                  "Thank you, the ticket(s) have been bought. Please reload the page to see the tickets."
                                                );

                                                db.collection("users").findOne({
                                                  _id: mongoose.Types.ObjectId(productresult.createdby)
                                                }, function(err, selleruser) {

                                                  var d = new Date(),
                                                    month = "" + (d.getMonth() + 1),
                                                    day = "" + d.getDate(),
                                                    year = d.getFullYear(),
                                                    hour = d.getHours(),
                                                    minuts = d.getMinutes();
                                                  if (month.length < 2) {
                                                    month = "0" + month;
                                                  }
                                                  if (day.length < 2) {
                                                    day = "0" + day;
                                                  }
                                                  var date = [year, month, day].join("-") + " " + [hour, minuts].join(":");
                                                  var new_transaction = mongoose.model("transaction", PaypalTransaction);
                                                  var ticket_transaction = new new_transaction({
                                                    User: req.session.user,
                                                    selleremail: selleruser.email,
                                                    sellername: selleruser.fullname.firstname + " " + selleruser.fullname.surname,
                                                    date: date,
                                                    productid: req.body.productid,
                                                    userhandle: userdata.email,
                                                    userfullname: userdata.fullname.firstname + " " + userdata.fullname.surname,
                                                    productname: productresult.productname,
                                                    status: "minus",
                                                    type: "Bought Ticket(s)",
                                                    balance: coinsamount,
                                                    coins: Math.ceil(Number((req.body.amount * productresult.ticketprice) * 1.10))
                                                  });
                                                  ticket_transaction.save().then(item => { }).catch(err => {
                                                    console.error(err)
                                                  })
                                                })

                                                var crontickets =
                                                  Number(
                                                    productresult.ticketsfree
                                                  ) - Number(req.body.amount);
                                                if (crontickets == 0) {
                                                  var startTime = new Date(
                                                    Date.now() + 600000
                                                  );
                                                  var endTime = new Date(
                                                    startTime.getTime() + 600000
                                                  );
                                                  var cleanendtime =
                                                    startTime.getFullYear() +
                                                    "/" +
                                                    startTime.getMonth() +
                                                    "/" +
                                                    startTime.getDay() +
                                                    " " +
                                                    startTime.getHours() +
                                                    ":" +
                                                    startTime.getMinutes() +
                                                    ":" +
                                                    startTime.getSeconds();
                                                  var updatedCleanTime = new Date(
                                                    cleanendtime + 600000
                                                  );
                                                  var updateEndTime = {
                                                    endtime: cleanendtime
                                                  };
                                                  db.collection("raffles").updateOne({
                                                    raffleid: req.body.productid
                                                  }, {
                                                    $set: updateEndTime
                                                  },
                                                    function(err, updateEndtime) {
                                                      if (err) {
                                                        return console.log(
                                                          "Error updating endtime raffle: " +
                                                          err
                                                        );
                                                      }
                                                      schedule.scheduleJob({
                                                        start: startTime,
                                                        end: endTime,
                                                        rule: "*/1 * * * * * "
                                                      },
                                                        function() {
                                                          db.collection(
                                                            "raffles"
                                                          ).findOne({
                                                            raffleid: req.body.productid
                                                          },
                                                            function(
                                                              err,
                                                              newRaffleResult
                                                            ) {
                                                              var raffleArray =
                                                                newRaffleResult.joined;

                                                              var randomWinner =
                                                                raffleArray[
                                                                Math.floor(m.random() * raffleArray.length)
                                                                ];

                                                              var UpdateWinner = {
                                                                winner: randomWinner,
                                                                drawn: "yes"
                                                              };
                                                              db.collection(
                                                                "raffles"
                                                              ).updateOne({
                                                                raffleid: req.body.productid
                                                              }, {
                                                                $set: UpdateWinner
                                                              },
                                                                function(
                                                                  err,
                                                                  raffleupdate
                                                                ) {
                                                                  db.collection(
                                                                    "raffles"
                                                                  ).findOne({
                                                                    raffleid: req.body.productid
                                                                  },
                                                                    function(
                                                                      err,
                                                                      newproductinfo
                                                                    ) {
                                                                      var uproduct = {
                                                                        winner: randomWinner,
                                                                        drawn: "yes"
                                                                      };
                                                                      db.collection(
                                                                        "products"
                                                                      ).updateOne({
                                                                        raffleid: req
                                                                          .body
                                                                          .productid
                                                                      }, {
                                                                        $set: uproduct
                                                                      },
                                                                        function(
                                                                          err,
                                                                          raffleupdate
                                                                        ) {
                                                                          db.collection(
                                                                            "users"
                                                                          ).findOne({
                                                                            _id: mongoose.Types.ObjectId(
                                                                              productresult.createdby
                                                                            )
                                                                          },
                                                                            function(
                                                                              err,
                                                                              sellerusersinfo
                                                                            ) {
                                                                              db.collection(
                                                                                "products"
                                                                              ).findOne({
                                                                                productid: req.body.productid
                                                                              },
                                                                                function(
                                                                                  err,
                                                                                  productinfo
                                                                                ) {
                                                                                  var sendproduct = mongoose.model(
                                                                                    "sendproduct",
                                                                                    sendproductschema
                                                                                  );

                                                                                  var trade = new sendproduct({
                                                                                    user: sellerusersinfo._id,
                                                                                    coins: productresult.price,
                                                                                    email: sellerusersinfo.email,
                                                                                    productid: productinfo._id,
                                                                                    buyer: newproductinfo.winner.id
                                                                                  });
                                                                                  trade
                                                                                    .save()
                                                                                    .then(
                                                                                      data => {
                                                                                        const msg = {
                                                                                          from: dbinfo.smtpfrom,
                                                                                          to: decrypt(sellerusersinfo.email),
                                                                                          subject: "Rafflestore Support - Product will be rolled",
                                                                                          html: '<h3>Hello, Your product will be rolled in 10 minutes.</h3> <p>Stay tuned for result</p> <br><br>Dear, <br> Rafflestore <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> '
                                                                                        };
                                                                                        sgMail.send(msg, (error, data) => {
                                                                                          if (error) {
                                                                                            res.send("Sorry, something happend. Please try again");
                                                                                            console.log(error);
                                                                                          } else {
                                                                                            res.json("success");
                                                                                          }
                                                                                        });
                                                                                      }
                                                                                    )
                                                                                    .catch(
                                                                                      err => {
                                                                                        console.log(
                                                                                          err
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );


                                                    }
                                                  );
                                                } else { }
                                              }
                                            );
                                          }
                                        );
                                      }
                                    }
                                  );
                                } else {
                                  var turnbackcoins = {
                                    coins: Number(result.coins) +
                                      Number(req.body.amount)
                                  };
                                  //coins for the user
                                  db.collection("users").updateOne({
                                    email: req.session.user
                                  }, {
                                    $set: turnbackcoins
                                  },
                                    function(err, userresult) {
                                      if (err) {
                                        res.send(
                                          "Sorry, an error happend and we could not add back youre coins. pleasae contact us at support@" +
                                          dbinfo.domain +
                                          "."
                                        );
                                      } else {
                                        res.send(
                                          "Sorry, you cant buy this amount of tickets for the product"
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            }
                          );
                        } else {
                          res.send(
                            'Sorry, you dont have enought coins. Do you want to <a class="addcoinsbtn">deposit?</a>'
                          );
                        }
                      }
                    );
                  }
                } else {
                  res.send(
                    "Sorry, you cant buy this amount of tickets for the product"
                  );
                }
              }
            );
          }
        }
      );
    }
  );
});

//information and GDPR
app.get("/information", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/information.vue",
              "utf-8"
            ),
            data: {
              username: user,
              domain: dbinfo.domain,
              userdata: result,
              coi: coins,
              login: login
            }
          });
          const context = {
            pagetitle: "Rafflestore",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.get("/about", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/about.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });

          const context = {
            pagetitle: "Rafflestore",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.get("/privacy", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/privacy.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });
          const context = {
            pagetitle: "Rafflestore",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.get("/terms", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync("./public/terms.vue", "utf-8"),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });

          const context = {
            pagetitle: "Rafflestore - Terms",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.get("/reportbug", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/reportbug.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });
          const context = {
            pagetitle: "Rafflestore - Report Bug",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };

          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});
app.post("/reportbug", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.body.email.length > 0 && req.body.message.length > 0) {
    const msg = {
      from: dbinfo.smtpfrom,
      to: "hello@emilpriver.com",
      subject: "Rafflestore bug",
      html: "<h3>Sent: " + req.body.email + "</h3> <p>" + req.body.message + "</p>  "
    };
    sgMail.send(msg, (error, data) => {
      if (error) {
        res.send("Sorry, something happend. Please try again");
      } else {
        res.send("Thank you, The report has been submitted");
      }
    });
  } else {
    res.send("Please fill in your mail or your message and try again");
  }
});

//contact

app.get("/contact", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/contact.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });

          const context = {
            pagetitle: "Rafflestore - Contact",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});
app.post("/contact", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.body.email.length > 0 && req.body.message.length > 0) {
    const msg = {
      from: dbinfo.smtpfrom,
      to: "support@rafflestore.com",
      headers: {
        "Reply-TO": req.body.email
      },
      subject: "Rafflestore contact",
      html: "<h3>Sent: " + req.body.email + "</h3> <p>" + req.body.message + "</p> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p>  "
    };
    sgMail.send(msg, (error, data) => {
      if (error) {
        res.send("Sorry, the mail was not sent");
      } else {
        res.send("Thank you, the message have been sent. We will reply soon");
      }
    });
  } else {
    res.send("Please fill in your mail or your message and try again");
  }
});
// Password reset
app.get("/passwordreset", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.query.token && req.query.email) {
    mongoose.connect(
      dburl, {
      useNewUrlParser: true
    },
      function(err, db) {
        db.collection("fpasswords").findOne({
          Token: req.query.token,
          Email: encrypt(req.query.email)
        },
          function(err, result) {
            if (result) {
              db.collection("users").findOne({
                email: encrypt(req.query.email)
              },
                function(err, result) {
                  if (req.session) {
                    if (req.session.user) {
                      var user = req.session.user;
                      var login = true;
                      var coins = result.coins;
                    } else {
                      var user = null;
                      var login = false;
                      var coins = 0;
                    }
                  } else {
                    var user = null;
                    var login = false;
                    var coins = 0;
                  }

                  var customer = new Vue({
                    template: require("fs").readFileSync(
                      "./public/customers/passwordreset.vue",
                      "utf-8"
                    ),
                    data: {
                      username: user,
                      coi: coins,
                      login: login,
                      token: req.query.token,
                      email: req.query.email,
                      domain: dbinfo.domain,
                      userdata: result
                    }
                  });
                  const context = {
                    pagetitle: "Rafflestore - Password Reset",
                    userdata: result,
                    login: login,
                    coi: coins,
                    domain: dbinfo.domain
                  };
                  renderer.renderToString(customer, context, (err, html) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    res.end(`${html}`);
                  });
                }
              );
            } else {
              res.redirect("/");
            }
          }
        );
      }
    );
  } else {
    res.redirect("/");
  }
});

//change password
app.post("/passwordreset", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("fpasswords").findOne({
        Email: encrypt(req.body.email),
        Token: req.body.token
      },
        function(err, result) {
          if (result) {
            db.collection("fpasswords").findOneAndDelete({
              Email: encrypt(req.body.email),
              Token: req.body.token
            },
              function(err, removedata) {
                if (removedata) {
                  var items = {
                    password: encrypt(req.body.password)
                  };
                  db.collection("users").updateOne({
                    email: encrypt(req.body.email)
                  }, {
                    $set: items
                  },
                    function(err, result) {
                      if (err) {
                        res.send("Sorry, error occured");
                      } else {
                        res.send("Your password has been reset.");
                      }
                    }
                  );
                } else {
                  res.send("cant update");
                }
              }
            );
          } else {
            res.send("No user");
          }
        }
      );
    }
  );
});
//send forgot password mail
app.post("/forgotpassword", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        email: encrypt(req.body.email)
      },
        function(err, result) {
          if (result) {
            var products = mongoose.model("fpasswords", fpassword);
            var form = req.body;
            var Passwordtoken = crypto.randomBytes(100).toString("hex");
            var token = new products({
              Token: Passwordtoken,
              Email: encrypt(req.body.email)
            });

            token.save(function(err, data) {
              if (err) {
                res.send(
                  "Sorry, there has been an error while sending a new password. Please contact the support"
                );
              } else {
                const msg = {
                  from: dbinfo.smtpfrom,
                  to: req.body.email,
                  subject: "Rafflestore Support - Forgot password",
                  html: '<h3>Hello, this is your link to reset your password:</h3> <a href="' +
                    dbinfo.domain +
                    "/passwordreset?token=" +
                    Passwordtoken +
                    "&email=" +
                    req.body.email +
                    '">' +
                    dbinfo.domain +
                    "/passwordreset?token=" +
                    Passwordtoken +
                    "&email=" +
                    req.body.email +
                    "</a><br><br> Dear, <br><b>RaffleStore Support</b>"
                };
                sgMail.send(msg, (error, data) => {
                  if (error) {
                    res.send("Sorry, Something happend, please try again");
                    console.log(error);
                  } else {
                    res.send("success");
                  }
                });
              }
            });
          } else {
            res.send("This mail dosen't exist");
          }
        }
      );
    }
  );
});

// Forgott password

app.get("/forgotpassword", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  //when you sending your email thrue the form
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/forgotpassword.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });
          const context = {
            pagetitle: "Rafflestore - Forgott Password",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.get("/withdraw", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }

          var customer = new Vue({
            template: require("fs").readFileSync(
              "./public/customers/soon.vue",
              "utf-8"
            ),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });
          const context = {
            pagetitle: "Rafflestore - Terms",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.get("/dice", soon, cunstruction, function(req, res) {
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          db.collection("products")
            .find({
              drawn: "no"
            })
            .toArray(function(err, raffles) {
              if (req.session) {
                if (req.session.user) {
                  var user = req.session.user;
                  var login = true;
                  var coins = result.coins;
                } else {
                  var user = null;
                  var login = false;
                  var coins = 0;
                }
              } else {
                var user = null;
                var login = false;
                var coins = 0;
              }
              var customer = new Vue({
                template: require("fs").readFileSync(
                  "./public/dice.vue",
                  "utf-8"
                ),
                data: {
                  username: user,
                  coi: coins,
                  login: login,
                  raffle: raffles,
                  domain: dbinfo.domain,
                  userdata: result
                }
              });
              const context = {
                pagetitle: "Rafflestore - Terms",
                userdata: result,
                login: login,
                coi: coins,
                domain: dbinfo.domain
              };
              renderer.renderToString(customer, context, (err, html) => {
                if (err) {
                  console.log(err);
                  return;
                }
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.json(`${html}`);
              });
            });
        }
      );
    }
  );
});

//show single product
app.get("/myproduct/:id", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("products").findOne({
        "winner.id": req.session.user,
        productid: req.params.id
      },
        function(err, result) {
          if (result) {
            db.collection("users").findOne({
              _id: mongoose.Types.ObjectId(result.createdby)
            },
              function(err, seller) {
                db.collection("users").findOne({
                  _id: mongoose.Types.ObjectId(req.session.user)
                },
                  function(err, userdata) {
                    if (req.session) {
                      if (req.session.user) {
                        var user = req.session.user;
                        var login = true;
                        var coins = userdata.coins;
                      } else {
                        var user = null;
                        var login = false;
                        var coins = 0;
                      }
                    } else {
                      var user = null;
                      var login = false;
                      var coins = 0;
                    }

                    var product = new Vue({
                      template: require("fs").readFileSync(
                        "./public/customers/pproduct.vue",
                        "utf-8"
                      ),
                      data: {
                        username: user,
                        coi: coins,
                        login: login,
                        domain: dbinfo.domain,
                        products: result,
                        seller: seller,
                        useremail: decrypt(seller.email),
                        userdata: userdata,
                        buyeraddress: decrypt(userdata.address.street),
                        buyerpostalcode: decrypt(userdata.address.postnumber),
                        buyercity: decrypt(userdata.address.city)
                      }
                    });

                    const context = {
                      pagetitle: "Rafflestore - My Product",
                      login: login,
                      coi: coins,
                      domain: dbinfo.domain
                    };
                    renderer.renderToString(product, context, (err, html) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                      res.end(`${html}`);
                    });
                  }
                );
              }
            );
          } else {
            res.redirect("/");
          }
        }
      );
    }
  );
});

app.post("/buyproduct", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("products").findOne({
        winner: req.session.user,
        productid: req.body.productid
      },
        function(err, result) {
          if (result) {
            var invoice = Math.floor(Math.random() * 1000000000);

            var create_payment_json = {
              intent: "sale",
              payer: {
                payment_method: "paypal"
              },
              redirect_urls: {
                return_url: dbinfo.domain + "/buyproduct",
                cancel_url: dbinfo.domain + "/myproduct/" + req.body.productid
              },
              transactions: [{
                item_list: {
                  items: [{
                    name: "item",
                    sku: "item",
                    price: result.price,
                    currency: "USD",
                    quantity: 1
                  }]
                },
                amount: {
                  currency: "USD",
                  total: result.price
                },
                description: "Payment for product at rafflestore for customer " +
                  req.body.email
              }]
            };

            paypal.payment.create(create_payment_json, function(
              error,
              payment
            ) {
              if (error) {
                res.redirect("/error=uknown");
                console.log(error);
              } else {
                db.collection("users").findOne({
                  _id: mongoose.Types.ObjectId(result.createdby)
                },
                  function(err, user) {
                    var transaction = mongoose.model(
                      "buyproductransactions",
                      BuyProductTransactions
                    );
                    var paypaldata = new transaction({
                      User: req.session.user,
                      PaymentID: payment.id,
                      price: result.price,
                      mail: user.mail,
                      forproduct: req.body.productid
                    });
                    paypaldata
                      .save()
                      .then(item => {
                        res.redirect(payment.links[1].href);
                      })
                      .catch(err => {
                        res.redirect(
                          "Sorry, error. Please contact the support"
                        );
                      });
                  }
                );
              }
            });
          } else {
            res.send("Error, please try again");
          }
        }
      );
    }
  );
});
/*
app.get('/buyproduct', (req, res) => {
  if (req.query.paymentId && req.query.token) {
    mongoose.connect(dburl,  {  }, function (err, db) {
      //get information from pending transactions
      db.collection("buyproductransactions").findOne({
        PaymentID: req.query.paymentId
      }, function (err, pendingtransactiondata) {
        //delete information from pending transactions
        db.collection("buyproductransactions").findOneAndDelete({
          PaymentID: encrypt(req.query.paymentId)
        }, function (err, removedata) {
          if (err) {
            res.redirect('/error=uknown')
          } else {
            if (pendingtransactiondata === "null") {
              res.redirect('/error=uknown');
              console.log("error adding payment for user" + decrypt(req.session.user) + " = " + err)
            } else {
              //transfer data to transactions map
              var transaction = mongoose.model("transaction", BuyProductTransactions);
              var transactionpaypal = new transaction({
                User: req.session.user,
                PaymentID: pendingtransactiondata.PaymentID,
                price: pendingtransactiondata.price,
                mail: pendingtransactiondata.mail,
                token: req.query.token,
                PayerID: req.query.PayerID,
                forproduct: pendingtransactiondata.forproduct
              })

              transactionpaypal.save()
                .then(item => {
                  db.collection("users").findOne({
                    _id: mongoose.Types.ObjectId(req.session.user)
                  }, function (err, userresult) {
                    if (err) {
                      res.redirect("/error=uknown")
                    } else {
                      db.collection("transactions").findOne({
                        PaymentID: req.query.paymentId
                      }, function (err, transa) {
                        db.collection("products").findOne({
                          productid: transa.forproduct
                        }, function (err, productitems) {
                          db.collection("products").updateOne({
                            productid: transa.forproduct
                          }, {
                            $set: {
                              payed: "true"
                            }
                          }, function (err, transactionsdeleted) {

                            const msg = {
                              from: dbinfo.smtpfrom,
                              to: decrypt(userresult.email),
                              subject: 'Rafflestore Support - Receipt',
                              html: '<h3>Hello,We have recived your payment for the product:  ' + productitems.productname + '</h3> <br><br><p>Product name: ' + productitems.productname + '</p><p>Price: ' + productitems.price + '</p><p>PaymentID: ' + transa.PaymentID + '</p><p>Billed to: ' + transa.mail + '</p><br><br> Dear, <br><b>RaffleStore Support</b>',
                            };
                            sgMail.send(msg, (error, data) => {
                              if (error) {
                                console.log(error);
                              } else {
                                res.redirect("/myproduct/" + req.body.productid)
                              }
                            });

                          });
                        });
                      });
                    }
                  });
                }).catch(err => {
                  res.redirect("/addproduct?error=uknown")
                  console.log("error saving payment = " + err)
                });
            }
          }
        })
      })
    });
  } else {
    res.redirect('/')
  }
}) */

app.get("/editproduct/:id", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("tobeaccepteds").findOne({
        createdby: req.session.user,
        _id: mongoose.Types.ObjectId(req.params.id)
      },
        function(err, result) {
          if (result) {
            db.collection("users").findOne({
              _id: mongoose.Types.ObjectId(req.session.user)
            },
              function(err, users) {
                if (req.session) {
                  if (req.session.user) {
                    var user = req.session.user;
                    var login = true;
                    var coins = users.coins;
                  } else {
                    var user = null;
                    var login = false;
                    var coins = 0;
                  }
                } else {
                  var user = null;
                  var login = false;
                  var coins = 0;
                }
                var product = new Vue({
                  template: require("fs").readFileSync(
                    "./public/customers/editproduct.vue",
                    "utf-8"
                  ),
                  data: {
                    username: user,
                    coi: coins,
                    login: login,
                    domain: dbinfo.domain,
                    products: result,
                    userdata: users,
                    useremail: decrypt(users.email),
                    selected: result.size,
                    condition: result.condition,
                    boughtfrom: result.boughtfrom,
                    category: result.category
                  }
                });
                const context = {
                  pagetitle: "Rafflestore - Edit product",
                  userdata: users,
                  login: login,
                  coi: coins,
                  domain: dbinfo.domain
                };
                renderer.renderToString(product, context, (err, html) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  res.end(`${html}`);
                });
              }
            );
          } else {
            res.redirect("/customer");
          }
        }
      );
    }
  );
});

app.post("/editproduct", auth, cunstruction, upload_cdn.array("images"), (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("tobeaccepteds").findOne({
        createdby: req.session.user,
        _id: mongoose.Types.ObjectId(req.body.productid)
      },
        function(err, data) {
          var imagesfiles = [];
          var i;
          var filenumber = 0;
          for (i = 0; i < data.images.length; i++) {
            if (!req.body.selectedimg[i] == 0) {
              imagesfiles.push("https://rafflestore.ams3.cdn.digitaloceanspaces.com/" + req.files[filenumber].key);
              filenumber = filenumber + 1;
            } else {
              imagesfiles.push(data.images[i]);
            }
          }
          let items = {
            images: imagesfiles,
            productname: req.body.productname,
            tickets: req.body.tickets,
            price: req.body.price,
            description: req.body.desc,
            createdby: req.session.user,
            ticketsbought: 0,
            thumbnail: imagesfiles[0],
            link: req.body.productname.replace(/ /g, "")
          };
          db.collection("tobeaccepteds").updateOne({
            createdby: req.session.user,
            _id: mongoose.Types.ObjectId(req.body.productid)
          }, {
            $set: items
          },
            function(err, result) {
              if (result) {
                res.send("success");
              } else {
                res.send("Error");
              }
            }
          );
        }
      );
    }
  );
});

app.get("/soldproduct/:id", cunstruction, auth, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("raffles").findOne({
        raffleproduct: req.params.id,
        raffleby: req.session.user
      },
        function(err, result) {
          db.collection("products").findOne({
            productid: result.raffleid
          },
            function(err, productdata) {
              db.collection("users").findOne({
                _id: mongoose.Types.ObjectId(result.winner.id)
              },
                function(err, buyeruser) {
                  if (result) {
                    db.collection("users").findOne({
                      _id: mongoose.Types.ObjectId(req.session.user)
                    },
                      function(err, signedinuser) {
                        if (req.session) {
                          if (req.session.user) {
                            var user = req.session.user;
                            var login = true;
                            var coins = signedinuser.coins;
                          } else {
                            var user = null;
                            var login = false;
                            var coins = 0;
                          }
                        } else {
                          var user = null;
                          var login = false;
                          var coins = 0;
                        }

                        if (buyeruser) {
                          var buyer_email = decrypt(buyeruser.email)
                          var buyer_address = decrypt(buyeruser.address.street)
                          var buyer_postal = decrypt(buyeruser.address.postnumber)
                          var buyer_city = decrypt(buyeruser.address.city)
                          var buyer = buyeruser
                          var buyername = buyer.fullname

                        } else {
                          var buyer_email = ''
                          var buyer_address = ''
                          var buyer_postal = ''
                          var buyer_city = ''
                          var buyer = buyeruser
                          var buyername = ''
                        }


                        var product = new Vue({
                          template: require("fs").readFileSync(
                            "./public/customers/soldproduct.vue",
                            "utf-8"
                          ),
                          data: {
                            domain: dbinfo.dbhost,
                            login: login,
                            userdata: signedinuser,
                            coi: signedinuser.coins,
                            product: productdata,
                            buyeremail: buyer_email,
                            buyeraddress: buyer_address,
                            buyerpostalcode: buyer_postal,
                            buyercity: buyer_city,
                            buyer: buyer,
                            buyername: buyername
                          }
                        });

                        const context = {
                          pagetitle: "Rafflestore - Sold Product",
                          userdata: signedinuser,
                          login: login,
                          coi: signedinuser.coins,
                          domain: dbinfo.domain
                        };

                        renderer.renderToString(
                          product,
                          context,
                          (err, html) => {
                            if (err) {
                              console.log(err);
                              return;
                            }
                            res.end(`${html}`);
                          }
                        );
                      }
                    );
                  } else {
                    res.redirect("/myproduct");
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

app.post("/soldproduct", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      var items = {
        trackingnumber: req.body.trackingnumber
      };
      db.collection("products").updateOne({
        createdby: req.session.user,
        productid: req.body.productid
      }, {
        $set: items
      },
        function(err, result) {
          if (result) {
            res.json("Tracking number updated");
          } else {
            res.json("Error");
          }
        }
      );
    }
  );
});

app.post("/deleteproduct", cunstruction, (req, res) => {
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("products").findOne({
        productid: req.body.productid,
        createdby: req.session.user
      },
        function(err, product) {
          console.log(product)
          if (product) {
            db.collection("raffles").findOne({
              raffleid: product.productid
            },
              function(err, raffle) {
                //give back data to people who joined

                var joinedUsers = [];
                if (raffle.joined.length > 0) {
                  raffle.joined.forEach(element => {
                    db.collection("users").findOne({
                      _id: mongoose.Types.ObjectId(element.id)
                    },
                      function(err, user) {
                        let returnCoins = {
                          coins: Math.ceil(
                            Number(user.coins) + Number(product.ticketprice)
                          )
                        };
                        db.collection("user").updateOne({
                          _id: mongoose.Types.ObjectId(element.id)
                        }, {
                          $set: {
                            returnCoins
                          }
                        },
                          function(err, user) { }
                        );
                      }
                    );
                  });
                }

                //find the users who bought tickets and send mail

                db.collection("users")
                  .find({
                    $in: joinedUsers
                  })
                  .toArray(function(err, usersWhoJoined) {
                    if (joinedUsers.length > 0) {
                      if (usersWhoJoined.length > 0) {
                        usersWhoJoined.forEach(user => {
                          const msg = {
                            from: dbinfo.smtpfrom,
                            to: decrypt(user.email),
                            subject: "Rafflestore - Product deletd",
                            html: "<h3>Hello, product " +
                              product.productname +
                              " have been deleted by its owner </h3><br><br><p>Your coins have been added back to your account.</p><br><br><p>Dear,<br>Rafflestore</p> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p> "
                          };

                          sgMail.send(msg, (error, data) => {
                            if (error) {
                              console.log(error);
                            }
                          });
                        });
                      }
                    }
                  });

                //delete product
                db.collection("products").findOneAndDelete({
                  productid: product.productid
                },
                  function(err, data) {
                    if (data) {
                      res.status(200).send("success");
                    } else {
                      console.log(err);
                      res.send("error");
                    }
                  }
                );
              }
            );
          }
        }
      );
    }
  );
});

app.post("/reputation", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("products").findOne({
        _id: mongoose.Types.ObjectId(req.body.productid)
      },
        function(err, findproduct) {
          if (findproduct) {
            db.collection("users").findOne({
              _id: mongoose.Types.ObjectId(findproduct.createdby)
            },



              function(err, user) {
                var repusers = [user.reputation.users];
                if (repusers.includes(req.session.user) == false) {
                  repusers.push(req.session.user);
                  if (typeof req.body.rate_thumbs_up != "undefined") {
                    console.log('1')
                    var updateuser = {
                      reputation: {
                        god: Number(user.reputation.god) + Number(1),
                        bad: user.reputation.bad,
                        users: repusers
                      }

                    };
                  } else if (typeof req.body.rate_thumbs_down != "undefined") {
                    console.log('2')
                    var updateuser = {
                      reputation: {
                        god: user.reputation.god,
                        bad: Number(user.reputation.bad) - Number(1),
                        users: repusers
                      }

                    };
                  } else {
                    console.log('3')
                    var updateuser = {
                      reputation: {
                        god: user.reputation.god,
                        bad: user.reputation.bad,
                        users: user.reputation.users
                      }


                    };
                  }
                } else {
                  var updateuser = {
                    reputation: {
                      god: user.reputation.god,
                      bad: user.reputation.bad,
                      users: user.reputation.users
                    }
                  };
                }

                db.collection("users").updateOne({
                  _id: mongoose.Types.ObjectId(findproduct.createdby)
                }, {
                  $set: updateuser
                },
                  function(err, result) {
                    if (findproduct.status === "no") {
                      var productupdate = {
                        status: req.body.projectdone
                      };
                    } else {
                      var productupdate = {
                        status: "no"
                      };
                    }
                    db.collection("products").updateOne({
                      _id: mongoose.Types.ObjectId(req.body.productid)
                    }, {
                      $set: productupdate
                    },
                      function(err, result) {

                        if (err) {
                          res.send("Error");
                        } else {

                          if (findproduct.status == 'no') {
                            db.collection("sendproducts").findOne({
                              productid: req.body.productid
                            },
                              function(err, sendproductdata) {



                                if (sendproductdata) {

                                  db.collection("users").findOne({
                                    _id: mongoose.Types.ObjectId(findproduct.winner.id)
                                  },
                                    function(err, winner_update) {


                                      db.collection("users").updateOne({
                                        _id: mongoose.Types.ObjectId(findproduct.winner.id)
                                      }, {
                                        $set: {
                                          raffleswon: Number(winner_update.raffleswon) + 1
                                        }
                                      },
                                        function(err, userupdatedinfo) {

                                        })
                                    })


                                  db.collection("users").findOne({
                                    _id: mongoose.Types.ObjectId(sendproductdata.user)
                                  },
                                    function(err, updateusersnewdata) {

                                      if (updateusersnewdata.rafflesold
                                        .total) {
                                        var total_sold = updateusersnewdata.rafflesold
                                          .total
                                      } else {
                                        var total_sold = 0
                                      }

                                      var updateUsersWithMoreInformation = {
                                        coins: Number(updateusersnewdata.coins) +
                                          Number(sendproductdata.coins),
                                        rafflesold: {
                                          total: total_sold + 1,
                                          users: [
                                            updateusersnewdata.rafflesold.users
                                          ].push(req.session.user)
                                        }
                                      };

                                      db.collection("users").updateOne({
                                        _id: mongoose.Types.ObjectId(
                                          sendproductdata.user
                                        )
                                      }, {
                                        $set: updateUsersWithMoreInformation
                                      },
                                        function(err, userupdatedinfo) {
                                          if (err) {
                                            res.send(
                                              "Sorry, something wrong happend, please contact the support"
                                            );
                                          } else {
                                            const msg = {
                                              from: dbinfo.smtpfrom,
                                              to: decrypt(
                                                sendproductdata.email
                                              ),
                                              subject: "Rafflestore - Product marked as done",
                                              html: "<h3>Hello, you product has been marked as done by buyer </h3> <br><br> <p>Your coins payout have been added to your account</p> <br><br> <p>Dear, <br>Rafflestore</p> <br><br><p>You can not reply to this mail, please contact us at support@rafflestore.com</p>"
                                            };

                                            sgMail.send(msg, (error, data) => {
                                              if (error) {
                                                res.send(
                                                  "Sorry, something happend. Please try again"
                                                );
                                              } else {
                                                res.send(
                                                  "Thank you, The product have been marked as done"
                                                );
                                              }
                                            });
                                          }
                                        }
                                      );
                                    }
                                  );
                                } else {
                                  res.send("No product found");
                                }
                              }
                            );
                          } else {
                            res.send("Product updated");
                          }
                        }
                      }
                    );
                  }
                );
              }
            );
          } else {
            res.send("Sorry, an error accoured");
          }
        }
      );
    }
  );
});

//subscribe
app.post("/subscribe", cunstruction, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      if (req.body.email) {
        db.collection("themesettings").find({}, function(err, result) {
          var subs = [result.newsletters];
          if (subs.includes(req.body.email) == false) {
            subs.push(req.body.email);
          }
          var items = {
            newsletters: subs
          };
          db.collection("themesettings").update({}, {
            $set: items
          },
            function(err, updated) {
              if (err) {
                res.send("Sorry, something happend. Please try again");
              } else {
                res.send("success");
              }
            }
          );
        });
      } else {
        res.send("Please add your email");
      }
    }
  );
});

//nothing under this
app.get("*", cunstruction, function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  mongoose.connect(
    dburl, {
    useNewUrlParser: true
  },
    function(err, db) {
      db.collection("users").findOne({
        _id: mongoose.Types.ObjectId(req.session.user)
      },
        function(err, result) {
          if (req.session) {
            if (req.session.user) {
              var user = req.session.user;
              var login = true;
              var coins = result.coins;
            } else {
              var user = null;
              var login = false;
              var coins = 0;
            }
          } else {
            var user = null;
            var login = false;
            var coins = 0;
          }
          const context = {
            pagetitle: "Rafflestore",
            userdata: result,
            login: login,
            coi: coins,
            domain: dbinfo.domain
          };

          var customer = new Vue({
            template: require("fs").readFileSync("./public/404.vue", "utf-8"),
            data: {
              username: user,
              coi: coins,
              login: login,
              domain: dbinfo.domain,
              userdata: result
            }
          });
          renderer.renderToString(customer, context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            res.end(`${html}`);
          });
        }
      );
    }
  );
});

app.listen(dbinfo.port, () =>
  console.log("Listening to port " + dbinfo.port + "!")
);
