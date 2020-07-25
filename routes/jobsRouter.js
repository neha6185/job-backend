const express = require('express');
const bodyParser = require('body-parser');
const Job = require('../models/job');

const jobsRouter = express.Router();

jobsRouter.use(bodyParser.json());

jobsRouter.route('/')
.get((req, res,next) => {
    Job.find()
    .then(job =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
    })
    .catch(err => next(err));
})
.post((req, res,next) => {
    Job.Create(req.body)
    .then(job =>{
        console.log('Job Created',job);
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(job);
    })
    .catch(err =>next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /jobs');
})
.delete((req, res,next) => {
    Job.deleteMany()
    .then(response =>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(response);
    })
    .catch(err => next(err));
    });
jobsRouter.route('/:jobsId')
.get((req, res,next) => {
    Job.findById(req.params.jobId)
    .then(job =>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(job);
    })
    .catch(err =>next(err));
   })
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST opertion not supported on /jobs/${req.params.jobId}`);
})
.put((req, res,next) => {
    Job.findByIdAndUpdate(req.params.jobId, {
        $set: req.body
    }, { new: true })
    .then(job => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    })
    .catch(err => next(err));
   })
.delete((req, res,next) => {
    Job.findByIdAndDelete(req.params.jobId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});




module.exports = jobsRouter;