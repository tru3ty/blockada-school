import { Rubik_Mono_One } from "next/font/google"
import "./globals.css"

export const Rubik80sFade = Rubik_Mono_One({
  weight: "400",
  variable: "--font-rubik-80s-fade",
  subsets: ["cyrillic"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body
        className={`${Rubik80sFade.variable} 
       antialiased`}>
        {children}
      </body>
    </html>
  )
}
