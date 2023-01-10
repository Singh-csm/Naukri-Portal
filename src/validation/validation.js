const mongoose = require("mongoose");

const isValidName = function (name) {
  const validName = /^[a-zA-Z_]{1,20}$/;
  return validName.test(name);
};

const isValidFullName = function (name) {
  const validName = /^[a-z A-Z_]{1,50}$/;
  return validName.test(name);
};

const isValidMobile = function (name) {
  const validName = /^[0-9]{10}$/;
  return validName.test(name);
};

const validlogolink = function (logoLink) {
  const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  return regex.test(logoLink);
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
};

module.exports.isValidName = isValidName;
module.exports.isValidMobile = isValidMobile;
module.exports.isValidObjectId = isValidObjectId;
module.exports.validlogolink = validlogolink;
module.exports.isValidFullName = isValidFullName;
module.exports.isValid = isValid;
