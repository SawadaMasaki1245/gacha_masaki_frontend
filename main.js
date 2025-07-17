let gachaCount = 0;

document.getElementById('single-gacha').onclick = async () => {
  try {
    const response = await fetch('http://localhost:8000/gacha/single'); // ←APIのURLは適宜変更
    const data = await response.json();
    gachaCount += 1;
    document.getElementById('gacha-result').textContent = `単発ガチャ: ${data.result}`;
    document.getElementById('gacha-count').textContent = `累計回数: ${gachaCount}回`;
  } catch (err) {
    document.getElementById('gacha-result').textContent = 'エラーが発生しました';
  }
};

document.getElementById('ten-gacha').onclick = async () => {
  try {
    const response = await fetch('http://localhost:8000/gacha/ten');
    const data = await response.json();
    gachaCount += 10;
    document.getElementById('gacha-result').textContent = `10連ガチャ: ${data.results.join(', ')}`;
    document.getElementById('gacha-count').textContent = `累計回数: ${gachaCount}回`;
  } catch (err) {
    document.getElementById('gacha-result').textContent = 'エラーが発生しました';
  }
};