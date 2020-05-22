import unarmedPunch from './../assets/combatstyles/unarmed-punch.png';
import unarmedKick from './../assets/combatstyles/unarmed-kick.png';
import unarmedBlock from './../assets/combatstyles/unarmed-block.png';
import swordStab from './../assets/combatstyles/sword-stab.png';
import swordLungeStrength from './../assets/combatstyles/sword-lunge-strength.png';
import swordLungeShared from './../assets/combatstyles/sword-lunge-shared.png';
import swordSlash from './../assets/combatstyles/sword-slash.png';
import swordBlock from './../assets/combatstyles/sword-block.png';
import swordChop from './../assets/combatstyles/sword-chop.png';
import whipFlick from './../assets/combatstyles/whip-flick.png';
import whipLash from './../assets/combatstyles/whip-lash.png';
import whipDeflect from './../assets/combatstyles/whip-deflect.png';
import bowAccurate from './../assets/combatstyles/bow-accurate.png';
import bowRapid from './../assets/combatstyles/bow-rapid.png';
import bowLongrange from './../assets/combatstyles/bow-longrange.png';
import crossbowAccurate from './../assets/combatstyles/crossbow-accurate.png';
import crossbowRapid from './../assets/combatstyles/crossbow-rapid.png';
import crossbowLongrange from './../assets/combatstyles/crossbow-longrange.png';

export default {
	'unarmed-punch': {
		shortname: 'unarmed-punch',
		name: 'Punch',
		experience: 'attack',
		img: unarmedPunch,
		combatStyle: 'melee',
		style: 'accurate'
	},
	'unarmed-kick': {
		shortname: 'unarmed-kick',
		name: 'Kick',
		experience: 'strength',
		img: unarmedKick,
		combatStyle: 'melee',
		style: 'aggressive'
	},
	'unarmed-block': {
		shortname: 'unarmed-block',
		name: 'Block',
		experience: 'defence',
		img: unarmedBlock,
		combatStyle: 'melee',
		style: 'defensive'
	},
	'sword-stab': {
		shortname: 'sword-stab',
		name: 'Stab',
		experience: 'attack',
		img: swordStab,
		combatStyle: 'melee',
		style: 'accurate'
	},
	'sword-lunge-strength': {
		shortname: 'sword-lunge-strength',
		name: 'Lunge',
		experience: 'strength',
		img: swordLungeStrength,
		combatStyle: 'melee',
		style: 'aggressive'
	},
	'sword-slash': {
		shortname: 'sword-slash',
		name: 'Slash',
		experience: 'strength',
		img: swordSlash,
		combatStyle: 'melee',
		style: 'aggressive'
	},
	'sword-lunge-shared': {
		shortname: 'sword-lunge-shared',
		name: 'Lunge',
		experience: ['attack', 'strength', 'defence'],
		img: swordLungeShared,
		combatStyle: 'melee',
		style: 'controlled'
	},
	'sword-block': {
		shortname: 'sword-block',
		name: 'Block',
		experience: 'defence',
		img: swordBlock,
		combatStyle: 'melee',
		style: 'defensive'
	},
	'sword-chop': {
		shortname: 'sword-chop',
		name: 'Chop',
		experience: 'attack',
		img: swordChop,
		combatStyle: 'melee',
		style: 'accurate'
	},
	'whip-flick': {
		shortname: 'whip-flick',
		name: 'Flick',
		experience: 'attack',
		img: whipFlick,
		combatStyle: 'melee',
		style: 'accurate'
	},
	'whip-lash': {
		shortname: 'whip-lash',
		name: 'Lash',
		experience: ['attack', 'strength', 'defence'],
		img: whipLash,
		combatStyle: 'melee',
		style: 'controlled'
	},
	'whip-deflect': {
		shortname: 'whip-deflect',
		name: 'Deflect',
		experience: 'defence',
		img: whipDeflect,
		combatStyle: 'melee',
		style: 'defensive'
	},
	'bow-accurate': {
		shortname: 'bow-accurate',
		name: 'Accurate',
		experience: 'ranged',
		img: bowAccurate,
		combatStyle: 'ranged',
		style: 'accurate'
	},
	'bow-rapid': {
		shortname: 'bow-rapid',
		name: 'Rapid',
		experience: 'ranged',
		img: bowRapid,
		combatStyle: 'ranged',
		style: 'rapid'
	},
	'bow-longrange': {
		shortname: 'bow-longrange',
		name: 'Longrange',
		experience: ['ranged', 'defence'],
		img: bowLongrange,
		combatStyle: 'ranged',
		style: 'longrange'
	},
	'crossbow-accurate': {
		shortname: 'crossbow-accurate',
		name: 'Accurate',
		experience: 'ranged',
		img: crossbowAccurate,
		combatStyle: 'ranged',
		style: 'accurate'
	},
	'crossbow-rapid': {
		shortname: 'crossbow-rapid',
		name: 'Rapid',
		experience: 'ranged',
		img: crossbowRapid,
		combatStyle: 'ranged',
		style: 'rapid'
	},
	'crossbow-longrange': {
		shortname: 'crossbow-longrange',
		name: 'Longrange',
		experience: ['ranged', 'defence'],
		img: crossbowLongrange,
		combatStyle: 'ranged',
		style: 'longrange'
	}
}