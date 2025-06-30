import { StatusCodes } from "http-status-codes";
import pool from "../config/databaseConfig.js"; // DB connection

// ✅ 1. Post a new question
export async function askquestion(req, res) {
  const { title, question, description, tag } = req.body;
  const userId = req.user.user_id;

  // Check if all required fields are present
  if (!title || !question || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      status: 400,
      error: "Please provide all required fields.",
      msg: "Title, Question, and Description are required.",
    });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO questions (user_id, title, question, description, tag) VALUES (?, ?, ?, ?, ?)",
      [userId, title, question, description, tag || null]
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      status: 201,
      question_id: result.insertId,
      msg: "Question posted successfully!",
    });
  } catch (error) {
    console.error("Insert error:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to post question. Please try again later.",
      msg: "Something went wrong, try again.",
    });
  }
}

// ✅ 2. Edit a question
export async function editQuestion(req, res) {
  const { question_id } = req.params;
  const { title, question, description, tag } = req.body;
  const timestamp = new Date();

  if (!title || !question || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Missing required fields",
      msg: "Title, Question, and Description are required.",
    });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE questions SET title = ?, question = ?, description = ?, tag = ?, time = ? WHERE question_id = ?`,
      [title, question, description, tag || null, timestamp, question_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`No question found with ID ${question_id}`);
    }

    res.status(StatusCodes.OK).json({
      msg: "Question updated successfully.",
    });
  } catch (err) {
    console.error("Edit error:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Failed to update question.");
  }
}

// ✅ 3. Delete a question
export async function deleteQuestion(req, res) {
  const { question_id } = req.params;

  try {
    const [result] = await pool.execute(
      `DELETE FROM questions WHERE question_id = ?`,
      [question_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`No question found with ID ${question_id}`);
    }

    res.json({ msg: "Question deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Failed to delete question.");
  }
}

// ✅ 4. Get all recent questions
export async function getAllQuestions(req, res) {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        q.question_id, 
        q.title, 
        q.time,
        q.user_id,
        u.username 
      FROM questions q
      JOIN users u ON q.user_id = u.user_id
      ORDER BY q.question_id DESC
      LIMIT 10
    `);

    res.status(StatusCodes.OK).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Fetch all questions error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: "Failed to retrieve questions.",
    });
  }
}

// ✅ 5. Get a single question with user info
export const getSingleQuestion = async (req, res) => {
  const { question_id } = req.params;

  try {
    const [result] = await pool.execute(
      `SELECT q.*, u.username, u.first_name, u.last_name
       FROM questions q
       JOIN users u ON q.user_id = u.user_id
       WHERE q.question_id = ?`,
      [question_id]
    );

    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: "Question not found",
      });
    }

    const [data] = result;

    res.status(StatusCodes.OK).json({
      success: true,
      status: 200,
      message: "Question retrieved successfully.",
      question: {
        question_id: data.question_id,
        title: data.title,
        question: data.question,
        description: data.description,
        tag: data.tag,
        time: new Date(data.time).toISOString(),
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });
  } catch (error) {
    console.error("Fetch single question error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Unable to retrieve question.",
    });
  }
};




// import { StatusCodes } from "http-status-codes";
// import pool from "../config/databaseConfig.js"; // DB connection

// // post question into the database/questions submissions/
// export async function askquestion(req, res) {
//   const { title, description, tag } = req.body;
//   const userId = req.user.user_id;

//   // Validates input: if required fields are missing, it sends back a 400 Bad Request error.
//   if (!title || !description) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       success: false,
//       status: 400,
//       error: "Please Provide all the required fields.",
//       msg: "Title question and Description are required.",
//     });
//   }


//   try {
//     const result = await pool.execute(
//       "INSERT INTO questions (user_id, title, description, tag) VALUES (?, ?, ?, ?)",
//       [userId, title, description, tag || null]
//     );

//     //success response
//     res.status(StatusCodes.CREATED).json({
//       success: true,
//       status: 201,
//       question_id: result[0].insertId,
//       msg: "Question posted successfully!",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: "Failed to post question. Please try again later",
//       msg: "Something went wrong, try again.",
//     });
//   }
// }

// // Edit question
// export async function editQuestion(req, res) {
//   const question_id = req.params.question_id;
//   const { title, description, tag } = req.body;
//   const timestamp = new Date();

//   if (!description || !title) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .send("Title and Description are required.");
//   }

//   const updateQuery = `
//     UPDATE questions 
//     SET title = ?, description = ?, tag = ?, time = ?
//     WHERE question_id = ?
//   `;

//   try {
//     const [result] = await pool.execute(updateQuery, [
//       title,
//       description,
//       tag || null,
//       timestamp,
//       question_id,
//     ]);

//     if (result.affectedRows === 0) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .send(`No question with id ${question_id}`);
//     } else {
//       return res.json({ msg: "Question updated successfully." });
//     }
//   } catch (err) {
//     console.error("Failed to update question:", err.message);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send("Failed to update question");
//   }
// }


// // Delete question
// export async function deleteQuestion(req, res) {
//   const question_id = req.params.question_id;

//   const deleteQuery = `DELETE FROM questions WHERE question_id = ?`;

//   try {
//     const [result] = await pool.execute(deleteQuery, [question_id]);

//     if (result.affectedRows === 0) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .send(`No question with id ${question_id}`);
//     } else {
//       return res.json({ msg: "Question deleted successfully." });
//     }
//   } catch (err) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
//   }
// }

// export async function getAllQuestions(req, res) {
//   try {
//     const [rows] = await pool.execute(`
//       SELECT 
//         q.question_id, 
//         q.title, 
//         q.time, 
//          q.user_id,   
//         u.username 
//       FROM 
//         questions q
//       JOIN 
//         users u ON q.user_id = u.user_id
//       ORDER BY 
//         q.question_id DESC
//       LIMIT 10
//     `);

//     res.status(200).json({
//       success: true,
//       count: rows.length,
//       data: rows,
//     });

//     console.log("Retrieved:", rows);
//   } catch (error) {
//     console.error("Get all questions error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: "Failed to retrieve questions. Please try again later",
//     });
//   }
// }

// export const getSingleQuestion = async (req, res) => {
//   const { question_id } = req.params;

//   const questionQuery = `
//   SELECT q.*, u.username, u.first_name , u.last_name
//   FROM questions q
//   JOIN users u ON q.user_id = u.user_id
//   WHERE q.question_id = ?
// `;

//   try {
//     const [result] = await pool.execute(questionQuery, [question_id]);

//     if (result.length === 0) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         status: 404,
//         error: "not found",
//         message: "Question not found",
//       });
//     }
//     const [data] = result;

//     res.status(StatusCodes.OK).json({
//       success: true,
//       status: 200,
//       message: "Question queried successfully",
//       question: {
//         question_id: data.question_id,
//         title: data.title,
//         description: data.description,
//         tag: data.tag,
//         time: new Date(data.time).toISOString(),
//         username: data.username,
//         first_name: data.first_name,
//         last_name: data.last_name,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching question:", error.message);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       status: 500,
//       error: "Unable to query question. Internal Server Error",
//     });
//   }
// };
