import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { performGacha, resetGachaCountForTest, initializeDOMElements } from './main.js';

describe('Gacha App - Unit Tests', () => {

  beforeEach(() => {
    // JSDOMでHTMLの環境をセットアップ
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="gacha-result">ここにガチャ結果が表示されます</div>
          <div id="gacha-image-container"></div>
          <div id="gacha-count">累計回数: 0回</div>
        </body>
      </html>
    `, { url: "http://localhost" });

    // globalオブジェクトにJSDOMのwindowとdocumentを設定
    global.window = dom.window;
    global.document = dom.window.document;

    // gachaCountをリセット
    resetGachaCountForTest();
    // DOM要素を再取得
    initializeDOMElements();

    // fetchをモック化
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // モックをリセット
    vi.restoreAllMocks();
  });

  test('単発ガチャ成功時に結果が正しく表示される', async () => {
    // Arrange: fetchが成功レスポンスを返すように設定
    const mockResponse = { result: 'A' };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act: performGacha関数を直接呼び出す
    await performGacha('http://localhost:8000/gacha/single', 1, 'result', '単発ガチャ');

    // Assert: DOMの更新を検証
    const gachaResultEl = document.getElementById('gacha-result');
    expect(gachaResultEl.textContent).toBe('単発ガチャ: A');

    const imageContainer = document.getElementById('gacha-image-container');
    const img = imageContainer.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toBe('http://localhost/images/a.png');

    // gachaCountは直接テストできないため、表示内容で代替
    const gachaCountEl = document.getElementById('gacha-count');
    expect(gachaCountEl.textContent).toBe('累計回数: 1回');
  });

  test('10連ガチャ成功時に結果が正しく表示される', async () => {
    // Arrange: fetchが10件の成功レスポンスを返すように設定
    const mockResponse = { results: ['A', 'B', 'C', 'S', 'A', 'B', 'C', 'S', 'A', 'B'] };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act: performGacha関数を10連ガチャのパラメータで呼び出す
    await performGacha('http://localhost:8000/gacha/ten', 10, 'results', '10連ガチャ');

    // Assert: DOMの更新を検証
    const gachaResultEl = document.getElementById('gacha-result');
    expect(gachaResultEl.textContent).toBe(`10連ガチャ: ${mockResponse.results.join(', ')}`);

    const imageContainer = document.getElementById('gacha-image-container');
    expect(imageContainer.children.length).toBe(10);
    expect(imageContainer.querySelectorAll('img').length).toBe(10);

    const gachaCountEl = document.getElementById('gacha-count');
    expect(gachaCountEl.textContent).toBe('累計回数: 10回');
  });

  test('APIエラー発生時にエラーメッセージが表示される', async () => {
    // Arrange: fetchが失敗するように設定
    fetch.mockRejectedValue(new Error('Network Error'));

    // Act: performGacha関数を呼び出す
    await performGacha('http://localhost:8000/gacha/single', 1, 'result', '単発ガチャ');

    // Assert: エラーメッセージの表示を検証
    const gachaResultEl = document.getElementById('gacha-result');
    expect(gachaResultEl.textContent).toBe('エラーが発生しました');

    // エラー時は回数が加算されないことを検証
    const gachaCountEl = document.getElementById('gacha-count');
    expect(gachaCountEl.textContent).toBe('累計回数: 0回');
  });
});