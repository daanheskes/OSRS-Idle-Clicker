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
addItem(currentSlot, "Bronze med helm", 24, images['Bronze_med_helm.png'], 0, 0, 0, 4);

currentSlot = 'cape';
addItem(currentSlot, "Red cape", 2, images['Red_cape.png'], 0, 0, 0, 2);

currentSlot = 'neck';
addItem(currentSlot, "Amulet of accuracy", 1100, "https://oldschool.runescape.wiki/images/1/1b/Amulet_of_accuracy.png", 0, 4, 0, 0);

currentSlot = 'ammunition';
addItem(currentSlot, "Bronze arrow", 1, "https://oldschool.runescape.wiki/images/f/f6/Bronze_arrow_5.png", 0, 0, 0, 0, 7);
addItem(currentSlot, "Iron arrow", 3, "https://oldschool.runescape.wiki/images/e/ec/Iron_arrow_5.png", 0, 0, 0, 0, 10);
addItem(currentSlot, "Steel arrow", 12, "https://oldschool.runescape.wiki/images/f/f6/Bronze_arrow_5.png", 0, 0, 0, 0, 16);
addItem(currentSlot, "Mithril arrow", 32, "https://oldschool.runescape.wiki/images/0/09/Mithril_arrow_5.png", 0, 0, 0, 0, 22);
addItem(currentSlot, "Adamant arrow", 80, "https://oldschool.runescape.wiki/images/6/63/Adamant_arrow_5.png", 0, 0, 0, 0, 31);
addItem(currentSlot, "Rune arrow", 240, "https://oldschool.runescape.wiki/images/2/27/Rune_arrow_5.png", 0, 0, 0, 0, 49);
addItem(currentSlot, "Amethyst arrow", 300, "https://oldschool.runescape.wiki/images/7/7e/Amethyst_arrow_5.png", 0, 0, 0, 0, 55);

currentSlot = 'weapon';
// Melee
addItem(currentSlot, "Bronze sword", 26, "https://oldschool.runescape.wiki/images/b/b8/Bronze_sword.png", 0, 4, 5, 0);
addItem(currentSlot, "Bronze scimitar", 32, "https://oldschool.runescape.wiki/images/f/f7/Bronze_scimitar.png", 0, 7, 6, 1);
addItem(currentSlot, "Iron scimitar", 112, "https://oldschool.runescape.wiki/images/b/b3/Iron_scimitar.png", 0, 10, 9, 1);
addItem(currentSlot, "Steel scimitar", 400, "https://oldschool.runescape.wiki/images/7/78/Steel_scimitar.png", 0, 15, 14, 1);
addItem(currentSlot, "Black scimitar", 768, "https://oldschool.runescape.wiki/images/5/53/Black_scimitar.png", 0, 19, 14, 1);
addItem(currentSlot, "Mithril scimitar", 1040, "https://oldschool.runescape.wiki/images/0/04/Mithril_scimitar.png", 0, 21, 20, 1);
addItem(currentSlot, "Adamant scimitar", 2560, "https://oldschool.runescape.wiki/images/b/be/Adamant_scimitar.png", 0, 29, 28, 1);
addItem(currentSlot, "Rune scimitar", 25600, "https://oldschool.runescape.wiki/images/d/d9/Rune_scimitar.png", 0, 45, 44, 1);
addItem(currentSlot, "Dragon scimitar", 100000, "https://oldschool.runescape.wiki/images/8/8b/Dragon_scimitar.png", 0, 67, 66, 1);
// Ranged
addItem(currentSlot, "Shortbow", 50, "https://oldschool.runescape.wiki/images/f/f9/Shortbow.png", 0, 0, 0, 0, 8)

currentSlot = 'body';
addItem(currentSlot, "Bronze chainbody", 60, "https://oldschool.runescape.wiki/images/8/85/Bronze_chainbody.png", 0, 0, 0, 0);

currentSlot = 'shield';
addItem(currentSlot, "Wooden shield", 20, "https://oldschool.runescape.wiki/images/d/db/Wooden_shield.png", 0, 0, 0, 5);

currentSlot = 'legs';
addItem(currentSlot, "Bronze platelegs", 80, "https://oldschool.runescape.wiki/images/2/24/Bronze_platelegs.png", 0, 0, 0, 0);

currentSlot = 'hand';
addItem(currentSlot, "Leather gloves", 6, "https://oldschool.runescape.wiki/images/9/95/Leather_gloves.png", 0, 0, 0, 0);

currentSlot = 'feet';
addItem(currentSlot, "Leather boots", 6, "https://oldschool.runescape.wiki/images/e/ea/Leather_boots.png", 0, 0, 0, 0);

currentSlot = 'ring';
addItem(currentSlot, "Gold ring", 210, "https://oldschool.runescape.wiki/images/a/ae/Gold_ring.png", 2, 0, 0, 0);

export default equipment;