CREATE TABLE "users" (
  "user_id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);


CREATE TABLE "user_goals" (
	goal_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "users",
	goal VARCHAR(140),
	category VARCHAR(50),
	pomodoro INT
)

CREATE TABLE "days_completed" (
	days_completed_id SERIAL PRIMARY KEY,
	goal_id INT REFERENCES "user_goals",
	date DATE,
	notes VARCHAR(280)
)
