import knex from "./knex"

const create = ({ title, authors, src, user }) => {
    console.log(title, authors, src, user)
    return knex("books").insert({ title: title || '', authors: authors.join(', ') || '' , src: src || '', user: user || '' })
}

export default create