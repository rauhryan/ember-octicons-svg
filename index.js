/* jshint node: true */
'use strict';

var esTranspiler = require('broccoli-babel-transpiler');
var Funnel = require('broccoli-funnel');
var flatiron = require('broccoli-flatiron');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-octicons-svg',
  buildTrees: function(appTree) {
    var trees = [];

    if (appTree){
      trees.push(appTree);
    }

    var octiconsDir = path.dirname(require.resolve('octicons'));
    var octiconsPath = path.join(octiconsDir, "build", "svg");

    var svgFiles = new Funnel(octiconsPath, {
      include: [new RegExp(/\.svg$/)],
      destDir: 'octicons/svg'
    });

    var flattenedSvgs = flatiron(svgFiles, {
      outputFile: 'octicons/octicons.js',
      trimExtensions: true
    })

    //trees.push(svgFiles);
    trees.push(esTranspiler(flattenedSvgs, {
      modules: 'amd',
      moduleIds: true,
      getModuleId: function(){
        return "octicons";
      }
    }));

    
    return mergeTrees(trees);
  },
  treeForAddon: function(tree){
    var trees = [];

    var octiconsDir = path.dirname(require.resolve('octicons'));
    var octiconsPath = path.join(octiconsDir, "build", "svg");

    var svgFiles = new Funnel(octiconsPath, {
      include: [new RegExp(/\.svg$/)],
      destDir: 'octicons/svg'
    });

    var flattenedSvgs = flatiron(svgFiles, {
      outputFile: 'octicons.js',
      trimExtensions: true
    })

    trees.push(tree)
    trees.push(flattenedSvgs);

    return this._super.treeForAddon.call(this, mergeTrees(trees, {overwrite: true}));
  },
  treeForVendor: function() {
    var vendorTree = this._super.treeForVendor.apply(this, arguments);
    return this.buildTrees(vendorTree);
  },
  included: function(app){
    app.import(this.treePaths.vendor + "/octicons/octicons.js");
    return app;
  }
};
