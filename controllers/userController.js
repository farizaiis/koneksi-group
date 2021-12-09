const Joi = require('joi');
const { user } = require('../models');

module.exports = {
    register: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                age: Joi.number().required().min(1).max(100),
            });

            const check = schema.validate(
                {
                    name: body.name,
                    age: body.age,
                },
                { abortEarly: false }
            );

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const checkName = await user.findOne({
                where: { name: body.name, age: body.age },
            });

            if (checkName) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Cannot duplicate data',
                });
            }

            const createUser = await user.create({
                name: body.name,
                age: body.age,
            });

            return res.status(200).json({
                status: 'success',
                message: 'Successfully registered a new user',
                data: createUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const findData = await user.findAll({
                attributes: { exclude: ['age', 'updatedAt'] },
            });

            const checkData = await user.findAndCountAll();

            if (checkData < 1) {
                return res.status(200).json({
                    status: 'success',
                    message:
                        'There is no user data, please register for new user',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Success retrieve user data',
                data: findData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        try {
            const findData = await user.findOne({
                where: { id },
            });

            if (!findData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Success retrieve user data',
                data: findData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            const schema = Joi.object({
                name: Joi.string(),
                age: Joi.number().min(1).max(100),
            });

            const check = schema.validate(
                {
                    name: body.name,
                    age: body.age,
                },
                { abortEarly: false }
            );

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const findData = await user.findOne({
                where: { id },
            });

            if (!findData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            if (body.name && body.age) {
                const checkData = await user.findOne({
                    where: { name: body.name, age: body.age },
                });

                if (checkData) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'Cannot duplicate data',
                    });
                }
            }

            if (body.name) {
                const checkData = await user.findOne({
                    where: { name: body.name, age: findData.dataValues.age },
                });

                if (checkData) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'Cannot duplicate data',
                    });
                }
            }

            if (body.age) {
                const checkData = await user.findOne({
                    where: { name: findData.dataValues.name, age: body.age },
                });

                if (checkData) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'Cannot duplicate data',
                    });
                }
            }

            await user.update(
                {
                    name: body.name,
                    age: body.age,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            return res.status(200).json({
                status: 'success',
                message: 'Success updated a user',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const findData = await user.findOne({
                where: { id },
            });

            if (!findData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            await user.destroy({
                where: { id },
            });

            return res.status(200).json({
                status: 'success',
                message: 'Success deleted the data',
                data: findData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },
};
