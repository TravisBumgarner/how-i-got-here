const TABLE_NAME = "books"

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments("id")
        table.text("title")
        table.text("author")
        table.text("src")
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
}
