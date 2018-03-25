'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponents = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createComponents = function createComponents(store) {
  var Store = function (_React$Component) {
    _inherits(Store, _React$Component);

    function Store(props) {
      _classCallCheck(this, Store);

      var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, props));

      store.connectComponentState(_this, props.keys);
      return _this;
    }

    _createClass(Store, [{
      key: 'render',
      value: function render() {
        return this.props.children(this.state);
      }
    }]);

    return Store;
  }(_react2.default.Component);

  var connectStore = function connectStore(keys) {
    var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return function (WrappedComponent) {
      return function (_React$Component2) {
        _inherits(_class, _React$Component2);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: 'render',
          value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
              Store,
              { keys: keys },
              function (state) {
                return _react2.default.createElement(WrappedComponent, _extends({
                  state: state
                }, mapStateToProps && mapStateToProps(state), _this3.props));
              }
            );
          }
        }]);

        return _class;
      }(_react2.default.Component);
    };
  };

  return { Store: Store, connectStore: connectStore };
};
exports.createComponents = createComponents;