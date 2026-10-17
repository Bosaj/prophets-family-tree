import { useI18n } from '../i18n'
import { A } from './ui'

export function NotFound() {
  const { t } = useI18n()
  return (
    <div className="mx-auto grid min-h-[70svh] max-w-xl place-items-center px-4 pt-28 text-center">
      <div>
        <p className="ar-name gold-text text-7xl font-bold">٤٠٤</p>
        <p className="mt-4 text-lg text-ink-2">{t('notFound')}</p>
        <A href="/" className="btn btn-gold mt-8">
          {t('backHome')}
        </A>
      </div>
    </div>
  )
}
