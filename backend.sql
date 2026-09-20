CREATE TYPE user_type AS ENUM('student', 'instructor'); 

CREATE TABLE users(
	user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
	name VARCHAR(250) NOT NULL, 
	email VARCHAR(250) NOT NULL UNIQUE, 
	password VARCHAR(250) NOT NULL, 
	profile_image VARCHAR(250), 
	type user_type DEFAULT 'student', 
	courses_completed INTEGER DEFAULT 0, 
	total_hours_learnt INTEGER DEFAULT 0, 
	created_at DATE DEFAULT CURRENT_DATE, 
	updated_at DATE DEFAULT CURRENT_DATE
);

CREATE TYPE course_level_type AS ENUM ('beginner', 'intermediate', 'advanced');

CREATE TABLE courses(
	course_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
	title VARCHAR(250) NOT NULL, 
	user_id UUID, 
	description TEXT DEFAULT '', 
	price DECIMAL(10, 2) DEFAULT 0.0, 
	course_image VARCHAR(250) DEFAULT '', 
	course_level course_level_type DEFAULT 'beginner', 
	learning_outcomes TEXT[], 
	skills TEXT[], 
	tools TEXT[], 
	discount DECIMAL(3, 2) DEFAULT 0.0, 
	benefits TEXT DEFAULT '', 
	CONSTRAINT fk_users
		FOREIGN KEY(user_id)
			REFERENCES users(user_id)
			ON DELETE CASCADE
);

CREATE TABLE modules (
	module_id SERIAL PRIMARY KEY, 
	title VARCHAR(250) NOT NULL,
	description TEXT DEFAULT '', 
	course_id uuid, 
	CONSTRAINT fk_modules
		FOREIGN KEY (course_id) 
			REFERENCES courses(course_id)
			ON DELETE CASCADE
);

CREATE TYPE lesson_type AS ENUM ('text', 'image', 'video'); 

CREATE TABLE lessons(
	lesson_id SERIAL PRIMARY KEY, 
	title VARCHAR(250) DEFAULT '', 
	lesson_link VARCHAR(250) NOT NULL, 
	type lesson_type DEFAULT 'text', 
	lesson_order INT NOT NULL, 
	module_id INT, 
	CONSTRAINT fk_lessons
		FOREIGN KEY (module_id) 
			REFERENCES modules(module_id)
			ON DELETE CASCADE
);

CREATE TABLE enrollment(
	enrollment_id BIGSERIAL PRIMARY KEY, 
	course_id uuid REFERENCES courses(course_id), 
	instructor_id uuid REFERENCES users(user_id), 
	user_id uuid REFERENCES users(user_id), 
	price DECIMAL(10, 2) DEFAULT 0.0, 
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
	CONSTRAINT unique_student_enrollment
		UNIQUE(user_id, course_id)
);

CREATE TABLE records(
	record_id BIGSERIAL PRIMARY KEY, 
	course_id uuid REFERENCES courses(course_id) ON DELETE CASCADE, 
	current_module_id INT REFERENCES modules(module_id) ON DELETE CASCADE,  
	current_lesson_id INT REFERENCES lessons(lesson_id) ON DELETE SET NULL, 
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews(
	review_id BIGSERIAL PRIMARY KEY, 
	course_id uuid, 
	user_id uuid REFERENCES users(user_id) NOT NULL, 
	rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL, 
	CONSTRAINT fk_reviews 
		FOREIGN KEY (course_id)
			REFERENCES courses(course_id) 
			ON DELETE CASCADE,
	CONSTRAINT unique_course_review
		UNIQUE (user_id, course_id)
);
