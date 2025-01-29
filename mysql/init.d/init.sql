
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    todo_status VARCHAR(50) NOT NULL
);


INSERT INTO todos (title, todo_status) VALUES
  ('kintore', 'todo'),
  ('study', 'progress'),
  ('message', 'progress');