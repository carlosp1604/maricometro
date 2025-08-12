import React, { useState, useEffect, useRef } from 'react'

const rainbowColors = ['#D977AA', '#FBBF24', '#34D399', '#60A5FA', '#8B5CF6']

type Props = {
  score: number,
  lang: 'es' | 'en',
  username: string
}

const translations = {
  es: 'Aquí tienes el nivel de mariconada que hemos calculado para ',
  en: 'Here\'s the queer level we\'ve calculated for '
}

const calculatingTranslations = {
  es: 'Calculando...',
  en: 'Calculating...',
}

const resultTranslations = (lang: 'es' | 'en', score: number) => {
  if (lang === 'es') {
    return `¡Has alcanzado un ${Math.round(score)}% de nivel de mariconada!`
  }

  return `You've reached a ${Math.round(score)}% level of queer!`
}

export default function PrideMeter({ score, username, lang }: Props) {
  const [fill, setFill] = useState(0)
  const [animating, setAnimating] = useState(true)
  const [message, setMessage] = useState(calculatingTranslations[lang])

  const confettiFired = useRef(false)
  const currentFill = useRef(0)
  const direction = useRef(1)
  const frameCount = useRef(0)

  useEffect(() => {
    confettiFired.current = false
    currentFill.current = 0
    direction.current = 1
    setFill(0)
    setAnimating(true)
    setMessage(calculatingTranslations[lang])
  }, [score])

  useEffect(() => {
    if (!animating) return

    let animationFrame: number

    function animate() {
      frameCount.current++

      if (frameCount.current % 3 === 0) {
        currentFill.current += direction.current

        if (currentFill.current >= 100) {
          direction.current = -1
          currentFill.current = score
        } else if (currentFill.current <= 0) {
          direction.current = 1
          currentFill.current = 0
        }

        setFill(currentFill.current)
      }

      if (frameCount.current > 5 * 60) {
        setAnimating(false)
        setFill(score)
        setMessage(resultTranslations(lang, score))
        return
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [animating, score])

  useEffect(() => {
    if (!animating && !confettiFired.current) {
      const count = score < 10 ? 100 : score

      confettiFired.current = true;

      (async () => {
        const confetti = (await import('canvas-confetti')).default
        confetti({
          particleCount: count,
          spread: 70,
          origin: { y: 0.6 },
          colors: rainbowColors,
        })
      })()
    }
  }, [animating, score])

  return (
    <div className="w-full max-w-md mx-auto mt-10 border-t border-b border-border pt-4">
      <div className="min-h-12 h-full mb-4">
        <h2 className="text-center font-bold">
          {lang === 'es' ? 'Resultados para ' : 'Results for '}
          <span className="text-brand-primary-dark"> {username}</span>
        </h2>

        <p className="text-center">
          { translations[lang] }
          <span className="text-brand-primary-dark">{username}</span>.
          { lang === 'es' ? ' Recuerda,' : ' Remember,' }
          <span className="font-bold text-secondary-text">
            { lang === 'es' ? ' no te lo tomes personal, solo es humor' : ' don\'t take it personally, it\'s just humor'}
          </span>
        </p>

      </div>
      <div className="relative h-10 w-full rounded-full bg-surface overflow-hidden shadow-md">
        <div
          className="h-full rounded-full rounded-r-none transition-all duration-300 ease-out"
          style={{
            width: `${fill}%`,
            background: animating ? 'var(--color-brand-secondary)' : 'var(--gradient-rainbow-pastel)',
          }}
        ></div>
      </div>

      <p className="mt-4 text-center font-semibold">{message}</p>

      <div className="mt-6 flex justify-center gap-4">
      </div>
    </div>
  )
}
