import svgs from 'ember-octicons-svg/octicons';
import Ember from 'ember';
import layout from '../templates/components/octicon-icon';


export default Ember.Component.extend({
  tagName: '',
  layout: layout,
  svg: Ember.computed('icon', 'class', {
    get: function(){
      let svg = Ember.get(svgs.octicons.svg, this.get('icon'));

      if(this.attrs.height || this.attrs.width){
        svg = Ember.$(svg).attr('height', this.attrs.height).attr('width', this.attrs.width).get(0).outerHTML;
      }
      
      return Ember.String.htmlSafe(svg);

    }
  })
});
