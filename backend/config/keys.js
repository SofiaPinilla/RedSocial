module.exports = {
    MONGO_URI: 'mongodb+srv://secretProject:123bta@clusterbta-tuqrv.mongodb.net/test?retryWrites=true&w=majority',
    jwt_secret: "123bta",
    GMAIL: {
        user: "btabeyondthearmy@gmail.com",
        pass: "maitesofialovebts"
    },
    API_URL: process.env.NODE_ENV === 'production' ? 'https://apibta.herokuapp.com/' : 'http://localhost:3000/',
    FRONT_URL: process.env.NODE_ENV === 'production' ? 'https://beyondthearmy.herokuapp.com/' : 'http://localhost:4200/',
}