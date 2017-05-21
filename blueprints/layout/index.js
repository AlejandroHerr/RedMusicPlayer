module.exports = {
  // locals: function(options) {
    // // Return custom template variables here.
    // return {};
  // },

  fileMapTokens() {
    return {
      __layout__: (options) => {
        return options.settings.getSetting('layoutPath');
      }
    }
  }

  // Should probably never need to be overriden
  //
  // filesPath: function() {
    // return path.join(this.path, 'files');
  // },

  // beforeInstall: function(options) {},
  // afterInstall: function(options) {},
};
