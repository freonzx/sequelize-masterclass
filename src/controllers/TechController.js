const Tech = require('../models/Tech')
const Users = require('../models/Users')

module.exports = {
    async index(req, res) {
        const { user_id } = req.params

        const user = await Users.findByPk(user_id, {
            include: {
                association: 'techs',
                attributes: ['name'],
                through: { attributes: [] }
            }
        })

        return res.json(user.techs)
    },
    async destroy(req, res) {
        const { user_id } = req.params
        const { name } = req.body

        const user = await Users.findByPk(user_id)

        if (!user) {
            return res.status(400).json({ error: 'User not found.' })
        }

        const tech = await Tech.findOne({
            where: { name }
        })

        await tech.removeTech(tech)

        return res.json()
    },

    async store(req, res) {
        const { user_id } = req.params
        const { name } = req.body

        const user = await Users.findByPk(user_id)

        if (!user) {
            return res.status(400).json({ error: 'User not found.' })
        }

        const [tech] = await Tech.findOrCreate({
            where: { name }
        })

        await user.addTech(tech)

        return res.json(tech)
    }
}
