type Props = { lang: 'es' | 'en' }

const siteNames = {
  es: 'Maricómetro',
  en: 'Pride-o-meter'
}

const siteDescriptions = {
  // eslint-disable-next-line max-len
  es: 'Descubre tu nivel de mariconada con un toque de humor. Simple, rápido y divertido. Solo tienes que introducir tu nombre y nuestro ultra sofisticado sistema de detección avanzada hará el trabajo',
  // eslint-disable-next-line max-len
  en: 'Find out your queer level with a touch of humor and pastel colors. Simple, quick, and fun. Enter your name and our ultra-convenient advanced detection system will do the work'
}

export default function SiteIntro({ lang }: Props) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-text-light]">
        { siteNames[lang] }
      </h1>
      <p className="mt-2 text-lg text-secondary-text-light] max-w-md mx-auto">
        { siteDescriptions[lang] }
      </p>
    </div>
  )
}
