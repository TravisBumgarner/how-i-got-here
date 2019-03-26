import knex from './knex'

const getRawList = async () => {
    return await knex('books').select('title', 'author', 'user')
}

export default getRawList
