require('dotenv').config()
const passport = require('passport')
const GitHubStrat = require('passport-github2').Strategy
const User = require("../models/User")

passport.use(
    new GitHubStrat(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            // making sure to add a scop for email 
            scope: ['user:email']
        },
        async (acessToken, refreshToken, profile, done) => {
            try {
                // find the email and verify it 
                const email = profile.emails?.[0]?.value
                if (!email) {
                    return done(new Error("No emailassociated with this github account"))

                }
                // finds the user by the email
                const user = User.findOne({ email })
                // check if the user exist 
                if (user) {
                    if (!user.githubId) {
                        user.githubId = profile.id
                        await user.save()
                    }
                    return done(null, user)
                }
                const newUser = new User({
                    email,
                    githubId: profile.id,
                    username: profile.username
                })
                done(null, newUser)

            } catch (error) {
                done(error)
            }
        }
    )
)



module.exports = passport