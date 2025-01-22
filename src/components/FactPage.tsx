"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Counter from "./Counter"

interface Fact {
  id: string
  data: {
    title: string
    text: string
    img?: string
  }
}

const FactPage = () => {
  const pathname = usePathname()
  const factId = pathname.split("/").pop() // Извлекаем fact_id из URL

  const [fact, setFact] = useState<Fact | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [foundFacts, setFoundFacts] = useLocalStorage<string[]>("foundFacts", []) // Храним найденные факты
  const totalFacts = 5

  useEffect(() => {
    if (!factId) return

    const fetchFact = async () => {
      try {
        const response = await fetch(`/fact_${factId}.json`)
        if (!response.ok) {
          throw new Error(`Факт с ID "${factId}" не найден.`)
        }

        const data: Fact = await response.json()
        setFact(data)

        if (!foundFacts.includes(factId)) {
          setFoundFacts([...foundFacts, factId])
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Неизвестная ошибка")
        }
      }
    }

    fetchFact()
  }, [factId, foundFacts, setFoundFacts])

  if (error) {
    return <div style={{ padding: "20px" }}>Ошибка: {error}</div>
  }

  if (!fact) {
    return <div style={{ padding: "20px" }}>Загрузка...</div>
  }

  const { title, text, img } = fact.data

  return (
    <>
      <div className='text-1xl font-bold m-2 bg-[#dd4122] rounded-3xl p-4 text-center'>
        <h1 className='font'>{title}</h1>
        <p className='font text-[12px]'>{text}</p>
        {/* {img && <img src={img} alt={title} style={{ maxWidth: "100%" }} />} */}
      </div>
      <div className=' flex justify-center text-start mb-4'>
        <Counter
          foundCount={foundFacts.length}
          totalCount={totalFacts}
        />
      </div>
    </>
  )
}

export default FactPage
