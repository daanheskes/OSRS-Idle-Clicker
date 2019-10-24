function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		return images[item.replace('./', '')] = r(item);
	});
	return images;
}

const images = importAll(require.context('./../../assets/monsters', false, /\.png$/));

export default {
	chicken: {
		name: "Chicken",
		combatlevel: 1,
		img: images['Chicken.png'],
		hitpoints: 3,
		bones: "Bones"
	},
	goblin: {
		name: "Goblin",
		combatlevel: 2,
		hitpoints: 5,
		img: images['Goblin.png'],
		bones: "Bones"
	},
	cowcalf: {
		name: "Cow calf",
		combatlevel: 2,
		hitpoints: 6,
		img: images['Cow_calf.png'],
		bones: "Bones"
	},
	cow: {
		name: "Cow",
		combatlevel: 2,
		hitpoints: 8,
		img: images['Cow.png'],
		bones: "Bones"
	},
	highwayman: {
		name: "Highwayman",
		combatlevel: 5,
		hitpoints: 13,
		img: images['Highwayman.png'],
		bones: "Bones"
	},
	darkwizard: {
		name: "Dark wizard",
		combatlevel: 7,
		hitpoints: 12,
		img: images['Dark_wizard.png'],
		bones: "Bones"
	},
	dwarf: {
		name: "Dwarf",
		combatlevel: 10,
		hitpoints: 16,
		img: images['Dwarf.png'],
		bones: "Bones"
	},
	alkharidwarrior: {
		name: "Al-Kharid warrior",
		combatlevel: 9,
		hitpoints: 19,
		img: images['Al-Kharid_warrior.png'],
		bones: "Bones"
	},
	wolf: {
		name: "Wolf",
		combatlevel: 11,
		hitpoints: 10,
		img: images['Wolf.png'],
		bones: "Bones"
	},
	minotaur: {
		name: "Minotaur",
		combatlevel: 12,
		hitpoints: 10,
		img: images['Minotaur.png'],
		bones: "Bones"
	},
	scorpion: {
		name: "Scorpion",
		combatlevel: 14,
		hitpoints: 17,
		img: images['Scorpion.png'],
		bones: "Bones"
	},
	guard: {
		name: "Guard",
		combatlevel: 21,
		hitpoints: 22,
		img: images['Guard.png'],
		bones: "Bones"
	},
	hillgiant: {
		name: "Hill Giant",
		combatlevel: 28,
		hitpoints: 35,
		img: images['Hill_giant.png'],
		bones: "Big bones"
	},
	mossgiant: {
		name: "Moss Giant",
		combatlevel: 42,
		hitpoints: 60,
		img: images['Moss_giant.png'],
		bones: "Big bones"
	}
}