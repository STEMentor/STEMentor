CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  company VARCHAR(100),
  job_title VARCHAR(100),
  zip INT,
  race VARCHAR(100),
  sex VARCHAR(40),
  orientation VARCHAR(40),
  birthday DATE,
  school VARCHAR(100),
  degree VARCHAR(100),
  major VARCHAR(100),
  languages VARCHAR(100),
  admin BOOLEAN DEFAULT FALSE
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
	student_id INT REFERENCES student(id),
	date_sent DATE,
	date_replied DATE,
	subject VARCHAR(100),
	message VARCHAR(5000),
  reply VARCHAR(5000),
	student_name VARCHAR(100),
	message_read BOOLEAN
);

CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	email VARCHAR(100)
);

-- Dummy records for testing

INSERT INTO mentors (first_name, last_name, email, company, job_title, zip, race, sex, orientation, birthday, school, degree, major, languages)
VALUES ('Cormorant', 'Rogers', 'something@gmail.com', 'Potato, Inc.', 'CEO', 90210, 'Pacific-Islander', 'female', 'ambisexual', '1970-01-01', 'School of Life', 'PhD', 'Theoretical Astrology', 'Esperanto');

INSERT INTO faq (mentor_id, question, answer)
VALUES (1, 'Why is science?', 'Yes');

INSERT INTO messages (mentor_id, student_id, date_sent, date_replied, subject, message, student_name, message_read)
VALUES (1, 1, '2017-01-01', '2017-01-02', 'Science', 'So, why exactly is science?', 'Felicia', true);

INSERT INTO students (name, email)
VALUES ('Felicia', 'feliciasmith@gmail.com');
