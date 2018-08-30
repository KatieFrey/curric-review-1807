const { db, Coins } = require('./server/db')

const seed = async () => {
    try {
        await db.sync({ force: true })
        await Coins.bulkCreate([
            {
                name: 'Tuppence',
                origin: 'England',
            },
            {
                name: 'Franc',
                origin: 'France',
            },
            {
                name: 'Gold Sacagawea Dollar',
                origin: 'USA',
            },
        ])
    } catch (err) {
        console.error('oops', err)
    } finally {
        db.close()
    }
}

seed()
