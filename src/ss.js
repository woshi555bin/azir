function FEPubUpImg(objName){
//upimg.js
  var self=this;
  this.SWFUP={
    url:"//upload.58cdn.com.cn/postpic/upload?flash=1",
    picpath:"/enterprise/license/other/big/,/enterprise/license/other/small/,/enterprise/license/other/tiny/",
    picsize: "0*0,240*0,100*75*3",// XXX*0 意味不限高 0*xxxx 意味不限宽 XXXX*xxxx*3 意味有裁剪 xxxx*xxxx*0 意味等比例缩放
    picbulk: "0,0,0",//已经舍弃 功能未知，
    dpi: "0,0,0",//对应图片分辨率 为63
    piccut: "0*0*0*0,0*0*0*0,0*0*100*75",// 图片裁剪 a*b*c*d 从left=a top=b 开始裁剪 到 left=c top=d的图片
    picwater:"True,False,False",//是否增加水印
    extension:"jpg",
    btImg0:"//pic2.58.com/ui7/post/img/on.png",
    btImg1:"//pic2.58.com/ui7/post/img/over.png",
    btImg2:"//pic2.58.com/ui7/post/img/click.png",
    btImg3:"//pic2.58.com/ui7/post/img/disable.png",
    picMaxSize:	10485760,
    getFlashBtn:function(){//返回flash 对象

    },
    getImgNum:function(){//向flash传递当前上传
      return self.UpImageShowBar.getImgNum();
    },
    getUpsetting:function(){//向flash传递设置参数

      return {url:this.url,
        picpath:this.picpath,
        picsize: this.picsize,// XXX*0 意味不限高 0*xxxx 意味不限宽 XXXX*xxxx*3 意味有裁剪 xxxx*xxxx*0 意味等比例缩放
        picbulk:this.picbulk,//已经舍弃 功能未知，
        dpi: this.dpi,//对应图片分辨率 为63
        piccut: this.piccut,// 图片裁剪 a*b*c*d 从left=a top=b 开始裁剪 到 left=c top=d的图片
        picwater:this.picwater,//是否增加水印
        extension:this.extension,
        btImg0:this.btImg0,
        btImg1:this.btImg1,
        btImg2:this.btImg2,
        btImg3:this.btImg3,
        picMaxSize:this.picMaxSize
      }
    },
    beginAdd:function(paras){//上传前向js传递内容
      return self.UpImageShowBar.beginAdd( paras);
    },
    addImg:function(paras){//{url:'/flash/big/n_546547657657.jpg'}
      //UpImageShowBar.addImg({url:paras});
      var picpaths=self.SWFUP.picpath.split(",");
      paras.url="//pic.58.com"+picpaths[0]+paras.picName;
      var imgs=self.UpImageShowBar.imgs;
      for(var i=0;i<imgs.length;i++){
        if(imgs[i].code==paras.code){
          imgs[i].url=paras.url;
        }
      }
      var fileM=paras.fileSize/1024/1024;
      /*var delay=5000;
            if(fileM>8){
                delay=25000;
            }else if(fileM>6){
                delay=15000;
            }else if(fileM>3){
                delay=10000;
            }else if(fileM>1){
                delay=5000;
            }*/
      self.UpImageShowBar.addImg( paras);
    },
    getSWF:function(movieName){
      if (navigator.appName.indexOf("Microsoft") != -1) {
        return document.getElementById(movieName);
      } else {
        return document[movieName];
      }

    },
    enableFlashBtn:function(){
      try{
        self.SWFUP.getSWF(self.SWFUP.name).setImgUpAble(true);
      }catch(e){
        var enableBtn=arguments.callee;
        window.setTimeout(enableBtn,3000);
      }
    },
    disableFlashBtn:function(){
      try{
        self.SWFUP.getSWF(self.SWFUP.name).setImgUpAble(false);
      }catch(e){
        var disableBtn=arguments.callee;
        window.setTimeout(disableBtn,3000);
      }
    },
    delImg:function(code){
      //UpImageShowBar.regEnableBtn(this.enableFlashBtn);
      self.SWFUP.getSWF(self.SWFUP.name).imgDel(code);
    },
    showError:function(errObj){
      var errStr="",errcode=errObj.errorType,infocode=errObj.infoCode,filename=errObj.fileName;
      if(errcode=="1"){
        errStr="上传文件 "+filename+" 时，发生超时错误。"

      }else if(errcode=="2"){
        errStr="上传文件 "+filename+" 失败。"
      }
      self.UpImageShowBar.setImgErr(infocode);
      self.UpImageShowBar.showError(errStr);
    },
    scrollFunc:function(){
      //var cp=$("#uploadImgcontainer").position();
      //	var st=document.documentElement.scrollTop + document.body.scrollTop;
      //	var sh=document.documentElement.clientHeight;
      //	if(st+sh-cp.top>30){
      //		$(window).unbind("scroll",SWFUP.scrollFunc);
      window.setTimeout(self.UpImageShowBar.hideMultSel,5000);
      self.UpImageShowBar.container.parent().unbind("mouseover",self.SWFUP.scrollFunc);
      //	}
    },
    initFlashBtn:function(settings){//初始化flash按钮 和设置
      if(settings.name){
        this.name=settings.name
      }
      self.UpImageShowBar.container.parent().mouseover(self.SWFUP.scrollFunc);
      self.UpImageShowBar.regEnableBtn(this.enableFlashBtn);
      self.UpImageShowBar.regDisableBtn(this.disableFlashBtn);
      self.UpImageShowBar.regDelImg(this.delImg);
    },
    setUpstate:function(paras){
      if(paras.state=="0"){
        self.UpImageShowBar.setUpstate(paras);
      }else if(paras.state=="1"){
        var degree=paras.percent;
        if(degree>=60){
          degree=degree+(100-degree)/4;
        }else{
          degree=degree+5+parseInt(Math.random()*10);
        }

        var paras={"code":paras.code,"percent":degree,"state":"1"};
        setTimeout(function(){self.UpImageShowBar.setUpstate(paras);if(degree<99)self.SWFUP.setUpstate(paras);},500)
        ;
      }
    }
  }

  this.SINGLEUP={
    url:"",
    picSize: -1,
    picurl:"p1",
    createIframe:function(){

    },
    addImg:function(suc,url,pos){
      if(suc==1){
        url="//pic.58.com/"+self.SINGLEUP.picurl+"/big"+url.substr(url.lastIndexOf("\/"));
        self.UpImageShowBar.addImg({url:url,code:pos});
      }else{
        self.UpImageShowBar.showError(url);
        self.UpImageShowBar.setImgErr(pos);
      }
      $("iframe[name='frmUpload_"+pos+"']").remove();
    },
    addImgLoad:function(){
      if($(this).val()=="") return;
      self.UpImageShowBar.hideError();

      var code=self.UpImageShowBar.singleAdd();

      var _sync = self.SINGLEUP.getFileSize($("#"+ self.UpImageShowBar.containerStr+"fileUploadInput")[0]);
      if (_sync) { // 同步
        if (self.SINGLEUP.picSize > 0) {
          var v1 = self.SINGLEUP.picSize / 1024; // kb
          if (v1 > 1024 * 2) {
            self.UpImageShowBar.showError('不能上传大于2M的图片');
            self.UpImageShowBar.setImgErr(code);
            self.UpImageShowBar.resetInfo();
            self.SINGLEUP.setFilePos();
            return;
          }
        }
        self.SINGLEUP.initForm({code:code});
      } else { // 异步
        setTimeout(function() {
          if (self.SINGLEUP.picSize > 0) {
            var v1 = self.SINGLEUP.picSize / 1024; // kb
            if (v1 > 1024 * 2) {
              self.UpImageShowBar.showError('不能上传大于2M的图片');
              self.UpImageShowBar.setImgErr(code);
              self.UpImageShowBar.resetInfo();
              self.SINGLEUP.setFilePos();
              return;
            }
          }
          self.SINGLEUP.initForm({code:code});
        }, 700);
      }

      self.SINGLEUP.setFilePos();
      self.UpImageShowBar.resetInfo();
    },
    initForm:function(param){

      $("#"+self.UpImageShowBar.containerStr+"backFunction").after('<iframe width="1" height="1" name="frmUpload_'+param.code+'" ></iframe>');

      //$('#myfile').val($('#fileUploadInput').val());
      $("#"+self.UpImageShowBar.containerStr+"SINGLEUP")[0].target="frmUpload_"+param.code;
      $("#"+self.UpImageShowBar.containerStr+"PicPos").val(param.code);

      $('#'+self.UpImageShowBar.containerStr+'SINGLEUP').submit();
      self.SINGLEUP.upstate(0,param.code);
    },
    enableSingleBtn:function(){
      self.SINGLEUP.content.removeClass("w_localn").addClass("w_local");
      self.SINGLEUP.btnCon.show();

    },
    disableSingleBtn:function(){
      self.SINGLEUP.content.removeClass("w_local").addClass("w_localn");
      self.SINGLEUP.btnCon.hide();
    },
    delImg:function(){
      self.SINGLEUP.setFilePos();
    },
    setFilePos:function(){
      var contpos=self.SINGLEUP.content.offset();
      self.SINGLEUP.btnCon=$("#"+self.UpImageShowBar.containerStr+"singleCon");
      self.SINGLEUP.btnCon.css({left:contpos.left+"px",top:contpos.top+"px"});

    },
    upstate:function(degree,code){
      if(degree>=60){
        var degree=degree+(100-degree)/4;
      }else{
        var degree=degree+5+parseInt(Math.random()*10);
      }


      var paras={"code":code,"percent":degree,"state":"1"};
      setTimeout(function(){self.UpImageShowBar.setUpstate(paras);if(degree<99)self.SINGLEUP.upstate(degree,code);},1000)
      ;
    },
    getFileSize: function(input) {
      var _sync = false; // 是否为同步
      try {
        if (input.files) {
          self.SINGLEUP.picSize = input.files[0].size;
          _sync = true;
        } else {
          var img = new Image();
          img.onload = function() {
            self.SINGLEUP.picSize = img.fileSize;
            img.onload = img.onerror = null;
            delete img;
          };
          img.onerror = function() {
            self.SINGLEUP.picSize = -1;
            //alert(arguments[0]);
            img.onload = img.onerror = null;
            delete img;
          };
          img.src = input.value;
        }
      } catch (e) {
        self.SINGLEUP.picSize = -1;
      };
      return _sync;
    },
    initBtn:function(param,settings){
      var SINGLEUP=self.SINGLEUP
      SINGLEUP.url=param.url;
      if($("#"+settings.container+"SINGLEUP").length<=0){
        var strAry=['<form id="'+settings.container+'SINGLEUP" name="'+settings.container+'SINGLEUP" method="post" target="frmUpload_'+param.code+'" action="'+SINGLEUP.url+'" enctype="multipart/form-data">',
          '<span style="display:none"><input type="text" id="name" name="name" value="Jeky" />',
          '<input type="hidden" id="'+settings.container+'backFunction" name="backFunction" value="'+objName+'.SINGLEUP.addImg" /><input type="hidden" name="__pic_dir" value="'+SINGLEUP.picurl+'" />',
          '<input type="hidden" name="PicPos" id="'+self.UpImageShowBar.containerStr+'PicPos" value="'+param.code+'" /></span>',
          '<div id="'+settings.container+'singleCon" style="position:absolute;overflow:hidden"><input type="file" class="fileUploadInput" name="fileUploadInput" id="'+self.UpImageShowBar.containerStr+'fileUploadInput" style="cursor:pointer" ></div></form>']
        $(document.body).append(strAry.join(""));
      }
      //document.write('');
      //$('#fileUploadInput').css({"top":800,left:400});
      $('#'+self.UpImageShowBar.containerStr+'fileUploadInput').change(	SINGLEUP.addImgLoad);
      SINGLEUP.content=$("#"+settings.container+"flashContent").parent();
      SINGLEUP.content.html("图片上传");
      SINGLEUP.content.mouseover(SINGLEUP.setFilePos);
      $("#"+settings.container+"singleCon").mouseover(	SINGLEUP.setFilePos);
      self.UpImageShowBar.regEnableBtn(	SINGLEUP.enableSingleBtn);
      self.UpImageShowBar.regDisableBtn(	SINGLEUP.disableSingleBtn);
      self.UpImageShowBar.regDelImg(	SINGLEUP.delImg);
      SINGLEUP.btnCon=$("#"+settings.container+"singleCon");
      SINGLEUP.btnCon.css({width:"85px",height:"25px"});
      SINGLEUP.setFilePos();
      SINGLEUP.upbtn=$("#"+self.UpImageShowBar.containerStr+"fileUploadInput");
      SINGLEUP.upbtn.mouseover(function(evt){
        SINGLEUP.content.css({color:"#000","text-decoration":"none"});
      }).mouseout(function(evt){
        SINGLEUP.content.css({color:"#666","text-decoration":"none"});

      })


    }
  };

  this.UpImageShowBar={
    "getImgNum":function(){//图片显示的总数
      var uppedNum=0;
      for(var i=0;i<this.imgs.length;i++){
        if(this.imgs[i].url)uppedNum++;
      }
      return  {hazNum:uppedNum,maxNum:this.imgMax}
    },
    "imgMax":8,
    "imgs":[ //已经上传的图片列表
    ],
    "hazLabel":false,
    "labels":[],
    "flashName":"PictureUpload",
    "hazDetail":false,
    "maxFilsSize":1024*1024*10,
    "container":null,
    "indexCode":0,
    "hideMultSel":function(){
      $("#"+self.UpImageShowBar.flashName).next().hide();
    },
    "hasFlash":function(){
      var result=false;
      var name = "flash";
      for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
          result= true;
          break;
        }
      }

      if (!result) {
        try {
          name="ShockwaveFlash.ShockwaveFlash";
          new ActiveXObject(name);
          result= true;
        } catch (ex) {
          result=false;
        }
      }
      return result;


    },
    "regEnableBtn":function(func){
      if(!this.enableBtnFuncs){
        this.enableBtnFuncs=[];
      }
      this.enableBtnFuncs.push(func);
    },
    "enableBtns":function(){
      if(!this.enableBtnFuncs){
        return;
      }
      for(var i=0;i<this.enableBtnFuncs.length;i++){
        this.enableBtnFuncs[i]();
      }

    },
    "regDisableBtn":function(func){
      if(!this.disableBtnFuncs){
        this.disableBtnFuncs=[];
      }
      this.disableBtnFuncs.push(func);
    },
    "disableBtns":function(){
      if(!this.disableBtnFuncs){
        return;
      }
      for(var i=0;i<this.disableBtnFuncs.length;i++){
        this.disableBtnFuncs[i]();

      }

    },
    "regDelImg":function(func){
      if(!this.delImgs){
        this.delImgs=[];
      }
      this.delImgs.push(func);
    },
    "getIndexCode":function(){
      return this.indexCode++;
    },
    addImg:function(imgObj,type){//{url:'/flash/big/n_546547657657.jpg'}
      if(type &&this.imgs.length>=this.imgMax){
        this.disableBtns();
        var str="您选择的图片数量超过允许总量，多余图片将不会上传！"
        this.showError(str);
        return false;
      }
      var tmpl=[];
      if(type)imgObj.code=this.getIndexCode();
      tmpl.push("<div code=\""+imgObj.code+"\" class=\"imgbox\">");
      if(this.hazLabel){

        tmpl.push("<span class=\"img_selector\"><span class=\"seltext\">"+(imgObj.label?imgObj.label:this.labels[0])+"</span>");
        tmpl.push("<ul style=\"width:79px\" class=\"hc\">");
        for(var i=1;i<this.labels.length;i++){

          tmpl.push("<li ><a href=\"javascript:void(0)\" >"+this.labels[i]+"</a></li>");
        }
        tmpl.push("<i class=\"shadow\"></i></ul></span>");
      }

      tmpl.push("<div class=\"w_upload\"><a class=\"item_close\" href=\"javascript:void(0)\">删除</a><span class=\"item_box\">");
      tmpl.push("<img  src=\""+imgObj.url.replace("big","tiny")+"\"></span><div class=\"isfenmian\" style=\"display:none\"></div><div class=\"setfenmian\"></div>");
      if(this.hazDetail){
        tmpl.push("<span class=\"item_input\"><i class=\"tline hc\"></i><textarea name=\"\" cols=\"3\" rows=\"4\" class=\"c_ccc\" >"+(imgObj.detail?imgObj.detail:"图片描述...")+"</textarea>	<em class=\"hc\">按Enter保存，Esc取消</em><i class=\"shadow hc\"></i></span>");
      }
      tmpl.push("</div></div>");

      if(type){
        this.container.append(tmpl.join(""));
        this.imgs.push(imgObj);
        this.rbTAEvent(imgObj.code);
      }else{
        for(var i=0;i<this.imgs.length;i++){
          if(this.imgs[i].code==imgObj.code){
            this.imgs[i]=imgObj;
            break;
          }
        }
        this.container.find('[code='+imgObj.code+']').replaceWith(tmpl.join(""));
        this.rbTAEvent(imgObj.code);
      }

      this.initFenmian();
      if(this.container.find(".imgbox").length>=this.imgMax){
        this.disableBtns();
      }
      this.resetInfo();
    },
    addLaod:function(imgObj){//{url:'/flash/big/n_546547657657.jpg'}
      if(this.imgs.length>=this.imgMax){
        this.disableBtns();
        var str="您选择的图片数量超过允许总量，多余图片将不会上传！"
        this.showError(str);
        return false;
      }
      var tmpl=[];
      tmpl.push("<div code=\""+imgObj.code+"\" class=\"imgbox loading\"><div class=\"w_upload\"><a class=\"item_close\" href=\"javascript:void(0)\">关闭</a>	<span class=\"wait_con\"><p class=\"pershow\">等待中…</p><div class=\"wait_loading\"><div class=\"loading_progress\" style=\"width:0%\"></div></div></span><span class=\"wait clearfix\">图片上传中</span></div></div>");
      this.container.append(tmpl.join(""));
      this.imgs.push(imgObj);
      this.container.show();
      //this.rbTAEvent(imgObj.code);
      if(this.container.find(".imgbox").length>=this.imgMax){
        this.disableBtns();
      }
    },
    "beginAdd":function(paras){//{url:'/flash/big/n_546547657657.jpg'}
      //var tmpl=[];
      this.conTr.find("[name=hazupinfo]").show();
      this.conTr.find("[name=uploadEx]").hide();
      //tmpl.push("<div class=\"imgbox loading\"><div class=\"w_upload\"><a class=\"item_close\" href=\"\">关闭</a><span class=\"wait_con\"></span><span class=\"wait clearfix\">图片上传中</span></div></div>");
      //var upImgs=paras.tmplthis.outError();
      this.hideError()
      var str="";
      if(paras.num+this.imgs.length>this.imgMax){
        str="您选择的图片数量超过允许总量，多余图片将不会上传！"
        this.showError(str);
      }else if(paras.hazOver){
        str="您选择的部分图片超过允许大小总量，这些图片将不会上传！"
        this.showError(str);
      }
      var retAry=[];
      for(var i=0;i<paras.num && i<this.imgMax;i++){
        var code=this.getIndexCode();
        retAry.push(code);
        this.addLaod({"code":code});
      }
      if(this.container.find(".imgbox").length>=this.imgMax){
        this.disableBtns();
      }
      return retAry;//.join(",");
    },
    singleAdd:function(){
      var code=this.getIndexCode();
      //retAry.push(code);
      this.addLaod({"code":code});
      this.resetInfo();
      return code;
    },
    showError:function(paras){
//			$.formValidator.setTipState(null, "onError", paras, this.conTr.find(".upload_Tip"));
//
//			this.conTr.find(".upload_Tip").show();
      alert(paras);
    },
    hideError:function(paras){
      this.conTr.find(".upload_Tip").hide();
      this.conTr.find(".upload_Tip .action_po_top").html("");
    },
    delImg:function(index){//删除图片
      this.container.find(".imgbox[code='"+index+"']").replaceWith("");

      this.hideError();
      this.resetInfo();
      var url="";
      for(var i=0;i<this.imgs.length;i++){
        if(this.imgs[i].code==index){
          url=this.imgs[i].url;
          this.imgs=this.imgs.slice(0,i).concat(this.imgs.slice(i+1))

          break;
        }
      }
      if(this.imgs.length<this.imgMax){
        this.enableBtns();
      }
      this.resetInfo();
      for(var j=0;j<this.delImgs.length;j++){
        this.delImgs[j](index,url);
      }
      this.initFenmian();
    },
    setImgErr:function(infocode){
      this.container.find(".imgbox[code='"+infocode+"']").find("span.wait_con").css("backgroundImage","url(//pic2.58.com/n/images/post/05043121.gif)");
      this.container.find(".imgbox[code='"+infocode+"']").find("span.wait").html("&nbsp;&nbsp;&nbsp;&nbsp;")
    },
    resetInfo:function(){

      var numobj=this.getImgNum();//{hazNum:uppedNum,maxNum:this.imgMax}
      this.conTr.find('.upnum').html(numobj.hazNum);
      this.conTr.find('.maxnum').html(numobj.maxNum);
      if(numobj.hazNum>0){
        this.container.find("[name=hazupinfo]").show();
        this.conTr.find("[name=uploadEx]").hide();
        this.container.show();
      }else{
        if(this.container.find(".imgbox").length<=0){
          this.container.find("[name=hazupinfo]").hide();
          this.conTr.find("[name=uploadEx]").show();

          this.container.hide();
        }
      }
    },
    rbTAEvent:function(code){
      this.container.find(".imgbox[code="+code+"]").find('textarea').focus(function(evt){//绑定获得焦点事件
        var $obj=$(evt.target);
        if($obj.val()=="图片描述...")$obj.val("");
        $obj.removeClass("c_ccc").addClass("c_666");
        $obj.parents(".item_input").addClass("on");
        $obj.parents(".imgbox").css({"z-index":"99"});
      });
      this.container.find(".imgbox[code="+code+"]").find('textarea').blur(function(evt){//绑定失去焦点事件
        var $obj=$(evt.target);
        if($obj.val()==""){
          $obj.val("图片描述...");
          $obj.removeClass("c_666").addClass("c_ccc");
        }
        if($obj.val().length>50){
          $obj.val($(this).val().substring(0,50))

        }
        var code=$obj.parents(".imgbox").attr("code");
        self.UpImageShowBar.setDetail($(this).val(),code);

        $obj.parents(".item_input").removeClass("on");
        $obj.parents(".imgbox").css({"z-index":""});
      });
      this.container.find(".imgbox[code="+code+"]").find('textarea').keyup(function(evt){//绑定键盘事件
        var $obj=$(evt.target);
        var code=$obj.parents(".imgbox").attr("code");
        if(evt.which==13){
          $(this).val($(this).val().replace("\n",""))
          $(this).blur();
          return false;
        }else if(evt.which==27){
          $(this).val(self.UpImageShowBar.getDetail(code));
          $(this).blur();
          return false;
        }else if($(this).val().length>50){
          $(this).val($(this).val().substring(0,50))

        }
      });
    },
    setDetail:function(val,code){
      var imgs=self.UpImageShowBar.imgs;
      for(var i=0;i<imgs.length;i++){
        if(imgs[i].code==code){
          self.UpImageShowBar.imgs[i].detail=val;
          return imgs[i];

        }
      }
    },
    getDetail:function(code){
      var imgs=self.UpImageShowBar.imgs;
      for(var i=0;i<imgs.length;i++){
        if(imgs[i].code==code){

          return imgs[i].detail;

        }
      }
    },
    getImgs:function(){
      var ri=[];

      for(var i=0;i<this.imgs.length;i++){
        if(this.imgs[i].url&&this.imgs[i].url.indexOf(".")>=0){
          ri.push(this.imgs[i]);
        }

      }
      return ri;

    },
    initFenmian:function(){
      this.container.find(".isfenmian:eq(0)").show();
      this.container.find(".isfenmian:gt(0)").hide();
      if(this.getFImgSize && this.imgs.length>0 && this.imgs[0].url){
        var fileName=this.imgs[0].url.match(/n_\d+/)[0];
        if(!self.UpImageShowBar.fileSizes[fileName]){
          $.getJSON("//post.image.58.com/imginfo.do?pic="+this.imgs[0].url.replace("//pic.58.com","")+"&callback=?",function(data){
            var sizeObj={"width":data.width,"height":data.height};
            self.UpImageShowBar.FSize=sizeObj;
            self.UpImageShowBar.fileSizes[fileName]=sizeObj;
          })
        }else{
          self.UpImageShowBar.FSize=self.UpImageShowBar.fileSizes[fileName];

        }
      }
    },
    setUpstate:function(paras){//{"code":code,"state":state,"percent":percent;;;state "0"  压缩 state = "1" 上传
      if(paras){
        var upstateCon=this.container.find(".imgbox[code='"+paras.code+"'] .wait_con");
        if(paras.state=="0"){
          upstateCon.find("p").html("本地压缩中...");
        }else if(paras.state=="1"){
          upstateCon.find("p").html(parseInt(paras.percent)+"%");
          upstateCon.find(".loading_progress").width(paras.percent+"%");
        }
      }
    },
    initBar:function(settings){
      this.container=$("#"+settings.container);
      this.conTr=this.container.parents("tr:eq(0)");
      if(settings.labels && settings.labels.length>0){
        this.labels=settings.labels;
        this.hazLabel=true;
      }
      this.containerStr=settings.container;
      //if(settings.flashName){
      this.flashName=settings.container+"_SWF";
      //}
      if(settings.hazDetail==true){
        this.hazDetail=true;
      }
      if(settings.maxFilsSize){
        this.maxFilsSize=settings.maxFilsSize;
      }
      if(settings.imgMax){
        this.imgMax=settings.imgMax;
      }
      if(settings.getFImgSize){
        this.getFImgSize=settings.getFImgSize;
        self.UpImageShowBar.fileSizes={};
      }
      //var mobileContent=$("#"+settings.container+"_SWF").parent().next();
      var flshVer= swfobject.getFlashPlayerVersion();
      if(this.hasFlash() && (flshVer.major>10 ||(flshVer.major>=10 && flshVer.minor>=3))){
        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
        var swfVersionStr = "10.2.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string. "wmode", "opaque"
        var xiSwfUrlStr = "//pic2.58.com/ui7/fang/post/img/playerProductInstall.swf";
        var flashvars = {"entity":objName+".SWFUP"};
        var params = {};
        params.quality = "high";
        params.bgcolor = "#ffffff";
        params.allowscriptaccess = "always";
        params.allowfullscreen = "false";
        params.wmode="opaque";
        var attributes = {};
        attributes.id = settings.container+"_SWF";
        attributes.name = settings.container+"_SWF";
        attributes.align = "left";
        swfobject.embedSWF(
          //"//pic2.58.com/ui7/post/PictureUpload_zip_2.swf", "flashContent",
          "//pic2.58.com/ui7/pubupimg/pubpicup.swf", settings.container+"flashContent",
          "86", "30",
          //"400","400",
          swfVersionStr, xiSwfUrlStr,
          flashvars, params, attributes);
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        swfobject.createCSS("#"+settings.container+"flashContent", "display:block;text-align:left;");
        self.SWFUP.initFlashBtn({name:settings.container+"_SWF"});
        $("#size_limit").html("10");
        $("photo_type").html("jpg/gif/png");
        if(navigator.platform.indexOf("Mac")>-1){
          var ot=$($('.w_local span').get(1));
          ot.html(ot.html().replace("Ctrl","command"));
          if(ot.html().indexOf("command")>-1){
            ot.width(ot.width()+30);
          }
        };
      }else{
        this.resetInfo();
        $("#size_limit").html("2");
        $("photo_type").html("jpg/gif/bmp/png");
        self.SINGLEUP.initBtn({url:'//post.image.58.com/upload'},settings);
      }

      this.container.html("");
      if(settings.images && settings.images.length>0){
        for(var i=0;i<settings.images.length;i++){

          this.addImg(settings.images[i],true);

        }
        this.resetInfo();
      }else{
        this.resetInfo();

      }
      this.container.bind('click',this,function(evt){//绑定点击事件
        var $obj=$(evt.target);
        if($obj.hasClass("item_close")){//绑定删除事件

          evt.data.delImg($obj.parents(".imgbox").attr("code"));
          return false;
        }else if($obj.parents("ul.hc").length>0){
          var $box=$obj.parents(".imgbox");
          $box.find(".seltext").html($obj.html());
          var index=$box.prevAll().length;
          //evt.data.imgs[index].labelid=$obj.attr("data");
          evt.data.imgs[index].label=$obj.html();
          var $sel=$box.find(".hover");

          $sel.removeClass("hover");

          return false;
        }else if($obj.hasClass("setfenmian")){
          var imgCon=$obj.parents(".imgbox");
          var imgboxs=self.UpImageShowBar.container.find(".imgbox");
          var clickI=imgboxs.index(imgCon);
          if(clickI==0)return;;
          imgboxs.eq(clickI).before(imgboxs.eq(0)).find(".setfenmian").hide();
          self.UpImageShowBar.container.prepend(imgCon);
          self.UpImageShowBar.initFenmian();
          var tep=self.UpImageShowBar.imgs[clickI];
          self.UpImageShowBar.imgs[clickI]=self.UpImageShowBar.imgs[0];
          self.UpImageShowBar.imgs[0]=tep;
        }
      });
      this.container.bind('mouseover',this,function(evt){//绑定点击事件
        var $obj=$(evt.target);
        if($obj.hasClass("img_selector")){//绑定删除事件
          $obj.addClass("hover");
        }else if($obj.parents(".img_selector").length>0){//绑定删除事件
          $obj.parents(".img_selector").addClass("hover");
        }else if($obj.parents(".w_upload").length>0 && $obj.parents(".w_upload").find(".isfenmian:visible").length==0){
          $obj.parents(".w_upload").find(".setfenmian").css("opacity",0.7).show();
        }
      }).bind('mouseout',this,function(evt){//绑定点击事件
        var $obj=$(evt.target);
        if($obj.hasClass("img_selector")){//绑定删除事件
          $obj.removeClass("hover");
        }else if($obj.parents(".img_selector").length>0){//绑定删除事件
          $obj.parents(".img_selector").removeClass("hover");
        }else if($obj.parents(".w_upload").length>0){

          $obj.parents(".w_upload").find(".setfenmian").hide();
        }
      });
      //var cats= ____json4fe.catentry;
      //var rootcateid='1';
      //var smallcateid='8';
      //if(cats.length>0){
      //	rootcateid=cats[0].dispid;
      //	smallcateid=cats[1].dispid;
      //}
      //if(top.location.href.indexOf("vip.")<0){
      //$("#showCon").replaceWith(' <div id="showCon" class="photoguider" style="border:none;display:none;height: 320px;width:780px; background-image: url(\'//pic2.58.com/ui7/post/img/newshouji.png\');"><iframe class="noshow" src="//pic2.58.com/ui7/post/img/newshouji.png" width="100%" height="100%" scrolling="no" marginheight="0" marginwidth="0"></iframe> <span id="codeCon" style="left:400px; top:70px"></span><a href="javascript:void(0)" class="phone_guide_close">关闭</a><span style="top:290px;left:278px;height:25px;width:250px" class="wuly_58down"><a href="//api.wap.58.com/productor/58client.apk" target="_blank"  style=" text-decoration: none;width:85px;display:block;float:left;margin-right:10px" onclick="_gaq.push([\'pageTracker._trackEvent\', \'post\', \'click\', \'/download/APclient/Android/\']);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><a href="//itunes.apple.com/cn/app/id404612543?mt=8" target="_blank" onclick="_gaq.push([\'pageTracker._trackEvent\', \'post\', \'click\', \'/download/APclient/IOS/\']);"  style=" text-decoration: none;width:85px;display:block;float:left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></span></div>')

      //}
      /*
            mobileContent.replaceWith('<a class="fl  mr10" style="background-image:url(\'//pic2.58.com/ui7/post/img/newmbtn.png\');background-repeat: no-repeat;;width:84px;height:29px" href="javascript:void(0)" onClick="MOBILEUP.init({showCode:$(\'#showCon\'),codeCon:$(\'#codeCon\'),rootcate:\''+rootcateid+'\', smallcate:\''+smallcateid+'\', vcode:\'\', infoid:\'0\'}); _gaq.push([\'pageTracker._trackEvent\', \'post\', \'click\', \'\/upload\/cloud\/\']); "></a>');
            if(myInfo.infoID != '0'){
                MOBILEUP.init({showCode:$('#showCon'),codeCon:$('#codeCon'),rootcate:rootcateid, smallcate:smallcateid, vcode:'', infoid:myInfo.infoID});

            }
            */
    }
  }
  this.getImgs=function(){
    return this.UpImageShowBar.getImgs();
  }
}


//swfobject.js

/*!	SWFObject v2.2 <//code.google.com/p/swfobject/>
	is released under the MIT License <//www.opensource.org/licenses/mit-license.php>
*/

var swfobject = function() {

  var UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    EXPRESS_INSTALL_ID = "SWFObjectExprInst",
    ON_READY_STATE_CHANGE = "onreadystatechange",

    win = window,
    doc = document,
    nav = navigator,

    plugin = false,
    domLoadFnArr = [main],
    regObjArr = [],
    objIdArr = [],
    listenersArr = [],
    storedAltContent,
    storedAltContentId,
    storedCallbackFn,
    storedCallbackObj,
    isDomLoaded = false,
    isExpressInstallActive = false,
    dynamicStylesheet,
    dynamicStylesheetMedia,
    autoHideShow = true,

    /* Centralized function for browser feature detection
          - User agent string detection is only used when no good alternative is possible
          - Is executed directly for optimal performance
      */
    ua = function() {
      var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
        u = nav.userAgent.toLowerCase(),
        p = nav.platform.toLowerCase(),
        windows = p ? /win/.test(p) : /win/.test(u),
        mac = p ? /mac/.test(p) : /mac/.test(u),
        webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
        ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: //webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
        playerVersion = [0,0,0],
        d = null;
      if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
        d = nav.plugins[SHOCKWAVE_FLASH].description;
        if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
          plugin = true;
          ie = false; // cascaded feature detection for Internet Explorer
          d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
          playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
          playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
        }
      }
      else if (typeof win.ActiveXObject != UNDEF) {
        try {
          var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
          if (a) { // a will return null when ActiveX is disabled
            d = a.GetVariable("$version");
            if (d) {
              ie = true; // cascaded feature detection for Internet Explorer
              d = d.split(" ")[1].split(",");
              playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
            }
          }
        }
        catch(e) {}
      }
      return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
    }(),

    /* Cross-browser onDomLoad
          - Will fire an event as soon as the DOM of a web page is loaded
          - Internet Explorer workaround based on Diego Perini's solution: //javascript.nwbox.com/IEContentLoaded/
          - Regular onload serves as fallback
      */
    onDomLoad = function() {
      if (!ua.w3) { return; }
      if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically
        callDomLoadFunctions();
      }
      if (!isDomLoaded) {
        if (typeof doc.addEventListener != UNDEF) {
          doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
        }
        if (ua.ie && ua.win) {
          doc.attachEvent(ON_READY_STATE_CHANGE, function() {
            if (doc.readyState == "complete") {
              doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
              callDomLoadFunctions();
            }
          });
          if (win == top) { // if not inside an iframe
            (function(){
              if (isDomLoaded) { return; }
              try {
                doc.documentElement.doScroll("left");
              }
              catch(e) {
                setTimeout(arguments.callee, 0);
                return;
              }
              callDomLoadFunctions();
            })();
          }
        }
        if (ua.wk) {
          (function(){
            if (isDomLoaded) { return; }
            if (!/loaded|complete/.test(doc.readyState)) {
              setTimeout(arguments.callee, 0);
              return;
            }
            callDomLoadFunctions();
          })();
        }
        addLoadEvent(callDomLoadFunctions);
      }
    }();

  function callDomLoadFunctions() {
    if (isDomLoaded) { return; }
    try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
      var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
      t.parentNode.removeChild(t);
    }
    catch (e) { return; }
    isDomLoaded = true;
    var dl = domLoadFnArr.length;
    for (var i = 0; i < dl; i++) {
      domLoadFnArr[i]();
    }
  }

  function addDomLoadEvent(fn) {
    if (isDomLoaded) {
      fn();
    }
    else {
      domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
    }
  }

  /* Cross-browser onload
        - Based on James Edwards' solution: //brothercake.com/site/resources/scripts/onload/
        - Will fire an event as soon as a web page including all of its assets are loaded
     */
  function addLoadEvent(fn) {
    if (typeof win.addEventListener != UNDEF) {
      win.addEventListener("load", fn, false);
    }
    else if (typeof doc.addEventListener != UNDEF) {
      doc.addEventListener("load", fn, false);
    }
    else if (typeof win.attachEvent != UNDEF) {
      addListener(win, "onload", fn);
    }
    else if (typeof win.onload == "function") {
      var fnOld = win.onload;
      win.onload = function() {
        fnOld();
        fn();
      };
    }
    else {
      win.onload = fn;
    }
  }

  /* Main function
        - Will preferably execute onDomLoad, otherwise onload (as a fallback)
    */
  function main() {
    if (plugin) {
      testPlayerVersion();
    }
    else {
      matchVersions();
    }
  }

  /* Detect the Flash Player version for non-Internet Explorer browsers
        - Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
          a. Both release and build numbers can be detected
          b. Avoid wrong descriptions by corrupt installers provided by Adobe
          c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
        - Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
    */
  function testPlayerVersion() {
    var b = doc.getElementsByTagName("body")[0];
    var o = createElement(OBJECT);
    o.setAttribute("type", FLASH_MIME_TYPE);
    var t = b.appendChild(o);
    if (t) {
      var counter = 0;
      (function(){
        if (typeof t.GetVariable != UNDEF) {
          var d = t.GetVariable("$version");
          if (d) {
            d = d.split(" ")[1].split(",");
            ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
          }
        }
        else if (counter < 10) {
          counter++;
          setTimeout(arguments.callee, 10);
          return;
        }
        b.removeChild(o);
        t = null;
        matchVersions();
      })();
    }
    else {
      matchVersions();
    }
  }

  /* Perform Flash Player and SWF version matching; static publishing only
    */
  function matchVersions() {
    var rl = regObjArr.length;
    if (rl > 0) {
      for (var i = 0; i < rl; i++) { // for each registered object element
        var id = regObjArr[i].id;
        var cb = regObjArr[i].callbackFn;
        var cbObj = {success:false, id:id};
        if (ua.pv[0] > 0) {
          var obj = getElementById(id);
          if (obj) {
            if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
              setVisibility(id, true);
              if (cb) {
                cbObj.success = true;
                cbObj.ref = getObjectById(id);
                cb(cbObj);
              }
            }
            else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
              var att = {};
              att.data = regObjArr[i].expressInstall;
              att.width = obj.getAttribute("width") || "0";
              att.height = obj.getAttribute("height") || "0";
              if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
              if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
              // parse HTML object param element's name-value pairs
              var par = {};
              var p = obj.getElementsByTagName("param");
              var pl = p.length;
              for (var j = 0; j < pl; j++) {
                if (p[j].getAttribute("name").toLowerCase() != "movie") {
                  par[p[j].getAttribute("name")] = p[j].getAttribute("value");
                }
              }
              showExpressInstall(att, par, id, cb);
            }
            else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
              displayAltContent(obj);
              if (cb) { cb(cbObj); }
            }
          }
        }
        else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
          setVisibility(id, true);
          if (cb) {
            var o = getObjectById(id); // test whether there is an HTML object element or not
            if (o && typeof o.SetVariable != UNDEF) {
              cbObj.success = true;
              cbObj.ref = o;
            }
            cb(cbObj);
          }
        }
      }
    }
  }

  function getObjectById(objectIdStr) {
    var r = null;
    var o = getElementById(objectIdStr);
    if (o && o.nodeName == "OBJECT") {
      if (typeof o.SetVariable != UNDEF) {
        r = o;
      }
      else {
        var n = o.getElementsByTagName(OBJECT)[0];
        if (n) {
          r = n;
        }
      }
    }
    return r;
  }

  /* Requirements for Adobe Express Install
        - only one instance can be active at a time
        - fp 6.0.65 or higher
        - Win/Mac OS only
        - no Webkit engines older than version 312
    */
  function canExpressInstall() {
    return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
  }

  /* Show the Adobe Express Install dialog
        - Reference: //www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
    */
  function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
    isExpressInstallActive = true;
    storedCallbackFn = callbackFn || null;
    storedCallbackObj = {success:false, id:replaceElemIdStr};
    var obj = getElementById(replaceElemIdStr);
    if (obj) {
      if (obj.nodeName == "OBJECT") { // static publishing
        storedAltContent = abstractAltContent(obj);
        storedAltContentId = null;
      }
      else { // dynamic publishing
        storedAltContent = obj;
        storedAltContentId = replaceElemIdStr;
      }
      att.id = EXPRESS_INSTALL_ID;
      if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) { att.width = "310"; }
      if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) { att.height = "137"; }
      doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
      var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
        fv = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g,"%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
      if (typeof par.flashvars != UNDEF) {
        par.flashvars += "&" + fv;
      }
      else {
        par.flashvars = fv;
      }
      // IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
      // because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
      if (ua.ie && ua.win && obj.readyState != 4) {
        var newObj = createElement("div");
        replaceElemIdStr += "SWFObjectNew";
        newObj.setAttribute("id", replaceElemIdStr);
        obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
        obj.style.display = "none";
        (function(){
          if (obj.readyState == 4) {
            obj.parentNode.removeChild(obj);
          }
          else {
            setTimeout(arguments.callee, 10);
          }
        })();
      }
      createSWF(att, par, replaceElemIdStr);
    }
  }

  /* Functions to abstract and display alternative content
    */
  function displayAltContent(obj) {
    if (ua.ie && ua.win && obj.readyState != 4) {
      // IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
      // because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
      var el = createElement("div");
      obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
      el.parentNode.replaceChild(abstractAltContent(obj), el);
      obj.style.display = "none";
      (function(){
        if (obj.readyState == 4) {
          obj.parentNode.removeChild(obj);
        }
        else {
          setTimeout(arguments.callee, 10);
        }
      })();
    }
    else {
      obj.parentNode.replaceChild(abstractAltContent(obj), obj);
    }
  }

  function abstractAltContent(obj) {
    var ac = createElement("div");
    if (ua.win && ua.ie) {
      ac.innerHTML = obj.innerHTML;
    }
    else {
      var nestedObj = obj.getElementsByTagName(OBJECT)[0];
      if (nestedObj) {
        var c = nestedObj.childNodes;
        if (c) {
          var cl = c.length;
          for (var i = 0; i < cl; i++) {
            if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
              ac.appendChild(c[i].cloneNode(true));
            }
          }
        }
      }
    }
    return ac;
  }

  /* Cross-browser dynamic SWF creation
    */
  function createSWF(attObj, parObj, id) {
    var r, el = getElementById(id);
    if (ua.wk && ua.wk < 312) { return r; }
    if (el) {
      if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
        attObj.id = id;
      }
      if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
        var att = "";
        for (var i in attObj) {
          if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
            if (i.toLowerCase() == "data") {
              parObj.movie = attObj[i];
            }
            else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              att += ' class="' + attObj[i] + '"';
            }
            else if (i.toLowerCase() != "classid") {
              att += ' ' + i + '="' + attObj[i] + '"';
            }
          }
        }
        var par = "";
        for (var j in parObj) {
          if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
            par += '<param name="' + j + '" value="' + parObj[j] + '" />';
          }
        }
        el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
        objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
        r = getElementById(attObj.id);
      }
      else { // well-behaving browsers
        var o = createElement(OBJECT);
        o.setAttribute("type", FLASH_MIME_TYPE);
        for (var m in attObj) {
          if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
            if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              o.setAttribute("class", attObj[m]);
            }
            else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
              o.setAttribute(m, attObj[m]);
            }
          }
        }
        for (var n in parObj) {
          if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
            createObjParam(o, n, parObj[n]);
          }
        }
        el.parentNode.replaceChild(o, el);
        r = o;
      }
    }
    return r;
  }

  function createObjParam(el, pName, pValue) {
    var p = createElement("param");
    p.setAttribute("name", pName);
    p.setAttribute("value", pValue);
    el.appendChild(p);
  }

  /* Cross-browser SWF removal
        - Especially needed to safely and completely remove a SWF in Internet Explorer
    */
  function removeSWF(id) {
    var obj = getElementById(id);
    if (obj && obj.nodeName == "OBJECT") {
      if (ua.ie && ua.win) {
        obj.style.display = "none";
        (function(){
          if (obj.readyState == 4) {
            removeObjectInIE(id);
          }
          else {
            setTimeout(arguments.callee, 10);
          }
        })();
      }
      else {
        obj.parentNode.removeChild(obj);
      }
    }
  }

  function removeObjectInIE(id) {
    var obj = getElementById(id);
    if (obj) {
      for (var i in obj) {
        if (typeof obj[i] == "function") {
          obj[i] = null;
        }
      }
      obj.parentNode.removeChild(obj);
    }
  }

  /* Functions to optimize JavaScript compression
    */
  function getElementById(id) {
    var el = null;
    try {
      el = doc.getElementById(id);
    }
    catch (e) {}
    return el;
  }

  function createElement(el) {
    return doc.createElement(el);
  }

  /* Updated attachEvent function for Internet Explorer
        - Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
    */
  function addListener(target, eventType, fn) {
    target.attachEvent(eventType, fn);
    listenersArr[listenersArr.length] = [target, eventType, fn];
  }

  /* Flash Player and SWF content version matching
    */
  function hasPlayerVersion(rv) {
    var pv = ua.pv, v = rv.split(".");
    v[0] = parseInt(v[0], 10);
    v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
    v[2] = parseInt(v[2], 10) || 0;
    return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
  }

  /* Cross-browser dynamic CSS creation
        - Based on Bobby van der Sluis' solution: //www.bobbyvandersluis.com/articles/dynamicCSS.php
    */
  function createCSS(sel, decl, media, newStyle) {
    if (ua.ie && ua.mac) { return; }
    var h = doc.getElementsByTagName("head")[0];
    if (!h) { return; } // to also support badly authored HTML pages that lack a head element
    var m = (media && typeof media == "string") ? media : "screen";
    if (newStyle) {
      dynamicStylesheet = null;
      dynamicStylesheetMedia = null;
    }
    if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
      // create dynamic stylesheet + get a global reference to it
      var s = createElement("style");
      s.setAttribute("type", "text/css");
      s.setAttribute("media", m);
      dynamicStylesheet = h.appendChild(s);
      if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
        dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
      }
      dynamicStylesheetMedia = m;
    }
    // add style rule
    if (ua.ie && ua.win) {
      if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
        dynamicStylesheet.addRule(sel, decl);
      }
    }
    else {
      if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
        dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
      }
    }
  }

  function setVisibility(id, isVisible) {
    if (!autoHideShow) { return; }
    var v = isVisible ? "visible" : "hidden";
    if (isDomLoaded && getElementById(id)) {
      getElementById(id).style.visibility = v;
    }
    else {
      createCSS("#" + id, "visibility:" + v);
    }
  }

  /* Filter to avoid XSS attacks
    */
  function urlEncodeIfNecessary(s) {
    var regex = /[\\\"<>\.;]/;
    var hasBadChars = regex.exec(s) != null;
    return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
  }

  /* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
    */
  var cleanup = function() {
    if (ua.ie && ua.win) {
      window.attachEvent("onunload", function() {
        // remove listeners to avoid memory leaks
        var ll = listenersArr.length;
        for (var i = 0; i < ll; i++) {
          listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
        }
        // cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
        var il = objIdArr.length;
        for (var j = 0; j < il; j++) {
          removeSWF(objIdArr[j]);
        }
        // cleanup library's main closures to avoid memory leaks
        for (var k in ua) {
          ua[k] = null;
        }
        ua = null;
        for (var l in swfobject) {
          swfobject[l] = null;
        }
        swfobject = null;
      });
    }
  }();

  return {
    /* Public API
            - Reference: //code.google.com/p/swfobject/wiki/documentation
        */
    registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
      if (ua.w3 && objectIdStr && swfVersionStr) {
        var regObj = {};
        regObj.id = objectIdStr;
        regObj.swfVersion = swfVersionStr;
        regObj.expressInstall = xiSwfUrlStr;
        regObj.callbackFn = callbackFn;
        regObjArr[regObjArr.length] = regObj;
        setVisibility(objectIdStr, false);
      }
      else if (callbackFn) {
        callbackFn({success:false, id:objectIdStr});
      }
    },

    getObjectById: function(objectIdStr) {
      if (ua.w3) {
        return getObjectById(objectIdStr);
      }
    },

    embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
      var callbackObj = {success:false, id:replaceElemIdStr};
      if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
        setVisibility(replaceElemIdStr, false);
        addDomLoadEvent(function() {
          widthStr += ""; // auto-convert to string
          heightStr += "";
          var att = {};
          if (attObj && typeof attObj === OBJECT) {
            for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
              att[i] = attObj[i];
            }
          }
          att.data = swfUrlStr;
          att.width = widthStr;
          att.height = heightStr;
          var par = {};
          if (parObj && typeof parObj === OBJECT) {
            for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
              par[j] = parObj[j];
            }
          }
          if (flashvarsObj && typeof flashvarsObj === OBJECT) {
            for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
              if (typeof par.flashvars != UNDEF) {
                par.flashvars += "&" + k + "=" + flashvarsObj[k];
              }
              else {
                par.flashvars = k + "=" + flashvarsObj[k];
              }
            }
          }
          if (hasPlayerVersion(swfVersionStr)) { // create SWF
            var obj = createSWF(att, par, replaceElemIdStr);
            if (att.id == replaceElemIdStr) {
              setVisibility(replaceElemIdStr, true);
            }
            callbackObj.success = true;
            callbackObj.ref = obj;
          }
          else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
            att.data = xiSwfUrlStr;
            showExpressInstall(att, par, replaceElemIdStr, callbackFn);
            return;
          }
          else { // show alternative content
            setVisibility(replaceElemIdStr, true);
          }
          if (callbackFn) { callbackFn(callbackObj); }
        });
      }
      else if (callbackFn) { callbackFn(callbackObj);	}
    },

    switchOffAutoHideShow: function() {
      autoHideShow = false;
    },

    ua: ua,

    getFlashPlayerVersion: function() {
      return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
    },

    hasFlashPlayerVersion: hasPlayerVersion,

    createSWF: function(attObj, parObj, replaceElemIdStr) {
      if (ua.w3) {
        return createSWF(attObj, parObj, replaceElemIdStr);
      }
      else {
        return undefined;
      }
    },

    showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
      if (ua.w3 && canExpressInstall()) {
        showExpressInstall(att, par, replaceElemIdStr, callbackFn);
      }
    },

    removeSWF: function(objElemIdStr) {
      if (ua.w3) {
        removeSWF(objElemIdStr);
      }
    },

    createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
      if (ua.w3) {
        createCSS(selStr, declStr, mediaStr, newStyleBoolean);
      }
    },

    addDomLoadEvent: addDomLoadEvent,

    addLoadEvent: addLoadEvent,

    getQueryParamValue: function(param) {
      var q = doc.location.search || doc.location.hash;
      if (q) {
        if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
        if (param == null) {
          return urlEncodeIfNecessary(q);
        }
        var pairs = q.split("&");
        for (var i = 0; i < pairs.length; i++) {
          if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
            return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
          }
        }
      }
      return "";
    },

    // For internal usage only
    expressInstallCallback: function() {
      if (isExpressInstallActive) {
        var obj = getElementById(EXPRESS_INSTALL_ID);
        if (obj && storedAltContent) {
          obj.parentNode.replaceChild(storedAltContent, obj);
          if (storedAltContentId) {
            setVisibility(storedAltContentId, true);
            if (ua.ie && ua.win) { storedAltContent.style.display = "block"; }
          }
          if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
        }
        isExpressInstallActive = false;
      }
    }
  };
}();
