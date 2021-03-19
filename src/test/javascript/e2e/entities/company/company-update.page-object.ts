import { element, by, ElementFinder } from 'protractor';

export default class CompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('opendataApp.company.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#company-name'));
  cnpjNumberInput: ElementFinder = element(by.css('input#company-cnpjNumber'));
  brandSelect: ElementFinder = element(by.css('select#company-brand'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCnpjNumberInput(cnpjNumber) {
    await this.cnpjNumberInput.sendKeys(cnpjNumber);
  }

  async getCnpjNumberInput() {
    return this.cnpjNumberInput.getAttribute('value');
  }

  async brandSelectLastOption() {
    await this.brandSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async brandSelectOption(option) {
    await this.brandSelect.sendKeys(option);
  }

  getBrandSelect() {
    return this.brandSelect;
  }

  async getBrandSelectedOption() {
    return this.brandSelect.element(by.css('option:checked')).getText();
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
