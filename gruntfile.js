path = require("path");

module.exports = function(grunt) {
  //grunt.option("force", true);
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: [
        "package.json",
        "gruntfile.js", 
        "lib/**/*.js",
        "test/**/*.js"
      ]
    },


    spawn: {
      list: {
        cmd: "ls", 
        args: [
          "-la"
        ]
      }, 
      test: {
        cmd: "mocha", 
        args: [
          "--reporter", 
          "spec",
          "{0}"
        ],
        incl: [{
          op: "startsWith", 
          val: "tests/"
        }],
        excl: [{
          op: "contains",
          val: "node_modules"
        }],
        files: [{
          cwd: ".", 
          expand: true, 
          src: ["**/*.js"]
        }]
      }
    },

    release: {
      options: {
        bump: false,
        file: "package.json",
        add: true, 
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true
      }
    }

  });

  
  grunt.loadTasks("./tasks");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", ["spawn:test", "release"]);
  
};