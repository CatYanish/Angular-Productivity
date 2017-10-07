CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);


CREATE TABLE "user_goals" (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "users",
	goal VARCHAR(140),
	category VARCHAR(50),
	pomodoro INT
)

CREATE TABLE "days_completed" (
	id SERIAL PRIMARY KEY,
	goal_id INT REFERENCES "user_goals",
	date DATE,
	notes VARCHAR(280)
)
