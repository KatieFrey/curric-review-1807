const { db, Coin, Origin } = require('./server/db')

const seed = async () => {
    try {
        await db.sync({ force: true })
        const [england, france, usa] = await Origin.bulkCreate(
            [
                {
                    name: 'England',
                },
                {
                    name: 'France',
                },
                {
                    name: 'USA',
                },
            ],
            {
                returning: true, // necessary to see the results from PostgreSQL
            }
        )
        await Coin.bulkCreate(
            [
                {
                    name: 'Tuppence',
                    originId: england.id,
                },
                {
                    name: 'Franc',
                    originId: france.id,
                },
                {
                    name: 'Gold Sacagawea Dollar',
                    originId: usa.id,
                },
            ],
            {
                returning: true,
            }
        )
    } catch (err) {
        console.error('oops', err)
    } finally {
        db.close()
    }
}

seed()
