function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        return images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('./../../assets/items', false, /\.png$/));

let equipment = {
    head: {},
    cape: {},
    neck: {},
    ammunition: {},
    weapon: {},
    body: {},
    shield: {},
    legs: {},
    hand: {},
    feet: {},
    ring: {}
};

function createShortName(name) {
    return name.toLowerCase().replace(/\s/g, '');
}

function addItem(slot, name, cost, img, income=0, atk_bonus=0, str_bonus=0, def_bonus=0, rngd_bonus=0, mage_bonus=0) {

    let newItem = {
        slot: slot,
        name: name,
        cost: cost,
        img: img,
        income: income,
        atk_bonus: atk_bonus,
        str_bonus: str_bonus,
        def_bonus: def_bonus,
        rngd_bonus: rngd_bonus,
        mage_bonus: mage_bonus
    }

    equipment[slot][createShortName(name)] = newItem;
}

let currentSlot = 'head';
addItem(currentSlot, "Bronze full helm", 44, images['Bronze_full_helm.png'], 0, 0, 0, 5);
addItem(currentSlot, "Iron full helm", 154, images['Iron_full_helm.png'], 0, 0, 0, 7);
addItem(currentSlot, "Steel full helm", 550, images['Steel_full_helm.png'], 0, 0, 0, 10);
addItem(currentSlot, "Black full helm", 1056, images['Black_full_helm.png'], 0, 0, 0, 13);
addItem(currentSlot, "Mithril full helm", 1430, images['Mithril_full_helm.png'], 0, 0, 0, 14);
addItem(currentSlot, "Adamant full helm", 3520, images['Adamant_full_helm.png'], 0, 0, 0, 21);
addItem(currentSlot, "Rune full helm", 35200, images['Rune_full_helm.png'], 0, 0, 0, 32);
addItem(currentSlot, "Berserker helm", 0, images['Berserker_helm.png'], 0, 0, 3, 33);

currentSlot = 'cape';
addItem(currentSlot, "Red cape", 2, images['Red_cape.png'], 0, 0, 0, 2);
addItem(currentSlot, "Obsidian cape", 60000, images['Obsidian_cape.png'], 0, 0, 0, 9);
addItem(currentSlot, "Fire cape", 0, images['Fire_cape.png'], 0, 1, 4, 11, 1, 1);

currentSlot = 'neck';
addItem(currentSlot, "Gold necklace", 1100, images['Gold_necklace.png'], 1);
addItem(currentSlot, "Amulet of accuracy", 1100, images['Amulet_of_accuracy.png'], 0, 4, 0, 0);
addItem(currentSlot, "Amulet of strength", 2025, images['Amulet_of_strength.png'], 0, 0, 10);

currentSlot = 'ammunition';
addItem(currentSlot, "Bronze arrow", 1, images['Bronze_arrow.png'], 0, 0, 0, 0, 7);
addItem(currentSlot, "Iron arrow", 3, images['Iron_arrow.png'], 0, 0, 0, 0, 10);
addItem(currentSlot, "Steel arrow", 12, images['Steel_arrow.png'], 0, 0, 0, 0, 16);
addItem(currentSlot, "Mithril arrow", 32, images['Mithril_arrow.png'], 0, 0, 0, 0, 22);
addItem(currentSlot, "Adamant arrow", 80, images['Adamant_arrow.png'], 0, 0, 0, 0, 31);
addItem(currentSlot, "Rune arrow", 240, images['Rune_arrow.png'], 0, 0, 0, 0, 49);
addItem(currentSlot, "Amethyst arrow", 300, images['Amethyst_arrow.png'], 0, 0, 0, 0, 55);

currentSlot = 'weapon';
// Melee
addItem(currentSlot, "Bronze sword", 26, images['Bronze_sword.png'], 0, 4, 5, 0);
addItem(currentSlot, "Bronze scimitar", 32, images['Bronze_scimitar.png'], 0, 7, 6, 1);
addItem(currentSlot, "Iron scimitar", 112, images['Iron_scimitar.png'], 0, 10, 9, 1);
addItem(currentSlot, "Steel scimitar", 400, images['Steel_scimitar.png'], 0, 15, 14, 1);
addItem(currentSlot, "Black scimitar", 768, images['Black_scimitar.png'], 0, 19, 14, 1);
addItem(currentSlot, "Mithril scimitar", 1040, images['Mithril_scimitar.png'], 0, 21, 20, 1);
addItem(currentSlot, "Adamant scimitar", 2560, images['Adamant_scimitar.png'], 0, 29, 28, 1);
addItem(currentSlot, "Rune scimitar", 25600, images['Rune_scimitar.png'], 0, 45, 44, 1);
addItem(currentSlot, "Dragon scimitar", 100000, images['Dragon_scimitar.png'], 0, 67, 66, 1);
// Ranged
addItem(currentSlot, "Shortbow", 50, images['Shortbow.png'], 0, 0, 0, 0, 8)

currentSlot = 'body';
addItem(currentSlot, "Bronze platebody", 160, images['Bronze_platebody.png'], 0, 0, 0, 15);
addItem(currentSlot, "Iron platebody", 560, images['Iron_platebody.png'], 0, 0, 0, 21);
addItem(currentSlot, "Steel platebody", 2000, images['Steel_platebody.png'], 0, 0, 0, 32);
addItem(currentSlot, "Black platebody", 3840, images['Black_platebody.png'], 0, 0, 0, 41);
addItem(currentSlot, "Mithril platebody", 5200, images['Mithril_platebody.png'], 0, 0, 0, 46);
addItem(currentSlot, "Adamant platebody", 16640, images['Adamant_platebody.png'], 0, 0, 0, 65);
addItem(currentSlot, "Rune platebody", 65000, images['Rune_platebody.png'], 0, 0, 0, 82);
addItem(currentSlot, "Fighter torso", 0, images['Fighter_torso.png'], 0, 0, 4, 85)

currentSlot = 'shield';
addItem(currentSlot, "Wooden shield", 20, images['Wooden_shield.png'], 0, 0, 0, 5);
addItem(currentSlot, "Bronze kiteshield", 68, images['Bronze_kiteshield.png'], 0, 0, 0, 7);
addItem(currentSlot, "Iron kiteshield", 238, images['Iron_kiteshield.png'], 0, 0, 0, 10);
addItem(currentSlot, "Steel kiteshield", 850, images['Steel_kiteshield.png'], 0, 0, 0, 15);
addItem(currentSlot, "Black kiteshield", 1632, images['Black_kiteshield.png'], 0, 0, 0, 19);
addItem(currentSlot, "Mithril kiteshield", 2210, images['Mithril_kiteshield.png'], 0, 0, 0, 22);
addItem(currentSlot, "Adamant kiteshield", 5440, images['Adamant_kiteshield.png'], 0, 0, 0, 31);
addItem(currentSlot, "Rune kiteshield", 54400, images['Rune_kiteshield.png'], 0, 0, 0, 48);
addItem(currentSlot, "Dragon defender", 0, images['Dragon_defender.png'], 0, 25, 6, 25);

currentSlot = 'legs';
addItem(currentSlot, "Bronze platelegs", 80, images['Bronze_platelegs.png'], 0, 0, 0, 8);
addItem(currentSlot, "Iron platelegs", 280, images['Iron_platelegs.png'], 0, 0, 0, 11);
addItem(currentSlot, "Steel platelegs", 1000, images['Steel_platelegs.png'], 0, 0, 0, 17);
addItem(currentSlot, "Black platelegs", 1920, images['Black_platelegs.png'], 0, 0, 0, 21);
addItem(currentSlot, "Mithril platelegs", 2600, images['Mithril_platelegs.png'], 0, 0, 0, 24);
addItem(currentSlot, "Adamant platelegs", 6400, images['Adamant_platelegs.png'], 0, 0, 0, 33);
addItem(currentSlot, "Rune platelegs", 64000, images['Rune_platelegs.png'], 0, 0, 0, 51);

currentSlot = 'hand';
addItem(currentSlot, "Leather gloves", 6, images['Leather_gloves.png'], 0, 0, 0, 2);

currentSlot = 'feet';
addItem(currentSlot, "Leather boots", 6, images['Leather_boots.png'], 0, 0, 0, 1);

currentSlot = 'ring';
addItem(currentSlot, "Gold ring", 210, images['Gold_ring.png'], 1, 0, 0, 0);
addItem(currentSlot, "Warrior ring", 100000, images['Warrior_ring.png'], 0, 4, 0, 4);
addItem(currentSlot, "Seers ring", 1000000, images['Seers_ring.png'], 0, 0, 0, 4, 0, 4);
addItem(currentSlot, "Archers ring", 1000000, images['Archers_ring.png'], 0, 0, 0, 4, 4);
addItem(currentSlot, "Berserker ring", 1000000, images['Berserker_ring.png'], 0, 0, 4, 4);

export default equipment;