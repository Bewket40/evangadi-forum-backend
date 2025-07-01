import {
  askquestion,
  editQuestion,
  deleteQuestion,
  getAllQuestions,
  getSingleQuestion,
} from "../controller/questionController.js";

import authMiddleware from "../middleware/auth.js";
import express from "express";

const router = express.Router(); //create new router object


// Insert question - Only logged-in users
router.post("/", authMiddleware, askquestion);

router.patch("/:question_id", authMiddleware, editQuestion);

// Delete question - Only logged-in users
router.delete("/:question_id", authMiddleware, deleteQuestion);


//all question route
router.get("/", authMiddleware, getAllQuestions);

//get a question by id
router.get("/:question_id",authMiddleware, getSingleQuestion);

// DELETE route for deleting a question
// router.delete('/:question_id', authMiddleware, deleteQuestion )



export default router;


// import {
//   askquestion,
//   editQuestion,
//   deleteQuestion,
//   getAllQuestions,
//   getSingleQuestion,
// } from "../controller/questionController.js";

// import authMiddleware from "../middleware/auth.js";
// import express from "express";

// const router = express.Router(); // Create a new router object

// // Ask a new question (only for authenticated users)
// router.post("/", authMiddleware, askquestion);

// // Edit a question by ID
// router.patch("/:question_id", authMiddleware, editQuestion);

// // Delete a question by ID
// router.delete("/:question_id", authMiddleware, deleteQuestion);

// // Get all questions
// router.get("/", authMiddleware, getAllQuestions);

// // Get a specific question by ID
// router.get("/:question_id", authMiddleware, getSingleQuestion);

// export default router;
