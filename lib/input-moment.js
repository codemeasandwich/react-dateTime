'use strict';

var _components = require('./time/components');

var DefaultTimeComponents = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var Calendar = require('./date');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: 0
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      moment: moment(),
      showDate: true,
      showTime: true,
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right',
      hideSave:false,
     // steps: 1,
      TimeHoursControl: DefaultTimeComponents.Hours,
      TimeMinutesControl: DefaultTimeComponents.Minutes,
      TimeDisplay: DefaultTimeComponents.Display,
      locale: 'en',
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var _props = this.props;
    var showDate = _props.showDate;
    var showTime = _props.showTime;

    var showTabs = showDate && showTime;

    return React.createElement(
      'div',
      { className: cx("m-input-moment", {
          "m-input-moment--has-tabs": showTabs,
          "m-input-moment--no-date": !showDate,
          "m-input-moment--no-time": !showTime
        }) },
      React.createElement(
        'div',
        { className: 'm-input-moment__options' },
        showTabs && React.createElement(
          'button',
          { type: 'button', className: cx('ion-calendar m-input-moment__btn m-input-moment__btn-options', { 'is-active': tab === 0 }), onClick: this.handleClickTab.bind(null, 0) },
          (this.props.dateText)?this.props.dateText:'Date'
        ),
        showTabs && React.createElement(
          'button',
          { type: 'button', className: cx('ion-clock m-input-moment__btn m-input-moment__btn-options', { 'is-active': tab === 1 }), onClick: this.handleClickTab.bind(null, 1) },
          (this.props.timeText)?this.props.timeText:'Time'
        )
      ),
      React.createElement(
        'div',
        { className: 'm-input-moment__tabs' },
        showDate && React.createElement(Calendar, {
          className: cx('m-input-moment__tab', { 'is-active': !showTabs && showDate || tab === 0 }),
          moment: m,
          onChange: this.props.onChange,
          min: this.props.min,
          max: this.props.max,
          locale: this.props.locale,
          prevMonthIcon: this.props.prevMonthIcon,
          nextMonthIcon: this.props.nextMonthIcon
        }),
        showTime && React.createElement(Time, {
          className: cx('m-input-moment__tab', { 'is-active': !showTabs && showTime || tab === 1 }),
          moment: m,
          onChange: this.props.onChange,
          min: this.props.min,
          max: this.props.max,
          hoursText: this.props.hoursText,
          minutesText: this.props.minutesText,
          Hours: this.props.TimeHoursControl,
          Minutes: this.props.TimeMinutesControl,
          Display: this.props.TimeDisplay
        })
      ),
      ( ! this.props.hideSave)?React.createElement(
        'button',
        { type: 'button', className: 'm-input-moment__btn m-input-moment__btn-save ion-checkmark',
          onClick: this.handleSave },
        'Save'
      ):undefined,
      this.renderInput()
    );
  },
  renderInput: function renderInput() {
    var _props2 = this.props;
    var name = _props2.name;
    var serializeFormat = _props2.serializeFormat;

    if (name) {
      return React.createElement('input', { ref: 'input', type: 'hidden', name: name, value: this.props.moment.format(serializeFormat) });
    }
  },
  handleClickTab: function handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({ tab: tab });
  },
  handleSave: function handleSave(e) {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  }
});