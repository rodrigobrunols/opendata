/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BranchComponentsPage from './branch.page-object';
import { BranchDeleteDialog } from './branch.page-object';
import BranchUpdatePage from './branch-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Branch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let branchUpdatePage: BranchUpdatePage;
  let branchComponentsPage: BranchComponentsPage;
  let branchDeleteDialog: BranchDeleteDialog;

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

  it('should load Branches', async () => {
    await navBarPage.getEntityPage('branch');
    branchComponentsPage = new BranchComponentsPage();
    expect(await branchComponentsPage.getTitle().getText()).to.match(/Branches/);
  });

  it('should load create Branch page', async () => {
    await branchComponentsPage.clickOnCreateButton();
    branchUpdatePage = new BranchUpdatePage();
    expect(await branchUpdatePage.getPageTitle().getAttribute('id')).to.match(/opendataApp.branch.home.createOrEditLabel/);
    await branchUpdatePage.cancel();
  });

  it('should create and save Branches', async () => {
    async function createBranch() {
      await branchComponentsPage.clickOnCreateButton();
      await branchUpdatePage.setNameInput('name');
      expect(await branchUpdatePage.getNameInput()).to.match(/name/);
      await branchUpdatePage.setCodeInput('5');
      expect(await branchUpdatePage.getCodeInput()).to.eq('5');
      await branchUpdatePage.setTypeInput('type');
      expect(await branchUpdatePage.getTypeInput()).to.match(/type/);
      await branchUpdatePage.setLatitudeInput('5');
      expect(await branchUpdatePage.getLatitudeInput()).to.eq('5');
      await branchUpdatePage.setLongitudeInput('5');
      expect(await branchUpdatePage.getLongitudeInput()).to.eq('5');
      await branchUpdatePage.setAdditionalInfoInput('additionalInfo');
      expect(await branchUpdatePage.getAdditionalInfoInput()).to.match(/additionalInfo/);
      await branchUpdatePage.addressSelectLastOption();
      await branchUpdatePage.companySelectLastOption();
      await waitUntilDisplayed(branchUpdatePage.getSaveButton());
      await branchUpdatePage.save();
      await waitUntilHidden(branchUpdatePage.getSaveButton());
      expect(await branchUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createBranch();
    await branchComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await branchComponentsPage.countDeleteButtons();
    await createBranch();

    await branchComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await branchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Branch', async () => {
    await branchComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await branchComponentsPage.countDeleteButtons();
    await branchComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    branchDeleteDialog = new BranchDeleteDialog();
    expect(await branchDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/opendataApp.branch.delete.question/);
    await branchDeleteDialog.clickOnConfirmButton();

    await branchComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await branchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
