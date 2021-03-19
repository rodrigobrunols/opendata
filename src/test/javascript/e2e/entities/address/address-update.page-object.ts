import { element, by, ElementFinder } from 'protractor';

export default class AddressUpdatePage {
  pageTitle: ElementFinder = element(by.id('opendataApp.address.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressInput: ElementFinder = element(by.css('input#address-address'));
  districtNameInput: ElementFinder = element(by.css('input#address-districtName'));
  townNameInput: ElementFinder = element(by.css('input#address-townName'));
  countrySubDivisionInput: ElementFinder = element(by.css('input#address-countrySubDivision'));
  postCodeInput: ElementFinder = element(by.css('input#address-postCode'));
  additionalInfoInput: ElementFinder = element(by.css('input#address-additionalInfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setDistrictNameInput(districtName) {
    await this.districtNameInput.sendKeys(districtName);
  }

  async getDistrictNameInput() {
    return this.districtNameInput.getAttribute('value');
  }

  async setTownNameInput(townName) {
    await this.townNameInput.sendKeys(townName);
  }

  async getTownNameInput() {
    return this.townNameInput.getAttribute('value');
  }

  async setCountrySubDivisionInput(countrySubDivision) {
    await this.countrySubDivisionInput.sendKeys(countrySubDivision);
  }

  async getCountrySubDivisionInput() {
    return this.countrySubDivisionInput.getAttribute('value');
  }

  async setPostCodeInput(postCode) {
    await this.postCodeInput.sendKeys(postCode);
  }

  async getPostCodeInput() {
    return this.postCodeInput.getAttribute('value');
  }

  async setAdditionalInfoInput(additionalInfo) {
    await this.additionalInfoInput.sendKeys(additionalInfo);
  }

  async getAdditionalInfoInput() {
    return this.additionalInfoInput.getAttribute('value');
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
