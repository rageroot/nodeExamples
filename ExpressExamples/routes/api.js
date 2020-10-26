const auth = require('basic-auth');
const express = require('express');
const User = require('../models/users');
const Entry = require('../models/entry');

exports.auth = (req, res, next) => {
   /* const {name, pass} = auth(req);
    User.authenticate(name, pass, (err, user) => {
        if(user) req.remoteUser = user;
        next(err);
    });*/
    req.remoteUser = auth(req);
    next();
};

exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if(err) return next(err);
        if(!user.id) return res.sendStatus(404);
        res.json(user);
    })
};

exports.entries = (req, res, next) => {
    const page = req.page; //номер страницы из запроса
    Entry.getRange(page.from, page.to, (err, entries) => {
        if(err) return next(err);

        res.format({ //отвечает по разному, в зависимости от значения заголовка Accept
            json: () => { //ответ JSON
                res.send(entries);
            },

            xml: () => { //ответ XML
                res.render('entries/xml', {entries: entries});

                 /* res.write('<entries>\n');
                  entries.forEach((entry) => {
                      res.write(`
                        <entry>
                        <title>${entry.title}</title>
                        <body>${entry.username}</body>
                        <username>${entry.username}</username>
                        </entry>                      `
                      );
                  });
                  res.end('</entries>');*/
            }
        });
    });
};