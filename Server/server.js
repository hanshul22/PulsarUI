const express = require('express');
require("dotenv").config();
const app = express();
const cors = require('cors');
const PORT = 500;
const ConnectToDB = require('./config/dbconnect');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const userdb = require('./model/user.Schema');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/admin.routes');
const admincodes = require('./routes/admincodes.routes');
const usercodes = require('./routes/usercodes.routes');
const cookieParser = require('cookie-parser');

const clientid = process.env.CLIENTID;
const clientsecret = process.env.CLINTSECRET;
const sessionKey = process.env.SESSIONKEY;

ConnectToDB();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002","http://localhost:3003","http://localhost:3004","http://localhost:3005","http://localhost:3006","http://localhost:3200"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy(
        {
            clientID: clientid,
            clientSecret: clientsecret,
            callbackURL: "/auth/google/callback",
            scope: ["email", "profile"]
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userdb.findOne({ googleId: profile.id });
                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value,
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userdb.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

app.get('/', (req, res) => {
    res.send("The server is running!");
});
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/admin', admincodes);
app.use('/api/user', usercodes);

app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/login",
}));

app.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "Login Success", user: req.user });
    } else {
        res.status(401).json({ message: "Not Authorized" });
    }
});

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('http://localhost:3000/login');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
