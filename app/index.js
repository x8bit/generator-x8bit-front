var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  promptUser: function () {
  	var done = this.async();

  	this.log(yosay(
      'Este es el generador de aplicaciones frontend de X8bit'
    ));

    var prompts = [
	    {
	      type    : 'input',
	      name    : 'nombre',
	      message : '¿Nombre del proyecto?',
	      default : "x8-front"
	    }
    ];
    this.prompt(prompts, function (res) {
      this.nombreApp = res.nombre;
      mkdirp.sync(this.nombreApp + "/app/");
      done();
    }.bind(this));
  },
  scaffold: function () {
    var _this = this;

    var errorFunction = function (err) {
      if(err)
        _this.log(err);
    }
    var appFolder = this.nombreApp + "/app/";

  	mkdirp(appFolder + "assets", errorFunction);
  	mkdirp(appFolder + "assets/img", errorFunction);
  	mkdirp(appFolder + "assets/styles", errorFunction);
  	mkdirp(appFolder + "js", errorFunction);
  	mkdirp(appFolder + "directives", errorFunction);
  	mkdirp(appFolder + "modules", errorFunction);
  	mkdirp(appFolder + "views", errorFunction);
  },
  generateFiles: function(){
    var _this = this;
    this.copy("_gulpfile.js", this.nombreApp + "/gulpfile.js");
    this.copy("_gitignore", this.nombreApp + "/.gitignore");    
 
    var context = { 
      nombre_app: this.nombreApp 
    };
 
    this.template("_bower.json", this.nombreApp + "/bower.json", context);
    this.template("_package.json", this.nombreApp + "/package.json", context);
    this.template("_index.jade", this.nombreApp + "/app/index.jade", context);
    this.installDependencies({
      bower: true,
      npm: true,
      callback: function () {
        _this.log(yosay("Yotality"));
      }
    });
	}
});