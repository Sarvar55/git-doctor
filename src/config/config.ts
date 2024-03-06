import Configstore from 'configstore'
import pkg from '../../package.json' assert { type: 'json' }
import { logger } from '../utils/logger'

export enum APP_CONSTANTS {
	api_key = 'api_key',
	source_lang = 'source_lang',
	hasEmoji = 'hasEmoji',
	targetLang = 'targetLang',
	translate_auto_to_target_lang = 'translate_auto_to_target_lang',
}

export class ConfigManager {
	private config: Configstore
	private validkeys: APP_CONSTANTS[]

	constructor() {
		this.config = new Configstore(pkg.name)
		this.validkeys = Object.values(APP_CONSTANTS)
	}

	public set(key: APP_CONSTANTS, value: string | boolean): void {
		if (this.validkeys.includes(key)) {
			this.config.set(key, value)
		} else {
			logger.error(
				`Invalid key "${key}". Please use one of the following keys: ${this.validkeys.join(', ')}`
			)
		}
	}
	public get(key: APP_CONSTANTS): string | boolean | undefined {
		return this.config.get(key)
	}

	public has(key: APP_CONSTANTS): boolean {
		return this.config.has(key)
	}

	public deleteItem(key: APP_CONSTANTS): void {
		if (this.has(key)) {
			this.config.delete(key)
		} else {
			logger.error(`Key "${key}" not found in the configuration.`)
		}
	}
	public all() {
		return this.config.all
	}
}
