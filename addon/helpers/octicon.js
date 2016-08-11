import svgs from 'ember-octicons-svg/octicons';
import Ember from 'ember';

export function octicon(params, namedArgs) {
  let svg = Ember.get(svgs.octicons.svg, namedArgs.icon);

  if(namedArgs.height || namedArgs.width){
    svg = Ember.$(svg).attr('height', namedArgs.height).attr('width', namedArgs.width).get(0).outerHTML;
  }

  if(namedArgs.class) {
    svg = Ember.$(svg).attr('class', namedArgs.class).get(0).outerHTML;
  }
  

  return Ember.String.htmlSafe(svg);
}

export default Ember.Helper.helper(octicon);
