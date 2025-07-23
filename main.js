let gachaCount = 0;

// 結果を表示するDOM要素をあらかじめ取得しておきます
const gachaResultEl = document.getElementById('gacha-result');
const gachaCountEl = document.getElementById('gacha-count');
const imageContainer = document.getElementById('gacha-image-container');

/**
 * ガチャの結果（画像）を表示する関数
 * @param {string[]} results - ガチャ結果の文字列の配列
 */
function displayImages(results) {
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
async function performGacha(url, pullCount, resultKey, description) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // fetchが成功しても、ステータスコードがエラーの場合に対応します
      throw new Error(`APIエラー: ${response.status}`);
    }
    const data = await response.json();

    gachaCount += pullCount;
    // 結果が配列でない場合も配列として扱えるようにします
    const results = Array.isArray(data[resultKey]) ? data[resultKey] : [data[resultKey]];

    gachaResultEl.textContent = `${description}: ${results.join(', ')}`;
    gachaCountEl.textContent = `累計回数: ${gachaCount}回`;

    displayImages(results);

  } catch (err) {
    console.error('ガチャ処理中にエラーが発生しました:', err);
    gachaResultEl.textContent = 'エラーが発生しました';
  }
}

// 各ボタンのクリックイベントに、パラメータを変えて共通の関数を割り当てます
document.getElementById('single-gacha').onclick = () => {
  // ←APIのURLは適宜変更
  performGacha('http://localhost:8000/gacha/single', 1, 'result', '単発ガチャ');
};

document.getElementById('ten-gacha').onclick = () => {
  performGacha('http://localhost:8000/gacha/ten', 10, 'results', '10連ガチャ');
};
