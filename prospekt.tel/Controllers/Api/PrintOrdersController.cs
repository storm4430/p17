using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Novacode;
using prospekt.tel.Models;
using System.IO;
using System.Net.Http.Headers;

namespace prospekt.tel.Controllers.Api
{
    [Authorize]
    public class PrintOrdersController : ApiController
    {
        private psEnt db = new psEnt();

        public HttpResponseMessage Get(int id)
        {
            try
            {
                var oid = db.usp_GetPrintConractById(id).FirstOrDefault();
                HttpResponseMessage rslt = new HttpResponseMessage(HttpStatusCode.OK);
                var fileStream = new FileStream(oid.file_path, FileMode.Open);
                FileInfo fi = new FileInfo(oid.file_path);
                var response = new HttpResponseMessage();
                response.Content = new StreamContent(fileStream);
                response.Content.Headers.ContentDisposition
                    = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = fi.Name;
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Content.Headers.ContentLength = fileStream.Length;

                return response;
            }
            catch (Exception)
            {
                var response = new HttpResponseMessage();
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
        }
    }
}
