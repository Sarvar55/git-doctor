export interface ITranslateService {
	translate(commitMessage: string): Promise<String>
}
