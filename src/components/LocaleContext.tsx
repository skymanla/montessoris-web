import { Locale, getDictionary } from "@/lib/dictionaries"

// 한국어 단일 사이트: 로케일 전환/Provider 없이 항상 ko 사전을 제공한다.
const locale: Locale = "ko"

export function useLocale() {
  return { locale, dict: getDictionary(locale) }
}
