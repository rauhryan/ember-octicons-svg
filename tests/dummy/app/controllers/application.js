import octicons from 'octicons';
import Ember from 'ember';

const keys = Object.keys || Ember.keys;

export default Ember.Controller.extend({
  icons: keys(octicons.octicons.svg)
});
