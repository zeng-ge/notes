"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);

    _defineProperty(this, "name", 'abc');
  }

  _createClass(User, [{
    key: "say",
    value: function say() {
      console.log('hello world');
    }
  }, {
    key: "defer",
    value: function defer() {
      return new Promise();
    }
  }]);

  return User;
}();
"use strict";

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUser = function getUser() {
  return new _User.default('sky');
};
const log = () => {
  console.log('abc');
};
