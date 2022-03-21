exports.up = function (knex) {
  return knex.schema.createTable("links", (table) => {
    table.string("id").primary().unique().notNullable();
    table.string("code").notNullable();
    table.string("url").notNullable();
    table.integer("hits").defaultTo(0);

    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("links");
};
