/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AddressComponentsPage from './address.page-object';
import { AddressDeleteDialog } from './address.page-object';
import AddressUpdatePage from './address-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Address e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressUpdatePage: AddressUpdatePage;
  let addressComponentsPage: AddressComponentsPage;
  let addressDeleteDialog: AddressDeleteDialog;

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

  it('should load Addresses', async () => {
    await navBarPage.getEntityPage('address');
    addressComponentsPage = new AddressComponentsPage();
    expect(await addressComponentsPage.getTitle().getText()).to.match(/Addresses/);
  });

  it('should load create Address page', async () => {
    await addressComponentsPage.clickOnCreateButton();
    addressUpdatePage = new AddressUpdatePage();
    expect(await addressUpdatePage.getPageTitle().getAttribute('id')).to.match(/opendataApp.address.home.createOrEditLabel/);
    await addressUpdatePage.cancel();
  });

  it('should create and save Addresses', async () => {
    async function createAddress() {
      await addressComponentsPage.clickOnCreateButton();
      await addressUpdatePage.setAddressInput('address');
      expect(await addressUpdatePage.getAddressInput()).to.match(/address/);
      await addressUpdatePage.setDistrictNameInput('districtName');
      expect(await addressUpdatePage.getDistrictNameInput()).to.match(/districtName/);
      await addressUpdatePage.setTownNameInput('townName');
      expect(await addressUpdatePage.getTownNameInput()).to.match(/townName/);
      await addressUpdatePage.setCountrySubDivisionInput('countrySubDivision');
      expect(await addressUpdatePage.getCountrySubDivisionInput()).to.match(/countrySubDivision/);
      await addressUpdatePage.setPostCodeInput('5');
      expect(await addressUpdatePage.getPostCodeInput()).to.eq('5');
      await addressUpdatePage.setAdditionalInfoInput('additionalInfo');
      expect(await addressUpdatePage.getAdditionalInfoInput()).to.match(/additionalInfo/);
      await waitUntilDisplayed(addressUpdatePage.getSaveButton());
      await addressUpdatePage.save();
      await waitUntilHidden(addressUpdatePage.getSaveButton());
      expect(await addressUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAddress();
    await addressComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await addressComponentsPage.countDeleteButtons();
    await createAddress();

    await addressComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Address', async () => {
    await addressComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await addressComponentsPage.countDeleteButtons();
    await addressComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    addressDeleteDialog = new AddressDeleteDialog();
    expect(await addressDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/opendataApp.address.delete.question/);
    await addressDeleteDialog.clickOnConfirmButton();

    await addressComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
