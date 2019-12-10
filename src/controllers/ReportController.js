const { Op } = require('sequelize')
const User = require('../models/Users')

module.exports = {
    async show(req, res) {
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@freonzx.com'
                }
            },
            include: [
                { association: 'adresses', where: { street: 'Belo Jardim' } },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        }
                    }
                }
            ]
        })

        return res.json(users)
    }
}
