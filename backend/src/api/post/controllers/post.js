"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// TODO: Choose between the following methods
// * Original code - use id as unique identifier
// module.exports = createCoreController('api::post.post');

// * Strapi v4 FIX - use slug instead of id as unique identifier
// @link https://forum.strapi.io/t/strapi-v4-search-by-slug-instead-id/13469/18?page=2
// TIP: With this method you need to add a slug field to your collection types in the Strapi admin panel

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.db.query("api::post.post").findOne({
      where: { slug: id },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
