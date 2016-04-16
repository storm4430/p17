// #region Global Variables

var __catId = '';
var __subCatId = '';
var __catName = '';
var __subCatName = '';

// #endregion

// #region Категории

//-----------------------------Категории-------------------
function GetCategories(substr) {
    GetDataTable(
        {
            fields: [{
                "id": "Код",
                "category_desc": "Наименование",
                "created": "Создана",
                "updated": "Обновлена",
                "createdBy": "Автор"
            }],
            actions: [{
                "Details": "'Category'",
                "Delete": "'Category'",
                "Update": "'Category'"
            }

            ]
        }, '/api/categories/?substr=' + substr, 15, 'tree')
}

function CategoryEdit(objId) {
    $.get('/category/edit/' + objId, function (data) {
        $('#mt').text('РЕДАКТИРОВАНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function CategoryDelete(objId) {
    $.get('/category/delete/' + objId, function (data) {
        $('#mt').text('УДАЛЕНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function CategoryToSubdirectory(objId) {
    __catId = objId;
    console.log(__catId)
    $.get('/subcategory/index/?categoryid=' + objId, function (data) {
        $('#ajaxpage').hide();
        $('#subCategory').empty().html(data).show();
    })
}

//============================================================

// #endregion

// #region Подкатегории

//-----------------------------Подкатегории-------------------
function GetSubCategories(catid, substr) {
    GetDataTable(
        {
            fields: [{
                "id": "Код",
                "subcategory_desc": "Наименование",
                "category_desc": "Категория",
                "created": "Создана",
                "updated": "Обновлена",
                "createdBy": "Автор"
            }],
            actions: [{
                "Details": "'subCategory'",
                "Delete": "'subCategory'",
                "Update": "'subCategory'"
            }

            ]
        }, '/api/subcategories/?catid=' + catid + '&substr=' + substr, 15, 'subtree');
}
function SubCategoryEdit(objId) {
    $.get('/subcategory/edit/' + objId, function (data) {
        $('#mt').text('РЕДАКТИРОВАНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function SubCategoryDelete(objId) {
    $.get('/subcategory/delete/' + objId, function (data) {
        $('#mt').text('УДАЛЕНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function SubdirectoryToCategory() {
    $('#subCategory').hide();
    $('#ajaxpage').show();
}


// #endregion

// #region Номенклатура

//-----------------------------Номенклатура-------------------
function Getproducts(scatId, substr) {
    GetDataTable(
        {
            fields: [{
                "id": "Код",
                "product_name": "Наименование",
                "category_desc": "Категория",
                "subcategory_desc": "Подкатегория",
                "created": "Создана",
                "updated": "Обновлена",
                "createdBy": "Автор"
            }],
            actions: [{
                "Details": "'Product'",
                "Delete": "'Product'",
                "Update": "'Product'"
            }

            ]
        }, '/api/products/?id=' + scatId + '&substr=' + substr, 15, 'producttree')
}

function ProductEdit(objId) {
    $.get('/Product/edit/' + objId, function (data) {
        $('#mt').text('РЕДАКТИРОВАНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function ProductDelete(objId) {
    $.get('/Product/delete/' + objId, function (data) {
        $('#mt').text('УДАЛЕНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function SubdirectoryToProduct(objId) {
    __subCatId = objId;
    $.get('/Product/index/' + objId, function (data) {
        $('#subCategory').hide();
        $('#product').empty().html(data).show();
    })
};

function ProductToSubCategory() {
    $('#product').hide();
    $('#subCategory').show();
}
//============================================================

// #endregion

// #region Контрагент

//-----------------------------Контрагент-------------------
function GetPersons(scatId, substr) {
    GetDataTable(
        {
            fields: [{
                "id": "Код",
                "product_name": "Наименование",
                "category_desc": "Категория",
                "subcategory_desc": "Подкатегория",
                "created": "Создана",
                "updated": "Обновлена",
                "createdBy": "Автор"
            }],
            actions: [{
                "Details": "'Product'",
                "Delete": "'Product'",
                "Update": "'Product'"
            }

            ]
        }, '/api/products/?id=' + scatId + '&substr=' + substr, 15, 'producttree')
}

function PersonEdit(objId) {
    $.get('/Product/edit/' + objId, function (data) {
        $('#mt').text('РЕДАКТИРОВАНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function PersonCreate() {
    $.get('/person/create/', function (data) {
        $('#mt').text('СОЗДАНИЕ НОВОГО КОНТРАГЕНТА');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function PersonDelete(objId) {
    $.get('/Product/delete/' + objId, function (data) {
        $('#mt').text('УДАЛЕНИЕ ЗАПИСИ');
        $('#mb').empty().html(data);
        $('#categoryMessages').modal({
            keyboard: false,
            backdrop: false
        }, 'show');
    })
}

function GetSex(dest, callback) {
    $.get('/api/sex/', function (data) {
        $(dest).empty().append('<option></option>')
        $.each(data, function (key, item) {
            $(dest).append('<option value="' + item.id + '">' + item.description + '</option>');
        });
        callback();
    });
};

function FillPersonCard(id, callback) {
    $.get('/api/persons/' + id, function (data) {
        $('#persCard #id').val(data.id);
        $('#persCard #fam').val(data.fam).attr('disabled', 'disabled');
        $('#persCard #im').val(data.im).attr('disabled', 'disabled');
        $('#persCard #ot').val(data.ot).attr('disabled', 'disabled');
        $('#persCard #sexed').val(data.sex).attr('disabled', 'disabled');
        $('#persCard #dr').val(data.dr.substring(0, 10)).attr('disabled', 'disabled');
        $('#persCard #doc_ser').val(data.passport_serie).attr('disabled', 'disabled');
        $('#persCard #doc_num').val(data.passport_num).attr('disabled', 'disabled');
        $('#persCard #passport_vidacha').val(data.passport_vidacha).attr('disabled', 'disabled');
        $('#persCard #cellPhone').val(data.cellPhone).attr('disabled', 'disabled');
        $('#persCard #adres').val(data.personAddres).attr('disabled', 'disabled');
        $('#persCard #comment').val(data.person_comment).attr('disabled', 'disabled');

        $('#persCard #cont_info').empty().append('<strong>Уникальный код контрагента:</strong> ' + id)
                                 .append('.    <strong>Запись создана:</strong> ' + data.created)
                                 .append('.    <strong>Последнее редактирование:</strong> ' + data.updated);
        $('#butForPhotoUpdate').hide();
        $('#butForScanUpdate').hide();
        GetPersonPhoto(data.id);
        GetPersonPassScan(data.id);
        $('#editCard').click(function (e) {
            $('#persCard #fam').removeAttr('disabled').focus();
            $('#persCard #im').removeAttr('disabled');
            $('#persCard #ot').removeAttr('disabled');
            $('#persCard #sexed').removeAttr('disabled');
            $('#persCard #dr').removeAttr('disabled');
            $('#persCard #doc_ser').removeAttr('disabled');
            $('#persCard #doc_num').removeAttr('disabled');
            $('#persCard #cellPhone').removeAttr('disabled');
            $('#persCard #adres').removeAttr('disabled');
            $('#persCard #comment').removeAttr('disabled');
            $('#persCard #passport_vidacha').removeAttr('disabled');
            $('#actionsButton').hide();
            $('#butForPhotoUpdate').show();
            $('#butForScanUpdate').show();
            $('#_saveCardButton').show();
            e.preventDefault();
        })
        callback();
    });
};

function GetPersonPhoto(id) {
    $.get('/api/personphotos/' + id, function (data) {
        $("#srcfped").fadeIn("fast").attr('src', data);
    });
};

function GetPersonPassScan(id) {
    $.get('/api/personscans/' + id, function (data) {
        $("#pass_scan").fadeIn("fast").text(data).attr('data-id', id).attr('onclick', 'GetGullScan(this)');
    });
};

function GetGullScan(obj) {
    var sId = $(obj).data('id');
    window.open('/api/PersonFullScans/' + sId, 'blank')
}
//============================================================

// #endregion

// #region Users

//-----------------------------Users-------------------
function GetUsers(substr) {
    GetDataTable(
        {
            fields: [{
                "id": "Код",
                "FIO": "ФИО сотрудника",
                "Name": "Роль",
                "orgName": "Отделение",
            }],
            actions: [{
                "Details": "'User'",
                "Delete": "'User'",
                "Update": "'User'"
            }

            ]
        }, '/api/user/?substr=' + substr, 15, 'usertree')
}
//=======================================================================

// #endregion

// #region Orgs

//-----------------------------Orgs-------------------
function GetOrgs(substr) {
    GetDataTable(
        {
            fields: [{
                //"id": "Код",
                "orgName": "Наименование",
                "orgAdress": "Адрес",
                "orgINN": "ИНН",
                "orgOGRN": "ОГРН",
                "orgRuk": "Руководитель",
            }],
            actions: [{
                "Details": "'Org'",
                "Delete": "'Org'",
                "Update": "'Org'"
            }

            ]
        }, '/api/orgs/?substr=' + substr, 15, 'orgtree')
};

function GetOrgsForRegister(dest) {
    $.get('/api/orgs/?substr=', function (data) {
        $(dest).empty().append('<option></option>')
        $.each(data, function (key, item) {
            $(dest).append('<option value="' + item.id + '">' + item.orgName + '</option>');
        });
    });
};
//=======================================================================

// #endregion

// #region Contracts

//-----------------------------Contracts-------------------
function GetContracts(substr, stage) {
    GetDataTable(
        {
            fields: [{
                "id": "Код",
                "orgName": "Отделение",
                "FIO": "Контрагент",
                "order_num": "Номер",
                "order_date": "Дата",
                "order_summ": "Сумма",
                "estimated_close": "Срок",
            }],
            actions: [{
                "Details": "'ContractsDetails'",
            }

            ],
            styles: [{
                "cond": "estimated_close_data == 0 "
            }]
        }, '/api/contracts/?substr=' + substr + '&stage=' + stage, 15, 'contracttree')
};


function GetOrgsForRegister(dest) {
    $.get('/api/orgs/?substr=', function (data) {
        $(dest).empty().append('<option></option>')
        $.each(data, function (key, item) {
            $(dest).append('<option value="' + item.id + '">' + item.orgName + '</option>');
        });
    });
};

function GetUserRolesForRegister(dest) {
    $.get('/api/userRoles/', function (data) {
        $(dest).empty().append('<option></option>')
        $.each(data, function (key, item) {
            $(dest).append('<option value="' + item.Name + '">' + item.Name + '</option>');
        });
    });
};

function CheckNewContractForm() {
    var check = true;
    var notImpl = $('#newOrder input,select').filter('[required]')

    $.each(notImpl, function (key, item) {
        if ($(item).val() == '') {
            $(item).closest('div').addClass('has-error');
            check = false;
            $(item).off().change(function () {
                if ($(item).closest('div').hasClass('has-error')) {
                    $(item).closest('div').removeClass('has-error')
                }
            })
        }
        else {
            $(item).parent().parent().removeClass('danger');
        }
    });
    console.log($('#personContract').data('id'));
    if ($('#personContract').data('id') == undefined) {
        $('#personContract').closest('div').addClass('has-error');
        check = false;
    }
    if ($('#productContract').data('id') === undefined) {
        $('#productContract').closest('div').addClass('has-error');
        check = false;
    }
    if (!check) {
        $('#backtofirststep').click();
    };
    notImpl = $('#secondStage input,select').filter('[required]')
    $.each(notImpl, function (key, item) {
        if ($(item).val() == '') {
            $(item).closest('div').addClass('has-error');
            check = false;
            $(item).off().change(function () {
                if ($(item).closest('div').hasClass('has-error')) {
                    $(item).closest('div').removeClass('has-error')
                }
            })
        }
        else {
            $(item).parent().parent().removeClass('danger');
        }
    });

    return check;
}

function PrepareContract(ob) {
    if (CheckNewContractForm()) {
        var data = {
            personPK: $('#personContract').data('id'),
            productPK: $('#productContract').data('id'),
            order_sum: $('#summContract').val(),
            order_date: $('#order_date').val(),
            estimated_close: $('#estimatedDateContract').val(),
            product_serial: $('#product_serial').val(),
            contract_comment: $('#otmetki').val()
        };
        NewObject('/api/Contracts', data, 6, function () {
            $('#secondStage').slideToggle(100);
            $('#thirdStage').slideToggle(100);
            $('#scnd').removeClass('btn-primary').addClass('btn-default');
            $('#thrd').removeClass('btn-default').addClass('btn-primary');
        });
    } else {
    }
};

function GetPrintContract(id) {
    window.open('/api/PrintOrders/?id=' + id, "_blank")
}

//=======================================================================

// #endregion

// #region ContractDetails

ContractDetails = {
    GetContract: function (nodeElement, id) {
        $.get('/Contract/details?id=' + id, function (d) {
            $(nodeElement).hide().html(d).show();
        })

    },

    GetContractDetails: function (id) {
        $.get('/api/Contracts?id=' + id, function (d) {
            $('#cd-Seller').text(d.FIO);
            $('#cd-ContractNumber').text(d.order_num);
            $('#cd-Product').text(d.product_name);
            $('#cd-Summa').text(d.order_summ + ' р.');
            $('#cd-Serial').text(d.product_serial);
            $('#cd-ContactDate').text(d.order_date);
            $('#cd-Comment').text(d.order_comment);
            $('#cd-EstimateDate').text(d.estimated_close);
            $('#cd-info').html('Договор № <strong>' + d.order_num + '</strong>, от ' + d.order_date);
            if (d.path != null) {
                $('#cd-OrderScan').html('<a style="cursor:pointer" onclick="ContractDetails.GetFullScan(' + id + ')">' + d.path + '</a>');
            } else {
                $('#cd-OrderScan').text('Скан договора не обнаружен');
                $('#cd-accept').hide();
            }
            if (d.order_stage == 3 || d.order_stage == 1002) {
                $('#cd-accept').hide();
                $('#cd-scanupload').hide();
            } else {
                $('#cd-reject').hide();
                $('#cd-prolong').hide();
                $('#cd-sell').hide();
            }
        })
    },

    GetContractDetailsOnlyData: function (id) {
        $.get('/api/Contracts?id=' + id, function (d) {
            var t = d;
            return t;
        })
    },

    ContactDetailsAction: function (action, id) {
        switch (action) {
            case (1): ContractDetails.UploadContractScan(id); break;
            case (5): ContractDetails.AcceptContract(id); break;
            default: break;
        }
    },

    UploadContractScan: function myfunction(id) {
        $.get('/Contract/ScanUpload/' + id, function (data) {
            $('#mt').text('Загрузка скана договора');
            $('#mb').empty().html(data);
            $('#categoryMessages').modal({
                keyboard: false,
                backdrop: false
            }, 'show');
        })
    },

    GetFullScan: function (s) {
        window.open('/api/OrderScans?id=' + s);
    },

    AcceptContract: function (id) {
        $.get('/Contract/AcceptContract/' + id, function (data) {
            $('#mt').text('Провести договор');
            $('#mb').empty().html(data);
            $('#categoryMessages').modal({
                keyboard: false,
                backdrop: false
            }, 'show');
        })
    },

    AcceptContractData: function (id) {
        var html = '';
        $.get('/api/kassa/getsumm/?d=', function (d) {
            $.get('/api/Contracts?id=' + id, function (s) {
                console.log(s.order_summ > d);
                if (s != null) {
                    if (s.order_summ > d) {
                        html = 'В данный момент в кассе находится ' + d + ' руб.,\
                    для проведения операции требуется ' + s.order_summ + ' руб.\
                    Внесите в кассу недостающую сумму!'
                        $('#ac-alert').removeClass('alert-info').addClass('alert-danger').html(html);
                        $('#ac-accept').attr('disabled', true)
                    } else {
                        html = 'В данный момент в кассе находится ' + d + ' руб.,\
                    из кассы будет выдано:  ' + s.order_summ + ' руб.'
                        $('#ac-alert').html(html);
                        $('#ac-accept').attr('disabled', false).off().click(function () {
                            var data = {
                                Id:id,
                                Stage:3
                            };
                            UpdateObject('api/Contracts/SetStage', data, 5, '');
                        });
                    }

                }
            })


        })
    }
}

// #endregion

// #region Kassa
Kassa = {
    Init: function () {
        var tod = new Date
        $('#ki-operdate').val(DateUtils.ToInputFormat(tod.toLocaleDateString()));
        Kassa.GetOperDate('kassatree', DateUtils.ToInputFormat(tod.toLocaleDateString()));
        $('#ki-setoperdate').off().click(function () {
            Kassa.GetOperDate('kassatree', $('#ki-operdate').val())
        })
    },

    GetOperDate: function (nodeElement, operdate) {
        GetDataTable(
        {
            fields: [{
                "operation": "Операция",
                "summ": "Сумма",
                "oper": "Автор",
                "operdate": "Время",
                "comment": "Комментарий",
                //"order_summ": "Сумма",
                //"estimated_close": "Срок",
            }],
            actions: [{
                "Details": "'KassaDetails'",
                "Delete": "'KassaDetails'",
            }

            ],
            styles: [{
                "cond": "summ < 0 "
            }]
        }, '/api/Kassa/GetOperDate?d=' + operdate, 15, nodeElement)
    },

    InitNewKassaOperation: function (nodeElement) {
        $.get('api/Kassa/GetKassaOperationsType', function (d) {
            $.each(d, function (key, item) {
                $(nodeElement).append($('<option value="' + item.id + '">' + item.operation + '</option>'))
            })
        });

        $('#updOperation').off().click(function () {
            if ($('').val() == '' || $('').val() == '') {
                return false;
            } else {
                var data = {
                    OType: $('#i-op').val(),
                    Summ: $('#i-summ').val(),
                    Comment: $('#i-comment').val()
                };
                NewObject('api/Kassa/NewKassaOperation', data, 7, '');
            }
        })
    },

    DeleteKassa: function (id) {
        DeleteObject('api/Kassa/KassaOperationDel/?id=' + id, 4, '')
    },

    SetSummForNodeElement: function () {
        var tod = new Date;
        $.get('api/Kassa/GetSumm/?d=' + tod.toLocaleDateString(), function (d) {
            $('#mainorgsumm').text(d);
        })
    }




}


// #endregion

// #region DateUtils
DateUtils = {
    ToInputFormat: function (localeDate) {//14.04.2016
        var y = localeDate.substring(6, 10);
        var m = localeDate.substring(3, 5);
        var d = localeDate.substring(0, 2);
        return y + '-' + m + '-' + d;
    }
}

Messaging = {
    ShowError: function (msg, oType) {
        $.notify({
            icon: 'glyphicon glyphicon-info-sign',
            message: msg,
        }, {
            type: oType,
            z_index: 9999,
            offset: 50
        });
    }
}


// #endregion

