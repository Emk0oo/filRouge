class Message {
  constructor(id, isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage){
    this._id = id;
    this._isHumain = isHumain;
    this._date_dernier_message = date_dernier_message;
    this._contenu = contenu;
    this._id_utilisateur = id_utilisateur;
    this._id_personnage = id_personnage;
  }

  static fromMap(map) {
    let message = new Message(map.id);
    message._id = map.id;
    message._isHumain = map.isHumain;
    message._date_dernier_message = map.date_dernier_message;
    message._contenu = map.contenu;
    message._id_utilisateur = map.id_utilisateur;
    message._id_personnage = map.id_personnage;
    return message;
  }

  toMap() {
    return {
      id: this._id,
      isHumain: this._isHumain,
      date_dernier_message: this._date_dernier,
      contenu: this._contenu,
      id_utilisateur: this._id_utilisateur,
      id_personnage: this._id_personnage,
    };
  }

  get id() {
    return this._id;
  }

  get isHumain() {
    return this._isHumain;
  }

  get date_dernier_message() {
    return this._date_dernier_message;
  }

  get contenu() {
    return this._contenu;
  }

  get id_utilisateur() {
    return this._id_utilisateur;
  }

  set id(id) {
    this._id = id;
  }

  set isHumain(isHumain) {
    this._isHumain = isHumain;
  }

  set date_dernier_message(date_dernier) {
    this._date_dernier_message = date_dernier_message;
  }

  set contenu(contenu) {
    this._contenu = contenu;
  }

  set id_utilisateur(id_utilisateur) {
    this._id_utilisateur = id_utilisateur;
  }


}
module.exports = Message;