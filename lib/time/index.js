'use strict';

var _utils = require('../utils');

var cx = require('classnames');
var React = require('react');
var moment = require('moment');
var noop = require('lodash/noop');

module.exports = React.createClass({
  displayName: 'Time',

  propTypes: {
    Hours: React.PropTypes.func,
    Minutes: React.PropTypes.func,
    Display: React.PropTypes.func,
    hoursText: React.PropTypes.string,
    minutesText: React.PropTypes.string,
    moment: React.PropTypes.object.isRequired,
    max: React.PropTypes.object.isRequired,
    min: React.PropTypes.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      Hours: noop,
      Minutes: noop,
      Display: noop,

      moment: moment(),
      min: moment("00:00", "HH:mm"),
      max: moment("23:59", "HH:mm")
    };
  },
  render: function render() {
    var _props = this.props;
    var Hours = _props.Hours;
    var Minutes = _props.Minutes;
    var Display = _props.Display;

    var m = this.m_value;

    return React.createElement(
      'div',
      { className: cx('m-time', this.props.className) },
      React.createElement(Display, {
        className: 'm-time__display',
        moment: m
      }),
      React.createElement(
        'div',
        { className: 'm-time__controls' },
        React.createElement(Hours, {
          className: 'm-time__hours',
          min: this.getMinHour(),
          max: this.getMaxHour(),
          hoursText:this.props.hoursText,
          value: m.hour(),
          onChange: this.onChangeHours
        }),
        React.createElement(Minutes, {
          className: 'm-time__minutes',
          min: this.getMinMinute(),
          max: this.getMaxMinute(),
          minutesText:this.props.minutesText,
          value: m.minute(),
          onChange: this.onChangeMinutes
        })
      )
    );
  },
  onChangeHours: function onChangeHours(pos) {
    var m = this.m_value;
    m.hours(parseInt(pos, 10));
    this._emitChange(m);
  },
  onChangeMinutes: function onChangeMinutes(pos) {
    var m = this.m_value;
    m.minutes(parseInt(pos, 10));
    this._emitChange(m);
  },
  _emitChange: function _emitChange(m) {
    this.fit(m);
    var _props2 = this.props;
    var onChange = _props2.onChange;
    var moment = _props2.moment;

    onChange && onChange((0, _utils.copyDate)(m.clone(), moment));
  },
  getMaxHour: function getMaxHour() {
    var _props3 = this.props;
    var max = _props3.max;
    var moment = _props3.moment;

    return moment.dayOfYear() === max.dayOfYear() ? max.hour() : 23;
  },
  getMinHour: function getMinHour() {
    var _props4 = this.props;
    var min = _props4.min;
    var moment = _props4.moment;

    return moment.dayOfYear() === min.dayOfYear() ? min.hour() : 0;
  },
  getMaxMinute: function getMaxMinute() {
    var _props5 = this.props;
    var moment = _props5.moment;
    var max = _props5.max;

    return moment.dayOfYear() === max.dayOfYear() && moment.hour() === max.hour() ? max.minute() : 59;
  },
  getMinMinute: function getMinMinute() {
    var _props6 = this.props;
    var moment = _props6.moment;
    var min = _props6.min;

    return moment.dayOfYear() === min.dayOfYear() && moment.hour() === min.hour() ? min.minute() : 0;
  },
  fit: function fit(m) {
    m.set({
      hour: (0, _utils.fitRange)(this.getMinHour(), this.getMaxHour(), m.hour()),
      minute: (0, _utils.fitRange)(this.getMinMinute(), this.getMaxMinute(), m.minute())
    });
    return m;
  },


  // ---

  componentWillMount: function componentWillMount() {
    this.m_value = moment();
    this._adopt(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this._adopt(props);
  },
  _adopt: function _adopt(props) {
    if (props.moment != null) {
      this.m_value.set(props.moment.toObject());
    }
  }
});