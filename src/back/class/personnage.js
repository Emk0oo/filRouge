class Personnage {
  constructor(id, nom, description, idImage, idUnivers) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.idImage = idImage;
    this.idUnivers = idUnivers;
  }

  toMap() {
    return {
      id: this.id,
      nom: this.nom,
      description: this.description,
    };
  }

  static fromMap(map) {
    this.id = map.id;
    this.nom = map.nom;
    this.description = map.description;
  }

  get id() {
    return this.id;
  }

  get nom() {
    return this.nom;
  }

  get description() {
    return this.description;
  }

  get idImage() {
    return this.idImage;
  }

  get idUnivers() {
    return this.idUnivers;
  }

  set id(id) {
    this.id = id;
  }

  set nom(nom) {
    this.nom = nom;
  }

  set description(description) {
    this.description = description;
  }

  set idImage(idImage) {
    this.idImage = idImage;
  }

  set idUnivers(idUnivers) {
    this.idUnivers = idUnivers;
  }
}
