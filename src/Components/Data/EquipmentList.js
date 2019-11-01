import bronzefullhelmImage from './../../assets/items/Bronze_full_helm.png';
import ironfullhelmImage from './../../assets/items/Iron_full_helm.png';
import steelfullhelmImage from './../../assets/items/Steel_full_helm.png';
import blackfullhelmImage from './../../assets/items/Black_full_helm.png';
import mithrilfullhelmImage from './../../assets/items/Mithril_full_helm.png';
import adamantfullhelmImage from './../../assets/items/Adamant_full_helm.png';
import runefullhelmImage from './../../assets/items/Rune_full_helm.png';
import berserkerhelmImage from './../../assets/items/Berserker_helm.png';
import redcapeImage from './../../assets/items/Red_cape.png';
import obsidiancapeImage from './../../assets/items/Obsidian_cape.png';
import firecapeImage from './../../assets/items/Fire_cape.png';
import amuletofaccuracyImage from './../../assets/items/Amulet_of_accuracy.png';
import amuletofdefenceImage from './../../assets/items/Amulet_of_defence.png';
import amuletofstrengthImage from './../../assets/items/Amulet_of_strength.png';
import amuletofpowerImage from './../../assets/items/Amulet_of_power.png';
import amuletofgloryImage from './../../assets/items/Amulet_of_glory.png';
import amuletoffuryImage from './../../assets/items/Amulet_of_fury.png';
import bronzearrow5Image from './../../assets/items/Bronze_arrow_5.png';
import ironarrow5Image from './../../assets/items/Iron_arrow_5.png';
import steelarrow5Image from './../../assets/items/Steel_arrow_5.png';
import mithrilarrow5Image from './../../assets/items/Mithril_arrow_5.png';
import adamantarrow5Image from './../../assets/items/Adamant_arrow_5.png';
import runearrow5Image from './../../assets/items/Rune_arrow_5.png';
import amethystarrow5Image from './../../assets/items/Amethyst_arrow_5.png';
import bronzeswordImage from './../../assets/items/Bronze_sword.png';
import bronzescimitarImage from './../../assets/items/Bronze_scimitar.png';
import ironscimitarImage from './../../assets/items/Iron_scimitar.png';
import steelscimitarImage from './../../assets/items/Steel_scimitar.png';
import blackscimitarImage from './../../assets/items/Black_scimitar.png';
import mithrilscimitarImage from './../../assets/items/Mithril_scimitar.png';
import adamantscimitarImage from './../../assets/items/Adamant_scimitar.png';
import runescimitarImage from './../../assets/items/Rune_scimitar.png';
import dragonscimitarImage from './../../assets/items/Dragon_scimitar.png';
import shortbowImage from './../../assets/items/Shortbow.png';
import bronzeplatebodyImage from './../../assets/items/Bronze_platebody.png';
import ironplatebodyImage from './../../assets/items/Iron_platebody.png';
import steelplatebodyImage from './../../assets/items/Steel_platebody.png';
import blackplatebodyImage from './../../assets/items/Black_platebody.png';
import mithrilplatebodyImage from './../../assets/items/Mithril_platebody.png';
import adamantplatebodyImage from './../../assets/items/Adamant_platebody.png';
import runeplatebodyImage from './../../assets/items/Rune_platebody.png';
import fightertorsoImage from './../../assets/items/Fighter_torso.png';
import woodenShield from './../../assets/items/Wooden_shield.png';
import bronzekiteshieldImage from './../../assets/items/Bronze_kiteshield.png';
import ironkiteshieldImage from './../../assets/items/Iron_kiteshield.png';
import steelkiteshieldImage from './../../assets/items/Steel_kiteshield.png';
import blackkiteshieldImage from './../../assets/items/Black_kiteshield.png';
import mithrilkiteshieldImage from './../../assets/items/Mithril_kiteshield.png';
import adamantkiteshieldImage from './../../assets/items/Adamant_kiteshield.png';
import runekiteshieldImage from './../../assets/items/Rune_kiteshield.png';
import dragondefenderImage from './../../assets/items/Dragon_defender.png';
import bronzeplatelegsImage from './../../assets/items/Bronze_platelegs.png';
import ironplatelegsImage from './../../assets/items/Iron_platelegs.png';
import steelplatelegsImage from './../../assets/items/Steel_platelegs.png';
import blackplatelegsImage from './../../assets/items/Black_platelegs.png';
import mithrilplatelegsImage from './../../assets/items/Mithril_platelegs.png';
import adamantplatelegsImage from './../../assets/items/Adamant_platelegs.png';
import runeplatelegsImage from './../../assets/items/Rune_platelegs.png';
import leatherglovesImage from './../../assets/items/Leather_gloves.png';
import leatherbootsImage from './../../assets/items/Leather_boots.png';
import goldringImage from './../../assets/items/Gold_ring.png';
import warriorringImage from './../../assets/items/Warrior_ring.png';
import seersringImage from './../../assets/items/Seers_ring.png';
import archersringImage from './../../assets/items/Archers_ring.png';
import berserkerringImage from './../../assets/items/Berserker_ring.png';

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

function addItem(slot, name, requirements, cost, img, income=0, atk_bonus=0, str_bonus=0, def_bonus=0, rngd_bonus=0, mage_bonus=0, pray_bonus=0) {

    let newItem = {
        slot: slot,
        name: name,
        cost: cost,
        requirements: requirements,
        img: img,
        income: income,
        atk_bonus: atk_bonus,
        str_bonus: str_bonus,
        def_bonus: def_bonus,
        rngd_bonus: rngd_bonus,
        mage_bonus: mage_bonus,
        pray_bonus: pray_bonus
    }

    equipment[slot][createShortName(name)] = newItem;
}

let currentSlot = 'head';
addItem(currentSlot, "Bronze full helm", {}, 44, bronzefullhelmImage, 0, 0, 0, 5);
addItem(currentSlot, "Iron full helm", {}, 154, ironfullhelmImage, 0, 0, 0, 7);
addItem(currentSlot, "Steel full helm", { defence: 5 }, 550, steelfullhelmImage, 0, 0, 0, 10);
addItem(currentSlot, "Black full helm", { defence: 10 }, 1056, blackfullhelmImage, 0, 0, 0, 13);
addItem(currentSlot, "Mithril full helm", { defence: 20 }, 1430, mithrilfullhelmImage, 0, 0, 0, 14);
addItem(currentSlot, "Adamant full helm", { defence: 30 }, 3520, adamantfullhelmImage, 0, 0, 0, 21);
addItem(currentSlot, "Rune full helm", { defence: 40 }, 35200, runefullhelmImage, 0, 0, 0, 32);
addItem(currentSlot, "Berserker helm", { defence: 45 }, 0, berserkerhelmImage, 0, 0, 3, 33);

currentSlot = 'cape';
addItem(currentSlot, "Red cape", {}, 2, redcapeImage, 0, 0, 0, 2);
addItem(currentSlot, "Obsidian cape", {}, 60000, obsidiancapeImage, 0, 0, 0, 9);
addItem(currentSlot, "Fire cape", {}, 0, firecapeImage, 0, 1, 4, 11, 1, 1);

currentSlot = 'neck';
addItem(currentSlot, "Amulet of accuracy", {}, 1100, amuletofaccuracyImage, 0, 4, 0, 0);
addItem(currentSlot, "Amulet of defence", {}, 1275, amuletofdefenceImage, 0, 0, 0, 7);
addItem(currentSlot, "Amulet of strength", {}, 2025, amuletofstrengthImage, 0, 0, 10);
addItem(currentSlot, "Amulet of power", {}, 3525, amuletofpowerImage, 0, 6, 6, 6, 6, 6);
addItem(currentSlot, "Amulet of glory", {}, 17625, amuletofgloryImage, 0, 10, 6, 3, 10, 10);
addItem(currentSlot, "Amulet of fury", {}, 1200000, amuletoffuryImage, 0, 10, 8, 15, 10, 10, 10);

currentSlot = 'ammunition';
addItem(currentSlot, "Bronze arrow", {}, 1, bronzearrow5Image, 0, 0, 0, 0, 7);
addItem(currentSlot, "Iron arrow", {}, 3, ironarrow5Image, 0, 0, 0, 0, 10);
addItem(currentSlot, "Steel arrow", {}, 12, steelarrow5Image, 0, 0, 0, 0, 16);
addItem(currentSlot, "Mithril arrow", {}, 32, mithrilarrow5Image, 0, 0, 0, 0, 22);
addItem(currentSlot, "Adamant arrow", {}, 80, adamantarrow5Image, 0, 0, 0, 0, 31);
addItem(currentSlot, "Rune arrow", {}, 240, runearrow5Image, 0, 0, 0, 0, 49);
addItem(currentSlot, "Amethyst arrow", {}, 300, amethystarrow5Image, 0, 0, 0, 0, 55);

currentSlot = 'weapon';
// Melee
addItem(currentSlot, "Bronze sword", {}, 26, bronzeswordImage, 0, 4, 5, 0);
addItem(currentSlot, "Bronze scimitar", {}, 32, bronzescimitarImage, 0, 7, 6, 1);
addItem(currentSlot, "Iron scimitar", {}, 112, ironscimitarImage, 0, 10, 9, 1);
addItem(currentSlot, "Steel scimitar", { attack: 5 }, 400, steelscimitarImage, 0, 15, 14, 1);
addItem(currentSlot, "Black scimitar", { attack: 10 }, 768, blackscimitarImage, 0, 19, 14, 1);
addItem(currentSlot, "Mithril scimitar", { attack: 20 }, 1040, mithrilscimitarImage, 0, 21, 20, 1);
addItem(currentSlot, "Adamant scimitar", { attack: 30 }, 2560, adamantscimitarImage, 0, 29, 28, 1);
addItem(currentSlot, "Rune scimitar", { attack: 40 }, 25600, runescimitarImage, 0, 45, 44, 1);
addItem(currentSlot, "Dragon scimitar", { attack: 60 }, 100000, dragonscimitarImage, 0, 67, 66, 1);
// Ranged
addItem(currentSlot, "Shortbow", {}, 50, shortbowImage, 0, 0, 0, 0, 8)

currentSlot = 'body';
addItem(currentSlot, "Bronze platebody", {}, 160, bronzeplatebodyImage, 0, 0, 0, 15);
addItem(currentSlot, "Iron platebody", {}, 560, ironplatebodyImage, 0, 0, 0, 21);
addItem(currentSlot, "Steel platebody", { defence: 5 }, 2000, steelplatebodyImage, 0, 0, 0, 32);
addItem(currentSlot, "Black platebody", { defence: 10 }, 3840, blackplatebodyImage, 0, 0, 0, 41);
addItem(currentSlot, "Mithril platebody", { defence: 20 }, 5200, mithrilplatebodyImage, 0, 0, 0, 46);
addItem(currentSlot, "Adamant platebody", { defence: 30 }, 16640, adamantplatebodyImage, 0, 0, 0, 65);
addItem(currentSlot, "Rune platebody", { defence: 40 }, 65000, runeplatebodyImage, 0, 0, 0, 82);
addItem(currentSlot, "Fighter torso", { defence: 40 }, 0, fightertorsoImage, 0, 0, 4, 85);

currentSlot = 'shield';
addItem(currentSlot, "Wooden shield", {}, 20, woodenShield, 0, 0, 0, 5);
addItem(currentSlot, "Bronze kiteshield", {}, 68, bronzekiteshieldImage, 0, 0, 0, 7);
addItem(currentSlot, "Iron kiteshield", {}, 238, ironkiteshieldImage, 0, 0, 0, 10);
addItem(currentSlot, "Steel kiteshield", { defence: 5 }, 850, steelkiteshieldImage, 0, 0, 0, 15);
addItem(currentSlot, "Black kiteshield", { defence: 10 }, 1632, blackkiteshieldImage, 0, 0, 0, 19);
addItem(currentSlot, "Mithril kiteshield", { defence: 20 }, 2210, mithrilkiteshieldImage, 0, 0, 0, 22);
addItem(currentSlot, "Adamant kiteshield", { defence: 30 }, 5440, adamantkiteshieldImage, 0, 0, 0, 31);
addItem(currentSlot, "Rune kiteshield", { defence: 40 }, 54400, runekiteshieldImage, 0, 0, 0, 48);
addItem(currentSlot, "Dragon defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);

currentSlot = 'legs';
addItem(currentSlot, "Bronze platelegs", {}, 80, bronzeplatelegsImage, 0, 0, 0, 8);
addItem(currentSlot, "Iron platelegs", {}, 280, ironplatelegsImage, 0, 0, 0, 11);
addItem(currentSlot, "Steel platelegs", { defence: 5 }, 1000, steelplatelegsImage, 0, 0, 0, 17);
addItem(currentSlot, "Black platelegs", { defence: 10 }, 1920, blackplatelegsImage, 0, 0, 0, 21);
addItem(currentSlot, "Mithril platelegs", { defence: 20 }, 2600, mithrilplatelegsImage, 0, 0, 0, 24);
addItem(currentSlot, "Adamant platelegs", { defence: 30 }, 6400, adamantplatelegsImage, 0, 0, 0, 33);
addItem(currentSlot, "Rune platelegs", { defence: 40 }, 64000, runeplatelegsImage, 0, 0, 0, 51);

currentSlot = 'hand';
addItem(currentSlot, "Leather gloves", {}, 6, leatherglovesImage, 0, 0, 0, 2);

currentSlot = 'feet';
addItem(currentSlot, "Leather boots", {}, 6, leatherbootsImage, 0, 0, 0, 1);

currentSlot = 'ring';
addItem(currentSlot, "Gold ring", {}, 210, goldringImage, 1, 0, 0, 0);
addItem(currentSlot, "Warrior ring", {}, 100000, warriorringImage, 0, 4, 0, 4);
addItem(currentSlot, "Seers ring", {}, 1000000, seersringImage, 0, 0, 0, 4, 0, 4);
addItem(currentSlot, "Archers ring", {}, 1000000, archersringImage, 0, 0, 0, 4, 4);
addItem(currentSlot, "Berserker ring", {}, 1000000, berserkerringImage, 0, 0, 4, 4);

export default equipment;