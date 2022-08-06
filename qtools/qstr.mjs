import * as qstr from './qstr.mjs';

export const contains = function (line, searchText) {
	return String(line).includes(searchText);
}

export const replaceAll = function (text, search, replace) {
	text = qstr.forceAsString(text);
	const text2 = text.split(search).join(replace);
	return text2;
}

export const forceAsString = function (stringOrOther) {
	if (!qstr.isString(stringOrOther)) {
		return String(stringOrOther);
	} else {
		return stringOrOther;
	}
}

export const isString = function (obj) {
	if (typeof obj === 'string' || obj instanceof String) {
		return true;
	} else {
		return false;
	}
}

export const chopLeft = function (main, textToChop) {
	if (main.startsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(len, mainLen);
		}
	}
	return main;
}

export const chopRight = function (main, textToChop) {
	if (main.endsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(0, mainLen - (len));
		}
	}
	return main;
}

export const startsWithPrefixes = (text, unwantedPrefixes) => {
	let rb = false;
	unwantedPrefixes.forEach(unwantedPrefix => {
		if (text.startsWith(unwantedPrefix)) {
			rb = true;
		}
	});
	return rb;
};