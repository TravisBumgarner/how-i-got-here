import knex from "./knex"

const create = ({ title, author, src, user }) => {
    return knex("books").insert({ title, author, src, user })
}

export default create