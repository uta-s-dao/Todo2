
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    todo_status VARCHAR(10) NOT NULL
);


INSERT INTO todos (title, todo_status) VALUES
  ('Kintore', 'Todo'),
  ('Tell', 'Progress'),
  ('Guiter', 'Progress'),
  ('Part time job', 'Done'),
  ('Meeting', 'Done'),
  ('Message', 'Done');
   