import { element, by, ElementFinder } from 'protractor';

export default class AvailabilityUpdatePage {
  pageTitle: ElementFinder = element(by.id('opendataApp.availability.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  weekdayInput: ElementFinder = element(by.css('input#availability-weekday'));
  openingTimeInput: ElementFinder = element(by.css('input#availability-openingTime'));
  closingTimeInput: ElementFinder = element(by.css('input#availability-closingTime'));
  branchSelect: ElementFinder = element(by.css('select#availability-branch'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWeekdayInput(weekday) {
    await this.weekdayInput.sendKeys(weekday);
  }

  async getWeekdayInput() {
    return this.weekdayInput.getAttribute('value');
  }

  async setOpeningTimeInput(openingTime) {
    await this.openingTimeInput.sendKeys(openingTime);
  }

  async getOpeningTimeInput() {
    return this.openingTimeInput.getAttribute('value');
  }

  async setClosingTimeInput(closingTime) {
    await this.closingTimeInput.sendKeys(closingTime);
  }

  async getClosingTimeInput() {
    return this.closingTimeInput.getAttribute('value');
  }

  async branchSelectLastOption() {
    await this.branchSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async branchSelectOption(option) {
    await this.branchSelect.sendKeys(option);
  }

  getBranchSelect() {
    return this.branchSelect;
  }

  async getBranchSelectedOption() {
    return this.branchSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
