import dotenv, { DotenvConfigOptions } from 'dotenv';

import { ConfigType } from '../types/Config';

export default class Config {
	private static instance: Config;

	public params: ConfigType;

	private constructor() {
		const dotenvOptions: DotenvConfigOptions = {
			path: `${__dirname}/../../.env`,
		};

		dotenv.config(dotenvOptions);

		this.params = {
			Port:
				process.env.STATUS === 'dev'
					? process.env.DEV_PORT!
					: process.env.PROD_PORT!,
			MongoDBUrl:
				process.env.STATUS === 'dev'
					? process.env.DEV_DB!
					: process.env.PROD_DB!,
			SecretKey:
				process.env.STATUS === 'dev'
					? process.env.DEV_SECRET_KEY!
					: process.env.PROD_SECRET_KEY!,
		};
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new Config();
		}
		return this.instance;
	}
}
