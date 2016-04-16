using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prospekt.tel.Controllers
{
    [Authorize]
    public class KassaController : Controller
    {
        // GET: Kassa
        public ActionResult Index()
        {
            return PartialView();
        }

        public ActionResult Insert()
        {
            return PartialView();
        }
    }
}