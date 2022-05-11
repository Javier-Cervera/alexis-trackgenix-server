// use "import" to import libraries
// import express from 'express';
import express from 'express';
import employeesRoute from './resources/employees';

// routes
import superAdmins from './resources/super-admins';

// use "require" to import JSON files
import tasksRouter from './resources/tasks';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/super-admins', superAdmins);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
// console.log(`Example app listening on port ${port}`);
});

// routes
app.use('/api/employees', employeesRoute);
