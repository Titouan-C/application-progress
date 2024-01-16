export enum names {
    EnAttente = "En Attente",
    Refus = "Refus"
}

export class Status {
    name: names;

    constructor(name: names) {
        this.name = name;
    }
}
