const knex = require('../database/knex');

class NotesController {
   async create(request, response) {
      const { title, description, rating, tags } = request.body;
      const user_id = request.user.id;

      const [ note_id ] = await knex("movies_notes").insert({
         title,
         description,
         rating,
         user_id
      })

      const tagsInsert = tags.map(name => {
         return {
            note_id,
            name,
            user_id
         }
      });

      await knex("movies_tags").insert(tagsInsert)

      return response.json();
   }

   async show(request, response) {
      const { id } = request.params;

      const movies_notes = await knex("movies_notes").where({ id }).first();
      const tags = await knex("movies_tags").where({ note_id: id}).orderBy("id");

      return response.json({
         ...movies_notes,
         tags
      })
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("movies_notes").where({id}).delete();

      return response.json();
   }

   async index(request, response) {
      const { title, movies_tags } = request.query;
      const user_id = request.user.id;
      
      let movies_notes;

      if(movies_tags) {
         const filterTags = movies_tags.split(',').map(movie_tag => movie_tag.trim());
          movies_notes = await knex("movies_tags")
         .select([
            "movies_notes.id",
            "movies_notes.title",
            "movies_notes.user_id"
          ])
          .where("movies_notes.user_id", user_id)
          .whereLike("movies_notes.title", `%${title}%`)
          .whereIn("name", filterTags)
          .innerJoin("movies_notes", "movies_notes.id", "movies_tags.note_id")   
          .orderBy("movies_notes.title")

      } else {
         movies_notes = await knex("movies_notes")
         .where({ user_id })
         .whereLike("title", `%${title}%`)
         .orderBy("title")
      }

      const userTags = await knex("movies_tags").where({user_id})
      const notesWithTags = movies_notes.map(note => {
         const noteTags = userTags.filter(tag => tag.note_id === note.id)

         return {
            ...note,
            tags: noteTags
         }
      })

      return response.json(notesWithTags);
   }
}

module.exports = NotesController;