import express from 'express';

const sessionRouter = express.Router();
import allSessions from '../data/sessions.json' assert {type: 'json'};


sessionRouter.route('/')
    .get((req, res) => {
        res.render("sessions", {
            sessions: allSessions
        });
    })

sessionRouter.route('/:id')
    .get((req, res) => {
        res.render("session", {
            session: allSessions[req.params.id]
        });
    })
export default sessionRouter;