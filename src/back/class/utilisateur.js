class Utilisateur {
  constructor(id, nom, prenom, pseudo, mdp, id_message) {
    this._id = id;
    this._nom = nom;
    this._prenom = prenom;
    this._pseudo = pseudo;
    this._mdp = mdp;
    this._id_message = id_message;
  }

  static fromMap(map) {
    let utilisateur = new Utilisateur(map.nom);
    utilisateur._id = map.id;
    utilisateur._nom = map.nom;
    utilisateur._prenom = map.prenom;
    utilisateur._pseudo = map.pseudo;
    utilisateur._mdp = map.mdp;
    utilisateur._id_message = map.id_message;
    return utilisateur;
  }

  toMap() {
    return {
      id: this._id,
      nom: this._nom,
      prenom: this._prenom,
      pseudo: this._pseudo,
      mdp: this._mdp,
      id_message: this._id_message,
    };
  }

  get id() {
    return this._id;
  }

    get nom() {
        return this._nom;
    }

    get prenom() {
        return this._prenom;
    }

    get pseudo() {
        return this._pseudo;
    }

    get mdp() {
        return this._mdp;
    }

    get id_message() {
        return this._id_message;
    }

    set id(id) {
        this._id = id;
    }

    set nom(nom) {
        this._nom = nom;
    }

    set prenom(prenom) {
        this._prenom = prenom;
    }

    set pseudo(pseudo) {
        this._pseudo = pseudo;
    }

    set mdp(mdp) {
        this._mdp = mdp;
    }   

    set id_message(id_message) {
        this._id_message = id_message;
    }


}
module.exports = Utilisateur;