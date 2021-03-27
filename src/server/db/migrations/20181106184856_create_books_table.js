const TABLE_NAME = 'books'

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id')
        table.text('title')
        table.text('authors')
        table.text('src')
        table.text('user')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
}
