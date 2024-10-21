CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url VARCHAR(255),
  order_num INTEGER NOT NULL
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id),
  title VARCHAR(255) NOT NULL
);

CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id),
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer INTEGER NOT NULL
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP
);

CREATE TABLE student_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  lesson_id INTEGER REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP
);

CREATE TABLE course_ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discussion_forums (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE forum_posts (
  id SERIAL PRIMARY KEY,
  forum_id INTEGER REFERENCES discussion_forums(id),
  user_id INTEGER REFERENCES users(id),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE courses
ADD COLUMN price DECIMAL(10, 2),
ADD COLUMN is_published BOOLEAN DEFAULT FALSE;

ALTER TABLE users
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;