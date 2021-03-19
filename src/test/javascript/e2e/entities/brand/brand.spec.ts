/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BrandComponentsPage from './brand.page-object';
import { BrandDeleteDialog } from './brand.page-object';
import BrandUpdatePage from './brand-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Brand e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let brandUpdatePage: BrandUpdatePage;
  let brandComponentsPage: BrandComponentsPage;
  let brandDeleteDialog: BrandDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Brands', async () => {
    await navBarPage.getEntityPage('brand');
    brandComponentsPage = new BrandComponentsPage();
    expect(await brandComponentsPage.getTitle().getText()).to.match(/Brands/);
  });

  it('should load create Brand page', async () => {
    await brandComponentsPage.clickOnCreateButton();
    brandUpdatePage = new BrandUpdatePage();
    expect(await brandUpdatePage.getPageTitle().getAttribute('id')).to.match(/opendataApp.brand.home.createOrEditLabel/);
    await brandUpdatePage.cancel();
  });

  it('should create and save Brands', async () => {
    async function createBrand() {
      await brandComponentsPage.clickOnCreateButton();
      await brandUpdatePage.setTitleInput('title');
      expect(await brandUpdatePage.getTitleInput()).to.match(/title/);
      await waitUntilDisplayed(brandUpdatePage.getSaveButton());
      await brandUpdatePage.save();
      await waitUntilHidden(brandUpdatePage.getSaveButton());
      expect(await brandUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createBrand();
    await brandComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await brandComponentsPage.countDeleteButtons();
    await createBrand();

    await brandComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await brandComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Brand', async () => {
    await brandComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await brandComponentsPage.countDeleteButtons();
    await brandComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    brandDeleteDialog = new BrandDeleteDialog();
    expect(await brandDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/opendataApp.brand.delete.question/);
    await brandDeleteDialog.clickOnConfirmButton();

    await brandComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await brandComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
