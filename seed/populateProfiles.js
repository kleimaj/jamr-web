module.exports = [
    {
        artistName: 'Jacob',
        instruments: ['Bass'],
        genres: ['Funk'],
        location: [37.805408, -122.436301],
    },
    {
        artistName: 'Eddie',
        genres: ['Latin'],
        instruments: ['Guitar'],
        location: [37.824499,-122.371394],
    },
    {
        artistName: 'Kesha',
        instruments: ['Vocals'],
        genres: ['Rock'],
        location: [37.78,-122.44],
    }
]

// const ProfileSchema = new mongoose.Schema({
//     artistName: {
//         required: true,
//         type: String,
//         minlength: 3,
//         maxlength: 50,
//     },
//     UserRef: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     instruments: {
//         type: [String],
//         min: 0,
//         max: 3
//     },
//     genres: {
//         type: [String],
//         min: 0,
//         max: 3,
//     },
//     bio: {
//         type: String,
//         minlength: 0,
//         maxlength: 100
//     },
//     image: {
//         type: String
//     },
//     location: {
//         type: [String],
//         min: 2,
//         max: 2,
//     }
// });
