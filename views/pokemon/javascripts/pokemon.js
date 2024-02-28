class Pokemon {
    constructor(idPokemon, name, backImage, frontImage, level, attack, spAttack, defense, spDefense, speed, hpRemaining, hp, type, moves) {
        this.idPokemon = idPokemon;
        this.name = name;
        this.backImage = backImage;
        this.frontImage = frontImage;
        this.level = level;
        this.attack = attack;
        this.spAttack = spAttack;
        this.defense = defense;
        this.spDefense = spDefense;
        this.speed = speed;
        this.hpRemaining = hpRemaining;
        this.hp = hp;
        this.type = type;
        this.moves = moves;
    }

}

class Move {
    constructor(name, accuracy, pp_remain, pp, id_moves, priority, power) {
        this.name = name;
        this.accuracy = accuracy;
        this.pp_remain = pp_remain;
        this.pp = pp;
        this.id_moves = id_moves;
        this.priority = priority;
        this.power = power;
    }
}

class Stats {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}