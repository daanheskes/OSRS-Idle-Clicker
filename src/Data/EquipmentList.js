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
import abyssalWhipImage from './../assets/items/Abyssal_whip.png';
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
import bronzedefenderImage from './../assets/items/Bronze_defender.png';
import irondefenderImage from './../assets/items/Iron_defender.png';
import steeldefenderImage from './../assets/items/Steel_defender.png';
import blackdefenderImage from './../assets/items/Black_defender.png';
import mithrildefenderImage from './../assets/items/Mithril_defender.png';
import adamantdefenderImage from './../assets/items/Adamant_defender.png';
import runedefenderImage from './../assets/items/Rune_defender.png';
import dragondefenderImage from './../assets/items/Dragon_defender.png';
import avernicdefenderImage from './../assets/items/Avernic_defender.png';
import bronzeplatelegsImage from './../assets/items/Bronze_platelegs.png';
import ironplatelegsImage from './../assets/items/Iron_platelegs.png';
import steelplatelegsImage from './../assets/items/Steel_platelegs.png';
import blackplatelegsImage from './../assets/items/Black_platelegs.png';
import mithrilplatelegsImage from './../assets/items/Mithril_platelegs.png';
import adamantplatelegsImage from './../assets/items/Adamant_platelegs.png';
import runeplatelegsImage from './../assets/items/Rune_platelegs.png';
import leatherglovesImage from './../assets/items/Leather_gloves.png';
import combatbraceletImage from './../assets/items/Combat_bracelet.png';
import leatherbootsImage from './../assets/items/Leather_boots.png';
import bronzebootsImage from './../assets/items/Bronze_boots.png';
import ironbootsImage from './../assets/items/Iron_boots.png';
import steelbootsImage from './../assets/items/Steel_boots.png';
import blackbootsImage from './../assets/items/Black_boots.png';
import mithrilbootsImage from './../assets/items/Mithril_boots.png';
import adamantbootsImage from './../assets/items/Adamant_boots.png';
import runebootsImage from './../assets/items/Rune_boots.png';
import dragonbootsImage from './../assets/items/Dragon_boots.png';
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

	let newItem = {slot, name, cost, requirements, img, income, atk_bonus, str_bonus, def_bonus, rngd_bonus, rngd_strength, mage_bonus, pray_bonus}

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
			case 'Abyssal whip':
				newItem.attackstyles = ['whip-flick', 'whip-lash', 'whip-deflect'];
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

addItem('head', 'Bronze full helm', {}, 44, bronzefullhelmImage, 0, 0, 0, 5, -2, 0, -6);
addItem('head', 'Iron full helm', {}, 154, ironfullhelmImage, 0, 0, 0, 7, -2, 0, -6);
addItem('head', 'Steel full helm', {defence: 5}, 550, steelfullhelmImage, 0, 0, 0, 10, -2, 0, -6);
addItem('head', 'Black full helm', {defence: 10}, 1056, blackfullhelmImage, 0, 0, 0, 13, -2, 0, -6);
addItem('head', 'Mithril full helm', {defence: 20}, 1430, mithrilfullhelmImage, 0, 0, 0, 14, -2, 0, -6);
addItem('head', 'Adamant full helm', {defence: 30}, 3520, adamantfullhelmImage, 0, 0, 0, 21, -2, 0, -6);
addItem('head', 'Rune full helm', {defence: 40}, 35200, runefullhelmImage, 0, 0, 0, 32, -2, 0, -6);
addItem('head', 'Berserker helm', {defence: 45}, 0, berserkerhelmImage, 0, 0, 3, 33, -5, 0, -5);

addItem('cape', 'Red cape', {}, 2, redcapeImage, 0, 0, 0, 2);
addItem('cape', 'Obsidian cape', {}, 60000, obsidiancapeImage, 0, 0, 0, 9);
addItem('cape', 'Fire cape', {}, 0, firecapeImage, 0, 1, 4, 11, 1, 1);

addItem('neck', 'Amulet of accuracy', {}, 1100, amuletofaccuracyImage, 0, 4, 0, 0);
addItem('neck', 'Amulet of defence', {}, 1275, amuletofdefenceImage, 0, 0, 0, 7);
addItem('neck', 'Amulet of strength', {}, 2025, amuletofstrengthImage, 0, 0, 10);
addItem('neck', 'Amulet of power', {}, 3525, amuletofpowerImage, 0, 6, 6, 6, 6, 0, 6);
addItem('neck', 'Amulet of glory', {}, 17625, amuletofgloryImage, 0, 10, 6, 3, 10, 0, 10);
addItem('neck', 'Amulet of fury', {}, 1200000, amuletoffuryImage, 0, 10, 8, 15, 10, 0, 10, 10);

addItem('ammunition', 'Bronze arrow', {}, 1, bronzearrow5Image, 0, 0, 0, 0, 0, 7);
addItem('ammunition', 'Iron arrow', {}, 3, ironarrow5Image, 0, 0, 0, 0, 0, 10);
addItem('ammunition', 'Steel arrow', {}, 12, steelarrow5Image, 0, 0, 0, 0, 0, 16);
addItem('ammunition', 'Mithril arrow', {}, 32, mithrilarrow5Image, 0, 0, 0, 0, 0, 22);
addItem('ammunition', 'Adamant arrow', {}, 80, adamantarrow5Image, 0, 0, 0, 0, 0, 31);
addItem('ammunition', 'Rune arrow', {}, 240, runearrow5Image, 0, 0, 0, 0, 0, 49);
addItem('ammunition', 'Amethyst arrow', {}, 300, amethystarrow5Image, 0, 0, 0, 0, 0, 55);

// Melee
addItem('weapon', 'Bronze scimitar', {}, 32, bronzescimitarImage, 0, 7, 6, 1);
addItem('weapon', 'Iron scimitar', {}, 112, ironscimitarImage, 0, 10, 9, 1);
addItem('weapon', 'Steel scimitar', {attack: 5}, 400, steelscimitarImage, 0, 15, 14, 1);
addItem('weapon', 'Black scimitar', {attack: 10}, 768, blackscimitarImage, 0, 19, 14, 1);
addItem('weapon', 'Mithril scimitar', {attack: 20}, 1040, mithrilscimitarImage, 0, 21, 20, 1);
addItem('weapon', 'Adamant scimitar', {attack: 30}, 2560, adamantscimitarImage, 0, 29, 28, 1);
addItem('weapon', 'Rune scimitar', {attack: 40}, 25600, runescimitarImage, 0, 45, 44, 1);
addItem('weapon', 'Dragon scimitar', {attack: 60}, 100000, dragonscimitarImage, 0, 67, 66, 1);
addItem('weapon', 'Abyssal Whip', {attack: 70}, 1200000, abyssalWhipImage, 0, 82, 82, 0);

// Ranged
addItem('weapon', 'Shortbow', {}, 50, shortbowImage, 0, 0, 0, 0, 8);

addItem('body', 'Bronze platebody', {}, 160, bronzeplatebodyImage, 0, 0, 0, 15, -10, 0, -30);
addItem('body', 'Iron platebody', {}, 560, ironplatebodyImage, 0, 0, 0, 21, -10, 0, -30);
addItem('body', 'Steel platebody', {defence: 5}, 2000, steelplatebodyImage, 0, 0, 0, 32, -10, 0, -30);
addItem('body', 'Black platebody', {defence: 10}, 3840, blackplatebodyImage, 0, 0, 0, 41, -10, 0, -30);
addItem('body', 'Mithril platebody', {defence: 20}, 5200, mithrilplatebodyImage, 0, 0, 0, 46, -10, 0, -30);
addItem('body', 'Adamant platebody', {defence: 30}, 16640, adamantplatebodyImage, 0, 0, 0, 65, -10, 0, -30);
addItem('body', 'Rune platebody', {defence: 40}, 65000, runeplatebodyImage, 0, 0, 0, 82, -10, 0, -30);
addItem('body', 'Fighter torso', {defence: 40}, 0, fightertorsoImage, 0, 0, 4, 85, 0, 0, -40);

addItem('shield', 'Bronze kiteshield', {}, 68, bronzekiteshieldImage, 0, 0, 0, 7, -2, 0, -8);
addItem('shield', 'Iron kiteshield', {}, 238, ironkiteshieldImage, 0, 0, 0, 10, -2, 0, -8);
addItem('shield', 'Steel kiteshield', {defence: 5}, 850, steelkiteshieldImage, 0, 0, 0, 15, -2, 0, -8);
addItem('shield', 'Black kiteshield', {defence: 10}, 1632, blackkiteshieldImage, 0, 0, 0, 19, -2, 0, -8);
addItem('shield', 'Mithril kiteshield', {defence: 20}, 2210, mithrilkiteshieldImage, 0, 0, 0, 22, -2, 0, -8);
addItem('shield', 'Adamant kiteshield', {defence: 30}, 5440, adamantkiteshieldImage, 0, 0, 0, 31, -2, 0, -8);
addItem('shield', 'Rune kiteshield', {defence: 40}, 54400, runekiteshieldImage, 0, 0, 0, 48, -2, 0, -8);
addItem('shield', 'Bronze defender', {}, 0, bronzedefenderImage, 0, 3, 0, 3, -2, 0, -3);
addItem('shield', 'Iron defender', {}, 0, irondefenderImage, 0, 5, 0, 5, -2, 0, -3);
addItem('shield', 'Steel defender', {attack: 5, defence: 5}, 0, steeldefenderImage, 0, 7, 1, 7, -2, 0, -3);
addItem('shield', 'Black defender', {attack: 10, defence: 10}, 0, blackdefenderImage, 0, 9, 2, 9, -2, 0, -3);
addItem('shield', 'Mithril defender', {attack: 20, defence: 20}, 0, mithrildefenderImage, 0, 10, 3, 10, -2, 0, -3);
addItem('shield', 'Adamant defender', {attack: 30, defence: 30}, 0, adamantdefenderImage, 0, 13, 4, 13, -2, 0, -3);
addItem('shield', 'Rune defender', {attack: 40, defence: 40}, 0, runedefenderImage, 0, 20, 5, 20, -2, 0, -3);
addItem('shield', 'Dragon defender', {attack: 60, defence: 60}, 0, dragondefenderImage, 0, 25, 6, 25, -2, 0, -3);
addItem('shield', 'Avernic defender', {attack: 70, defence: 70, item: 'Dragon defender'}, 35000000, avernicdefenderImage, 0, 30, 8, 30, -4, 0, -5);

addItem('legs', 'Bronze platelegs', {}, 80, bronzeplatelegsImage, 0, 0, 0, 8, -7, 0, -21);
addItem('legs', 'Iron platelegs', {}, 280, ironplatelegsImage, 0, 0, 0, 11, -7, 0, -21);
addItem('legs', 'Steel platelegs', {defence: 5}, 1000, steelplatelegsImage, 0, 0, 0, 17, -7, 0, -21);
addItem('legs', 'Black platelegs', {defence: 10}, 1920, blackplatelegsImage, 0, 0, 0, 21, -7, 0, -21);
addItem('legs', 'Mithril platelegs', {defence: 20}, 2600, mithrilplatelegsImage, 0, 0, 0, 24, -7, 0, -21);
addItem('legs', 'Adamant platelegs', {defence: 30}, 6400, adamantplatelegsImage, 0, 0, 0, 33, -7, 0, -21);
addItem('legs', 'Rune platelegs', {defence: 40}, 64000, runeplatelegsImage, 0, 0, 0, 51, -7, 0, -21);

addItem('hand', 'Leather gloves', {}, 6, leatherglovesImage, 0, 0, 0, 2);
addItem('hand', 'Combat bracelet', {}, 21040, combatbraceletImage, 0, 7, 6, 5, 5, 0, 3);

addItem('feet', 'Leather boots', {}, 6, leatherbootsImage, 0, 0, 0, 1);
addItem('feet', 'Bronze boots', {}, 24, bronzebootsImage, 0, 0, 0, 3, -1, 0, -3);
addItem('feet', 'Iron boots', {}, 84, ironbootsImage, 0, 0, 0, 4, -1, 0, -3);
addItem('feet', 'Steel boots', {defence: 5}, 300, steelbootsImage, 0, 0, 0, 7, -1, 0, -3);
addItem('feet', 'Black boots', {defence: 10}, 576, blackbootsImage, 0, 0, 0, 9, -1, 0, -3);
addItem('feet', 'Mithril boots', {defence: 20}, 780, mithrilbootsImage, 0, 0, 0, 10, -1, 0, -3);
addItem('feet', 'Adamant boots', {defence: 30}, 1920, adamantbootsImage, 0, 0, 1, 12, -1, 0, -3);
addItem('feet', 'Rune boots', {defence: 40}, 12500, runebootsImage, 0, 0, 2, 14, -1, 0, -3);
addItem('feet', 'Dragon boots', {}, 350000, dragonbootsImage, 0, 0, 4, 18, -1, 0, -3);

addItem('ring', 'Gold ring', {}, 210, goldringImage, 1, 0, 0, 0);
addItem('ring', 'Warrior ring', {}, 100000, warriorringImage, 0, 4, 0, 4);
addItem('ring', 'Seers ring', {}, 850000, seersringImage, 0, 0, 0, 4, 0, 4);
addItem('ring', 'Archers ring', {}, 1200000, archersringImage, 0, 0, 0, 4, 4);
addItem('ring', 'Berserker ring', {}, 1400000, berserkerringImage, 0, 0, 4, 4);

export default equipment;