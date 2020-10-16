const express = require('express');

function message(req) {
    return (msg, type) => {
        type = type || 'info';
        let sess = req.session;
        sess.messages = sess.messages || [];
        sess.messages.push({type: type, string: msg});
    };
};

module.exports = (req, res, next) => {
    res.message = message(req); //хранение сообщений сеанса

    res.error = (msg) => {
        return res.message(msg, 'error');
    };

    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = () => { //удаление сообщений из сеанса
        req.session.messages = [];
    };
    next();
};