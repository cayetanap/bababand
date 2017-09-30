const express = require('express');
const User = require('../models/user.model');
const Band = require('../models/band.model');
const Alarm = require('../models/alarm.model');


module.exports.getAll = (req, res, next) => {
    Band.find({user: req.user._id})
        .then(bands => res.status(200).json(bands))
        .catch(err => next(err));
};

module.exports.get = (req, res, next) => {
    Band.find({_id: req.params.id, user: req.user._id})
        .then(bands => res.status(200).json (bands))
        .catch(err => next(err));
};

module.exports.create = (req, res, next) => {
    const band = req.body;
    band.user = req.user._id;

    Band.create(band)
        .then(list => res.status(201).json(list))
        .catch(err => next(err));
};

module.exports.delete = (req, res, next) => {
    Band.delete({_id: req.params.id, user: req.user._id})
        .then(removed => {
        if (removed.result.n > 0) {
            res.status(204).json();
        } else {
            res.status(404).json();
        }
        })
        .catch(err => next(err));
};

module.exports.addLocation = (req, res, next) => {
    const location = req.body;
    location.datetime = new Date();

    Band.findOneAndUpdate({_id: req.params.id, user: req.user._id},
    {$push: { locations: location }}, 
    {new: true})
        .then(band => {
            if (!band) {
                res.status(404).json();
            } else {
                Alarm.find({
                    'dateRange.start': { $gte: Date(location.datetime)},
                    'dateRange.end': { $lte: Date(location.datetime) }
                }).then(alarms => {
                    console.log(alarms);
                }).catch(err => next(err));
                res.status(200).json(band);
            }
        }).catch(err => next(err));
}