const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const getWorkouts = (req, res) => {
    Workout.find().sort({createdAt: -1})
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err))
}

const createWorkout = (req, res) => {
    const workout = new Workout(req.body)
    workout.save()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err))
}

const getWorkout = (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: "no such workout"})
    }

    Workout.findById(id)
        .then(response => {
            if (!response) {
                return res.status(400).json({mssg: "no such workout"})
            }
            res.status(200).json(response)
        })
}

const deleteWorkout = (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: "no such workout"})
    }

    Workout.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(400).json({mssg: "no such workout"})
            }
            res.status(200).json(response)
        })
}

const updateWorkout = (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({mssg: "no such workout"})
    }

    Workout.findByIdAndUpdate(id, {...req.body})
        .then(response => {
            if (!response) {
                return res.status(400).json({mssg: "no such workout"})
            }
            res.status(200).json(response)
        })   
}

module.exports = {
    getWorkouts,
    createWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
}