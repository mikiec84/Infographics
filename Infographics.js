define( [
		'qlik'
		,'./properties'
		,'text!./css/Infographics.css'
],
function ( qlik, props, cssContent ) {

	$('<style>').html(cssContent).appendTo('head');

	var app = qlik.currApp(this); //App object	
	var repeated = 1;	//Rendering repeat count
	
	function getFieldValues(field){		
		var myField = app.field(field).getData();
		return myField;
	}

	function hexToRGB(hex, alpha) {
	    var r = parseInt(hex.slice(1, 3), 16),
	        g = parseInt(hex.slice(3, 5), 16),
	        b = parseInt(hex.slice(5, 7), 16);

	    return "rgb(" + r + ", " + g + ", " + b + ")";	    
	}

	function numberFormat(vType,vThou,vDec,vSym){
		var vNumberFormat = '';
		if(vType == 'custom'){
			vNumberFormat += ',"qNumFormat": {' +
	        '"qType": "F",'+
	        '"qnDec": ' + vDec + ',' +
	        '"qUseThou": 0,';
	        if(vThou == ',') {
		        vNumberFormat+='"qFmt": "#,##0';
		        if(vDec>0){
		        	vNumberFormat += ".";
		        	for (var t = 0;t<vDec;t++){
			        	vNumberFormat += "0";
			        }
		        }
		        
		        vNumberFormat += vSym + '",' +
		        '"qDec": ".",' +
		        '"qThou": ","' +
		        '}';
		    }else{
		  	    vNumberFormat+='"qFmt": "#.##0';
		        if(vDec>0){
		        	vNumberFormat += ",";
		        	for (var t = 0;t<vDec;t++){
			        	vNumberFormat += "0";
			        }
		        }
		        
		        vNumberFormat += vSym + '",' +
		        '"qDec": ",",' +
		        '"qThou": "."' +
		        '}';
		    }
		}
		return vNumberFormat;
	}
	function alignKey(AlignValue1){
		var AlignValue2 = 'center top';
		switch (AlignValue1)
		{
			case 'topLeft':
			AlignValue2 = 'left top';
			break;
			
			case 'centerLeft':
			AlignValue2 = 'center top';
			break;
		
			case 'bottomLeft':
			AlignValue2 = 'right top';
			break;
		
			case 'topCenter':
			AlignValue2 = 'left center';
			break;

			case 'centerCenter':
			AlignValue2 = 'center center';
			break;

			case 'bottomCenter':
			AlignValue2 = 'right center';
			break;

			case 'topRight':
			AlignValue2 = 'left bottom';
			break;

			case 'centerRight':
			AlignValue2 = 'center bottom';
			break;

			case 'bottomRight':
			AlignValue2 = 'right bottom';
			break;
		
			default:
			AlignValue2 = 'center top';
			break;	
		}
		return AlignValue2;
	};

	return {
		initialProperties : {
			version : 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 1,
					qHeight : 10000
				}]
			},	
		},
	  	definition: ( props ),
		support : {
				export: false,
				exportData: false,
				snapshot: true
		},
		//controller: ['$scope', '$element', function ( $scope, $element ) {
			
		//}],
		paint : function($element, layout) {			
			// General Settings						
			var vInfogTabs = this.backendApi.model.layout.infogtabs;
			var vDefaultImagesPath = this.backendApi.model.layout.defaultImagesPath;
			var vBoolGlobalBackground = this.backendApi.model.layout.boolglobalbackground;
			var vBackgroundColorGlobal = this.backendApi.model.layout.backgroundcolorglobal;
			var currentLocation = String(window.location);
			var npos = currentLocation.indexOf('sense/app') - 1;
			var vBackgroundImage = '';
			if(this.backendApi.model.layout.backgroundimage){
				vBackgroundImage = "url('" + currentLocation.substring(0, npos) + this.backendApi.model.layout.backgroundimage + "')";	
			} 
			
			var vBoolglobaldynamicimage = this.backendApi.model.layout.boolglobaldynamicimage;
			var vBoolglobaldynamicimageSec = this.backendApi.model.layout.boolglobaldynamicimageSec;
			var vImagePath = this.backendApi.model.layout.path_img_app_or_extension;
			var vImagePathSec = this.backendApi.model.layout.path_img_app_or_extensionSec;
			var vImagePathTrellis = this.backendApi.model.layout.path_img_app_or_extensionTrellis;
			if(vImagePathTrellis != vDefaultImagesPath && vDefaultImagesPath && vImagePathTrellis == currentLocation.substring(0, npos) + '/content/Default/'){
				vImagePathTrellis = vDefaultImagesPath;
			}
			var vImageExtension = this.backendApi.model.layout.globaldynamicimagedimExtension;
			var vImageExtensionSec = this.backendApi.model.layout.globaldynamicimagedimExtensionSec;
			var vImageExtensionTrellis = this.backendApi.model.layout.globaldynamicimagedimExtensionTrellis;
			var vGlobalDynamicImageDimSec = '';		
			var vBackgroundImageSec = "url('" + currentLocation.substring(0, npos) + this.backendApi.model.layout.backgroundimageSec + "')";
			var vGlobalDynamicImageDim = '';
			var rowNumber = 0;
			var rowValue = '';
			var rowValueImg = '';
			var arrayImages = new Array();
			var arrayCharts = new Array();
			var vPrimaryDimension = '';
			var vPrimaryDimensionTitle = '';
			var nPosDim1 = this.backendApi.model.layout.ChartTrellisDim.indexOf('mm0#-#0mm');
			var nFullDim1 = this.backendApi.model.layout.ChartTrellisDim;
			var vChartTrellisDim = nFullDim1.substring(0,nPosDim1);	
			var vChartTrellisDimLabel = nFullDim1.substring(nPosDim1 + 9,nFullDim1.length);		
			var nPosDim2 = this.backendApi.model.layout.ChartTrellisDim2.indexOf('mm0#-#0mm');
			var nFullDim2 = this.backendApi.model.layout.ChartTrellisDim2;
			var vChartTrellisDim2 = nFullDim2.substring(0,nPosDim2);
			var vChartTrellisDimLabel2 = nFullDim2.substring(nPosDim2 + 9,nFullDim2.length);			
			var vNumberOfColumnsTrellis = this.backendApi.model.layout.NumberOfColumnsTrellis;
			var vNumberOfRowsTrellis = this.backendApi.model.layout.NumberOfRowsTrellis;
			var vChartTrellisType = this.backendApi.model.layout.ChartTrellisType;
			var vBoolHelpLoopExpressions = this.backendApi.model.layout.boolHelpLoopExpressions;
			var vSymHelpLoopExpressions = this.backendApi.model.layout.symHelpLoopExpressions;
			var vChartTrellisMeas1 = this.backendApi.model.layout.ChartTrellisMeas1;
			var vLabelTrellisMeas1 = this.backendApi.model.layout.LabelTrellisMeas1;
			var vTypeColorMeas1 = this.backendApi.model.layout.TypeColorMeas1;
			var vExpressionColorMeas1 = this.backendApi.model.layout.ExpressionColorMeas1;
			var vSingleColorMeas1 = hexToRGB(this.backendApi.model.layout.SingleColorMeas1.color);
			var vChartTrellisMeas2 = this.backendApi.model.layout.ChartTrellisMeas2;
			var vLabelTrellisMeas2 = this.backendApi.model.layout.LabelTrellisMeas2;			
			var vExpressionColorMeas2 = this.backendApi.model.layout.ExpressionColorMeas2;
			var vSingleColorMeas2 = hexToRGB(this.backendApi.model.layout.SingleColorMeas2.color);
			var vChartTrellisMeas3 = this.backendApi.model.layout.ChartTrellisMeas3;
			var vLabelTrellisMeas3 = this.backendApi.model.layout.LabelTrellisMeas3;
			var vExpressionColorMeas3 = this.backendApi.model.layout.ExpressionColorMeas3;
			var vSingleColorMeas3 = hexToRGB(this.backendApi.model.layout.SingleColorMeas3.color);
			var vVizFlyColor = '';
			var vFizFlyAttr1 = '';
			var vFizFlyAttr2 = '';
			var vFizFlyAttr3 = '';
			var vSeries1 = '';
			var vSeries2 = '';
			var vSeries3 = '';
			var vNumberFormat1 =  '';
			var vNumberFormat2 =  '';
			var vNumberFormat3 =  '';
			var vTyp1 = this.backendApi.model.layout.numberFormatExpr1Type;
			var vTho1 = this.backendApi.model.layout.numberFormatExpr1Thou;
			var vDec1 = this.backendApi.model.layout.numberFormatExpr1Dec;
			var vSym1 = this.backendApi.model.layout.numberFormatExpr1Sym;

			var vTyp2 = this.backendApi.model.layout.numberFormatExpr2Type;
			var vTho2 = this.backendApi.model.layout.numberFormatExpr2Thou;
			var vDec2 = this.backendApi.model.layout.numberFormatExpr2Dec;
			var vSym2 = this.backendApi.model.layout.numberFormatExpr2Sym;

			var vTyp3 = this.backendApi.model.layout.numberFormatExpr3Type;
			var vTho3 = this.backendApi.model.layout.numberFormatExpr3Thou;
			var vDec3 = this.backendApi.model.layout.numberFormatExpr3Dec;
			var vSym3 = this.backendApi.model.layout.numberFormatExpr3Sym;

			vNumberFormat1 = numberFormat(vTyp1,vTho1,vDec1,vSym1);
			vNumberFormat2 = numberFormat(vTyp2,vTho2,vDec2,vSym2);
			vNumberFormat3 = numberFormat(vTyp3,vTho3,vDec3,vSym3);
			
			if(vChartTrellisType == 'combochart'){
				vSeries1 = ',"series" : {"type" : "bar"}';
				vSeries2 = ',"series" : {"type" : "line"}';
				vSeries3 = ',"series" : {"type" : "line"}';
			}
			
			if(vChartTrellisType != 'kpi' && vChartTrellisType != 'gauge'){
				switch (vTypeColorMeas1) {
					case 'byMeasure':
						vVizFlyColor = '"color" : { "auto" : false, "mode" : "byMeasure", "measureScheme" : "sc" },';					
					break;

					case 'byDimension':
						vVizFlyColor = '"color" : { "auto" : false, "mode" : "byDimension", "dimensionScheme" : "12" },';					
					break;

					case 'primary':
						vVizFlyColor = '"color" : { "auto" : false, "mode" : "primary"},';					
					break;

					case 'singleColor':					
						vVizFlyColor = '"color" : { "auto" : false,"mode" : "byExpression"},';
						vFizFlyAttr1 = ',"qAttributeExpressions" : [{ "id":"colorByExpression", "qExpression": "' + "=" + vSingleColorMeas1 + '" }]';
						if((vChartTrellisType == 'pivot-table') && vChartTrellisMeas2){
							vFizFlyAttr2 = ',"qAttributeExpressions" : [{ "id":"colorByExpression", "qExpression": "' + "=" + vSingleColorMeas2 + '" }]';
						}
						if((vChartTrellisType == 'pivot-table') && vChartTrellisMeas3){
							vFizFlyAttr3 = ',"qAttributeExpressions" : [{ "id":"colorByExpression", "qExpression": "' + "=" + vSingleColorMeas3 + '" }]';
						}
					break;

					case 'byExpression':					
						vVizFlyColor = '"color" : { "auto" : false,"mode" : "byExpression"},';
						vFizFlyAttr1 = ',"qAttributeExpressions" : [{ "id":"colorByExpression", "qExpression": "' + vExpressionColorMeas1 + '" }]';
						if((vChartTrellisType == 'pivot-table') && vChartTrellisMeas2){
							vFizFlyAttr2 = ',"qAttributeExpressions" : [{ "id":"colorByExpression", "qExpression": "' + vExpressionColorMeas2 + '" }]';
						}
						if((vChartTrellisType == 'pivot-table') && vChartTrellisMeas3){
							vFizFlyAttr3 = ',"qAttributeExpressions" : [{ "id":"colorByExpression", "qExpression": "' + vExpressionColorMeas3 + '" }]';
						}
					break;

					default:
						vVizFlyColor = '';
					break;					
				}
			}
			
			
			var vBoolglobaldynamicimageTrellis = this.backendApi.model.layout.boolglobaldynamicimageTrellis;
			var vFormula1 = '';
			var vFormula2 = '';
			var vFormula3 = '';						
			
			$.each(this.backendApi.getDimensionInfos(), function(key, value) {					
					vPrimaryDimension = value.qGroupFieldDefs[0];
					vPrimaryDimensionTitle = value.title;					
			});
							

			this.backendApi.eachDataRow(function(rownum, row) {		
				rowValue = row[0].qText;
				rowValueImg = row[0].qText.replace(/´/g, "");

				if(rowNumber == 0 && vInfogTabs > 0){
					
					if(vBoolglobaldynamicimage){
						vGlobalDynamicImageDim = vImagePath + rowValueImg + '.' + vImageExtension;											
						vBackgroundImage = "url('" + vGlobalDynamicImageDim + "')";
					}
					if(vBoolglobaldynamicimageSec){
						vGlobalDynamicImageDimSec = vImagePathSec + rowValueImg + '.' + vImageExtensionSec;
						vBackgroundImageSec = "url('" + vGlobalDynamicImageDimSec + "')";								
					}
				}
				if(vInfogTabs == 0){
					var vMyExpr1 = '';
					var vMyExpr2 = '';
					var vMyExpr3 = '';
					//var vMyTestillo ='(sum(Sales)-sum({<Year = {"2013"}>}COS))/sum(Sales)';
					
					//vMyTestillo = vMyTestillo.split('))').join(')??');
					//vMyTestillo = vMyTestillo.replace(/\(([^()]+)\)/g, '[$1]');
					//vMyTestillo = vMyTestillo.replace(/[??]/g,'))');
					//console.log(vMyTestillo);
					if(vBoolglobaldynamicimageTrellis){
						arrayImages[rowNumber] = "url('" + vImagePathTrellis + rowValueImg + '.' + vImageExtensionTrellis + "')";								
					}		
					var vLabelTrellisMeas1Aux = vLabelTrellisMeas1;
					if(vChartTrellisType == 'kpi' || vChartTrellisType == 'gauge'){
						vLabelTrellisMeas1Aux += ' ' + rowValue;
					}		
					
					if(vBoolHelpLoopExpressions && vSymHelpLoopExpressions)	{
						vMyExpr1 = vChartTrellisMeas1;
						vMyExpr1 = vMyExpr1.replace(/"([^"]+)"/g, '[$1]');
						vMyExpr1 = vMyExpr1.replace(/'([^']+)'/g, '[$1]');	
						vMyExpr1 = vMyExpr1.split(vSymHelpLoopExpressions).join(vPrimaryDimension + '= {[' + rowValue + ']}');
						vFormula1 = '{"qDef":{ "qDef" :' + '"=' + vMyExpr1 + '","qLabel": "' + vLabelTrellisMeas1Aux + '"' + vSeries1 + vNumberFormat1 +'}';						
						if(vChartTrellisMeas2 && (vChartTrellisType == 'barchart' || vChartTrellisType == 'kpi' || vChartTrellisType == 'combochart' || vChartTrellisType == 'linechart' || vChartTrellisType == 'pivot-table' || vChartTrellisType == 'table' || vChartTrellisType == 'scatterplot')){
							vMyExpr2 = vChartTrellisMeas2;												
							vMyExpr2 = vMyExpr2.replace(/"([^"]+)"/g, '[$1]');
							vMyExpr2 = vMyExpr2.replace(/'([^']+)'/g, '[$1]');						
							vMyExpr2 = vMyExpr2.split(vSymHelpLoopExpressions).join(vPrimaryDimension + '= {[' + rowValue + ']}');
							vFormula2 = ',{"qDef":{ "qDef" :' + '"=' + vMyExpr2 + '","qLabel": "' + vLabelTrellisMeas2 + '"' + vSeries2 + vNumberFormat2 + '}';							
						}
						if(vChartTrellisMeas3 && (vChartTrellisType == 'barchart' || vChartTrellisType == 'combochart' || vChartTrellisType == 'linechart' || vChartTrellisType == 'pivot-table' || vChartTrellisType == 'table' || vChartTrellisType == 'scatterplot')){
							vMyExpr3 = vChartTrellisMeas3;												
							vMyExpr3 = vMyExpr3.replace(/"([^"]+)"/g, '[$1]');
							vMyExpr3 = vMyExpr3.replace(/'([^']+)'/g, '[$1]');						
							vMyExpr3 = vMyExpr3.split(vSymHelpLoopExpressions).join(vPrimaryDimension + '= {[' + rowValue + ']}');
							vFormula3 = ',{"qDef":{ "qDef" :' + '"=' + vMyExpr3 + '","qLabel": "' + vLabelTrellisMeas3 + '"' + vSeries3 + vNumberFormat3 + '}';													
						}
					}else{
						vMyExpr1 = vChartTrellisMeas1.split('))').join(')??');												
						vMyExpr1 = vMyExpr1.replace(/\(([^()]+)\)/g, '({<>}$1)');
						vMyExpr1 = vMyExpr1.split('??').join(')');
						vMyExpr1 = vMyExpr1.split('{<>}{<').join('{<');						
						vMyExpr1 = vMyExpr1.split('{<').join('{<' + vPrimaryDimension + '= {[' + rowValue + ']},');
						vMyExpr1 = vMyExpr1.replace(/"([^"]+)"/g, '[$1]');
						vMyExpr1 = vMyExpr1.replace(/'([^']+)'/g, '[$1]');						
						vMyExpr1 = vMyExpr1.split(',>}').join('>}');	
						vFormula1 = '{"qDef":{ "qDef" :' + '"=' + vMyExpr1 + '","qLabel": "' + vLabelTrellisMeas1Aux + '"' + vSeries1 + vNumberFormat1 +'}';					
						if(vChartTrellisMeas2 && (vChartTrellisType == 'barchart' || vChartTrellisType == 'kpi' || vChartTrellisType == 'combochart' || vChartTrellisType == 'linechart' || vChartTrellisType == 'pivot-table' || vChartTrellisType == 'table' || vChartTrellisType == 'scatterplot')){
							vMyExpr2 = vChartTrellisMeas2.split('))').join(')??');												
							vMyExpr2 = vMyExpr2.replace(/\(([^()]+)\)/g, '({<>}$1)');
							vMyExpr2 = vMyExpr2.split('??').join(')');
							vMyExpr2 = vMyExpr2.split('{<>}{<').join('{<');						
							vMyExpr2 = vMyExpr2.split('{<').join('{<' + vPrimaryDimension + '= {[' + rowValue + ']},');
							vMyExpr2 = vMyExpr2.replace(/"([^"]+)"/g, '[$1]');
							vMyExpr2 = vMyExpr2.replace(/'([^']+)'/g, '[$1]');						
							vMyExpr2 = vMyExpr2.split(',>}').join('>}');						
							vFormula2 = ',{"qDef":{ "qDef" :' + '"=' + vMyExpr2 + '","qLabel": "' + vLabelTrellisMeas2 + '"' + vSeries2 + vNumberFormat2 + '}';
						}
						if(vChartTrellisMeas3 && (vChartTrellisType == 'barchart' || vChartTrellisType == 'combochart' || vChartTrellisType == 'linechart' || vChartTrellisType == 'pivot-table' || vChartTrellisType == 'table' || vChartTrellisType == 'scatterplot')){
							vMyExpr3 = vChartTrellisMeas3.split('))').join(')??');												
							vMyExpr3 = vMyExpr3.replace(/\(([^()]+)\)/g, '({<>}$1)');
							vMyExpr3 = vMyExpr3.split('??').join(')');
							vMyExpr3 = vMyExpr3.split('{<>}{<').join('{<');						
							vMyExpr3 = vMyExpr3.split('{<').join('{<' + vPrimaryDimension + '= {[' + rowValue + ']},');
							vMyExpr3 = vMyExpr3.replace(/"([^"]+)"/g, '[$1]');
							vMyExpr3 = vMyExpr3.replace(/'([^']+)'/g, '[$1]');						
							vMyExpr3 = vMyExpr3.split(',>}').join('>}');								
							vFormula3 = ',{"qDef":{ "qDef" :' + '"=' + vMyExpr3 + '","qLabel": "' + vLabelTrellisMeas3 + '"' + vSeries3 + vNumberFormat3 + '}';						
						}
					}
					//saving the charts definition in an array
					
					var vTrellisContent = '<qlik-visual appid="' + app.id + '" type="' + vChartTrellisType + '" cols='+ "'" +
					'[';
					if(vChartTrellisType == 'table' || vChartTrellisType == 'pivot-table'){						
						vTrellisContent += '{"qDef": {"qFieldDefs": ["' + vChartTrellisDim + '"],"qFieldLabels": ["' + vChartTrellisDimLabel + '"]}, "qOtherTotalSpec": {"qTotalMode": "TOTAL_EXPR"},"qTotalLabel": {"qv": "Totals"}},';

						if(vChartTrellisDim2){							
							vTrellisContent += '{"qDef": {"qFieldDefs": ["' + vChartTrellisDim2 + '"],"qFieldLabels": ["' + vChartTrellisDimLabel2 + '"]}},';
						}
					}

					vTrellisContent += vFormula1 +
					vFizFlyAttr1 +					
					'}' +
					vFormula2 +
					vFizFlyAttr2;
					if(vFormula2){
						vTrellisContent += '}';
					}
					vTrellisContent += vFormula3 +
					vFizFlyAttr3;
					if(vFormula3){
						vTrellisContent += '}';
					}					

					if(vChartTrellisType != 'kpi' && vChartTrellisType != 'gauge' && vChartTrellisType != 'table' && vChartTrellisType != 'pivot-table'){
						vTrellisContent += ',' + '{"qDef": {"qFieldDefs": ["' + vChartTrellisDim + '"],"qFieldLabels": ["' + vChartTrellisDimLabel + '"]}}';
						if(vChartTrellisType == 'treemap' && vChartTrellisDim2){
							vTrellisContent += ',' + '{"qDef": {"qFieldDefs": ["' + vChartTrellisDim2 + '"],"qFieldLabels": ["' + vChartTrellisDimLabel2 + '"]}}';
						}
						vTrellisContent += ']' + "'";
					}else{
						vTrellisContent += ']' + "'";
					}
					vTrellisContent += ' options=' + "'" + 
					'{' +
					'"title" : "' + vLabelTrellisMeas1Aux + ' by ' + vChartTrellisDimLabel + ' (' + vPrimaryDimensionTitle + ' : ' + rowValue + ')",' +
					vVizFlyColor +
					'"nullMode" : "connect","dataPoint": {"show": true, "showLabels" : true}' +
					' }' + 
					"'" + ' ></qlik-visual>';	
					arrayCharts[rowNumber] = vTrellisContent;						
				}
				rowNumber++;
			});
		
			
			var vBackgroundImageSize = this.backendApi.model.layout.backgroundimagesize;
			if(vBackgroundImageSize == 'Manual'){
				vBackgroundImageSize = this.backendApi.model.layout.backgroundimagesizemanual + 'px';
			}
			var vBackgroundImageOpacity = this.backendApi.model.layout.backgroundimageopacity;
			var vBackgroundImageAlign = alignKey(this.backendApi.model.layout.backgroundalignglobal);			
			if(!vBoolGlobalBackground){
				vBackgroundColorGlobal = 'transparent';
				vBackgroundImage = '';
				vBackgroundImageSize = '';
				vBackgroundImageAlign = '';
			}
			//Second image
			var vBoolglobalimageSec = this.backendApi.model.layout.boolglobalimageSec;
			
			
			var vBackgroundImageSizeSec = this.backendApi.model.layout.backgroundimagesizeSec;
			if(vBackgroundImageSizeSec == 'Manual'){
				vBackgroundImageSizeSec = this.backendApi.model.layout.backgroundimagesizemanualSec + 'px';
			}			
			var vBackgroundImageAlignSec = alignKey(this.backendApi.model.layout.backgroundalignglobalSec);
			
			if(!vBoolGlobalBackground || !vBoolglobalimageSec){
				vBackgroundImageSec = '';
				vBackgroundImageSizeSec = '';
				vBackgroundImageAlignSec = '';
			}else{

			}

			//Header
			var vBackgroundcolor1 = this.backendApi.model.layout.backgroundcolor1;			
			var vBoolHeader = this.backendApi.model.layout.boolheader;
			var vBanner1 = this.backendApi.model.layout.banner1;
			var vBoolBanner1 = this.backendApi.model.layout.boolbanner1;
			
			var vBanner1Slider = this.backendApi.model.layout.banner1slider + '%';
			var vBannerWidth = this.backendApi.model.layout.bannerwidth + '%';
			var vBannerImg = '';
			if(vBoolBanner1){
				vBannerImg = '<img id="image" src="/Extensions/Infographics/img/Global/' + vBanner1 + '.png"  alt="" style = "height:100%;width:' + vBannerWidth + '">';
			}else{
				vBannerImg = '';
			}
			var vTitle1 = this.backendApi.model.layout.title1;
			var vText1Slider = this.backendApi.model.layout.text1slider + '%';
			var vFontFamily1 = this.backendApi.model.layout.FontFamily1;
			var vLetterSize1 = this.backendApi.model.layout.lettersize1;
			var vTitleTextColor1 = this.backendApi.model.layout.TitleTextColor1;

			var vBoolTitle2 = this.backendApi.model.layout.booltitle2;
			var vTitle2 = this.backendApi.model.layout.title2;
			var vFontFamily2 = this.backendApi.model.layout.FontFamily2;
			var vLetterSize2 = this.backendApi.model.layout.lettersize2;
			var vTitleTextColor2 = this.backendApi.model.layout.TitleTextColor2;
			var vTitle2LeftSlider = this.backendApi.model.layout.title2Leftslider;
			var vTtitle2TopSlider = this.backendApi.model.layout.title2Topslider;

			var vBoolQSchartstextcolor = this.backendApi.model.layout.boolQSchartstextcolor;
			var vQSChartsTextColor = '';
			if(vBoolQSchartstextcolor){				
				vQSChartsTextColor = ';color:' + this.backendApi.model.layout.qschartstextcolor;
			}
			
			
			var vSecondTitle = '';
			if(vBoolTitle2 && vTitle2){
				vSecondTitle = '<a id="text2" style = "font-family:' + vFontFamily2 + ';font-size:' + vLetterSize2 + 'px;color:' + vTitleTextColor2 + ';left:' + vTitle2LeftSlider + '%;top:' + vTtitle2TopSlider + '%;position:relative;z-index:200">' + vTitle2 + '</a>';
			}else{
				vSecondTitle = '';
			}

			var vHeightHeader = 10;
			if(!vBoolHeader){
				vHeightHeader = 0;
			}
			
			//Trellis
			var vBackgroundImageSizeTrellis = this.backendApi.model.layout.backgroundimagesizeTrellis;
			var vBackgroundImageAlignTrellis = alignKey(this.backendApi.model.layout.backgroundalignTrellis);						
			var vpath_img_app_or_extensionTrellis = this.backendApi.model.layout.path_img_app_or_extensionTrellis;
			
			
			//
			//app.getObject( 'QVD00', 'CurrentSelections' );
			//Loop Rows
			var html = "";
			
			var vBackgroundColorGlobalGradient = vBackgroundColorGlobal;
			if(vBackgroundColorGlobal != 'Transparent'){
				vBackgroundColorGlobal = vBackgroundColorGlobal.replace(/rgb/g, "rgba");
				vBackgroundColorGlobal = vBackgroundColorGlobal.replace(')', ',' + vBackgroundImageOpacity + ')');
				vBackgroundColorGlobalGradient = 'linear-gradient(' + vBackgroundColorGlobal + ',' + vBackgroundColorGlobal + ')';
				if(vBackgroundImage){
					vBackgroundColorGlobalGradient += ',';
				}
			}else{
				vBackgroundImage = ';background-image:' + vBackgroundImage;
			}
			//var vBackgroundColorGlobalGradientSec = 'linear-gradient(rgba(255,255,255,' + vBackgroundImageOpacitySec + '),rgba(255,255,255,' + vBackgroundImageOpacitySec + '))';
			html += '<div class="container" style = "background:' + vBackgroundColorGlobalGradient + vBackgroundImage + ';background-repeat: no-repeat;background-size:' + vBackgroundImageSize + ';background-position:' + vBackgroundImageAlign + '">';
			html += '<div class="body" style = "background:' + vBackgroundImageSec + ';background-repeat: no-repeat;background-size:' + vBackgroundImageSizeSec + ';background-position:' + vBackgroundImageAlignSec + '">';
					
					//if(qlik.navigation.getMode() === 'play' && vInfogTabs > 0){
					if(qlik.navigation.getMode() === 'play'){
						if(vInfogTabs > 0){
							app.getObject( 'QVD01', 'CurrentSelections' );
							html += '<div class="header-sel" style = "background:' + vBackgroundcolor1 + '">' +
								'<div class="wrapsel"> ' +
									'<div class="currentsel">' +
										'<div class="col1 qvobject" id="QVD01"></div>' +
									'</div>' +
								'</div>' +
							'</div>';
						}else{
							app.getObject( 'QVD00', 'CurrentSelections' );
							html += '<div class="header-sel" style = "background:' + vBackgroundcolor1 + '">' +
								'<div class="wrapsel"> ' +
									'<div class="currentsel">' +
										'<div class="col1 qvobject" id="QVD00"></div>' +
									'</div>' +
								'</div>' +
							'</div>';
						}
					}
					
					if(vBoolHeader){
						html += '<div class="header-top" style = "background:' + vBackgroundcolor1 + '">'+							
							'<div class="wrap"> ' +
								'<div class="logo">' +
						        	'<div id="container" style = "left:' + vBanner1Slider + '">' +
						        		vBannerImg +
										'<p id="text" style = "font-family:' + vFontFamily1 + ';font-size:' + vLetterSize1 + 'px;color:' + vTitleTextColor1 + ';left:' + vText1Slider + '">' + vTitle1 + '</p>' +
										vSecondTitle +										
									'</div>' +
						   		'</div>' +							   							   									   		
							'</div>' +
						'</div>';
					}
					
			var vQVObject = '';
			var vQVimg = '';
			var vQVtext = '';

			for (var vTab = 1;vTab <= vInfogTabs;vTab++){
				if(vBoolGlobalBackground){				
					window['vbackgroundcolor_' + vTab] = 'transparent';
				}else{
					window['vbackgroundcolor_' + vTab] = eval('this.backendApi.model.layout.backgroundcolor_' + vTab);
				}
				window['vContainerHeightSize_' + vTab] = eval('this.backendApi.model.layout.ContainerHeightSize_' + vTab);			
		  		window['vRowCols' + vTab] = eval('this.backendApi.model.layout.numberofrowcols' + vTab);			  						

				var vColNum = 'vRowCols' + vTab;

				html += '<div class="CHs-row" style = "background:' + eval('vbackgroundcolor_' + vTab) + ';height:' + eval('vContainerHeightSize_' + vTab) + '%">'+							
					'<div class="row">';

				for (var vCol = 1;vCol <= eval('vRowCols' + vTab);vCol++){

					if(eval('this.backendApi.model.layout.col' + vTab + vCol + 'width') != 'Original Size'){
						window['vCol' + vTab + vCol + 'width'] = eval('this.backendApi.model.layout.col' + vTab + vCol + 'width');						
					}else{
						window['vCol' + vTab + vCol + 'width'] = eval('vRowCols' + vTab);
					}
					
					window['vCol' + vTab + vCol + 'BackgroundColor'] = eval('this.backendApi.model.layout.backgroundcolorCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'BackgroundImage'] = eval('this.backendApi.model.layout.backgroundimageCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'BackgroundImageSize'] = eval('this.backendApi.model.layout.backgroundimagesizeCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'BackgroundImageAlign'] = alignKey(eval('this.backendApi.model.layout.backgroundalignCol' + vTab + vCol));
					window['vCol' + vTab + vCol + 'TextChartBool'] = eval('this.backendApi.model.layout.textchartCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'CircleSquare'] = eval('this.backendApi.model.layout.circleCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'Chart'] = eval('this.backendApi.model.layout.ChartCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'Text'] = eval('this.backendApi.model.layout.labelCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'TextPadding'] = eval('this.backendApi.model.layout.labelPaddingTopCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'FontFamily'] = eval('this.backendApi.model.layout.FontFamilyCol' + vTab + vCol);
					window['vCol' + vTab + vCol + 'LetterSize'] = eval('this.backendApi.model.layout.lettersizeCol' + vTab + vCol) - 8;
					window['vCol' + vTab + vCol + 'TextColor'] = eval('this.backendApi.model.layout.TitleTextColorCol' + vTab + vCol);

					var vKPIname = 'KPI' + vTab + vCol;
				    var vKPIid = 'vCol' + vTab + vCol + 'Chart';
				    if(eval('vCol' + vTab + vCol + 'TextChartBool')){
						app.getObject(eval('"' + vKPIname + '"'),eval(vKPIid));
						vQVObject = ' qvobject" id="' + eval('"' + vKPIname + '"') + '"';
						vQVtext = '';
					}else{
						vQVObject = '"';
						vQVtext = '<p style = "position:relative;text-align:center;font-family:' + eval('vCol' + vTab + vCol + 'FontFamily') + ';font-size:' + eval('vCol' + vTab + vCol + 'LetterSize') + 'px;color:' + eval('vCol' + vTab + vCol + 'TextColor') + ';padding-top:' + eval('vCol' + vTab + vCol + 'TextPadding') + '">' + eval('vCol' + vTab + vCol + 'Text') + '</p>';
					}
					if (eval('vCol' + vTab + vCol + 'BackgroundImage')){
						vQVimg = ';background-image:url(' + eval('vCol' + vTab + vCol + 'BackgroundImage') + ');background-repeat: no-repeat;background-size:' + eval('vCol' + vTab + vCol + 'BackgroundImageSize') + ';border-radius:' + eval('vCol' + vTab + vCol + 'CircleSquare') + '%;background-position:' + eval('vCol' + vTab + vCol + 'BackgroundImageAlign') +'">';						
					}else{
						vQVimg = '">';
					}
					var vBorderStyle = '';
					if(qlik.navigation.getMode() == 'edit'){
						//vBorderStyle = ';border-spacing: 0px;border-style:dotted;border-width:2px';
						vBorderStyle = ';border: 1px solid red;margin-left: -2px';
					}

			    	html += '<div class="col' + eval('vCol' + vTab + vCol + 'width') + vQVObject + 
			    	' style = "background:' + eval('vCol' + vTab + vCol + 'BackgroundColor') + vBorderStyle + ';color:' + eval('vCol' + vTab + vCol + 'TextColor') + vQVimg + vQVtext +
			    	'</div>';

				}
				html += '<div class="last" />' +
				'</div>' +
				'</div>';
			}

			//Tags HTML para Trellis
			if(vInfogTabs == 0){
						  						
				var vColNum = 'vRowCols' + vTab;

				html += '<div class="CHs-row" style = "background:transparent;height:auto">'+							
					'<div class="row">';																		
					
					for (var g = 0;g < rowNumber;g++){
					    
						if (vBoolglobaldynamicimageTrellis){
							vQVimg = ';background-image:' + arrayImages[g] + ';background-repeat: no-repeat;background-size:' + vBackgroundImageSizeTrellis + ';background-position:' + vBackgroundImageAlignTrellis + '">';						
						}else{
							vQVimg = '">';
						}
						var vBorderStyle = '';
						if(qlik.navigation.getMode() == 'edit'){
							vBorderStyle = ';border: 1px solid red;margin-left: -2px';
						}

				    	html += '<div class="' + vNumberOfColumnsTrellis + vNumberOfRowsTrellis +'"' + 
				    	//' style = "background:transparent' + vBorderStyle + ';color:white' + vQVimg + 
				    	' style = "background:transparent' + vBorderStyle + ';' + vQVimg + 
				    	arrayCharts[g]+
				    	'</div>';
				    }
				
				html += '<div class="last" />' +
				'</div>' +
				'</div>';
			}																			
						    									
			html +=  '<style>' +
							'.qv-object * {' +
								'background-color:transparent' + vQSChartsTextColor + ';' +
							'}' +
						'</style>' +
					'</div>';														
						
			html += '</div>';
			$element.html(html);
			console.log(qlik.navigation.getMode());	
			
		}
	};
});
