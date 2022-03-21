exports.seed = function (knex) {
  return knex("links")
    .del()
    .then(function () {
      return knex("links").insert([
        {
          id: "cd4244141da8325",
          code: "3ZbQU",
          url: "https://www.luiztools.com.br/post/como-criar-um-encurtador-de-url-com-node-js-e-sequelize/",
          hits: 0
        }
      ]);
    });
};