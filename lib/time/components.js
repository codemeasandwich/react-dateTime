'use strict';

var React = require('react');
var InputSlider = require('react-input-slider');

var Hours = React.createClass({
  displayName:  'Hours',


  propTypes: {
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    hoursText:React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hoursText:'Hours'
    };
  },
  
  render: function render() {
    var _props = this.props;
    var min = _props.min;
    var max = _props.max;
    var value = _props.value;
    var className = _props.className;

    return React.createElement(
      'div',
      { className: className },
      React.createElement(
        'div',
        { className: 'time-text' },
        this.props.hoursText+':'
      ),
      React.createElement(InputSlider, {
        className: 'u-slider-time',
        xmax: max,
        xmin: min,
        x: value,
        onChange: this.onChange
      })
    );
  },
  onChange: function onChange(pos) {
    var onChange = this.props.onChange;

    onChange && onChange(pos.x);
  }
});

var Minutes = React.createClass({
  displayName: 'Minutes',


  propTypes: {
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    minutesText:React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      minutesText:'Minutes'
    };
  },
  render: function render() {
    var _props2 = this.props;
    var min = _props2.min;
    var max = _props2.max;
    var value = _props2.value;
    var className = _props2.className;

    return React.createElement(
      'div',
      { className: className },
      React.createElement(
        'div',
        { className: 'time-text' },
        this.props.minutesText + ':'
      ),
      React.createElement(InputSlider, {
        className: 'u-slider-time',
        xmax: max,
        xmin: min,
        x: value,
        onChange: this.onChange
      })
    );
  },
  onChange: function onChange(pos) {
    var onChange = this.props.onChange;

    onChange && onChange(pos.x);
  }
});

var Display = React.createClass({
  displayName: 'Display',


  propTypes: {
    moment: React.PropTypes.object.isRequired
  },

  render: function render() {
    var m = this.props.moment;

    return React.createElement(
      'div',
      { className: 'showtime' },
      React.createElement(
        'span',
        { className: 'time' },
        m.format('HH')
      ),
      React.createElement(
        'span',
        { className: 'separater' },
        ':'
      ),
      React.createElement(
        'span',
        { className: 'time' },
        m.format('mm')
      )
    );
  }
});

module.exports.Hours = Hours;
module.exports.Minutes = Minutes;
module.exports.Display = Display;