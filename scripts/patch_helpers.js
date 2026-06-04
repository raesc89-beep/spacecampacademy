/**
 * patch_helpers.js — standalone patcher helpers (no auto-execution)
 * Import this instead of patch_universal.js to avoid Apollo11 re-runs
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');

function getModuleChunk(src, moduleId) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) return null;
  const orderIdx = src.indexOf('"order":', modStart);
  if (orderIdx === -1) return null;
  const nextOrderIdx = src.indexOf('"order":', orderIdx + 10);
  const modEnd = nextOrderIdx === -1 ? src.length : nextOrderIdx - 10;
  return { modStart, modEnd, chunk: src.slice(modStart, modEnd) };
}

function replaceTextAndQuiz(src, moduleId, fullText, newQuiz) {
  const info = getModuleChunk(src, moduleId);
  if (!info) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  let { modStart, chunk } = info;
  const textKeyIdx = chunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT KEY: ${moduleId}`); return src; }
  const arrOpen = chunk.indexOf('[', textKeyIdx);
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  src = src.slice(0, modStart + arrOpen) + JSON.stringify(fullText, null, 12) + src.slice(modStart + i + 1);
  const info2 = getModuleChunk(src, moduleId);
  const { modStart: ms2, chunk: chunk2 } = info2;
  const quizKeyIdx = chunk2.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qOpen = chunk2.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qOpen;
    while (j < chunk2.length) {
      if (chunk2[j] === '[') d2++;
      else if (chunk2[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    src = src.slice(0, ms2 + qOpen) + JSON.stringify(newQuiz, null, 6) + src.slice(ms2 + j + 1);
    console.log(`✅ Replaced ${moduleId} (quiz replaced)`);
  } else {
    const info3 = getModuleChunk(src, moduleId);
    const { modStart: ms3, chunk: chunk3 } = info3;
    const cIdx = chunk3.indexOf('"contentEs"');
    const cOpen = chunk3.indexOf('{', cIdx);
    let d3 = 0, k = cOpen;
    while (k < chunk3.length) {
      if (chunk3[k] === '{') d3++;
      else if (chunk3[k] === '}') { d3--; if (d3 === 0) break; }
      k++;
    }
    src = src.slice(0, ms3 + k + 1) + ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6) + src.slice(ms3 + k + 1);
    console.log(`✅ Replaced ${moduleId} (quiz inserted)`);
  }
  return src;
}

function patchModule(src, moduleId, extraParagraphs, newQuiz) {
  const info = getModuleChunk(src, moduleId);
  if (!info) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  let { modStart, chunk } = info;
  const textKeyIdx = chunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT KEY: ${moduleId}`); return src; }
  const arrOpen = chunk.indexOf('[', textKeyIdx);
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  const insertStr = extraParagraphs.map(p => ',\n            ' + JSON.stringify(p)).join('');
  src = src.slice(0, modStart + i) + insertStr + src.slice(modStart + i);
  const info2 = getModuleChunk(src, moduleId);
  const { modStart: ms2, chunk: chunk2 } = info2;
  const quizKeyIdx = chunk2.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qOpen = chunk2.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qOpen;
    while (j < chunk2.length) {
      if (chunk2[j] === '[') d2++;
      else if (chunk2[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    src = src.slice(0, ms2 + qOpen) + JSON.stringify(newQuiz, null, 6) + src.slice(ms2 + j + 1);
    console.log(`✅ Patched ${moduleId} (quiz replaced)`);
  } else {
    const info3 = getModuleChunk(src, moduleId);
    const { modStart: ms3, chunk: chunk3 } = info3;
    const cIdx = chunk3.indexOf('"contentEs"');
    const cOpen = chunk3.indexOf('{', cIdx);
    let d3 = 0, k = cOpen;
    while (k < chunk3.length) {
      if (chunk3[k] === '{') d3++;
      else if (chunk3[k] === '}') { d3--; if (d3 === 0) break; }
      k++;
    }
    src = src.slice(0, ms3 + k + 1) + ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6) + src.slice(ms3 + k + 1);
    console.log(`✅ Patched ${moduleId} (quiz inserted)`);
  }
  return src;
}

module.exports = { getModuleChunk, replaceTextAndQuiz, patchModule, FILE };
