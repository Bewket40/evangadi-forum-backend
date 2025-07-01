
export let users = `CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
)`;

export let questions = `CREATE TABLE IF NOT EXISTS questions(
    question_id INT AUTO_INCREMENT, 
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100) DEFAULT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(question_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_tag (tag)
)`;

export let answers = `CREATE TABLE IF NOT EXISTS answers(
    answer_id INT AUTO_INCREMENT,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    answer TEXT NOT NULL,
    PRIMARY KEY(answer_id),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_user_id (user_id)
)`;

export let likes = `CREATE TABLE IF NOT EXISTS likes (
    like_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(like_id),
    UNIQUE(user_id, question_id), 
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE
)`;

export let question_views =`CREATE TABLE IF NOT EXISTS question_views (
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, question_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
)`;




// -- users table


// export const users = `
//   CREATE TABLE IF NOT EXISTS users (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     first_name VARCHAR(50) NOT NULL,
//     last_name VARCHAR(50) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL
//   );
// `;

// export const questions = `
//   CREATE TABLE IF NOT EXISTS questions (
//     question_id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     title VARCHAR(100) NOT NULL,
//     description TEXT NOT NULL,
//     tag VARCHAR(100),
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// export const answers = `
//   CREATE TABLE IF NOT EXISTS answers (
//     answer_id SERIAL PRIMARY KEY,
//     question_id INTEGER NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     answer TEXT NOT NULL,
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// export const likes = `
//   CREATE TABLE IF NOT EXISTS likes (
//     like_id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
//     question_id INTEGER NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE(user_id, question_id)
//   );
// `;

// export const question_views = `
//   CREATE TABLE IF NOT EXISTS question_views (
//     user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
//     question_id INTEGER NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
//     viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (user_id, question_id)
//   );
// `;




// // -- USERS TABLE
// export const usersTable = `
// CREATE TABLE IF NOT EXISTS users (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     first_name VARCHAR(50) NOT NULL,
//     last_name VARCHAR(50) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL
// );
// `;

// // -- QUESTIONS TABLE
// export const questionsTable = `
// CREATE TABLE IF NOT EXISTS questions (
//     question_id SERIAL PRIMARY KEY,
//     user_id INT NOT NULL,
//     title VARCHAR(100) NOT NULL,
//     description TEXT NOT NULL,
//     tag VARCHAR(100),
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
// );
// CREATE INDEX idx_tag ON questions(tag);
// `;

// // -- ANSWERS TABLE
// export const answersTable = `
// CREATE TABLE IF NOT EXISTS answers (
//     answer_id SERIAL PRIMARY KEY,
//     question_id INT NOT NULL,
//     user_id INT NOT NULL,
//     answer TEXT NOT NULL,
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
// );
// CREATE INDEX idx_user_id ON answers(user_id);
// `;

// // -- LIKES TABLE
// export const likesTable = `
// CREATE TABLE IF NOT EXISTS likes (
//     like_id SERIAL PRIMARY KEY,
//     user_id INT NOT NULL,
//     question_id INT NOT NULL,
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE(user_id, question_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
//     FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
// );
// `;

// // -- QUESTION VIEWS TABLE
// export const questionViewsTable = `
// CREATE TABLE IF NOT EXISTS question_views (
//     user_id INT NOT NULL,
//     question_id INT NOT NULL,
//     viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (user_id, question_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
//     FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
// );
// `;