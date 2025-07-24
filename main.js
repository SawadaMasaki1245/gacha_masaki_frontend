export let gachaCount = 0;

export function resetGachaCountForTest() {
  gachaCount = 0;
}

// DOM要素の変数を宣言
let gachaResultEl, gachaCountEl, imageContainer;

/**
 * DOM要素を初期化（取得）する関数
 */
export function initializeDOMElements() {
  gachaResultEl = document.getElementById('gacha-result');
  gachaCountEl = document.getElementById('gacha-count');
  imageContainer = document.getElementById('gacha-image-container');
}

/**
 * ガチャの結果（画像）を表示する関数
 * @param {string[]} results - ガチャ結果の文字列の配列
 */
export function displayImages(results) {
  if (!imageContainer) initializeDOMElements(); // 未初期化の場合に初期化
  imageContainer.innerHTML = ''; // 前回の結果をクリア
  results.forEach(result => {
    const img = document.createElement('img');
    img.src = `images/${result.toLowerCase()}.png`;
    imageContainer.appendChild(img);
  });
}

/**
 * ガチャを実行し、結果を表示するメインの関数
 * @param {string} url - APIのエンドポイントURL
 * @param {number} pullCount - ガチャを引く回数 (例: 1 or 10)
 * @param {string} resultKey - APIレスポンスから結果を取得するためのキー (例: 'result' or 'results')
 * @param {string} description - 表示用の説明文 (例: '単発ガチャ')
 */
export async function performGacha(url, pullCount, resultKey, description) {
  if (!gachaResultEl) initializeDOMElements(); // 未初期化の場合に初期化

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }
    const data = await response.json();

    gachaCount += pullCount;
    const results = Array.isArray(data[resultKey]) ? data[resultKey] : [data[resultKey]];

    gachaResultEl.textContent = `${description}: ${results.join(', ')}`;
    gachaCountEl.textContent = `累計回数: ${gachaCount}回`;

    displayImages(results);

  } catch (err) {
    console.error('ガチャ処理中にエラーが発生しました:', err);
    gachaResultEl.textContent = 'エラーが発生しました';
  }
}

// ブラウザ環境でのみ実行されるようにする
if (typeof window !== 'undefined') {
  initializeDOMElements(); // ページ読み込み時に要素を取得

  if (document.getElementById('single-gacha')) {
    document.getElementById('single-gacha').onclick = () => {
      performGacha('http://localhost:8000/gacha/single', 1, 'result', '単発ガチャ');
    };
  }

  if (document.getElementById('ten-gacha')) {
    document.getElementById('ten-gacha').onclick = () => {
      performGacha('http://localhost:8000/gacha/ten', 10, 'results', '10連ガチャ');
    };
  }
}
