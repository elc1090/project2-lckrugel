/**
 * Torna maiúscula a primeira letra de um string
 */
export default function captalizeFirstLetter(str) {
    return  str.charAt(0).toUpperCase() + str.slice(1);
  } 