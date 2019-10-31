import swordStab from '../../assets/combatstyles/sword-stab.png';
import swordLungeStrength from '../../assets/combatstyles/sword-lunge-strength.png';
import swordLungeShared from '../../assets/combatstyles/sword-lunge-shared.png';
import swordSlash from '../../assets/combatstyles/sword-slash.png';
import swordBlock from '../../assets/combatstyles/sword-block.png';

export default {
  'sword-stab': {
    name: 'Stab',
    experience: 'attack',
    img: swordStab
  },
  'sword-lunge-strength': {
    name: 'Lunge',
    experience: 'strength',
    img: swordLungeStrength
  },
  'sword-slash': {
    name: 'Slash',
    experience: 'strength',
    img: swordSlash
  },
  'sword-lunge-shared': {
    name: 'Lunge',
    experience: 'shared',
    img: swordLungeShared
  },
  'sword-block': {
    name: 'Block',
    experience: 'defence',
    img: swordBlock
  }
}