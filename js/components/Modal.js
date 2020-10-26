/**
 * @module Modal
 */

/**
 * @constructor
 * @description Creates a new Modal object
 *
 * @property {Object}  DOMNode          DOM object related to the modal.
 * @property {Object}  DOMNodeModalText DOM object related to the modal text.
 * @property {Object}  DOMNodeCloseBtn  DOM object related to the modal close button.
 * @property {Object}  DOMNodeAnswerBts DOM object related to the modal answer buttons.
 * @property {Object}  opened           tells whether the modal is open
 */
let Modal = function() {
  this.ModalId = null;
  this.DOMNode = document.getElementById('modal');
  this.DOMNodeText = document.getElementById('modal-text');
  this.DOMNodeClose = document.getElementById('modal-close');
  this.DOMNodeButtons = document.getElementById('modal-buttons');
  this.opened = false;
};

/**
 * @description Show/hides the modal.
 *
 * @param {Boolean} show Indicates whether to show or hide the modal.
 */
Modal.prototype.setVisibility = function (show) {
  if (show) {
    this.DOMNode.classList.add('show');
    this.DOMNode.classList.remove('hidden');
    this.opened = true;
  }
  else {
    this.DOMNode.classList.add('hidden');
    this.DOMNode.classList.remove('show');
    this.opened = false;
  }
};

/**
 * @description Sets dialog text.
 *
 * @param {String} text text to be shown on the modal.
 */
Modal.prototype.setText = function (text) {
  this.DOMNodeText.innerHTML = text;
};

/**
 * @description Opens the modal.
 *
 * @param {String} text      text to be shown on the modal.
 * @param {String} modalType indicates the type of modal to be shown.
 * @param {Number} Id        identifies the exact message being shown.
 */
Modal.prototype.open = function (text, modalType, Id) {

  this.Id = Id;

  switch(modalType) {
    case 'info':
      this.DOMNodeButtons.classList.add('modal-buttons-hidden');
      this.DOMNodeButtons.classList.remove('modal-buttons');
      break;
    case 'question':
      this.DOMNodeButtons.classList.add('modal-buttons');
      this.DOMNodeButtons.classList.remove('modal-buttons-hidden');
      break;
  }

  this.setText(text);
  this.opened=true;
  this.setVisibility(true);
};

/**
 * @description Closes the modal.
 *
 */
Modal.prototype.close = function () {
  this.setVisibility(false);
};

export { Modal };