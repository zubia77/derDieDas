import fs from 'fs';
import * as qstr from './qstr.mjs';
import * as qfil from './qfil.mjs';
import * as qsys from './qsys.mjs';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

export const getSiteRelativePathAndFileNames = function (absoluteDirectory, files_) {
    absoluteDirectory = absoluteDirectory || __dirname;
    files_ = files_ || [];
    var files = fs.readdirSync(absoluteDirectory);
    const osSlash = qsys.getOperatingSystemSlash();
    for (var i in files) {
        var absolutePathAndFileName = absoluteDirectory + osSlash + files[i];
        if (!qstr.contains(absolutePathAndFileName, '\\node_modules\\')) {
            absolutePathAndFileName = qstr.replaceAll(absolutePathAndFileName, `\\\\`, `\\`);
            if (fs.statSync(absolutePathAndFileName).isDirectory()) {
                qfil.getSiteRelativePathAndFileNames(absolutePathAndFileName, files_);
            } else {
                const relativePathAndFileName = qfil.getRelativePathAndFileName(absolutePathAndFileName);
                const fixedPathAndFileName = qfil.convertBackSlashesToForwardSlashes(relativePathAndFileName);
                files_.push(fixedPathAndFileName);
            }
        }
    }
    return files_;
}

export const getRelativePathAndFileName = function (absolutePathAndFileName) {
    return qstr.chopLeft(absolutePathAndFileName, __dirname);
};

export const convertBackSlashesToForwardSlashes = function (pathAndFileName) {
    return qstr.replaceAll(pathAndFileName, '\\', '/');
};