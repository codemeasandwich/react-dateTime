'use strict';

var _utils = require('../utils');

var React = require('react');
var Day = require('./day');
var cx = require('classnames');
var moment = require('moment');
var range = require('lodash/range');
var chunk = require('lodash/chunk');

var listToGrid = function listToGrid(x) {
  return chunk(x, 7);
};

// ---

module.exports = React.createClass({
  displayName: 'Calendar',

  getDefaultProps: function getDefaultProps() {
    return {
      moment: moment()
    };
  },
  getInitialState: function getInitialState() {
    return {
      displayed: moment().startOf('day')
    };
  },
  render: function render() {
    var m = this.state.displayed;

    let locale = this.props.locale;
    
    return React.createElement(
      'div',
      { className: cx('m-calendar', this.props.className) },
      React.createElement(
        'div',
        { className: 'm-calendar__toolbar' },
        React.createElement(
          'button',
          { type: 'button', onClick: this.onPrevMonth,
            className: cx("m-calendar__btn m-calendar__btn-prev-month", { "m-calendar__btn--disabled": !this.isPrevMonthAvailable() }) },
          React.createElement('i', { className: this.props.prevMonthIcon })
        ),
        React.createElement(
          'span',
          { className: 'm-calendar__current-date' },
          m.locale(locale).format('MMMM YYYY')
        ),
        React.createElement(
          'button',
          { type: 'button', onClick: this.onNextMonth,
            className: cx("m-calendar__btn m-calendar__btn-next-month", { "m-calendar__btn--disabled": !this.isNextMonthAvailable() }) },
          React.createElement('i', { className: this.props.nextMonthIcon })
        )
      ),
      React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            this.renderWeekdays()
          )
        ),
        React.createElement(
          'tbody',
          null,
          this.renderDays()
        )
      )
    );
  },
  renderWeekdays: function renderWeekdays() {
    let locale = this.props.locale;
    var weekdays = this.m_weekdays.startOf('week');
    return range(0, 7).map(function (w, i) {
      return React.createElement(
        'td',
        { key: i },
        weekdays.locale(locale).weekday(w).format('ddd')
      );
    });
  },
  renderDays: function renderDays() {
    var _this = this;

    var current = this.m_current;
    var days = this.m_days;
    var displayed = this.state.displayed;

    return days.map(function (row, rowIdx) {
      return React.createElement(
        'tr',
        { key: rowIdx },
        row.map(function (m) {
          return React.createElement(Day, { key: m.date(),
            moment: m,
            isActive: !_this.isExcluded(m) && _this.isInRange(m),
            isCurrent: m.isSame(current),
            isPrevMonth: m.month() > displayed.month(),
            isNextMonth: m.month() < displayed.month(),
            onClick: _this.onSelectDate });
        })
      );
    });
  },


  // ---

  onSelectDate: function onSelectDate(date) {
    var _props = this.props;
    var onChange = _props.onChange;
    var moment = _props.moment;

    onChange && onChange((0, _utils.copyTime)(date.clone(), moment));
  },
  onPrevMonth: function onPrevMonth(e) {
    e.preventDefault();
    if (this.isPrevMonthAvailable()) {
      this._updateGrid(this.state.displayed.clone().subtract(1, 'month'));
    }
  },
  onNextMonth: function onNextMonth(e) {
    e.preventDefault();
    if (this.isNextMonthAvailable()) {
      this._updateGrid(this.state.displayed.clone().add(1, 'month'));
    }
  },


  // ---

  _updateGrid: function _updateGrid(date) {
    var days = this.m_days;

    generateDaysGrid(date).forEach(function (row, weekIdx) {
      row.forEach(function (dayOfMonth, weekdayIdx) {
        var isPrevMonth = weekIdx === 0 && dayOfMonth > 7;
        var isNextMonth = weekIdx >= 4 && dayOfMonth <= 14;

        var m_day = days[weekIdx][weekdayIdx].set(date.toObject());
        if (isPrevMonth) m_day.subtract(1, 'month');
        if (isNextMonth) m_day.add(1, 'month');
        m_day.date(dayOfMonth);
      });
    });

    this.setState({ displayed: date });
  },
  isPrevMonthAvailable: function isPrevMonthAvailable() {
    var firstDay = this.m_days[0][0];
    return this.isInRange(firstDay) || this.m_current < firstDay;
  },
  isNextMonthAvailable: function isNextMonthAvailable() {
    var row = this.m_days[this.m_days.length - 1];
    var lastDay = row[row.length - 1];
    return this.isInRange(lastDay) || this.m_current > lastDay;
  },
  isInRange: function isInRange(value) {
    var _props2 = this.props;
    var min = _props2.min;
    var max = _props2.max;

    return (0, _utils.isInRange)(min == null ? null : this.m_min, max == null ? null : this.m_max, value);
  },
  isExcluded: function isExcluded(value) {
    var exclude = this.props.exclude;

    return (0, _utils.isExcluded)(exclude == null ? null : this.exclude, value);
  },


  // ---

  componentWillMount: function componentWillMount() {
    // preallocate all moment instances we need
    this.m_weekdays = moment();
    this.m_max = moment();
    this.m_min = moment();
    this.m_current = moment();
    this.m_days = listToGrid(range(0, 42).map(function () {
      return moment();
    }));
    this.exclude = [];

    this._adopt(this.props);

    this._updateGrid(this.m_current);
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this._adopt(props);
  },
  _adopt: function _adopt(props) {
    if (props.max != null) {
      (0, _utils.copyWithZeroTime)(this.m_max, props.max);
    }
    if (props.min != null) {
      (0, _utils.copyWithZeroTime)(this.m_min, props.min);
    }
    if (props.exclude != null) {
      var exclude = [].concat(props.exclude);
      this.exclude = exclude.map(function (src) {
        return (0, _utils.copyWithZeroTime)(moment(), src);
      });
    }
    if (props.moment != null) {
      (0, _utils.copyWithZeroTime)(this.m_current, props.moment);
      this._updateGrid(this.m_current);
    }
  }
});

// ---

function generateDaysGrid(m) {
  var d1 = m.clone().subtract(1, 'month').endOf('month').date();
  var d2 = m.clone().date(1).day();
  var d3 = m.clone().endOf('month').date();

  return listToGrid([].concat(range(d1 - d2 + 1, d1 + 1), range(1, d3 + 1), range(1, 42 - d3 - d2 + 1)));
}