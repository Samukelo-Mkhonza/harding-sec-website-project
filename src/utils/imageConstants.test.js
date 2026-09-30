import { handleImageFallback, PLACEHOLDER_IMAGES } from './imageConstants';

describe('handleImageFallback', () => {
  it('swaps to the placeholder only once so a failing placeholder cannot loop', () => {
    const img = document.createElement('img');
    img.src = 'https://example.com/broken.jpg';

    handleImageFallback({ currentTarget: img });
    expect(img.src).toBe(PLACEHOLDER_IMAGES.default);

    img.src = 'https://example.com/still-broken.jpg';
    handleImageFallback({ currentTarget: img });
    expect(img.src).toBe('https://example.com/still-broken.jpg');
  });
});
