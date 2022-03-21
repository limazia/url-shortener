const cryptoRandomString = require("crypto-random-string");
const moment = require("moment");

const connection = require("../../database/connection");
const { generateCode } = require("../../helpers/utils.helper");

moment.locale("pt-br");

class WebController {
  async renderFormShortener(request, response, next) {
    try {
      return response.status(200).render("Home", {
        title: "Inicio",
      });
    } catch (error) {
      next(error);
    }
  }

  async renderPageCode(request, response, next) {
    try {
      const { code } = request.params;

      const result = await connection("links").where({ code });
      if (!result.length) {
        return response.status(404).render("NotFound", {
          title: "Página não encontrada",
        });
      }

      const hits = result[0].hits += 1;
      await connection("links").update({ hits }).where({ code });

      return response.redirect(result[0].url);
    } catch (error) {
      next(error);
    }
  }

  async renderPageCodeStats(request, response, next) {
    try {
      const { code } = request.params;
      
      const result = await connection("links").where({ code });
      if (!result.length) {
        return response.status(404).render("NotFound", {
          title: "Página não encontrada",
        });
      }

      const { url, hits, updateAt } = result[0];

      return response.status(200).render("Stats", {
        title: "Estatísticas de acesso",
        data: {
          code,
          url,
          hits,
          updateAt: moment(updateAt).format("LL")
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async formShortener(request, response, next) {
    try {
      const { url } = request.body;
      const id = cryptoRandomString({ length: 15 });
      const code = generateCode();

      await connection("links").insert({
        id,
        url,
        code,
      });

      return response.status(200).render("Shortened", {
        title: "Informações de acesso",
        code,
        url
      });
    } catch (error) {
      next(error);
    }
  }

  async renderPageNotFound(request, response, next) {
    try {
      return response.status(404).redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WebController();
