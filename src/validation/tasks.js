import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const taskValidation = Joi.object({
    taskName: Joi.string()
      .min(3)
      .max(50)
      .messages({
        'string.min': 'Invalid task name, it must contain more than 3 letters',
        'string.max':
          'Invalid task name, it must not contain more than 50 letters',
      })
      .required(),
    startDate: Joi.date().required(),
    workedHours: Joi.number()
      .integer()
      .min(0)
      .messages({
        'number.integer': 'Invalid number, it must be an integer',
        'number.min': 'Invalid number, it must be positive',
      })
      .required(),
    description: Joi.string()
      .min(6)
      .max(150)
      .messages({
        'string.min':
          'Invalid description, it must contain more than 6 letters',
        'string.max':
          'Invalid description, it must not contain more than 150 letters',
      })
      .required(),
    status: Joi.string()
      .min(2)
      .valid('To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled')
      .messages({
        'string.min': 'Invalid status, it must contain more than 2 letters',
        'any.valid':
          'Invalid status, it must be one of the following: To do, In progress, Review, Blocked, Done, Cancelled',
      })
      .required(),
  });

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }

  return next();
};

const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    taskName: Joi.string().min(3).max(50).messages({
      'string.min': 'Invalid task name, it must contain more than 3 letters',
      'string.max':
        'Invalid task name, it must not contain more than 50 letters',
    }),
    startDate: Joi.date(),
    workedHours: Joi.number().integer().min(0).messages({
      'number.integer': 'Invalid number, it must be an integer',
      'number.min': 'Invalid number, it must be positive',
    }),
    description: Joi.string().min(6).max(150).messages({
      'string.min': 'Invalid description, it must contain more than 6 letters',
      'string.max':
        'Invalid description, it must not contain more than 150 letters',
    }),
    status: Joi.string()
      .min(2)
      .valid('To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled')
      .messages({
        'string.min': 'Invalid status, it must contain more than 2 letters',
        'any.valid':
          'Invalid status, it must be one of the following: To do, In progress, Review, Blocked, Done, Cancelled',
      }),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
