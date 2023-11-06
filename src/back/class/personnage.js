const Chatopenai = require("./chatopenai");
const StableDiffusion= require("./stablediffusion");

class Personnage {
  constructor(id, nom, description, id_images, id_univers) {
    this._id = id;
    this._nom = nom;
    this._description = description;
    this._id_images = id_images;
    this._id_univers = id_univers;
  }

  static fromMap(map) {
    let personnage= new Personnage(map.nom);
    personnage._nom = map.nom;
    personnage._description = map.description;
    personnage._id_images = map.id_images;
    personnage._id_univers = map.id_univers;
    return personnage;
  }

  toMap() {
    return {
      id: this._id,
      nom: this._nom,
      description: this._description,
      id_images: this._id_images,
      id_univers: this._id_univers,
    };
  }

  async genererDescription() {
    this.description = await Chatopenai.generateDescriptionForCharacter(this);
  }


  async genererPhotoProfil(){
    let stableDiffusion= new StableDiffusion();

    this.id_images= await StableDiffusion.generatePicture(await Chatopenai.generateDescriptionForCharacter(this));
  }
  
  get id() {
    return this._id;
  }

  get nom() {
    return this._nom;
  }

  get description() {
    return this._description;
  }

  get id_images() {
    return this._id_images;
  }



  get id_univers() {
    return this._id_univers;
  }

  set id(id) {
    this._id = id;
  }

  set nom(nom) {
    this._nom = nom;
  }

  set description(description) {
    this._description = description;
  }

  set id_images(id_images) {
    this._id_images = id_images;
  }


  set id_univers(id_univers) {
    this._id_univers = id_univers;
  }

  
}

module.exports = Personnage;
