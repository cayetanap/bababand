const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        required: 'Band needs a title'
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    locations: [
        {
            lat: {
                type: Number,
                required: true
            },
            long: {
                type: Number,
                required: true
            },
            datetime: Date
        }
    ]
}, {timestamps: true});

const Band = mongoose.model('Band', bandSchema);
module.exports = Band;