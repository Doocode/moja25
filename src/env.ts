import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	INTERNAL_API_KEYS: { schema: (input) => input ?? '' },
	GINKO_API_KEY: { static: true, schema: requiredEnvironmentVariable('GINKO_API_KEY') },
	JCDECAUX_API_KEY: { static: true, schema: requiredEnvironmentVariable('JCDECAUX_API_KEY') },
	JCDECAUX_CONTRACT: { static: true, schema: requiredEnvironmentVariable('JCDECAUX_CONTRACT') }
});

function requiredEnvironmentVariable(name: string) {
	return (input: string | undefined): string => {
		if (!input) throw new Error(`Missing required environment variable: ${name}`);
		return input;
	};
}
