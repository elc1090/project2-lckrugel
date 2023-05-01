
export default function typeRelations(types) {
  let imunities = getImunities(types);
  let weaknesses = getWeaknesses(types);
  let strenghts = getStrenghts(types);
  // Se tiver mais de um tipo corrige possíveis relações nos tipos
  if(Object.keys(types).length > 1) {
    ({strenghts, weaknesses} = crossCheckBetwenTypes(strenghts, weaknesses));
  }

  return {
    'attacking': {
      'imunities': imunities.attacking,
      'strenghts': strenghts.attacking,
      'weaknesses': weaknesses.attacking
    },
    'defending': {
      'imunities': imunities.defending,
      'strenghts': strenghts.defending,
      'weaknesses': weaknesses.defending
    }
  }
}


/** 
  * Gera um objeto com duas listas com os tipos que o pokémon é imune
  * atacando e defendendo.
  */
function getImunities(types) {
  let defending = [];
  for(let type of types) {
    for(let imuneType of type.damage_relations.no_damage_from) {
      if(!defending.includes(imuneType.name)) defending.push(imuneType.name);
    }
  }
  let attacking = [];
  for(let type of types) {
    for(let imuneType of type.damage_relations.no_damage_to) {
      if(!attacking.includes(imuneType.name)) attacking.push(imuneType.name);
    }
  }
  return (
    {
      'attacking': attacking,
      'defending': defending
    }
  );
}


/**
 * Gera um objeto com duas listas com os tipos que o pokémon é fraco contra.
 * A lista 'defending' possui os tipos que o pokémon recebe dano dobrado.
 * A lista 'attacking' possui os tipos que o pokémon causa dano pela metade.
 * OBS: Não faz cruzamento pela relação entre os tipos do pokémon.
 */
function getWeaknesses(types) {
  let defending = [];
  for(let type of types) {
    for(let weakToType of type.damage_relations.double_damage_from) {
      if(!defending.includes(weakToType.name)) defending.push(weakToType.name);
    }
  }
  let attacking = [];
  for(let type of types) {
    for(let weakToType of type.damage_relations.half_damage_to) {
      if(!attacking.includes(weakToType.name)) attacking.push(weakToType.name);
    }
  }
  return (
    {
      'attacking': attacking,
      'defending': defending
    }
  );
}


/**
 * Gera um objeto com duas listas com os tipos que o pokémon é forte contra.
 * A lista 'defending' possui os tipos que o pokémon recebe dano pela metade.
 * A lista 'attacking' possui os tipos que o pokémon causa dano dobrado.
 * OBS: Não faz cruzamento pela relação entre os tipos do pokémon.
 */
function getStrenghts(types) {
  let defending = [];
  for(let type of types) {
    for(let strongToType of type.damage_relations.half_damage_from) {
      if(!defending.includes(strongToType.name)) defending.push(strongToType.name);
    }
  }
  let attacking = [];
  for(let type of types) {
    for(let strongToType of type.damage_relations.double_damage_to) {
      if(!attacking.includes(strongToType.name)) attacking.push(strongToType.name);
    }
  }
  return (
    {
      'attacking': attacking,
      'defending': defending
    }
  );
}


/**
 * Cria um novo objeto excluindo mutualmente se um tipo estiver presente tanto
 * na lista de fraquezas quanto na lista de vantagens,
 * tanto atacando quanto defendendo.
 */
function crossCheckBetwenTypes(strenghts, weaknesses) {
  let newSAttacking = [];
  for(let attackingType of strenghts.attacking) {
    // Se o tipo não aparece como ponto forte e fraco ao mesmo tempo, adiciona à nova lista
    if(!weaknesses.attacking.includes(attackingType)) {
      newSAttacking.push(attackingType);
    }
  }

  let newSDefending = [];
  for(let defendingType of strenghts.defending) {
    if(!weaknesses.defending.includes(defendingType)) {
      newSDefending.push(defendingType);
    }
  }
  const newStrenghts = {
    'attacking': newSAttacking,
    'defending': newSDefending
  }

  let newWDefending = [];
  for(let defendingType of weaknesses.defending) {
    if(!strenghts.defending.includes(defendingType)) {
      newWDefending.push(defendingType);
    }
  }

  let newWAttacking = [];
  for(let attackingType of weaknesses.attacking) {
    if(!strenghts.attacking.includes(attackingType)) {
      newWAttacking.push(attackingType);
    }    
  }
  let newWeaknesses = {
    'attacking': newWDefending,
    'defending': newWAttacking
  };

  return {
    'strenghts': newStrenghts,
    'weaknesses': newWeaknesses
  }
}
