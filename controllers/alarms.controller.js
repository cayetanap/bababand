const express = require('express');
const User = require('../models/user.model');
const Alarm = require('../models/alarm.model');

module.exports.getAll = (req, res, next) => {
 Alarm.find({user: req.user._id})
        .then(alarms => res.status(200).json(bands))
        .catch(err => next(err));
};

module.exports.get = (req, res, next) => {
Alarms.find({_id: req.params.id, user: req.user._id})
        .then(alarms => res.status(200).json (bands))
        .catch(err => next(err));
};

module.exports.create = (req, res, next) => {
    const alarm = req.body;
    alarm.user = req.user._id;

    Alarm.create(alarm)
        .then(alarm => res.status(201).json(alarm))
        .catch(err => next(err));
};


module.exports.delete = (req, res, next) => {
Alarm.delete({_id: req.params.id, user: req.user._id})
        .then(removed => {
        if (removed.result.n > 0) {
            res.status(204).json();
        } else {
            res.status(404).json();
        }
        })
        .catch(err => next(err));
};