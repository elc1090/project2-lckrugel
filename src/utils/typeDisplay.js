import './types.css';

/**
 * Recebe o nome do tipo e uma key e retorna um span contendo o tipo estilizado.
 */
export default function typeDisplay(name, key) {
  const style = "type " + name;
  return (
    <span key={key} className={style}></span>
  )
}