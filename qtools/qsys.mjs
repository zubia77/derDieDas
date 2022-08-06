import * as qmat from './qmat.mjs';
import * as config from '../config.mjs';
import * as qsys from './qsys.mjs';
import * as qstr from './qstr.mjs';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

export const smartResponse = (_req, res, json) => {
	const ms = qmat.getRandomNumber(1000, 2000);
	if (config.apiShouldEmulateShortLoadingTime()) {
		setTimeout(() => {
			res.json(json);
		}, ms);
	} else {
		res.json(json);
	}
}

export const getCurrentOperatingSystem = (path) => {
	if (qstr.contains(__dirname, '/')) {
		return 'linux';
	} else {
		return 'windows';
	}
}

export const getOperatingSystemSlash = (path) => {
	if (qsys.getCurrentOperatingSystem() === 'linux') {
		return '/';
	} else {
		return `\\`;
	}
}
