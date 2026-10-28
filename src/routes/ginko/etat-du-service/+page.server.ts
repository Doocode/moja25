import type { PageServerLoad } from './$types';
import { getMessages } from '$core/api/GinkoApi';
import type { Message } from '$core/dto/ginko';

export const load: PageServerLoad = async () => {
	const messages: Message[] = await getMessages({});
	return { messages };
};
