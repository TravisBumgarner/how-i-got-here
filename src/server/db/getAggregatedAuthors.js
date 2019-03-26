import knex from './knex'

const getAggregatedAuthors = () => {
    return knex('books')
        .select(knex.raw('count(author) as count, author'))
        .groupBy('author')
        .orderByRaw('count(author) desc')
}

export default getAggregatedAuthors
