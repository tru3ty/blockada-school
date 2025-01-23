import { Caveat } from "next/font/google"
import "./globals.css"

const Caveat_font = Caveat({
  weight: "400",
  variable: "--font-caveat",
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
        className={` ${Caveat_font.variable} 
       antialiased`}>
        {children}
      </body>
    </html>
  )
}
