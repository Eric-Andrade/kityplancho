import { Kityplancho4Page } from './app.po';

describe('kityplancho4 App', () => {
  let page: Kityplancho4Page;

  beforeEach(() => {
    page = new Kityplancho4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kp works!');
  });
});
