//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace prospekt.tel.Models
{
    using System;
    
    public partial class usp_GetAllProducts_Result
    {
        public int id { get; set; }
        public string product_name { get; set; }
        public string category_desc { get; set; }
        public string subcategory_desc { get; set; }
        public string created { get; set; }
        public string updated { get; set; }
        public string createdBy { get; set; }
        public Nullable<int> catId { get; set; }
        public Nullable<int> subcatId { get; set; }
    }
}
