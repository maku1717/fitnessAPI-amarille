const Workout = require("../models/Workout");
const User = require("../models/User");
const { errorHandler } = require("../auth");

module.exports.createWorkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, duration } = req.body;

    if (!name || !duration) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (typeof duration !== "string") {
      return res.status(400).send({ message: "Duration must be a string" });
    }

    const newWorkout = new Workout({
      userId,
      name: name,
      duration: duration,
    });

    await newWorkout.save();
    return res.status(201).send({ newWorkout });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.getWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;

    const workouts = await Workout.find({ userId });

    return res.status(200).send({ workouts });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.updateWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    const workoutId = req.params.workoutId;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      { name, duration },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).send({ message: "Workout not found" });
    }

    return res.status(200).send({
      message: "Workout updated successfully",
      updatedWorkout,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;

    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
      return res.status(404).send({ message: "Workout not found" });
    }

    return res.status(200).send({ message: "Workout deleted successfully" });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports.completeStatus = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      { status: "completed" },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).send({ message: "Workout not found" });
    }

    return res.status(200).send({
      message: "Workout status updated successfully",
      updatedWorkout,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
