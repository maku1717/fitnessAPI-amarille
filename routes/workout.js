const express = require("express");
const workoutController = require("../controllers/workout");
const { verify } = require("../auth");

const router = express.Router();

router.post("/addWorkout", verify, workoutController.createWorkout);

router.get("/getMyWorkouts", verify, workoutController.getWorkouts);

router.patch(
  "/updateWorkout/:workoutId",
  verify,
  workoutController.updateWorkout
);

router.delete(
  "/deleteWorkout/:workoutId",
  verify,
  workoutController.deleteWorkout
);

router.patch(
  "/completeWorkoutStatus/:workoutId",
  verify,
  workoutController.completeStatus
);

module.exports = router;
