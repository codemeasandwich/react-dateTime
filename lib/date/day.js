'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var cx = require('classnames');
var React = require('react');

// ---

module.exports = React.createClass({
  displayName: 'Day',

  render: function render() {
    var _props = this.props;
    var isCurrent = _props.isCurrent;
    var isActive = _props.isActive;
    var isPrevMonth = _props.isPrevMonth;
    var isNextMonth = _props.isNextMonth;
    var moment = _props.moment;


    var cn = cx('day', {
      'day--prev-month': isPrevMonth,
      'day--next-month': isNextMonth,
      'day--active': isActive,
      'day--current': isActive && isCurrent // unavailable day can't be active
    });

    return React.createElement(
      'td',
      _extends({}, this.props, { className: cn, onClick: this.onClick }),
      moment.date()
    );
  },
  onClick: function onClick() {
    var _props2 = this.props;
    var isActive = _props2.isActive;
    var onClick = _props2.onClick;
    var moment = _props2.moment;

    if (isActive && onClick) {
      onClick(moment);
    }
  }
});