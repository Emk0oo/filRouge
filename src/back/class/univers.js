class Univers{
    constructor(idUnivers, nom, description, nbPersonnage, idPersonnage, idImage){
        this.idUnivers = idUnivers;
        this.nom = nom;
        this.description = description;
        this.nbPersonnage = nbPersonnage;
        this.idPersonnage = idPersonnage;
        this.idImage = idImage;
    }

    toMap(){    
        return {
            idUnivers: this.idUnivers,
            nom: this.nom,
            description: this.description,
            nbPersonnage: this.nbPersonnage,
            idPersonnage: this.idPersonnage,
            idImage: this.idImage,
        };
    }

    static fromMap(map){
        let univers= new Univers(map.name);
        univers.idUnivers = map.idUnivers;
        univers.nom = map.nom;
        univers.description = map.description;
        univers.nbPersonnage = map.nbPersonnage;
        univers.idPersonnage = map.idPersonnage;
        univers.idImage = map.idImage;
        return univers;
    }

    genererDescription(){
        this.description="Génère une description de l'univers de "+this.nom;
    }



    get idUnivers(){
        return this.idUnivers;
    }   

    get nom(){
        return this.nom;
    }

    get description(){
        return this.description;
    }

    get nbPersonnage(){
        return this.nbPersonnage;
    }

    get idPersonnage(){
        return this.idPersonnage;
    }

    get idImage(){
        return this.idImage;
    }

    set idUnivers(idUnivers){
        this.idUnivers = idUnivers;
    }

    set nom(nom){
        this.nom = nom;
    }


    set description(description){
        this.description = description;
    }

    set nbPersonnage(nbPersonnage){
        this.nbPersonnage = nbPersonnage;
    }

    set idPersonnage(idPersonnage){
        this.idPersonnage = idPersonnage;
    }

    set idImage(idImage){
        this.idImage = idImage;
    }

getCharacter() {
    return true;
}
}


