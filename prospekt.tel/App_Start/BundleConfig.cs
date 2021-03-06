﻿using System.Web;
using System.Web.Optimization;

namespace prospekt.tel
{
    public class BundleConfig
    {
        //Дополнительные сведения об объединении см. по адресу: https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/knockout-{version}.js",
                        "~/Scripts/app/typeahead.bundle.js",
                        "~/Scripts/handlebars-v3.0.3.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство сборки на сайте https://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/metisMenu.js",
                      "~/Scripts/sb-admin-2.js",
                      "~/Scripts/bootstrap-notify.js",
                      "~/Scripts/App/int.navigation.min.js",
                      "~/Scripts/App/DataTable.min.js",
                      "~/Scripts/App/Categories.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.min.css",
                      "~/Content/sb-admin-2.css",
                      "~/Content/font-awesome.css",
                      "~/Content/metisMenu.css",
                      "~/Content/Typeahead-BS3-css.css"));
        }
    }
}
