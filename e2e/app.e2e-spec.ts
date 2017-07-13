import { AngularGetStartedPage } from './app.po';

describe('angular-get-started App', () => {
  let page: AngularGetStartedPage;

  beforeEach(() => {
    page = new AngularGetStartedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
