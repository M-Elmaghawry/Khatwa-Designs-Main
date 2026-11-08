import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { assetFingerprint, expectedAssetFingerprint, textAssetBaselines } from './asset-fingerprints.mjs';

test('only audited text assets accept LF/CRLF; content, unknown SVGs and binary bytes remain strict', () => {
  const lf = Buffer.from('<svg>\nخطوة\n</svg>\n');
  const crlf = Buffer.from(lf.toString().replaceAll('\n', '\r\n'));
  for (const file of textAssetBaselines.keys()) {
    assert.equal(assetFingerprint(file, lf), assetFingerprint(file, crlf));
    assert.notEqual(assetFingerprint(file, lf), assetFingerprint(file, Buffer.from('<svg>\nchanged\n</svg>\n')));
    assert.notEqual(assetFingerprint(file, lf), assetFingerprint(file, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), lf])), 'BOM changes remain strict');
    assert.notEqual(assetFingerprint(file, lf), assetFingerprint(file, Buffer.from(lf.toString().replaceAll('\n', '\r'))), 'lone CR is not normalized');
  }
  for (const file of ['images/unaudited.svg', 'images/logo.png', 'fonts/font.woff2']) {
    assert.notEqual(assetFingerprint(file, lf), assetFingerprint(file, crlf));
    assert.notEqual(assetFingerprint(file, Buffer.from([0, 13, 10, 255])), assetFingerprint(file, Buffer.from([0, 10, 255])));
  }
  assert.throws(() => assetFingerprint('projects/ghayah.svg', Buffer.from([255])), /encoded data/);
  assert.throws(() => expectedAssetFingerprint('projects/ghayah.svg', 'changed'), /Unreviewed/);
});

test('audited canonical fingerprints match original Git blobs and inventory CRLF bytes', () => {
  assert.equal(textAssetBaselines.size, 14);
  for (const [file, [recorded, canonical]] of textAssetBaselines) {
    const original = execFileSync('git', ['show', '68782cf:' + file]);
    assert.equal(assetFingerprint(file, original), canonical, file);
    assert.equal(expectedAssetFingerprint(file, recorded), canonical);
    const crlf = Buffer.from(original.toString('utf8').replaceAll('\r\n', '\n').replaceAll('\n', '\r\n'));
    assert.equal(assetFingerprint('raw-byte-check', crlf), recorded, file);
  }
});
