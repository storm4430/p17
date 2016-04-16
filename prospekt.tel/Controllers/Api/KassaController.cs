using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using prospekt.tel.Models;

namespace prospekt.tel.Controllers.Api
{
    [Authorize]
    public class KassaController : ApiController
    {
        private psEnt db = new psEnt();

        #region HttpGet
        [HttpGet]
        [Route("api/Kassa/GetSumm")]
        public IHttpActionResult GetSumm(DateTime? d)
        {
            try
            {
                var asp = Guid.Parse(Common.DataHelper.GetUserId(User.Identity.Name));
                return Ok(db.usp_kassa_GetSumm(asp, d).FirstOrDefault());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [HttpGet]
        [Route("api/Kassa/GetOperDate")]
        public IHttpActionResult GetOperDate(DateTime d)
        {
            try
            {
                var asp = Guid.Parse(Common.DataHelper.GetUserId(User.Identity.Name));
                return Ok(db.usp_kassa_select(null, d, d, asp).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [HttpGet]
        [Route("api/Kassa/GetKassaOperationsType")]
        public IHttpActionResult GetKassaOperationsType()
        {
            try
            {
                var asp = Guid.Parse(Common.DataHelper.GetUserId(User.Identity.Name));
                return Ok(db.usp_GetKassaOperationsType().ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
        #endregion

        #region HttpPost
        [HttpPost]
        [Route("api/Kassa/NewKassaOperation")]
        public IHttpActionResult NewKassaOperation(Kassa o)
        {
            try
            {
                var asp = Guid.Parse(Common.DataHelper.GetUserId(User.Identity.Name));
                return Ok(db.usp_kassa(o.OType, o.Summ, o.Comment, asp));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
        #endregion

        #region HttpDelete
        [HttpDelete]
        [Route("api/Kassa/KassaOperationDel")]
        public IHttpActionResult KassaOperationDel(int id)
        {
            try
            {
                var asp = Guid.Parse(Common.DataHelper.GetUserId(User.Identity.Name));
                return Ok(db.usp_kassa_del(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
        #endregion
    }

    #region HelperClass
    public class Kassa
    {
        public int OType { get; set; }
        public decimal Summ { get; set; }
        public string Comment { get; set; }
    }
    #endregion
}
