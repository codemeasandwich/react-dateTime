**THIS IS A FORK OF [input-moment](https://www.npmjs.com/package/react-moment-datetimepicker)**

# input-moment
React datetime picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.

The icon is from [ionicons](http://ionicons.com/).

### Installation
``` sh
npm i hb-input-moment --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Old Demo
http://wangzuo.github.io/input-moment

### Usage

#### Basic example
``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
/>
```

#### Props
| Prop          | Description                                       | Default                                           |
|---------------|---------------------------------------------------|---------------------------------------------------|
| dateOnly      | Boolean. If it should show only the date picker.  | `false`                                           |
| timeOnly      | Boolean. If it should show only the time picker.  | `false`                                           |
| prevMonthIcon | String. Class string for the previous month icon. | 'ion-ios-arrow-left'                              |
| nextMonthIcon | String. Class string for the next month icon.     | 'ion-ios-arrow-right'                             |
| locale        | String. Locale to display date time in.           | 'en'                                              |
| hideSave      | Boolean. should hide the save button.             | 'false'                                           |


### Development
- npm install
- npm start
- http://localhost:8888

### License
ISC

