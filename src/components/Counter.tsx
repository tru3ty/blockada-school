interface CounterProps {
  foundCount: number // Количество найденных фактов
  totalCount: number // Общее количество фактов
}

const Counter: React.FC<CounterProps> = ({ foundCount, totalCount }) => {
  return (
    <div className=' text-1xl text-center text-[#171717]'>
      <h2>Прогресс:</h2>
      {foundCount >= totalCount ? (
        <p>Вы нашли все факты! Подойдите к учителю за оценкой.</p>
      ) : (
        <p>
          Вы нашли {foundCount} из {totalCount} фактов. Продолжайте искать!
        </p>
      )}
    </div>
  )
}

export default Counter
