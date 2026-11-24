import { defineEnvVars } from '@sveltejs/kit/env';

// @migration-task Review dynamic environment variables. They accept missing values (`undefined`), add stricter validation where a value is required.
export const variables = defineEnvVars({
	INTERNAL_API_KEYS: { schema: (input) => input },
	GINKO_API_KEY: { static: true },
	JCDECAUX_API_KEY: { static: true },
	JCDECAUX_CONTRACT: { static: true }
});
