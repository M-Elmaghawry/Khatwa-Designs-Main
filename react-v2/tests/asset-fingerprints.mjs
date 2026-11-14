import { createHash } from 'node:crypto';

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
// Audited against Git 68782cf. The inventory captured CRLF checkout bytes for
// these 16 UTF-8 text files; Git stores LF. No extension-wide normalization.
const projectCovers = ['al-emar', 'al-maher', 'aya-roshdy', 'bim-connection',
  'engineering-group', 'fahd-al-mutairi', 'ghayah', 'mohamed-el-naggar',
  'omega', 'talal-shaker', 'tpack', 'wadi-al-abrakeen'];
export const textAssetBaselines = new Map([
  ['fonts/feather.svg', ['7f0825fa0a9f3cddcce1311dd90840ed7d3e22328856c866cd2b6e38f95acd26', '7146eab2fe35f28d1dbd3c3792f4aaeae9242a23465bda642e5f0a57f01bb15d']],
  ['fonts/icomoon.svg', ['36d8cef6154b092edd384889ac5b01da6c7c7d048508efb55c681b061701b72f', 'e654727e86a724edb6a1d15457d823da76fbdd5fe46a4619b37a1c52200158ce']],
  ['images/demo-footer-pattern.svg', ['cfbe4d6f384b2a92caa54edf0f6fe3c0d223339fac8c6a9202fea85663d0990f', '7e198c8080fc68dda23fe36d358faf69949d980eda1075066dcb005d6b515c94']],
  ['projects/README.md', ['cee6d57484dd94ab58aae4b9d01ef2664160b2a5a0c534bd74625afd6dc8eb36', '1b6886332754cbbac271ffd5947fa9d4cb1405b3f00154ede39f80a5721e16f0']],
  ...projectCovers.map(name => [`projects/${name}.svg`, ['04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82', '8305ab629dafd0dc39971d659cd3269d28eaa1ffb61417f8072b90830ef38f73']])
]);

export function assetFingerprint(file, bytes) {
  // Decode only explicitly audited UTF-8 assets. Binary and all other files
  // retain strict raw-byte hashing, including SVGs outside this allowlist.
  return sha256(textAssetBaselines.has(file)
    ? new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes).replaceAll('\r\n', '\n')
    : bytes);
}

export function expectedAssetFingerprint(file, inventoryHash) {
  const audited = textAssetBaselines.get(file);
  if (!audited) return inventoryHash;
  if (audited[0] !== inventoryHash) throw new Error(`Unreviewed inventory baseline: ${file}`);
  return audited[1];
}
