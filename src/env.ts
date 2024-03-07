import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

const envScheme = z.object({
	API_KEY: z.string(),
})

export const env = envScheme.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envScheme> {}
	}
}

/**feat:
 * mesele öncden index.html dosyasını track etmiş ancak sonra istememiş ve onu .gitignore içine almış
 * bunu da kontrol etmek gerekir ki eger şu anda varmı yokmu gibi git diff --name-only diğerek bunu yapa bilirzi
 * izledigi dosyalar eğer .gitignore içinde var ise demek ki önceden takip edilmiş şimdi ise edilmiyor
 * git rm --cached index.html ile silip sonra işleme devem etmek
 *
 * refactor: bazen git add . kendisi eder ama commit ypmamıştır bu sefer commit için bir değişiklik yok der.
 *
 *
 */
