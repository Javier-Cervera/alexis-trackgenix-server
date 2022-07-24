import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seed/tasks';

let taskId;

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

// Test for GET all by Fer;

describe('GET /api/tasks', () => {
  test.skip('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/tasks').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All tasks');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
  });

  test.skip('Wrong path', async () => {
    const response = await request(app).get('/api-tasks').send();
    await expect(response.status).toBe(404);
  });
});

// Test GET by Id by Fran
describe('GetById /api/tasks', () => {
  test.skip('get task by id', async () => {
    const response = await request(app)
      .get('/api/tasks/6289c467fc13ae72d60000ca')
      .send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test.skip('get task by id, incorrect id', async () => {
    const response = await request(app)
      .get('/api/tasks/6280062d5f0b9b4131e527e4')
      .send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('id not found');
  });

  test.skip('get task by id, incorrect id format', async () => {
    const response = await request(app).get('/api/tasks/asd').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

// Test GET by description by Fran
describe('GetByDescription /api/tasks', () => {
  test.skip('get task by description', async () => {
    const response = await request(app).get(
      '/api/tasks/taskDescription/description',
    );
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test.skip('get task by description not found', async () => {
    const response = await request(app).get('/api/tasks/taskDescription/d');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });

  test.skip('get task by description no description', async () => {
    const response = await request(app).get('/api/tasks/taskDescription/');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
});

// Test POST by Fran
describe('POST /api/tasks', () => {
  test.skip('Create a task', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskName: 'Test Task',
      startDate: '2022-05-17T16:55:32.654+00:00',
      workedHours: '33',
      description: 'description',
      status: 'Done',
      isDeleted: false,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Task created');
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    taskId = response.body.data._id;
  });

  test.skip('Create task, no date', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskName: 'Test Task',
      workedHours: '33',
      description: 'description',
      status: 'Done',
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('Start date is a required field');
  });

  test.skip('Create task, no worked hours', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskName: 'Test Task',
      startDate: '2022-05-17T16:55:32.654+00:00',
      description: 'description',
      status: 'Done',
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('Worked hours is a required field');
  });

  test.skip('Create a task, no description', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskName: 'Test Task',
      startDate: '2022-05-17T16:55:32.654+00:00',
      workedHours: '33',
      status: 'Done',
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('Description is a required field');
  });

  test.skip('Create a task, no status', async () => {
    const response = await request(app).post('/api/tasks/').send({
      taskName: 'Test Task',
      startDate: '2022-05-17T16:55:32.654+00:00',
      workedHours: '33',
      description: 'description',
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('Status is a required field');
  });
});

// Test UPDATE by Fran
describe('UPDATE /api/tasks', () => {
  test.skip('Update a task', async () => {
    const response = await request(app).put(`/api/tasks/${taskId}`).send({
      taskName: 'Test Task',
      startDate: '2022-05-17T16:55:32.654+00:00',
      workedHours: '33',
      description: 'description',
      status: 'Done',
    });
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test.skip('Update a task, wrong id', async () => {
    const response = await request(app)
      .put('/api/tasks/6280062d5f0b9b4131e527e4')
      .send({
        taskName: 'Test Task',
        startDate: '2022-05-17T16:55:32.654+00:00',
        workedHours: '33',
        description: 'description',
        status: 'Done',
      });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
    expect(response.body.error).toBe(true);
  });

  test.skip('Update a task, wrong id format', async () => {
    const response = await request(app).put('/api/tasks/6280').send({
      taskName: 'Test Task',
      startDate: '2022-05-17T16:55:32.654+00:00',
      workedHours: '33',
      description: 'description',
      status: 'Done',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('An error has ocurred');
    expect(response.body.error).toBe(true);
  });
});

// Test DELETE by Fran
describe('DELETE /api/tasks', () => {
  test.skip('Delete a task', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).delete(`/api/tasks/${taskId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task successfully deleted');
    expect(response.body.error).toBe(false);
    await Tasks.deleteOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: mongoose.Types.ObjectId(`${taskId}`) },
    );
  });

  test.skip('Delete task, incorrect id', async () => {
    const response = await request(app)
      .delete('/api/tasks/6280062d5f0b9b4131e527e4')
      .send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
    expect(response.body.error).toBe(true);
  });

  test.skip('Delete task, incorrect id format', async () => {
    const response = await request(app).delete('/api/tasks/628').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('An error has ocurred');
    expect(response.body.error).toBe(true);
  });
});
