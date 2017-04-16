import { browser, element, by } from 'protractor';

export class Kityplancho4Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('kp-root h1')).getText();
  }
}
