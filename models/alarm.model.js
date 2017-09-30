const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        required: 'Alarm needs a title'
    },
    position: {
        lat: {
            type: Number,
            required: [true, 'Alarm needs a position']
        },
        long: {
            type: Number,
            required: [true, 'Alarm needs a long']
        }
    },
    dateRange: {
        start: {
            type: Date,
            required: [true, 'Alarm needs a start date']
        },
        end: {
            type: Date,
            required: [true, 'Alarm needs a end date']
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Alarm = mongoose.model('Alarm', alarmSchema);
module.exports = Alarm;