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
  	mkdirp("app/assets", function (err) {});
  	mkdirp("app/assets/img", function (err) {});
  	mkdirp("app/assets/styles",function (err) {});
  	mkdirp("app/js",function (err) {});
  	mkdirp("app/directives",function (err) {});
  	mkdirp("app/modules",function (err) {});
  	mkdirp("app/views",function (err) {});
  	mkdirp("build",function (err) {});
  },
  copyFiles: function(){
    this.copy("_gulpfile.js", "gulpfile.js");
    this.copy("_gitignore", ".gitignore");    
 
    var context = { 
        nombre_app: this.nombreApp 
    };
 
    this.template("_bower.json", "bower.json", context);
    this.template("_package.json", "package.json", context);
	},
	installBowerDependencies: function () {
		var dependencias = require('./dependenciasBower.json')
    this.bowerInstall(dependencias, { 'save': true });
	
	},
	installNPMDependencies: function () {
		this.log(yosay(
      'Ahora siguen las de NPM'
    ));
    var dependencias = require('./dependenciasNPM.json');
    this.npmInstall(dependencias, { 'saveDev': true });

	}
});