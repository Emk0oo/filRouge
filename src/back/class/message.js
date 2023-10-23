class Message {
  constructor(texte, id, isHuman, date, idUtilisateur, idDiscussion) {
    this.texte = texte;
    this.id = id;
    this.isHuman = isHuman;
    this.date = date;
    this.idUtilisateur = idUtilisateur;
    this.idDiscussion = idDiscussion;
  }

  get texte() {
    return this.texte;
  }

  get id() {
    return this.id;
  }

  get isHuman() {
    return this.isHuman;
  }

  get date() {
    return this.date;
  }

  get idUtilisateur() {
    return this.idUtilisateur;
  }

  set texte(texte) {
    this.texte = texte;
  }

  set id(id) {
    this.id = id;
  }

  set isHuman(isHuman) {
    this.isHuman = isHuman;
  }

  set date(date) {
    this.date = date;
  }

  set idUtilisateur(idUtilisateur) {
    this.idUtilisateur = idUtilisateur;
  }

  get idDiscussion() {
    return this.idDiscussion;
  }

  set idDiscussion(idDiscussion) {
    this.idDiscussion = idDiscussion;
  }
}
