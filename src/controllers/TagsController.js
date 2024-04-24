const knex = require("../database/knex")

class TagsController {
   async index(request, response) {
      const user_id = request.user.id

      const movies_tags = await knex("movies_tags")
      .where({ user_id })


      return response.json(movies_tags);
   }  
}

module.exports = TagsController;