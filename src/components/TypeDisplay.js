import '../utils/types.css';

/**
 * Recebe o nome do tipo e uma key e retorna um span contendo o tipo estilizado.
 */
export default function TypeDisplay(name, key) {
  const style = "type " + name;
  return (
    <span key={key} className={style}></span>
  )
}