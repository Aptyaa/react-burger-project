export const extractJWTToken = (str: string) => {
	if (str.startsWith('Bearer ')) return str.split(' ')[1];
	return null;
};

export function getCookie(name: string) {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
