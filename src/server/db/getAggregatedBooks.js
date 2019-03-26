import knex from './knex'

const getAggregatedBooks = () => {
    return knex('books')
        .select(knex.raw('title, count(title) as titleCount, author, src'))
        .groupBy('title')
        .orderByRaw('count(title) desc')
}

export default getAggregatedBooks
