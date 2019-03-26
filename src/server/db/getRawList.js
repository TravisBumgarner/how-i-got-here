import knex from './knex'

const getRawList = () => {
    return knex('books').select('title', 'author', 'user')
}

export default getRawList
