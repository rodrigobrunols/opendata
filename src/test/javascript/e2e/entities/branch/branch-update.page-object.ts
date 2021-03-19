import { element, by, ElementFinder } from 'protractor';

export default class BranchUpdatePage {
  pageTitle: ElementFinder = element(by.id('opendataApp.branch.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#branch-name'));
  codeInput: ElementFinder = element(by.css('input#branch-code'));
  typeInput: ElementFinder = element(by.css('input#branch-type'));
  latitudeInput: ElementFinder = element(by.css('input#branch-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#branch-longitude'));
  additionalInfoInput: ElementFinder = element(by.css('input#branch-additionalInfo'));
  addressSelect: ElementFinder = element(by.css('select#branch-address'));
  companySelect: ElementFinder = element(by.css('select#branch-company'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return this.longitudeInput.getAttribute('value');
  }

  async setAdditionalInfoInput(additionalInfo) {
    await this.additionalInfoInput.sendKeys(additionalInfo);
  }

  async getAdditionalInfoInput() {
    return this.additionalInfoInput.getAttribute('value');
  }

  async addressSelectLastOption() {
    await this.addressSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async addressSelectOption(option) {
    await this.addressSelect.sendKeys(option);
  }

  getAddressSelect() {
    return this.addressSelect;
  }

  async getAddressSelectedOption() {
    return this.addressSelect.element(by.css('option:checked')).getText();
  }

  async companySelectLastOption() {
    await this.companySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect() {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return this.companySelect.element(by.css('option:checked')).getText();
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
