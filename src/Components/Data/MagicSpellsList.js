function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        return images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('./../../assets/magic', false, /\.png$/));

export default {
    'windstrike': {
        name: "Wind Strike",
        level: 1,
        damage: 2,
        experience: 5.5,
        img: images['Wind_Strike_icon.png']
    },
    'waterstrike': {
        name: "Water Strike",
        level: 5,
        damage: 4,
        experience: 7.5,
        img: images['Water_Strike_icon.png']
    },
    'earthstrike': {
        name: "Earth Strike",
        level: 9,
        damage: 6,
        experience: 9.5,
        img: images['Earth_Strike_icon.png']
    },
    'firestrike': {
        name: "Fire Strike",
        level: 13,
        damage: 8,
        experience: 11.5,
        img: images['Fire_Strike_icon.png'] 
    },
    'windbolt': {
        name: "Wind Bolt",
        level: 17,
        damage: 9,
        experience: 13.5,
        img: images['Wind_Bolt_icon.png']
    },
    'waterbolt': {
        name: "Water Bolt",
        level: 23,
        damage: 10,
        experience: 16.5,
        img: images['Water_Bolt_icon.png']
    },
    'earthbolt': {
        name: "Earth Bolt",
        level: 29,
        damage: 11,
        experience: 19.5,
        img: images['Earth_Bolt_icon.png']
    },
    'firebolt': {
        name: "Fire Bolt",
        level: 35,
        damage: 12,
        experience: 22.5,
        img: images['Fire_Bolt_icon.png']
    },
    'windblast': {
        name: "Wind Blast",
        level: 41,
        damage: 13,
        experience: 25.5,
        img: images['Wind_Blast_icon.png']
    },
    'waterblast': {
        name: "Water Blast",
        level: 47,
        damage: 14,
        experience: 28.5,
        img: images['Water_Blast_icon.png']
    },
    'earthblast': {
        name: "Earth Blast",
        level: 53,
        damage: 15,
        experience: 31.5,
        img: images['Earth_Blast_icon.png']
    },
    'fireblast': {
        name: "Fire Blast",
        level: 59,
        damage: 16,
        experience: 34.5,
        img: images['Fire_Blast_icon.png']
    },
    'windwave': {
        name: "Wind Wave",
        level: 62,
        damage: 17,
        experience: 36,
        img: images['Wind_Wave_icon.png']
    },
    'waterwave': {
        name: "Water Wave",
        level: 65,
        damage: 18,
        experience: 37.5,
        img: images['Water_Wave_icon.png']
    },
    'earthwave': {
        name: "Earth Wave",
        level: 70,
        damage: 19,
        experience: 40,
        img: images['Earth_Wave_icon.png']
    },
    'firewave': {
        name: "Fire Wave",
        level: 75,
        damage: 20,
        experience: 42.5,
        img: images['Fire_Wave_icon.png']
    },
    'windsurge': {
        name: "Wind Surge",
        level: 81,
        damage: 21,
        experience: 44.5,
        img: images['Wind_Surge_icon.png']
    },
    'watersurge': {
        name: "Water Surge",
        level: 85,
        damage: 22,
        experience: 46.5,
        img: images['Water_Surge_icon.png']
    },
    'earthsurge': {
        name: "Earth Surge",
        level: 90,
        damage: 23,
        experience: 48.5,
        img: images['Earth_Surge_icon.png']
    },
    'firesurge': {
        name: "Fire Surge",
        level: 95,
        damage: 24,
        experience: 50.5,
        img: images['Fire_Surge_icon.png']
    }
}