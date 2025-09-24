// lib/navigation.ts
import { useParams, useRouter } from "next/navigation";

export function useLocaleRouter() {
  const router = useRouter();
  const { locale } = useParams();

  return {
    push: (path: string) => router.push(`/${locale}${path}`),
    replace: (path: string) => router.replace(`/${locale}${path}`),
    back: () => router.back(),
  };
}
