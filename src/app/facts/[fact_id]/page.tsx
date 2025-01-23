import FactPage from "@/components/FactPage"
import { Caveat } from "next/font/google"

const Caveat_font = Caveat({
  weight: "400",
  variable: "--font-caveat",
  subsets: ["cyrillic"],
})

export default function page1() {
  return (
    <>
      <main className={Caveat_font.className}>
        <FactPage></FactPage>
      </main>
      <footer></footer>
    </>
  )
}
