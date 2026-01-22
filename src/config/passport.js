const passport = require('passport')
const GitHubStrat = require('passport-github2').Strategy
const User = require("../models/User")

passport.use(
    new GitHubStrat(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (acessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findone({ githubId: profile.id })
                if (existingUser) return done(null, existingUser)
                const newUser = new User({
                    githubId: profile.id,
                    username: profile.username,
                    email: profile.email[0].value
                })
                await newUser.save()
                done(null, newUser)
            } catch (error) {
                document(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => done(error, user))
})