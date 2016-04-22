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
      this.nombreApp = res.nombre
      done();
    }.bind(this));
  },
  scaffold: function () {
    var _this = this;
    var errorFunction = function (err) {
      if(err)
        _this.log(err);
    }
  	mkdirp("app/assets", errorFunction);
  	mkdirp("app/assets/img", errorFunction);
  	mkdirp("app/assets/styles", errorFunction);
  	mkdirp("app/js", errorFunction);
  	mkdirp("app/directives", errorFunction);
  	mkdirp("app/modules", errorFunction);
  	mkdirp("app/views", errorFunction);
  },
  generateFiles: function(){
    var _this = this;
    this.copy("_gulpfile.js", "gulpfile.js");
    this.copy("_gitignore", ".gitignore");    
 
    var context = { 
        nombre_app: this.nombreApp 
    };
 
    this.template("_bower.json", "bower.json", context);
    this.template("_package.json", "package.json", context);
    this.installDependencies({
      bower: true,
      npm: true,
      callback: function () {
        _this.log(yosay("Yotality"));
      }
    });
	}
});