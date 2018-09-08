module.exports = function(grunt) {
  grunt.initConfig({
    // Task name
    sass: {
      // sub task
      dist: {
        options: {
          // Options
          style: "expanded",
        },
        files: {
          "public/stylesheets/css/style.css": "public/stylesheets/scss/style.scss", // 'destination': 'source'
        },
      },
    },
  });

  // package import
  grunt.loadNpmTasks("grunt-contrib-sass");

  // default task to lauch if grunt is launched without arguments
  grunt.registerTask("default", ["sass:dist"]);
};