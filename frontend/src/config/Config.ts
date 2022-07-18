import { ConfigType } from '../types/Config';

export default class Config {
	private static instance: Config;

	public params: ConfigType;

	private constructor() {
		this.params = {
			ApiUrl:
				process.env.STATUS === 'dev'
					? process.env.REACT_APP_DEV_API_URL!
					: process.env.REACT_APP_PROD_API_URL!,
		};
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new Config();
		}
		return this.instance;
	}
}
