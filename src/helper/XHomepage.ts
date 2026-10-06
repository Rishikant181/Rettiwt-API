import { parseHTML } from 'linkedom';

import { RettiwtConfig } from '../models/RettiwtConfig';
import { IXHomepage } from '../types/TransactionId';

/**
 * Resolves the X homepage through the supplied Rettiwt configuration.
 *
 * @param config - The current Rettiwt configuration.
 *
 * @returns The final X homepage after completing any migration flow.
 *
 * @internal
 */
export async function resolveXHomepage(config: RettiwtConfig): Promise<IXHomepage> {
	// Fetch X.com homepage
	const homePageResponse = await config.instance.get<string>('https://x.com/i/jf/', {
		headers: config.headers,
	});

	// Parse HTML using linkedom
	let html = homePageResponse.data;
	let document = parseHTML(html).document;

	// Check for migration redirection links
	const migrationRedirectionRegex = new RegExp(
		'(http(?:s)?://(?:www\\.)?(twitter|x){1}\\.com(/x)?/migrate([/?])?tok=[a-zA-Z0-9%\\-_]+)+',
		'i',
	);

	const metaRefresh = document.querySelector("meta[http-equiv='refresh']");
	const metaContent = metaRefresh ? metaRefresh.getAttribute('content') || '' : '';

	const migrationRedirectionUrl = migrationRedirectionRegex.exec(metaContent) || migrationRedirectionRegex.exec(html);

	if (migrationRedirectionUrl) {
		// Follow redirection URL
		const redirectResponse = await config.instance.get<string>(migrationRedirectionUrl[0]);

		html = redirectResponse.data;
		document = parseHTML(html).document;
	}

	// Handle migration form if present
	const migrationForm =
		document.querySelector("form[name='f']") || document.querySelector("form[action='https://x.com/x/migrate']");

	if (migrationForm) {
		const url = migrationForm.getAttribute('action') || 'https://x.com/x/migrate';
		const method = migrationForm.getAttribute('method') || 'POST';

		// Collect form input fields
		const requestPayload = new FormData();

		const inputFields = migrationForm.querySelectorAll('input');
		for (const element of Array.from(inputFields)) {
			const name = element.getAttribute('name');
			const value = element.getAttribute('value');
			if (name && value) {
				requestPayload.append(name, value);
			}
		}

		// Submit form using POST request
		const formResponse = await config.instance.request<string>({
			method: method,
			url: url,
			data: requestPayload,
			headers: {
				/* eslint-disable @typescript-eslint/naming-convention */

				'Content-Type': 'multipart/form-data',
				...config.headers,

				/* eslint-enable @typescript-eslint/naming-convention */
			},
		});

		html = formResponse.data;
		document = parseHTML(html).document;
	}

	return { document, html };
}
