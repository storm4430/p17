using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using prospekt.tel.Models;
using prospekt.tel.Common;
using System.IO;
using System.Net.Http.Headers;

namespace prospekt.tel.Controllers.Api
{
    [Authorize]
    public class ContractsController : ApiController
    {
        private psEnt db = new psEnt();

        public IHttpActionResult Get(string substr, int stage)
        {
            Guid userOrg = Common.DataHelper.GetUserOrg(User.Identity.Name);
            try
            {
                if (User.IsInRole("Администратор"))
                {
                    var result = db.usp_GetAllContracts(null, substr, stage).ToList();
                    return Ok(result);
                }
                else
                {
                    var result = db.usp_GetAllContracts(userOrg, substr, stage).ToList();
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetContract(int id)
        {
            try
            {
                var result = db.usp_GetContractById(id).FirstOrDefault();
                result.path = Path.GetFileName(result.path);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [HttpPost]
        public IHttpActionResult Post(NewContract newCont)
        {
            newCont.order_org = DataHelper.GetUserOrg(User.Identity.Name);
            try
            {
                var result = db.usp_Contracts_IU(null, newCont.PersonPK, newCont.ProductPK,
                                                newCont.order_sum, newCont.order_date, newCont.estimated_close,
                                                newCont.product_serial, newCont.contract_comment, newCont.order_org).FirstOrDefault();
                //return 
                var r = new Reports();
                string fpath = r.GetContract(result.Value);
                db.usp_SetAgreenmentToOrder(result.Value, fpath);
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
    }

    public class NewContract
    {
        //@personPK int,
        //@productPK int,
        //@order_sum numeric(11,2),
        //@order_date datetime,
        //@estimated_close datetime,
        //@product_serial varchar(40),
        //@contract_comment varchar(2048),
        //@order_org uniqueidentifier

        public int PersonPK { get; set; }
        public int ProductPK { get; set; }
        public decimal order_sum { get; set; }
        public DateTime order_date { get; set; }
        public DateTime estimated_close { get; set; }
        public string product_serial { get; set; }
        public string contract_comment { get; set; }
        public Guid order_org { get; set; }

    }
}
