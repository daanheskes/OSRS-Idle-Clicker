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

function addItem(slot, name, img, income, atk_bonus, str_bonus, def_bonus) {
    if (typeof income === 'undefined') income = 0;
    if (typeof atk_bonus === 'undefined') atk_bonus = 0;
    if (typeof str_bonus === 'undefined') str_bonus = 0;
    if (typeof def_bonus === 'undefined') def_bonus = 0;

    let newItem = {
        name: name,
        img: img,
        income: income,
        atk_bonus: atk_bonus,
        str_bonus: str_bonus,
        def_bonus: def_bonus
    }
    equipment[slot][createShortName(name)] = newItem;
}

let currentSlot = 'head';
addItem(currentSlot, "Bronze med helm", "https://oldschool.runescape.wiki/images/5/52/Bronze_med_helm.png", 0, 0, 0, 0);

currentSlot = 'cape';
addItem(currentSlot, "Red Cape", "https://oldschool.runescape.wiki/images/4/46/Red_cape.png", 0, 0, 0, 0);

currentSlot = 'neck';
addItem(currentSlot, "Amulet of accuracy", "https://oldschool.runescape.wiki/images/4/46/Red_cape.png", 0, 0, 0, 0);

currentSlot = 'ammunition';
addItem(currentSlot, "Bronze arrow", "https://oldschool.runescape.wiki/images/f/f6/Bronze_arrow_5.png", 0, 0, 0, 0);

currentSlot = 'weapon';
addItem(currentSlot, "Bronze Sword", "https://oldschool.runescape.wiki/images/b/b8/Bronze_sword.png", 0, 4, 5, 0);
addItem(currentSlot, "Bronze Scimitar", "https://oldschool.runescape.wiki/images/b/b8/Bronze_scimitar.png", 0, 0, 0, 0);

currentSlot = 'body';
addItem(currentSlot, "Bronze chainbody", "https://oldschool.runescape.wiki/images/8/85/Bronze_chainbody.png", 0, 0, 0, 0);

currentSlot = 'shield';
addItem(currentSlot, "Wooden Shield", "https://oldschool.runescape.wiki/images/d/db/Wooden_shield.png", 0, 0, 0, 5);

currentSlot = 'legs';
addItem(currentSlot, "Bronze platelegs", "https://oldschool.runescape.wiki/images/2/24/Bronze_platelegs.png", 0, 0, 0, 0);

currentSlot = 'hand';
addItem(currentSlot, "Leather gloves", "https://oldschool.runescape.wiki/images/9/95/Leather_gloves.png", 0, 0, 0, 0);

currentSlot = 'feet';
addItem(currentSlot, "Leather boots", "https://oldschool.runescape.wiki/images/e/ea/Leather_boots.png", 0, 0, 0, 0);

currentSlot = 'ring';
addItem(currentSlot, "Gold ring", "https://oldschool.runescape.wiki/images/a/ae/Gold_ring.png", 1, 0, 0, 0);

export default equipment;