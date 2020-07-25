/**
 * upload.template.js
 * upload template
 *
 * WuWei is a free to use open source knowledge modeling tool.
 * More information on WuWei can be found on WuWei homepage.
 * https://www.wuwei.space/blog/
 *
 * WuWei is licensed under the MIT License
 * Copyright (c) 2013-2020, Nobuyuki SAMBUICHI
 **/
upload.markup = (function () {
  const template =
  '<div class="modal-dialog" role="document">'+
  '<div class="modal-content">'+
    '<div class="modal-header">'+
      '<h5 class="modal-title" id="uploadLabel">UPLOAD</h5>'+
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
        '<span aria-hidden="true">&times;</span>'+
      '</button>'+
    '</div>'+
    '<div class="modal-body">'+
      '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">'+

        '<div class="panel panel-default">'+
          '<div id="headingAdc" class="panel-heading" role="tab">'+
            '<h4 class="panel-title">'+
              '<a href="#collapseAdc" aria-controls="collapseAdc" '+
                  'data-parent="#accordion" role="button" data-toggle="collapse" aria-expanded="true">'+
                'Audit data collection'+
              '</a>'+
            '</h4>'+
          '</div>'+
          '<div id="collapseAdc" aria-labelledby="headingAdc" class="panel-collapse collapse in" role="tabpanel">'+
            '<div class="panel-body">'+
              '<form onsubmit="upload.up(this); return false;" '+
                  'action="data/upload-adc.cgi" method="post" enctype="multipart/form-data">'+
                '<div class="form-group">'+
                  '<p class="form-control">'+
                    '<input type="file" name="file" placeholder="ADC File">'+
                  '</p>'+
                '</div>'+
                '<div class="form-group">'+
                  '<button type="button" class="btn btn-secondary pull-right" data-dismiss="modal">Cansel</button>'+
                  '<button type="submit" type="submit" value="Submit" class="btn btn-primary pull-right">Upload</button>'+  
                '</div>'+
              '</form>'+
           ' </div>'+
          '</div>'+
        '</div>'+

        '<div class="panel panel-default">'+
          '<div id="headingAdcUdt" class="panel-heading" role="tab">'+
            '<h4 class="panel-title">'+
              '<a href="#collapseAdcUdt" aria-controls="collapseAdcUdt" '+
                  'data-parent="#accordion" class="collapsed" role="button" data-toggle="collapse" aria-expanded="false">'+
                'Audit data collection datatype'+
              '</a>'+
            '</h4>'+
          '</div>'+
          '<div id="collapseAdcUdt" aria-labelledby="headingAdcUdt" class="panel-collapse collapse" role="tabpanel">'+
            '<div class="panel-body">'+
              '<form onsubmit="upload.up(this); return false;" '+
                  'action="data/upload-adc-udt.cgi" method="post" enctype="multipart/form-data">'+
                '<div class="form-group">'+
                  '<p class="form-control">'+
                    '<input type="file" name="file" placeholder="ADC Datatype File">'+
                  '</p>'+
                '</div>'+
                '<div class="form-group">'+
                  '<button type="button" class="btn btn-secondary pull-right" data-dismiss="modal">Cansel</button>'+
                  '<button type="submit" type="submit" value="Submit" class="btn btn-primary pull-right">Upload</button>'+ 
                '</div>'+
              '</form>'+
            '</div>'+
          '</div>'+
        '</div>'+

        '<div class="panel panel-default">'+
          '<div id="headingAds" class="panel-heading" role="tab">'+
            '<h4 class="panel-title">'+
              '<a href="#collapseAds"  aria-controls="collapseAds" '+
                  'data-parent="#accordion" class="collapsed" role="button" data-toggle="collapse" aria-expanded="false">'+
                'Audit data standard'+
              '</a>'+
            '</h4>'+
          '</div>'+
          '<div id="collapseAds" aria-labelledby="headingAds" class="panel-collapse collapse" role="tabpanel">'+
            '<div class="panel-body">'+
              '<form onsubmit="upload.up(this); return false;" '+
                  'action="data/upload-ads.cgi" method="post" enctype="multipart/form-data">'+
                '<div class="form-group">'+
                  '<p class="form-control"><input type="file" name="file" placeholder="ADS File"></p>'+
                '</div>'+
                '<div class="form-group">'+
                  '<button type="button" class="btn btn-secondary pull-right" data-dismiss="modal">Cansel</button>'+
                  '<button type="submit" type="submit" value="Submit" class="btn btn-primary pull-right">Upload</button>'+  
                '</div>'+
              '</form>'+
            '</div>'+
          '</div>'+
        '</div>'+

        '<div class="panel panel-default">'+
          '<div class="panel-heading" role="tab" id="headingOther">'+
            '<h4 class="panel-title">'+
              '<a href="#collapseOther" aria-controls="collapseOther" '+
                  'class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false">'+
                'Other file'+
              '</a>'+
            '</h4>'+
          '</div>'+
          '<div id="collapseOther" aria-labelledby="headingOther" class="panel-collapse collapse" role="tabpanel">'+
            '<div class="panel-body">'+
              '<form onsubmit="upload.up(this); return false;" '+
                  'action="data/upload-other.cgi" method="post" enctype="multipart/form-data">'+
                '<div class="form-group">'+
                  '<p class="form-control"><input type="file" name="file" placeholder="Other File"></p>'+
                '</div>'+
                '<div class="form-group">'+
                  '<button type="button" class="btn btn-secondary pull-right" data-dismiss="modal">Cansel</button>'+
                  '<button type="submit" type="submit" value="Submit" class="btn btn-primary pull-right">Upload</button>'+  
                '</div>'+
              '</form>'+
            '</div>'+
          '</div>'+
        '</div>'+

      '</div>'+
      '<div id="progressbar"></div>'+
    '</div>'+
  '</div>'+
  '<div class="modal-footer">'+
    'Audit data collection'+
  '</div>'+
'</div>';

  return {
    template: template
  };
})();
// upload.markup.js