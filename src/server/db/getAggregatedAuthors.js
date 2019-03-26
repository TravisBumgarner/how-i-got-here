import knex from './knex'

const getAggregatedAuthors = async () => {
    return await knex('books')
        .select(knex.raw('count(author) as count, author'))
        .groupBy('author')
        .orderByRaw('count(author) desc')
}

export default getAggregatedAuthors
