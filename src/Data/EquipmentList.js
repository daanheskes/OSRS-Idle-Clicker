import bronzefullhelmImage from './../assets/items/Bronze_full_helm.png';
import ironfullhelmImage from './../assets/items/Iron_full_helm.png';
import steelfullhelmImage from './../assets/items/Steel_full_helm.png';
import blackfullhelmImage from './../assets/items/Black_full_helm.png';
import mithrilfullhelmImage from './../assets/items/Mithril_full_helm.png';
import adamantfullhelmImage from './../assets/items/Adamant_full_helm.png';
import runefullhelmImage from './../assets/items/Rune_full_helm.png';
import berserkerhelmImage from './../assets/items/Berserker_helm.png';
import redcapeImage from './../assets/items/Red_cape.png';
import obsidiancapeImage from './../assets/items/Obsidian_cape.png';
import firecapeImage from './../assets/items/Fire_cape.png';
import amuletofaccuracyImage from './../assets/items/Amulet_of_accuracy.png';
import amuletofdefenceImage from './../assets/items/Amulet_of_defence.png';
import amuletofstrengthImage from './../assets/items/Amulet_of_strength.png';
import amuletofpowerImage from './../assets/items/Amulet_of_power.png';
import amuletofgloryImage from './../assets/items/Amulet_of_glory.png';
import amuletoffuryImage from './../assets/items/Amulet_of_fury.png';
import bronzearrow5Image from './../assets/items/Bronze_arrow_5.png';
import ironarrow5Image from './../assets/items/Iron_arrow_5.png';
import steelarrow5Image from './../assets/items/Steel_arrow_5.png';
import mithrilarrow5Image from './../assets/items/Mithril_arrow_5.png';
import adamantarrow5Image from './../assets/items/Adamant_arrow_5.png';
import runearrow5Image from './../assets/items/Rune_arrow_5.png';
import amethystarrow5Image from './../assets/items/Amethyst_arrow_5.png';
import bronzescimitarImage from './../assets/items/Bronze_scimitar.png';
import ironscimitarImage from './../assets/items/Iron_scimitar.png';
import steelscimitarImage from './../assets/items/Steel_scimitar.png';
import blackscimitarImage from './../assets/items/Black_scimitar.png';
import mithrilscimitarImage from './../assets/items/Mithril_scimitar.png';
import adamantscimitarImage from './../assets/items/Adamant_scimitar.png';
import runescimitarImage from './../assets/items/Rune_scimitar.png';
import dragonscimitarImage from './../assets/items/Dragon_scimitar.png';
import shortbowImage from './../assets/items/Shortbow.png';
import bronzeplatebodyImage from './../assets/items/Bronze_platebody.png';
import ironplatebodyImage from './../assets/items/Iron_platebody.png';
import steelplatebodyImage from './../assets/items/Steel_platebody.png';
import blackplatebodyImage from './../assets/items/Black_platebody.png';
import mithrilplatebodyImage from './../assets/items/Mithril_platebody.png';
import adamantplatebodyImage from './../assets/items/Adamant_platebody.png';
import runeplatebodyImage from './../assets/items/Rune_platebody.png';
import fightertorsoImage from './../assets/items/Fighter_torso.png';
import bronzekiteshieldImage from './../assets/items/Bronze_kiteshield.png';
import ironkiteshieldImage from './../assets/items/Iron_kiteshield.png';
import steelkiteshieldImage from './../assets/items/Steel_kiteshield.png';
import blackkiteshieldImage from './../assets/items/Black_kiteshield.png';
import mithrilkiteshieldImage from './../assets/items/Mithril_kiteshield.png';
import adamantkiteshieldImage from './../assets/items/Adamant_kiteshield.png';
import runekiteshieldImage from './../assets/items/Rune_kiteshield.png';
import dragondefenderImage from './../assets/items/Dragon_defender.png';
import bronzeplatelegsImage from './../assets/items/Bronze_platelegs.png';
import ironplatelegsImage from './../assets/items/Iron_platelegs.png';
import steelplatelegsImage from './../assets/items/Steel_platelegs.png';
import blackplatelegsImage from './../assets/items/Black_platelegs.png';
import mithrilplatelegsImage from './../assets/items/Mithril_platelegs.png';
import adamantplatelegsImage from './../assets/items/Adamant_platelegs.png';
import runeplatelegsImage from './../assets/items/Rune_platelegs.png';
import leatherglovesImage from './../assets/items/Leather_gloves.png';
import leatherbootsImage from './../assets/items/Leather_boots.png';
import goldringImage from './../assets/items/Gold_ring.png';
import warriorringImage from './../assets/items/Warrior_ring.png';
import seersringImage from './../assets/items/Seers_ring.png';
import archersringImage from './../assets/items/Archers_ring.png';
import berserkerringImage from './../assets/items/Berserker_ring.png';

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

function addItem(slot, name, requirements, cost, img, income=0, atk_bonus=0, str_bonus=0, def_bonus=0, rngd_bonus=0, rngd_strength=0, mage_bonus=0, pray_bonus=0) {

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
		rngd_strength: rngd_strength,
		mage_bonus: mage_bonus,
		pray_bonus: pray_bonus
	}

	if (slot === 'weapon') {
		switch (name) {
			case 'Bronze sword':
				newItem.attackstyles = ['sword-stab', 'sword-lunge-strength', 'sword-slash', 'sword-block'];
			break;
			case 'Bronze scimitar':
			case 'Iron scimitar':
			case 'Steel scimitar':
			case 'Black scimitar':
			case 'Mithril scimitar':
			case 'Adamant scimitar':
			case 'Rune scimitar':
			case 'Dragon scimitar':
				newItem.attackstyles = ['sword-chop', 'sword-slash', 'sword-lunge-shared', 'sword-block'];
			break;
			case 'Shortbow':
				newItem.attackstyles = ['bow-accurate', 'bow-rapid', 'bow-longrange'];
				newItem.twoHanded = true;
			break;
			default:
				newItem.attackstyles = [];
			break;
		}
	}

	equipment[slot][createShortName(name)] = newItem;
}

addItem("head", "Bronze full helm", {}, 44, bronzefullhelmImage, 0, 0, 0, 5);
addItem("head", "Iron full helm", {}, 154, ironfullhelmImage, 0, 0, 0, 7);
addItem("head", "Steel full helm", { defence: 5 }, 550, steelfullhelmImage, 0, 0, 0, 10);
addItem("head", "Black full helm", { defence: 10 }, 1056, blackfullhelmImage, 0, 0, 0, 13);
addItem("head", "Mithril full helm", { defence: 20 }, 1430, mithrilfullhelmImage, 0, 0, 0, 14);
addItem("head", "Adamant full helm", { defence: 30 }, 3520, adamantfullhelmImage, 0, 0, 0, 21);
addItem("head", "Rune full helm", { defence: 40 }, 35200, runefullhelmImage, 0, 0, 0, 32);
addItem("head", "Berserker helm", { defence: 45 }, 0, berserkerhelmImage, 0, 0, 3, 33);

addItem("cape", "Red cape", {}, 2, redcapeImage, 0, 0, 0, 2);
addItem("cape", "Obsidian cape", {}, 60000, obsidiancapeImage, 0, 0, 0, 9);
addItem("cape", "Fire cape", {}, 0, firecapeImage, 0, 1, 4, 11, 1, 1);

addItem("neck", "Amulet of accuracy", {}, 1100, amuletofaccuracyImage, 0, 4, 0, 0);
addItem("neck", "Amulet of defence", {}, 1275, amuletofdefenceImage, 0, 0, 0, 7);
addItem("neck", "Amulet of strength", {}, 2025, amuletofstrengthImage, 0, 0, 10);
addItem("neck", "Amulet of power", {}, 3525, amuletofpowerImage, 0, 6, 6, 6, 6, 0, 6);
addItem("neck", "Amulet of glory", {}, 17625, amuletofgloryImage, 0, 10, 6, 3, 10, 0, 10);
addItem("neck", "Amulet of fury", {}, 1200000, amuletoffuryImage, 0, 10, 8, 15, 10, 0, 10, 10);

addItem("ammunition", "Bronze arrow", {}, 1, bronzearrow5Image, 0, 0, 0, 0, 0, 7);
addItem("ammunition", "Iron arrow", {}, 3, ironarrow5Image, 0, 0, 0, 0, 0, 10);
addItem("ammunition", "Steel arrow", {}, 12, steelarrow5Image, 0, 0, 0, 0, 0, 16);
addItem("ammunition", "Mithril arrow", {}, 32, mithrilarrow5Image, 0, 0, 0, 0, 0, 22);
addItem("ammunition", "Adamant arrow", {}, 80, adamantarrow5Image, 0, 0, 0, 0, 0, 31);
addItem("ammunition", "Rune arrow", {}, 240, runearrow5Image, 0, 0, 0, 0, 0, 49);
addItem("ammunition", "Amethyst arrow", {}, 300, amethystarrow5Image, 0, 0, 0, 0, 0, 55);

// Melee
addItem("weapon", "Bronze scimitar", {}, 32, bronzescimitarImage, 0, 7, 6, 1);
addItem("weapon", "Iron scimitar", {}, 112, ironscimitarImage, 0, 10, 9, 1);
addItem("weapon", "Steel scimitar", { attack: 5 }, 400, steelscimitarImage, 0, 15, 14, 1);
addItem("weapon", "Black scimitar", { attack: 10 }, 768, blackscimitarImage, 0, 19, 14, 1);
addItem("weapon", "Mithril scimitar", { attack: 20 }, 1040, mithrilscimitarImage, 0, 21, 20, 1);
addItem("weapon", "Adamant scimitar", { attack: 30 }, 2560, adamantscimitarImage, 0, 29, 28, 1);
addItem("weapon", "Rune scimitar", { attack: 40 }, 25600, runescimitarImage, 0, 45, 44, 1);
addItem("weapon", "Dragon scimitar", { attack: 60 }, 100000, dragonscimitarImage, 0, 67, 66, 1);
// Ranged
addItem("weapon", "Shortbow", {}, 50, shortbowImage, 0, 0, 0, 0, 8);

addItem("body", "Bronze platebody", {}, 160, bronzeplatebodyImage, 0, 0, 0, 15);
addItem("body", "Iron platebody", {}, 560, ironplatebodyImage, 0, 0, 0, 21);
addItem("body", "Steel platebody", { defence: 5 }, 2000, steelplatebodyImage, 0, 0, 0, 32);
addItem("body", "Black platebody", { defence: 10 }, 3840, blackplatebodyImage, 0, 0, 0, 41);
addItem("body", "Mithril platebody", { defence: 20 }, 5200, mithrilplatebodyImage, 0, 0, 0, 46);
addItem("body", "Adamant platebody", { defence: 30 }, 16640, adamantplatebodyImage, 0, 0, 0, 65);
addItem("body", "Rune platebody", { defence: 40 }, 65000, runeplatebodyImage, 0, 0, 0, 82);
addItem("body", "Fighter torso", { defence: 40 }, 0, fightertorsoImage, 0, 0, 4, 85);

addItem("shield", "Bronze kiteshield", {}, 68, bronzekiteshieldImage, 0, 0, 0, 7);
addItem("shield", "Iron kiteshield", {}, 238, ironkiteshieldImage, 0, 0, 0, 10);
addItem("shield", "Steel kiteshield", { defence: 5 }, 850, steelkiteshieldImage, 0, 0, 0, 15);
addItem("shield", "Black kiteshield", { defence: 10 }, 1632, blackkiteshieldImage, 0, 0, 0, 19);
addItem("shield", "Mithril kiteshield", { defence: 20 }, 2210, mithrilkiteshieldImage, 0, 0, 0, 22);
addItem("shield", "Adamant kiteshield", { defence: 30 }, 5440, adamantkiteshieldImage, 0, 0, 0, 31);
addItem("shield", "Rune kiteshield", { defence: 40 }, 54400, runekiteshieldImage, 0, 0, 0, 48);

addItem("shield", "Bronze defender", {}, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Iron defender", {}, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Steel defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Black defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Mithril defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Adamant defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Rune defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Dragon defender", { defence: 60 }, 0, dragondefenderImage, 0, 25, 6, 25);
addItem("shield", "Avernic defender", { attack: 70, defence: 70, item: "Dragon defender" }, 0, dragondefenderImage, 0, 25, 6, 25);

addItem("legs", "Bronze platelegs", {}, 80, bronzeplatelegsImage, 0, 0, 0, 8);
addItem("legs", "Iron platelegs", {}, 280, ironplatelegsImage, 0, 0, 0, 11);
addItem("legs", "Steel platelegs", { defence: 5 }, 1000, steelplatelegsImage, 0, 0, 0, 17);
addItem("legs", "Black platelegs", { defence: 10 }, 1920, blackplatelegsImage, 0, 0, 0, 21);
addItem("legs", "Mithril platelegs", { defence: 20 }, 2600, mithrilplatelegsImage, 0, 0, 0, 24);
addItem("legs", "Adamant platelegs", { defence: 30 }, 6400, adamantplatelegsImage, 0, 0, 0, 33);
addItem("legs", "Rune platelegs", { defence: 40 }, 64000, runeplatelegsImage, 0, 0, 0, 51);

addItem("hand", "Leather gloves", {}, 6, leatherglovesImage, 0, 0, 0, 2);

addItem("feet", "Leather boots", {}, 6, leatherbootsImage, 0, 0, 0, 1);

addItem("ring", "Gold ring", {}, 210, goldringImage, 1, 0, 0, 0);
addItem("ring", "Warrior ring", {}, 100000, warriorringImage, 0, 4, 0, 4);
addItem("ring", "Seers ring", {}, 850000, seersringImage, 0, 0, 0, 4, 0, 4);
addItem("ring", "Archers ring", {}, 1200000, archersringImage, 0, 0, 0, 4, 4);
addItem("ring", "Berserker ring", {}, 1400000, berserkerringImage, 0, 0, 4, 4);

export default equipment;