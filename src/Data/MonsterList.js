import chickenImage from './../assets/monsters/Chicken.png';
import goblinImage from './../assets/monsters/Goblin.png';
import cowCalfImage from './../assets/monsters/Cow_calf.png';
import cowImage from './../assets/monsters/Cow.png';
import highwaymanImage from './../assets/monsters/Highwayman.png';
import darkwizardImage from './../assets/monsters/Dark_wizard.png';
import dwarfImage from './../assets/monsters/Dwarf.png';
import alkharidwarriorImage from './../assets/monsters/Al-Kharid_warrior.png';
import wolfImage from './../assets/monsters/Wolf.png';
import minotaurImage from './../assets/monsters/Minotaur.png';
import scorpionImage from './../assets/monsters/Scorpion.png';
import kingScorpionImage from './../assets/monsters/King_Scorpion.png';
import guardImage from './../assets/monsters/Guard.png';
import hillgiantImage from './../assets/monsters/Hill_giant.png';
import mossgiantImage from './../assets/monsters/Moss_giant.png';
import cyclopsImage from './../assets/monsters/Cyclops.png';
import tztokjadImage from './../assets/monsters/TzTok-Jad.png';
import penancequeenImage from './../assets/monsters/Penance_Queen.png';

export default {
	chicken: {
		name: "Chicken",
		combatlevel: 1,
		img: chickenImage,
		hitpoints: 3,
		bones: "Bones"
	},
	goblin: {
		name: "Goblin",
		combatlevel: 2,
		hitpoints: 5,
		img: goblinImage,
		bones: "Bones"
	},
	cowcalf: {
		name: "Cow calf",
		combatlevel: 2,
		hitpoints: 6,
		img: cowCalfImage,
		bones: "Bones"
	},
	cow: {
		name: "Cow",
		combatlevel: 2,
		hitpoints: 8,
		img: cowImage,
		bones: "Bones"
	},
	highwayman: {
		name: "Highwayman",
		combatlevel: 5,
		hitpoints: 13,
		img: highwaymanImage,
		bones: "Bones"
	},
	darkwizard: {
		name: "Dark wizard",
		combatlevel: 7,
		hitpoints: 12,
		img: darkwizardImage,
		bones: "Bones"
	},
	dwarf: {
		name: "Dwarf",
		combatlevel: 10,
		hitpoints: 16,
		img: dwarfImage,
		bones: "Bones"
	},
	alkharidwarrior: {
		name: "Al-Kharid warrior",
		combatlevel: 9,
		hitpoints: 19,
		img: alkharidwarriorImage,
		bones: "Bones"
	},
	wolf: {
		name: "Wolf",
		combatlevel: 11,
		hitpoints: 10,
		img: wolfImage,
		bones: "Bones"
	},
	minotaur: {
		name: "Minotaur",
		combatlevel: 12,
		hitpoints: 10,
		img: minotaurImage,
		bones: "Bones"
	},
	scorpion: {
		name: "Scorpion",
		combatlevel: 14,
		hitpoints: 17,
		img: scorpionImage,
		bones: null
	},
	guard: {
		name: "Guard",
		combatlevel: 21,
		hitpoints: 22,
		img: guardImage,
		bones: "Bones"
	},
	hillgiant: {
		name: "Hill Giant",
		combatlevel: 28,
		hitpoints: 35,
		img: hillgiantImage,
		bones: "Big bones"
	},
	kingScorpion: {
		name: "King Scorpion",
		combatLevel: 32,
		hitpoints: 30,
		img: kingScorpionImage,
		bones: null
	},
	mossgiant: {
		name: "Moss Giant",
		combatlevel: 42,
		hitpoints: 60,
		img: mossgiantImage,
		bones: "Big bones"
	},
	cyclops: {
		name: "Cyclops",
		combatlevel: 46,
		hitpoints: 75,
		img: cyclopsImage,
		bones: "Big bones",
		boss: true,
		drop: "Defender"
	},
	tztokjad: {
		name: "TzTok-Jad",
		combatlevel: 54,
		hitpoints: 75,
		img: tztokjadImage,
		bones: null,
		boss: true,
		drop: "Fire cape"
	},
	penancequeen: {
		name: "Penance Queen",
		combatlevel: 69,
		hitpoints: 250,
		img: penancequeenImage,
		bones: null,
		boss: true,
		drop: "Fighter torso"
	}
}
