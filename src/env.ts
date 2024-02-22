import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

const envScheme = z.object({
	SECRET_KEY: z.string(),
})

export const env = envScheme.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envScheme> {}
	}
}
