const Univers = require("../class/univers");

class UniversFacade {
  async createUnivers(req) {
    let univers = Univers.fromMap(req.body);
    console.log(req.body); //from map
    await univers.genererDescription();
    await univers.genererImage();
    const sql =
      "INSERT INTO univers (description, id_utilisateurs, nom, id_images, nb_perso) VALUES (?, ?, ?, ?, ?)";

    const values = [
      univers.description.trim(),
      univers.id_utilisateur,
      univers.nom,
      univers.id_images,
      univers.nb_perso,
    ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        res.status(500).json({ error: "Erreur lors de l'insertion" });
        console.log(univers.description);
      } else {
        univers.id = result.insertId;
        console.log("Enregistrement inséré avec succès !");
        res.status(200).json({ message: "Enregistrement inséré avec succès" });
      }
    });
  }
}

module.exports = new UniversFacade();
