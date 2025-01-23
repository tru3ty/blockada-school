"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Counter from "./Counter"
import "../components/font.css"
import Image from "next/image"
import { Montserrat_Alternates } from "next/font/google"

interface Fact {
  id: string
  data: {
    title: string
    text: string
    img?: string
  }
}

const roboto_mono = Montserrat_Alternates({
  weight: "600",
  variable: "--font-roboto-mono",
  subsets: ["cyrillic"],
})

const FactPage = () => {
  const pathname = usePathname()
  const factId = pathname.split("/").pop() // Извлекаем fact_id из URL

  const [fact, setFact] = useState<Fact | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [foundFacts, setFoundFacts] = useLocalStorage<string[]>("foundFacts", []) // Храним найденные факты
  const totalFacts = 10

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
      <div className='flex-col flex text-[16px] bg-[#545252] m-2  rounded-3xl p-4 text-center items-center'>
        <h1 className='text-[#fae6e6]'>{title}</h1>
        <p className=' text-[#fae6e6] text-[14px]'>{text}</p>
        {img && (
          <Image
            className='m-4 object-contain rounded-2xl'
            src={img}
            alt={title}
            width={200}
            height={200}
          />
        )}
      </div>

      <span className={roboto_mono.className}>
        <Counter
          foundCount={foundFacts.length}
          totalCount={totalFacts}
        />
      </span>
    </>
  )
}

export default FactPage
