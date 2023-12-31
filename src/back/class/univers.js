const Chatopenai = require("./chatopenai");
const StableDiffusion = require("./stablediffusion");

class Univers {
  constructor(id, description, id_utilisateur, nom, id_images) {
    this._id = id;
    this._description = description;
    this._id_utilisateur = id_utilisateur;
    this._nom = nom;
    this._id_images = id_images;
  }

  static fromMap(map) {
    let univers = new Univers(map.id);
    univers._description = map.description;
    univers._id_utilisateur = map.id_utilisateur;
    univers._nom = map.nom;
    univers._id_images = map.id_images;
    return univers;
  }

  toMap() {
    return {
      id: this._id,
      description: this._description,
      id_utilisateur: this._id_utilisateur,
      nom: this._nom,
      id_images: this._id_images,
    };
  }

  async genererDescription() {
    this.description = await Chatopenai.generateDescriptionForUniverse(this);
  }

  async genererImage() {
    let stableDiffusion = new StableDiffusion();

    this.id_images = await StableDiffusion.generatePicture(
      await Chatopenai.generateDescriptionForUniverse(this)
    );
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  get id_utilisateur() {
    return this._id_utilisateur;
  }

  get nom() {
    return this._nom;
  }

  get id_images() {
    return this._id_images;
  }

  get nb_perso() {
    return this._nb_perso;
  }

  set id(id) {
    this._id = id;
  }

  set description(description) {
    this._description = description;
  }

  set id_utilisateur(id_utilisateur) {
    this._id_utilisateur = id_utilisateur;
  }

  set nom(nom) {
    this._nom = nom;
  }

  set id_images(id_images) {
    this._id_images = id_images;
  }

  set nb_perso(nb_perso) {
    this._nb_perso = nb_perso;
  }

  getCharacter() {
    return true;
  }
}

module.exports = Univers;
