#Generador Frontend X8 bit

Generador para aplicaciones frontend usando Angular, CoffeeScript y Jade.

Este generador incluye Gulp como taskmanager, ya tiene configuradas tareas que solo se usan en desarrollo o producción.

1. Pre-requisitos
2. Instalación
3. Arquitectura
4. Uso

## Pre-requisitos
Tener instalado yeoman usando el gestor de paquetes de Node npm

```
npm install -g yo
```

## Instalación
```
npm install -g generator-x8bit-front
```
## Arquitectura
El generador X8 crea la siguiente estructura de carpetas y archivos

* app
	* assets
	* modulos 
* bower.json
* bower_components
* package.json
* .gitignore
* node_modules

## Uso

Para usarlo teclea en la terminal 

```
yo x8bit-front
```

Te pedirá el nombre tu proyecto y creará la estructura antes mencionada.

Agrega las rutas de las dependencias que quieras usar a los archivos bowercss.json y bowerjs.json en la carpeta listAssets con el siguiente formato.
```
[
    "bower_components/angular-bootstrap/ui-bootstrap-csp.css"
]
```