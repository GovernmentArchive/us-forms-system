// Coerce to numbers where applicable
function coerceNumber(e) {
  var num = parseInt(e, 10);
  return e === '' + num ? num : e;
}

/**
 * Takes a string and casts it into an array.
 * Can take strings like a.b[4].c
 *
 * @param {string} path
 * @return {Array}
 */
export default function deconstructPath(path) {
  var arrayPath = path.split(/[.[\]]/).filter(function (e) {
    return e !== '';
  }).map(coerceNumber);

  return arrayPath;
}