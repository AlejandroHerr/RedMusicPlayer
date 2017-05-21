module.exports = {
  // locals: function(options) {
    // // Return custom template variables here.
    // return {};
  // },

  fileMapTokens() {
    return {
      __cmp__: (options) => {
        console.log(options.settings.getSetting('dumbPath'));
        return options.settings.getSetting('dumbPath');
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
