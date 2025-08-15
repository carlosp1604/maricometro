import {useState, type FormEvent} from 'react'

type Props = { lang: 'es' | 'en' }

const placeholderTitle = {
  es: 'Escribe tu nombre',
  en: 'Enter your name'
}

const buttonText = {
  es: 'Calcular',
  en: 'Calculate'
}

const invalidFormText = {
  es: 'Por favor, escribe un nombre antes de calcular',
  en: 'Please enter a name before calculating'
}

export default function InputUsername ({ lang }: Props) {
  const [username, setUsername] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = username.trim()
    if (trimmed) {
      window.location.href = `/${lang}/results/${encodeURIComponent(trimmed)}/`
    }
  }

  const onInvalid = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target
    if (target instanceof HTMLInputElement) {
      target.setCustomValidity(invalidFormText[lang])
    }
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target
    if (target instanceof HTMLInputElement) {
      target.setCustomValidity('')
    }
  }

  return (
    <div className="mx-5 tb:flex tb:justify-center">
      <div className="relative group w-full max-w-md">
        <div
          aria-hidden
          style={{
            background: 'var(--gradient-rainbow-pastel)',
            filter: 'blur(20px)',
            transform: 'translateZ(0)'
          }}
          className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 transition-opacity
          duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
        />

        <form
          onSubmit={onSubmit}
          className="relative flex justify-around w-full bg-surface rounded-lg overflow-hidden shadow-md"
          aria-label={placeholderTitle[lang]}
        >
          <input
            type="text"
            placeholder={placeholderTitle[lang]}
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            aria-label={placeholderTitle[lang]}
            className="w-full px-4 py-3 bg-transparent placeholder:text-secondary-text
            outline-none"
            onInvalid={onInvalid}
            onInput={onInput}
          />

          <button
            type="submit"
            className="px-4 py-2 md:py-3 bg-brand-primary-dark text-white transition-colors
            duration-300 font-semibold hover:bg-brand-primary cursor-pointer"
            aria-label={buttonText[lang]}
          >
            {buttonText[lang]}
          </button>
        </form>
      </div>
    </div>
  )
}
