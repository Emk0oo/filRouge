class Univers{
    constructor(idUnivers, nom, description, nbPersonnage, idPersonnage, idImage){
        this.idUnivers = idUnivers;
        this.nom = nom;
        this.description = description;
        this.nbPersonnage = nbPersonnage;
        this.idPersonnage = idPersonnage;
        this.idImage = idImage;
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

    
}

