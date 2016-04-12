using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using prospekt.tel.Models;
using Novacode;

namespace prospekt.tel.Common
{
    public class Reports
    {
        private psEnt db = new psEnt();

        public string GetContract(int id)
        {
            var cPath = System.Configuration.ConfigurationManager.AppSettings["TemplatesPath"].ToString();
            var result = db.usp_GetContractPrepare(id).FirstOrDefault();
            using (DocX d = DocX.Load(cPath + @"ordertmpl.docx"))
            {
                d.ReplaceText("buyerFIO", result.orgruk, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("buyerINN", result.orgINN, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("buyerOGRN", result.orgOGRN, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("sellerFIO", result.seller, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("pass_serie", result.passport_serie, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("pass_num", result.passport_num, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("pass_vidacha", result.passport_vidacha, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("seller_adres", result.personAddres, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("product", result.product_name, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                if (String.IsNullOrEmpty(result.order_comment))
                {
                    d.ReplaceText("osobotm", result.serialnum, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                }
                else
                {
                    d.ReplaceText("osobotm", result.serialnum + ", " + result.order_comment, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                }

                d.ReplaceText("oprice", result.order_summ.ToString(), false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);

                var sdday = result.estimated_close.Day.ToString();
                var sdmonth = GetRussianMonth(result.estimated_close.Month);
                var sdyear = result.estimated_close.Year.ToString();
                d.ReplaceText("sdday", sdday, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("sdmonth", sdmonth, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("sdyear", sdyear, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);

                d.ReplaceText("orgadres", result.orgAdress, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("sellertel", result.cellPhone, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);

                var dogday = result.order_date.Day.ToString();
                var dogmonth = GetRussianMonth(result.order_date.Month);
                var dogyear = result.order_date.Year.ToString();

                d.ReplaceText("dogday", dogday, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("dogmonth", dogmonth, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);
                d.ReplaceText("dogyear", dogyear, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);

                d.ReplaceText("dognum", result.order_num, false, System.Text.RegularExpressions.RegexOptions.None, null, null, MatchFormattingOptions.ExactMatch);

                var dPartPath = System.Configuration.ConfigurationManager.AppSettings["OrdersPath"].ToString();
                var dPath = dPartPath + id.ToString() + ".docx";
                d.SaveAs(dPath);
                return dPath;
            }
        }

        internal string GetRussianMonth(int num)
        {
            switch (num)
            {
                case (1): return "января";
                case (2): return "февраля";
                case (3): return "марта";
                case (4): return "апреля";
                case (5): return "мая";
                case (6): return "июня";
                case (7): return "июля";
                case (8): return "августа";
                case (9): return "сентября";
                case (10): return "октября";
                case (11): return "ноября";
                case (12): return "декабря";

                default: return "";
            }
        }
    }
}