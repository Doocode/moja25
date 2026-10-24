export class LocalStorageHelper {
	static getValue(key: string, fallback: string): string {
		if (typeof window === 'undefined') return fallback;

		try {
			return window.localStorage.getItem(key) ?? fallback;
		} catch (error) {
			console.error(`Failed to read localStorage key "${key}"`, error);
			return fallback;
		}
	}

	static setValue(key: string, value: string): void {
		if (typeof window === 'undefined') return;

		try {
			window.localStorage.setItem(key, value);
		} catch (error) {
			console.error(`Failed to write localStorage key "${key}"`, error);
		}
	}

	static removeValue(key: string): void {
		if (typeof window === 'undefined') return;

		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.error(`Failed to remove localStorage key "${key}"`, error);
		}
	}
}
