-- The SQL queries below create the necessary tables in your SQL database.
-- The database needs to be called stementor (all lower case)
-- Note: Test data can be found in the "test-data" folder

CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  avatar VARCHAR(200),
  blurb VARCHAR(1000),
  bio VARCHAR(5000),
  company VARCHAR(100),
  job_title VARCHAR(100),
  state VARCHAR(20),
  race VARCHAR(100),
  gender VARCHAR(40),
  orientation VARCHAR(40),
  birthday DATE,
  school VARCHAR(100),
  degree VARCHAR(100),
  major VARCHAR(100),
  languages VARCHAR(100),
  stem_primary VARCHAR(20),
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	email VARCHAR(100)
);

CREATE TABLE faq (
	id SERIAL PRIMARY KEY,
	mentor_id INT REFERENCES mentors(id),
	question VARCHAR(5000),
	answer VARCHAR(5000)
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	mentor_id INT REFERENCES mentors(id),
	student_id INT REFERENCES students(id),
	date_sent DATE,
	date_replied DATE,
	subject VARCHAR(100),
	message VARCHAR(5000),
  reply VARCHAR(5000),
	student_name VARCHAR(100),
	message_read BOOLEAN DEFAULT FALSE
);
