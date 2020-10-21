const auth = require('basic-auth');
const express = require('express');
const User = require('../models/users');

exports.auth = (req, res, next) => {
    const {name, pass} = auth(req);
    User.authenticate(name, pass, (err, user) => {
        if(user) req.remoteUser = user;
        next(err);
    });
};