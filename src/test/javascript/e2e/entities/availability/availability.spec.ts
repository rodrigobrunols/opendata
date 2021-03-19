/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AvailabilityComponentsPage from './availability.page-object';
import { AvailabilityDeleteDialog } from './availability.page-object';
import AvailabilityUpdatePage from './availability-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Availability e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let availabilityUpdatePage: AvailabilityUpdatePage;
  let availabilityComponentsPage: AvailabilityComponentsPage;
  let availabilityDeleteDialog: AvailabilityDeleteDialog;

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

  it('should load Availabilities', async () => {
    await navBarPage.getEntityPage('availability');
    availabilityComponentsPage = new AvailabilityComponentsPage();
    expect(await availabilityComponentsPage.getTitle().getText()).to.match(/Availabilities/);
  });

  it('should load create Availability page', async () => {
    await availabilityComponentsPage.clickOnCreateButton();
    availabilityUpdatePage = new AvailabilityUpdatePage();
    expect(await availabilityUpdatePage.getPageTitle().getAttribute('id')).to.match(/opendataApp.availability.home.createOrEditLabel/);
    await availabilityUpdatePage.cancel();
  });

  it('should create and save Availabilities', async () => {
    async function createAvailability() {
      await availabilityComponentsPage.clickOnCreateButton();
      await availabilityUpdatePage.setWeekdayInput('weekday');
      expect(await availabilityUpdatePage.getWeekdayInput()).to.match(/weekday/);
      await availabilityUpdatePage.setOpeningTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await availabilityUpdatePage.getOpeningTimeInput()).to.contain('2001-01-01T02:30');
      await availabilityUpdatePage.setClosingTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await availabilityUpdatePage.getClosingTimeInput()).to.contain('2001-01-01T02:30');
      await availabilityUpdatePage.branchSelectLastOption();
      await waitUntilDisplayed(availabilityUpdatePage.getSaveButton());
      await availabilityUpdatePage.save();
      await waitUntilHidden(availabilityUpdatePage.getSaveButton());
      expect(await availabilityUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAvailability();
    await availabilityComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await availabilityComponentsPage.countDeleteButtons();
    await createAvailability();

    await availabilityComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await availabilityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Availability', async () => {
    await availabilityComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await availabilityComponentsPage.countDeleteButtons();
    await availabilityComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    availabilityDeleteDialog = new AvailabilityDeleteDialog();
    expect(await availabilityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/opendataApp.availability.delete.question/);
    await availabilityDeleteDialog.clickOnConfirmButton();

    await availabilityComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await availabilityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
