module.exports = [
    {
        artistName: 'Jessica',
        instruments: ['Guitar'],
        genres: ['Funk'],
        location: [37.805408, -122.436301],
    },
    {
        artistName: 'Eddie',
        genres: ['Latin'],
        instruments: ['Skin Flute'],
        location: [37.824499,-122.371394],
    },
    {
        artistName: 'Kesha',
        instruments: ['Bass'],
        genres: ['Rock'],
        location: [37.78,-122.44],
    },
    {
        artistName: 'Lia',
        instruments: ['Violin'],
        genres: ['Classical'],
        location: [37.775504, -122.421955]
    },
    {
        artistName: 'Pimp Juice',
        instruments: ['Panini'],
        genres: ['Gangsta Rap'],
        bio: 'Check out my new single! https://youtu.be/oHg5SJYRHA0',
        location :[37.826485, -122.422536]
    },  
    {
        artistName: 'James',
        instruments: ['Guitar'],
        genres: ['Rock'],
        location: [37.352832, -121.895824],
    },
    {
        artistName: 'Mickey',
        instruments: ['Drums'],
        genres: ['Rock'],
        location: [ 37.771216, -122.432538],
    },
    {
        artistName: 'Holden',
        instruments: ['Drums'],
        genres: ['Rock'],
        location: [ 37.713902, -122.408784],
    },
    {
        artistName: 'Lacey',
        instruments: ['Piano'],
        genres: ['Jazz'],
        location: [ 37.692445, -122.462943],
    },
    {
        artistName: 'Shelley',
        instruments: ['Acoustic'],
        genres: ['Alternative'],
        location: [ 37.775670, -122.397669],
    },
    {
        artistName: 'Max',
        instruments: ['Samples / DJ'],
        genres: ['Hip Hop'],
        location: [ 37.663030, -122.435477],
    },
    {
        artistName: 'Riley',
        instruments: ['Samples / DJ'],
        genres: ['Hip Hop'],
        location: [ 37.776956, -122.485945],
    },
    {
        artistName: 'Zepp',
        instruments: ['Bass'],
        genres: ['Jazz'],
        location: [ 37.804242, -122.446554],
    },
    {
        artistName: 'Andrew',
        instruments: ['Bass'],
        genres: ['Alternative'],
        location: [ 37.828653, -122.371538],
    },
    {
        artistName: 'Christian',
        instruments: ['Guitar'],
        genres: ['Alternative', 'Acoustic'],
        location: [37.750070, -122.502946],
    },
    {
        artistName: 'Kris',
        instruments: ['Bass'],
        genres: ['Alternative', 'Hip Hop'],
        location: [37.810527, -122.286474],
    },
    {
        artistName: 'Cat',
        instruments: ['Bass'],
        genres: ['Alternative', 'Hip Hop'],
        location: [37.865671, -122.271625],
    }
]

// More lat and long
// 37.352832, -121.895824
// 37.771216, -122.432538
// 37.713902, -122.408784
// 37.692445, -122.462943
// 37.775670, -122.397669
// 37.663030, -122.435477
// 37.776956, -122.485945
// 37.804242, -122.446554
// 37.828653, -122.371538
// 37.750070, -122.502946
// 37.810527, -122.286474
// 37.865671, -122.271625

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
