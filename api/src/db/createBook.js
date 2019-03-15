import knex from "./knex"

const create = ({ title, author, src }) => {
    return knex("books").insert({ title, author, src })
}

export default create