import { goto } from '$app/navigation';
import type { FormattedStation } from '$core/dto/jcdecaux';

const POPUP_ICONS = {
	mechanical:
		'<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
	electrical:
		'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
	stands: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>'
} as const;

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function popupRow(kind: keyof typeof POPUP_ICONS, label: string, value: number): string {
	const empty = value <= 0 ? ' velocite-popup__row--empty' : '';
	return `<div class="velocite-popup__row${empty}">
		<span class="velocite-popup__icon velocite-popup__icon--${kind}">
			<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${POPUP_ICONS[kind]}</svg>
		</span>
		<span class="velocite-popup__label">${label}</span>
		<strong class="velocite-popup__value">${value}</strong>
	</div>`;
}

export function buildStationPopup(station: FormattedStation, href: string): HTMLElement {
	const { availabilities } = station.totalStands;
	const container = document.createElement('div');
	container.className = 'velocite-popup';
	container.innerHTML = `
		<h3 class="velocite-popup__title">${escapeHtml(station.formattedName)}</h3>
		${popupRow('mechanical', 'Vélos mécaniques', availabilities.mechanicalBikes)}
		${popupRow('electrical', 'Vélos électriques', availabilities.electricalBikes)}
		${popupRow('stands', 'Places disponibles', availabilities.stands)}
		<a class="velocite-popup__link" href="${escapeHtml(href)}">Ouvrir la station</a>`;

	// Client-side navigation instead of a full page load
	container.querySelector('a')?.addEventListener('click', (event) => {
		event.preventDefault();
		void goto(href);
	});

	return container;
}
