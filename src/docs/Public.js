/**
 * @api {get} / (00) Test API
 * @apiVersion 1.0.0
 * @apiName testApiPublic
 * @apiGroup Public
 *
 * @apiSuccess {String} msg Mensaje del proceso.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "msg": "API Challenge 2022"
}
 *
 */

/**
 * @api {get} /files/list (01) Get files list
 * @apiVersion 1.0.0
 * @apiName filesListPublic
 * @apiGroup Public
 *
 * @apiSuccess {Object[]} files Listado de archivos.
 *
 * @apiSuccess (files Object[]) {String} file Nombre del archivo.
 * @apiSuccess (files Object[]) {Object[]} lines Nombre del archivo.
 *
 * @apiSuccess (lines Object[]) {String} text Texto aleatorio.
 * @apiSuccess (lines Object[]) {Number} number Número aleatorio.
 * @apiSuccess (lines Object[]) {String} hex Hexadecimal del archivo.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * [
  {
    "file": "test2.csv",
    "lines": [
      {
        "text": "qGosirWt",
        "number": 441,
        "hex": "c03b735287b76da5c46a1a7e58b6bc18"
      }
    ]
  },
  .
  .
  .
]
 *
 * @apiSuccessExample {JSON} Success without files
 * HTTP/1.1 200 Success
 * {
  "msg": "Listado de archivos",
  "files": []
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {get} /files/list (02) Get original files from external API
 * @apiVersion 1.0.0
 * @apiName getExternalFilesListPublic
 * @apiGroup Public
 *
 * @apiSuccess {String[]} files Listado de archivos, cada línea contiene los siguientes datos:
 *
 * "file,text,number,hex\n
 * test2.csv,asdfgh,119,b310aa4917d67a29cee300c752e174e3\n..."
 *
 * .
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * [
  "file,text,number,hex",
  "file,text,number,hex\ntest2.csv,oQQRq\ntest2.csv,jmiFPqF,119,b310aa4917d67a29cee300c752e174e3",
   .
   .
   .
]
 *
 * @apiSuccessExample {JSON} Success without files
 * HTTP/1.1 200 Success
 * {
  "msg": "Listado de archivos",
  "files": []
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {get} /files/data?fileName={file.csv} (03) Get file data
 * @apiVersion 1.0.0
 * @apiName fileDataPublic
 * @apiGroup Public
 *
 * @apiParam (Query params) {String} fileName Nombre del archivo a buscar.
 *
 * @apiSuccess {String} msg Mensaje del proceso.
 * @apiSuccess {Object} file Listado de archivos.
 *
 * @apiSuccess (files Object) {String} file Nombre del archivo.
 * @apiSuccess (files Object) {Object[]} lines Listado de datos del archivo.
 *
 * @apiSuccess (lines Object[]) {String} text Texto aleatorio.
 * @apiSuccess (lines Object[]) {Number} number Número aleatorio.
 * @apiSuccess (lines Object[]) {String} hex Hexadecimal del archivo.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "msg": "Detalles del archivo",
  "data": {
    "file": "test3.csv",
    "lines": [
      {
        "hex": "1233c8044d811f884e5473884c7ee2b6",
        "number": 63122686,
        "text": "fAWYYTWISSAChbwbWuPGyImTJpOwo"
      },
      .
      .
      .
    ]
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Not found
 * HTTP/1.1 404 Not Found
 * {
  "error": "Not found!"
}
 *
 * @apiErrorExample {JSON} Unprocessable Entity
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "error": "Not found!"
}
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {get|post|put|delete} /* (04) 404 global response
 * @apiVersion 1.0.0
 * @apiName errorNotFoundPathPublic
 * @apiGroup Public
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Not found
 * HTTP/1.1 404 Not Found
 * {
  "error": "Not found!"
}
 *
 * @apiUse GlobalErrorSystem
 *
 */
