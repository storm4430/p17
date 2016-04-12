using System;
using System.Linq;
using System.Web.Http;
using prospekt.tel.Models;
using System.IO;
using System.Web;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;

namespace prospekt.tel.Controllers.Api
{
    [Authorize]
    public class OrderScansController : ApiController
    {
        private psEnt db = new psEnt();

        public HttpResponseMessage Get(int id)
        {
            try
            {
                var imagePath = db.usp_GetOrderScan(id).FirstOrDefault();
                byte[] fileData = File.ReadAllBytes(imagePath);
                var res = new HttpResponseMessage();
                res.Content = new ByteArrayContent(fileData);
                res.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.InnerException.Message);
            }
        }

        [HttpPost]
        public IHttpActionResult Upload(int id)
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files["scan"];
                var filePartPath = System.Configuration.ConfigurationManager.AppSettings["ScansPath"].ToString();
                var scanFilePath = "";
                if (postedFile != null)
                {
                    if (!Directory.Exists(filePartPath + @"orderscans\" + id.ToString()))
                    {
                        Directory.CreateDirectory(filePartPath + @"orderscans\" + id.ToString());
                    }
                    scanFilePath = filePartPath + @"orderscans\" + id.ToString() + @"\" + postedFile.FileName;
                    postedFile.SaveAs(scanFilePath);
                }

                var result = db.usp_OrdersScanUpdate(null,id, scanFilePath).FirstOrDefault().ToString();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
    }
}
