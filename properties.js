define(["qlik", 'ng!$q'], function ( qlik, $q) {
	//'use strict';

	var app = qlik.currApp(this);
	var vMaxTabs = 5;
	var vMaxCols = 8;	
		

	// ****************************************************************************************
	// Properties Definition
	// ****************************************************************************************
	var getMasterObjectList = function () {

		var defer = $q.defer();

		app.getAppObjectList( 'masterobject', function ( data ) {
			var masterobject = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
				return item.qData.rank;
			} );
			_.each( sortedData, function ( item ) {
				masterobject.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );				
			} );
			
			return defer.resolve( masterobject );
		} );

		return defer.promise;
	};	


	var getMasterDimensionList = function () {

		var defer = $q.defer();

		app.getList("DimensionList", function(reply){
			var masterobject = [];

			//var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
			//	return item.qData.rank;
			//} );
			$.each(reply.qDimensionList.qItems, function(key, value) {				
				masterobject.push( {
					value: value.qData.info[0].qName + 'mm0#-#0mm' + value.qData.title,
					label: value.qData.title
				} );				
			});		
			masterobject.push( {
					value: "",
					label: "<Select a value>"
				} );	
			return defer.resolve( masterobject );
		});

		return defer.promise;
	};

	var getMasterMeasureList = function () {

		var defer = $q.defer();

		app.getList("MeasureList", function(reply){
			
			var masterobject = [];
			//var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
			//	return item.qData.rank;
			//} );
			$.each(reply.qMeasureList.qItems, function(key, value) {	
				masterobject.push( {
					value: value.qInfo.qId,
					label: value.qData.title
				} );
			});			
			return defer.resolve( masterobject );
		});

		return defer.promise;
	};	

	var currentLocationP = String(window.location);
	var nposP = currentLocationP.indexOf('sense/app') - 1;

	var vTypeColor = [{
						value: "primary",
						label: "primary"
					},{
						value: "byDimension",
						label: "By dimension"
					},{
						value: "byMeasure",
						label: "By measure"
					},{
						value: "singleColor",
						label: "Single color"
					},{
						value: "byExpression",
						label: "By expression"
					}];
	var NumberColsTrellis = [{
						value: "col1",
						label: "1"
					},{
						value: "col2",
						label: "2"
					},{
						value: "col3",
						label: "3"
					},{
						value: "col4",
						label: "4"
					}];
	var chartTypes = [{
						value: "barchart",
						label: "barchart"
					},{
						value: "combochart",
						label: "combochart"
					},{
						value: "gauge",
						label: "gauge"
					},{
						value: "kpi",
						label: "kpi"
					},{
						value: "linechart",
						label: "linechart"
					},{
						value: "piechart",
						label: "piechart"
					},{
						value: "pivot-table",
						label: "pivot-table"
					},{
						value: "scatterplot",
						label: "scatterplot"
					},{
						value: "table",
						label: "table"
					},{
						value: "treemap",
						label: "treemap"
					}];

	var numberOfTabs = [{
						value: 1,
						label: 1
					}, {
						value: 2,
						label: 2
					}, {
						value: 3,
						label: 3
					}, {
						value: 4,
						label: 4
					}, {
						value: 5,
						label: 5
					},{
						value: 0,
						label: "Trellis"
					}
					];
	var optionsFontFamily = [ {
								value: "QlikView Sans",
								label: "QlikView Sans"
							},{
								value: "Arial",
								label: "Arial"
							}, {
								value: "Calibri",
								label: "Calibri"
							}, {
								value: "Comic Sans MS",
								label: "Comic Sans MS"
							}, {
								value: "MS Sans Serif",
								label: "MS Sans Serif"
							}, {
								value: "Tahoma",
								label: "Tahoma"
							}, {
								value: "Verdana",
								label: "Verdana"
							}, {
								value: "Brush Script MT",
								label: "Brush Script MT"
							}																		
							];
	var vImageSizeGlobal = [ {
						value: "auto",
						label: "Original size"
					}, {
						value: "100% 100%",
						label: "Always fit"
					}, {
						value: "cover",
						label: "Fit to width"
					}, {
						value: "contain",
						label: "Fit to height"
					}, {
						value: "100%",
						label: "Stretch to fit"
					}, {
						value: "Manual",
						label: "Manual"
					}
					];
	var vImageSize = [ {
						value: "auto",
						label: "Original size"
					}, {
						value: "100% 100%",
						label: "Always fit"
					}, {
						value: "cover",
						label: "Fit to width"
					}, {
						value: "contain",
						label: "Fit to height"
					}, {
						value: "100%",
						label: "Stretch to fit"
					}
					];
	var vColumnsWidth = [ {
							value: "Original Size",
							label: "Original size"
						}, {
							value: "05",
							label: "5%"
						}, {
							value: "10",
							label: "10%"
						}, {
							value: "8",
							label: "12.5%"
						}, {
							value: "7",
							label: "14.25%"
						}, {
							value: "6",
							label: "16.67%"
						}, {
							value: "5",
							label: "20%"
						}, {
							value: "4",
							label: "25%"
						}, {
							value: "30",
							label: "30%"
						}, {
							value: "3",
							label: "33.33%"
						}, {
							value: "40",
							label: "40%"
						}, {
							value: "45",
							label: "45%"
						}, {
							value: "47",
							label: "47.5%"
						}, {
							value: "2",
							label: "50%"
						}, {
							value: "66",
							label: "66.67%"
						}, {
							value: "75",
							label: "75%"
						}, {
							value: "80",
							label: "80%"
						}, {
							value: "83",
							label: "83.33%"
						}, {
							value: "85",
							label: "85.75%"
						}, {
							value: "87",
							label: "87.5%"
						}, {
							value: "1",
							label: "100%"
						}
						];
	
	var vColorOptions = [					
					{value: "rgb(240,248,255)",label: "aliceblue"},
					{value: "rgb(250,235,215)",label: "antiquewhite"},
					{value: "rgb(0,255,255)",label: "aqua"},
					{value: "rgb(127,255,212)",label: "aquamarine"},
					{value: "rgb(1240,255,255)",label: "azure"},
					{value: "rgb(245,245,220)",label: "beige"},
					{value: "rgb(255,228,196)",label: "bisque"},
					{value: "rgb(0,0,0)",label: "black"},
					{value: "rgb(255,235,205)",label: "blanchedalmond"},
					{value: "rgb(0,0,255)",label: "blue"},
					{value: "rgb(138,43,226)",label: "blueviolet"},
					{value: "rgb(165,42,42)",label: "brown"},
					{value: "rgb(222,184,135)",label: "burlywood"},
					{value: "rgb(95,158,160)",label: "cadetblue"},
					{value: "rgb(95,158,160)",label: "chartreuse"},
					{value: "rgb(210,105,30)",label: "chocolate"},
					{value: "rgb(255,127,80)",label: "coral"},
					{value: "rgb(100,149,237)",label: "cornflowerblue"},
					{value: "rgb(255,248,220)",label: "cornsilk"},
					{value: "rgb(220,20,60)",label: "crimson"},
					{value: "rgb(0,255,255)",label: "cyan"},
					{value: "rgb(0,0,139)",label: "darkblue"},
					{value: "rgb(0,139,139)",label: "darkcyan"},
					{value: "rgb(184,134,11)",label: "darkgoldenrod"},
					{value: "rgb(169,169,169)",label: "darkgray"},
					{value: "rgb(0,100,0)",label: "darkgreen"},
					{value: "rgb(189,183,107)",label: "darkkhaki"},
					{value: "rgb(139,0,139)",label: "darkmagenta"},
					{value: "rgb(85,107,47)",label: "darkolivegreen"},
					{value: "rgb(255,140,0)",label: "darkorange"},
					{value: "rgb(153,50,204)",label: "darkorchid"},
					{value: "rgb(139,0,0)",label: "darkred"},
					{value: "rgb(233,150,122)",label: "darksalmon"},
					{value: "rgb(143,188,143)",label: "darkseagreen"},
					{value: "rgb(72,61,139)",label: "darkslateblue"},
					{value: "rgb(47,79,79)",label: "darkslategray"},
					{value: "rgb(0,206,209)",label: "darkturquoise"},
					{value: "rgb(148,0,211)",label: "darkviolet"},
					{value: "rgb(255,20,147)",label: "deeppink"},
					{value: "rgb(0,191,255)",label: "deepskyblue"},
					{value: "rgb(0,191,255)",label: "dimgray"},
					{value: "rgb(30,144,255)",label: "dodgerblue"},
					{value: "rgb(178,34,34)",label: "firebrick"},
					{value: "rgb(255,250,240)",label: "floralwhite"},
					{value: "rgb(34,139,34)",label: "forestgreen"},
					{value: "rgb(255,0,255)",label: "fuchsia"},
					{value: "rgb(220,220,220)",label: "gainsboro"},
					{value: "rgb(248,248,255)",label: "ghostwhite"},
					{value: "rgb(255,215,0)",label: "gold"},
					{value: "rgb(218,165,32)",label: "goldenrod"},
					{value: "rgb(127,127,127)",label: "gray"},
					{value: "rgb(0,128,0)",label: "green"},
					{value: "rgb(173,255,47)",label: "greenyellow"},
					{value: "rgb(240,255,240)",label: "honeydew"},
					{value: "rgb(255,105,180)",label: "hotpink"},
					{value: "rgb(205,92,92)",label: "indianred"},
					{value: "rgb(75,0,130)",label: "indigo"},
					{value: "rgb(255,255,240)",label: "ivory"},
					{value: "rgb(240,230,140)",label: "khaki"},
					{value: "rgb(230,230,250)",label: "lavender"},
					{value: "rgb(255,240,245)",label: "lavenderblush"},
					{value: "rgb(124,252,0)",label: "lawngreen"},
					{value: "rgb(255,250,205)",label: "lemonchiffon"},
					{value: "rgb(173,216,230)",label: "lightblue"},
					{value: "rgb(240,128,128)",label: "lightcoral"},
					{value: "rgb(224,255,255)",label: "lightcyan"},
					{value: "rgb(250,250,210)",label: "lightgoldenrodyellow"},
					{value: "rgb(144,238,144)",label: "lightgreen"},
					{value: "rgb(211,211,211)",label: "lightgrey"},
					{value: "rgb(255,182,193)",label: "lightpink"},
					{value: "rgb(255,160,122)",label: "lightsalmon"},
					{value: "rgb(32,178,170)",label: "lightseagreen"},
					{value: "rgb(135,206,250)",label: "lightskyblue"},
					{value: "rgb(119,136,153)",label: "lightslategray"},
					{value: "rgb(176,196,222)",label: "lightsteelblue"},
					{value: "rgb(255,255,224)",label: "lightyellow"},
					{value: "rgb(0,255,0)",label: "lime"},
					{value: "rgb(50,205,50)",label: "limegreen"},
					{value: "rgb(250,240,230)",label: "linen"},
					{value: "rgb(255,0,255)",label: "magenta"},
					{value: "rgb(128,0,0)",label: "maroon"},
					{value: "rgb(102,205,170)",label: "mediumaquamarine"},
					{value: "rgb(0,0,205)",label: "mediumblue"},
					{value: "rgb(186,85,211)",label: "mediumorchid"},
					{value: "rgb(147,112,219)",label: "mediumpurple"},
					{value: "rgb(60,179,113)",label: "mediumseagreen"},
					{value: "rgb(123,104,238)",label: "mediumslateblue"},
					{value: "rgb(0,250,154)",label: "mediumspringgreen"},
					{value: "rgb(72,209,204)",label: "mediumturquoise"},
					{value: "rgb(199,21,133)",label: "mediumvioletred"},
					{value: "rgb(25,25,112)",label: "midnightblue"},
					{value: "rgb(245,255,250)",label: "mintcream"},
					{value: "rgb(255,228,225)",label: "mistyrose"},
					{value: "rgb(255,228,181)",label: "moccasin"},
					{value: "rgb(255,222,173)",label: "navajowhite"},
					{value: "rgb(0,0,128)",label: "navy"},
					{value: "rgb(159,175,223)",label: "navyblue"},
					{value: "rgb(253,245,230)",label: "oldlace"},
					{value: "rgb(128,128,0)",label: "olive"},
					{value: "rgb(107,142,35)",label: "olivedrab"},
					{value: "rgb(255,165,0)",label: "orange"},
					{value: "rgb(255,69,0)",label: "orangered"},
					{value: "rgb(218,112,214)",label: "orchid"},
					{value: "rgb(238,232,170)",label: "palegoldenrod"},
					{value: "rgb(152,251,152)",label: "palegreen"},
					{value: "rgb(175,238,238)",label: "paleturquoise"},
					{value: "rgb(219,112,147)",label: "palevioletred"},
					{value: "rgb(255,239,213)",label: "papayawhip"},
					{value: "rgb(255,218,185)",label: "peachpuff"},
					{value: "rgb(205,133,63)",label: "peru"},
					{value: "rgb(255,192,203)",label: "pink"},
					{value: "rgb(221,160,221)",label: "plum"},
					{value: "rgb(176,224,230)",label: "powderblue"},
					{value: "rgb(128,0,128)",label: "purple"},
					{value: "rgb(255,0,0)",label: "red"},
					{value: "rgb(188,143,143)",label: "rosybrown"},
					{value: "rgb(65,105,225)",label: "royalblue"},
					{value: "rgb(139,69,19)",label: "saddlebrown"},
					{value: "rgb(250,128,114)",label: "salmon"},
					{value: "rgb(244,164,96)",label: "sandybrown"},
					{value: "rgb(46,139,87)",label: "seagreen"},
					{value: "rgb(255,245,238)",label: "seashell"},
					{value: "rgb(160,82,45)",label: "sienna"},
					{value: "rgb(192,192,192)",label: "silver"},
					{value: "rgb(135,206,235)",label: "skyblue"},
					{value: "rgb(106,90,205)",label: "slateblue"},
					{value: "rgb(112,128,144)",label: "slategray"},
					{value: "rgb(255,250,250)",label: "snow"},
					{value: "rgb(0,255,127)",label: "springgreen"},
					{value: "rgb(70,130,180)",label: "steelblue"},
					{value: "rgb(210,180,140)",label: "tan"},
					{value: "rgb(0,128,128)",label: "teal"},
					{value: "rgb(216,191,216)",label: "thistle"},
					{value: "rgb(255,99,71)",label: "tomato"},
					{value: "transparent",label: "transparent"},
					{value: "rgb(64,224,208)",label: "turquoise"},
					{value: "rgb(238,130,238)",label: "violet"},
					{value: "rgb(245,222,179)",label: "wheat"},
					{value: "rgb(255,255,255)",label: "white"},
					{value: "rgb(245,245,245)",label: "whitesmoke"},
					{value: "rgb(255,255,0)",label: "yellow"},
					{value: "rgb(139,205,50)",label: "yellowgreen"}
					];
	
	
  //General Settings
  	var infogtabs = {		
		ref: "infogtabs",
		type: "number",
		component: "dropdown",
		label: "Number of Tabs",
		options: numberOfTabs,
		defaultValue: 4	  
    };
    var defaultImagesPath = {
		ref : "defaultImagesPath",
		label : "Default Images Path",
		type : "string",
		defaultValue : eval('"' + currentLocationP.substring(0, nposP) + '/content/Default/"')											
	};
	
    var boolglobalbackground = {
		ref : "boolglobalbackground",
		type : "boolean",
		component : "switch",
		label : "Set Global Background",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false
	};
    var backgroundcolorglobal = {
	  ref: "backgroundcolorglobal",
	  type: "string",
	  component: "dropdown",
	  label: "Background Color Global",
	  options: vColorOptions,
	  defaultValue: "rgb(225,90,37)",
	  show : function(data) {
			return data.boolglobalbackground;
		}								  							  
    };
    var backgroundimageopacity = {
		type: "number",
		component: "slider",
		label: "Opacity",
		ref: "backgroundimageopacity",
		min: 0,
		max: 1,
		step: 0.05,
		defaultValue: 0.9,
		show : function(data) {
			return  data.boolglobalbackground;
		}
	};	
    var boolglobaldynamicimage = {
		ref : "boolglobaldynamicimage",
		type : "boolean",
		component : "switch",
		label : "Use Dimension Images",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false,
		show : function(data) {
			return data.boolglobalbackground;
		}
	};
	/*
	var globaldynamicimagedim = {
		ref: "globaldynamicimagedim",
		type: "string",
		component: "dropdown",
		label: "Chose a Dimension",
		options: function () {
			return getMasterDimensionList().then( function ( items ) {
				return items;
			} );
		},										
		show : function(data) {
			return data.boolglobalbackground && data.boolglobaldynamicimage;
		}							  	
	};*/
	var path_img_app_or_extension = {
		ref: "path_img_app_or_extension",
		translation: "Image Origin",
		type: "string",
		component: "buttongroup",
		options: [ {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/appcontent/' + app.id + '/"'),
			label: "App"
		}, {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/content/Default/"'),
			label: "Default"
		}, {
			value: "/Extensions/Infographics/img/Dim/",
			label: "Extension"
		}],
		defaultValue: "/Extensions/Infographics/img/Dim/",
		show : function(data) {
			return data.boolglobalbackground && data.boolglobaldynamicimage;
		}								
	};
	var globaldynamicimagedimExtension = {
		ref : "globaldynamicimagedimExtension",
		label : "Images extension (jpg,png,gif...)",
		type : "string",
		defaultValue : "png",
		show : function(data) {
			return data.boolglobalbackground && data.boolglobaldynamicimage;
		}									
	};
    var backgroundimage = {
		label:"Background Image",
		component: "media",
		ref: "backgroundimage",
		layoutRef: "backgroundimage",
		type: "string",
		show : function(data) {
			return data.boolglobalbackground && !data.boolglobaldynamicimage;
		}
	};
		
	var backgroundimagesize = {
	  ref: "backgroundimagesize",
	  type: "string",
	  component: "dropdown",
	  label: "Sizing",
	  options: vImageSizeGlobal,
	  	defaultValue: "auto",
	  	show : function(data) {
			return data.boolglobalbackground;
		}							  
    };
    var backgroundimagesizemanual = {
		type: "number",
		component: "slider",
		label: "Manual image sizing",
		ref: "backgroundimagesizemanual",
		min: 0,
		max: 400,
		step: 5,
		defaultValue: 80,
		show : function(data) {
			return  data.boolglobalbackground && data.backgroundimagesize == 'Manual';
		}
	};		
	var backgroundalignglobal = {
		type:"string",
		component:"align-matrix",
		icon:!0,
		horizontal:!0,
		label:"Position",
		translation:"Position",
		ref:"backgroundalignglobal",
		defaultValue:"centerLeft",
		show : function(data) {
			return data.boolglobalbackground;
		}
	};
	// Second Global Image
	var boolglobalimageSec = {
		ref : "boolglobalimageSec",
		type : "boolean",
		component : "switch",
		label : "Add 2nd image",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false,
		show : function(data) {
			return data.boolglobalbackground;
		}
	};		
	/*var backgroundimageopacitysec = {
		type: "number",
		component: "slider",
		label: "Opacity",
		ref: "backgroundimageopacitysec",
		min: 0,
		max: 1,
		step: 0.05,
		defaultValue: 0.9,
		show : function(data) {
			return  data.boolglobalbackground && data.boolglobalimageSec;
		}
	};	*/
	var boolglobaldynamicimageSec = {
		ref : "boolglobaldynamicimageSec",
		type : "boolean",
		component : "switch",
		label : "Use Dimension Images2",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false,
		show : function(data) {
			return data.boolglobalbackground && data.boolglobalimageSec;
		}
	};
	var path_img_app_or_extensionSec = {
		ref: "path_img_app_or_extensionSec",
		translation: "Image Origin",
		type: "string",
		component: "buttongroup",
		options: [ {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/appcontent/' + app.id + '/"'),
			label: "App"
		}, {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/content/Default/"'),
			label: "Default"
		}, {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/Extensions/Infographics/img/Dim/"'),
			label: "Extension"
		}],
		defaultValue: eval('"' + currentLocationP.substring(0, nposP) + '/Extensions/Infographics/img/Dim/"'),
		show : function(data) {
			return data.boolglobalbackground && data.boolglobalimageSec && data.boolglobaldynamicimageSec;
		}								
	};
	var globaldynamicimagedimExtensionSec = {
		ref : "globaldynamicimagedimExtensionSec",
		label : "Images extension (jpg,png,gif...)",
		type : "string",
		defaultValue : "png",
		show : function(data) {
			return data.boolglobalbackground && data.boolglobalimageSec && data.boolglobaldynamicimageSec;
		}									
	};
    var backgroundimageSec = {
		label:"Background Image",
		component: "media",
		ref: "backgroundimageSec",
		layoutRef: "backgroundimageSec",
		type: "string",
		show : function(data) {
			return data.boolglobalbackground && data.boolglobalimageSec && !data.boolglobaldynamicimageSec;
		}
	};
	var backgroundimagesizeSec = {
	  ref: "backgroundimagesizeSec",
	  type: "string",
	  component: "dropdown",
	  label: "Sizing",
	  options: vImageSizeGlobal,
	  	defaultValue: "auto",
	  	show : function(data) {
			return data.boolglobalbackground && data.boolglobalimageSec;
		}							  
    };
    var backgroundimagesizemanualSec = {
		type: "number",
		component: "slider",
		label: "Manual image sizing",
		ref: "backgroundimagesizemanualSec",
		min: 0,
		max: 400,
		step: 5,
		defaultValue: 80,
		show : function(data) {
			return  data.boolglobalbackground && data.boolglobalimageSec && data.backgroundimagesizeSec == 'Manual';
		}
	};		
	var backgroundalignglobalSec = {
		type:"string",
		component:"align-matrix",
		icon:!0,
		horizontal:!0,
		label:"Position",
		translation:"Position",
		ref:"backgroundalignglobalSec",
		defaultValue:"centerLeft",
		show : function(data) {
			return data.boolglobalbackground && data.boolglobalimageSec;
		}
	};
	//					
	var boolQSchartstextcolor = {
		ref : "boolQSchartstextcolor",
		type : "boolean",
		component : "switch",
		label : "Change QS Text Color",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false
	};
	var qschartstextcolor = {
	  ref: "qschartstextcolor",
	  type: "string",
	  component: "dropdown",
	  label: "Charts text color",
	  options:vColorOptions,
	  defaultValue: "rgb(255,255,255)",
	  show : function(data) {
			return data.boolQSchartstextcolor;
		}	
    };

    //Header
    var boolheader = {
		ref : "boolheader",
		type : "boolean",
		component : "switch",
		label : "Include a Header",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: true
	};
	var backgroundcolor1 = {
	  ref: "backgroundcolor1",
	  type: "string",
	  component: "dropdown",
	  label: "Background Color",
	  options:vColorOptions,
	  	defaultValue: "rgb(255,127,39)",
	  	show : function(data) {
			return data.boolheader;
		}							  
    };
    var boolbanner1 = {
		ref : "boolbanner1",
		type : "boolean",
		component : "switch",
		label : "Include a Banner",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false,
		show : function(data) {
			return data.boolheader;
		}
	};
	var banner1 = {
	  ref: "banner1",
	  type: "string",
	  component: "dropdown",
	  label: "Header Banner",
	  options: 
		[ {
			value: "BannerAirplane",
			label: "BannerAirplane"
		}, {
			value: "BannerBlack",
			label: "BannerBlack"
		}, {
			value: "BannerBlue",
			label: "BannerBlue"
		}, {
			value: "BannerGreen",
			label: "BannerGreen"
		}, {
			value: "BannerPink",
			label: "BannerPink"
		}, {
			value: "BannerSimpleBlack",
			label: "BannerSimpleBlack"
		}, {
			value: "BannerSimpleBlue",
			label: "BannerSimpleBlue"
		}, {
			value: "BannerSimpleRed",
			label: "BannerSimpleRed"
		}, {
			value: "BannerSimpleSoftGreen",
			label: "BannerSimpleSoftGreen"
		}, {
			value: "BannerSimpleWhite",
			label: "BannerSimpleWhite"
		}, {
			value: "BannerSimpleYellow",
			label: "BannerSimpleYellow"
		}, {
			value: "BannerYellow1",
			label: "BannerYellow1"
		}, {
			value: "BannerYellow2",
			label: "BannerYellow2"
		}, {
			value: "BannerYellow3",
			label: "BannerYellow3"
		}, {
			value: "BannerYellow4",
			label: "BannerYellow4"
		}, {
			value: "BannerYellow5",
			label: "BannerYellow5"
		}, {
			value: "BannerYellow6",
			label: "BannerYellow6"
		}, {
			value: "BannerYellow7",
			label: "BannerYellow7"
		}, {
			value: "BannerYellow8",
			label: "BannerYellow8"
		}, {
			value: "BannerYellow9",
			label: "BannerYellow9"
		}, {
			value: "BannerYellow10",
			label: "BannerYellow10"
		}, {
			value: "SurveyOrange",
			label: "SurveyOrange"
		}	
		],
	  	defaultValue: "BannerBlack",
	  	show : function(data) {
			return data.boolbanner1 && data.boolheader;
		}							  
    };
	var banner1slider = {
		type: "number",
		component: "slider",
		label: "Banner padding left",
		ref: "banner1slider",
		min: 0,
		max: 40,
		step: 5,
		defaultValue: 30,
		show : function(data) {
			return  data.boolheader;
		}
	};							
	var bannerwidth = {
		type: "number",
		component: "slider",
		label: "Banner Width",
		ref: "bannerwidth",
		min: 0,
		max: 100,
		step: 5,
		defaultValue: 50,
		show : function(data) {
			return  data.boolheader;
		}
	};
	var title1 = {
		ref : "title1",
		label : "Title", expression : "optional",
		type : "string",
		defaultValue : 'Hello World!',		
		show : function(data) {
			return data.boolheader;
		}		
	};
	var text1slider = {
		type: "number",
		component: "slider",
		label: "Text padding left",
		ref: "text1slider",
		min: 0,
		max: 40,
		step: 5,
		defaultValue: 10,
		show : function(data) {
			return  data.boolheader;
		}
	};
	var FontFamily1 = {
	  ref: "FontFamily1",
	  type: "string",
	  component: "dropdown",
	  label: "FontFamily",
	  options: optionsFontFamily,
	  defaultValue: "QlikView Sans",
	  show : function(data) {
			return data.boolheader;
		}								  
    };
	var lettersize1 = {
		ref: "lettersize1",
		translation: "Font Size",
		type: "number",
		component: "buttongroup",
		options: [ {
			value: 20,
			label: "Small"
		}, {
			value: 24,
			label: "Medium"
		}, { 
			value: 30,
			label: "Large"
		}],
		defaultValue: 24,
		show : function(data) {
			return data.boolheader;
		}								
	};	
	var TitleTextColor1 = {
	  ref: "TitleTextColor1",
	  type: "string",
	  component: "dropdown",
	  label: "Title Text Color",
	  options:vColorOptions,
	  defaultValue: "White",
	  show : function(data) {
			return data.boolheader;
		}	
    };
    var booltitle2 = {
		ref : "booltitle2",
		type : "boolean",
		component : "switch",
		label : "Include a 2nd Title",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],		
		defaultValue: false,
		show : function(data) {
			return data.boolheader;
		}		
	};
    var title2 = {
		ref : "title2",
		label : "Title 2",
		type : "string",
		defaultValue : '',
		show : function(data) {
			return data.boolheader && data.booltitle2;
		},
		expression: "optional"								
	};
	var FontFamily2 = {
	  ref: "FontFamily2",
	  type: "string",
	  component: "dropdown",
	  label: "FontFamily 2",
	  options: optionsFontFamily,
	  defaultValue: "QlikView Sans",
	  show : function(data) {
			return data.boolheader && data.booltitle2;
		}								  
    };
	var lettersize2 = {
		ref: "lettersize2",
		translation: "Font Size 2",
		type: "number",
		component: "buttongroup",
		options: [ {
			value: 20,
			label: "Small"
		}, {
			value: 24,
			label: "Medium"
		}, { 
			value: 30,
			label: "Large"
		}],
		defaultValue: 20,
		show : function(data) {
			return data.boolheader && data.booltitle2;
		}								
	};	
	var TitleTextColor2 = {
	  ref: "TitleTextColor2",
	  type: "string",
	  component: "dropdown",
	  label: "Title Text Color",
	  options: vColorOptions,
	  defaultValue: "White",
	  show : function(data) {
			return data.boolheader && data.booltitle2;
		}	
    };
    var title2Leftslider = {
		type: "number",
		component: "slider",
		label: "Padding left",
		ref: "title2Leftslider",
		min: 0,
		max: 70,
		step: 5,
		defaultValue: 50,
		show : function(data) {
			return data.boolheader && data.booltitle2;
		}
	};			
	var title2Topslider = {
	  ref: "title2Topslider",
	  type: "number",
	  component: "dropdown",
	  label: "Padding top",
	  options: 
		[ {
			value: 5,
			label: '5%'
		}, {
			value: 10,
			label: '10%'
		}, {
			value: 15,
			label: '15%'
		}, {
			value: 20,
			label: '20%'
		}, {
			value: 25,
			label: '25%'
		}, {
			value: 30,
			label: '30%'
		}, {
			value: 35,
			label: '35%'
		}, {
			value: 40,
			label: '40%'
		}	
		],
	  defaultValue: 35,
	  show : function(data) {
			return data.boolheader && data.booltitle2;
		}
    };

    //Trellis			
    var NumberOfColumnsTrellis = {
		ref: "NumberOfColumnsTrellis",
		type: "string",
		component: "dropdown",
		label: "Number of Columns",
		options: NumberColsTrellis,
		defaultValue : "col4"		
	}; 
	var NumberOfRowsTrellis  = {
	    ref: "NumberOfRowsTrellis",
	    type: "string",
	    component: "dropdown",
	    label: "Number of Rows",
	    options: 
			[ {
				value: "_600",
				label: "1"
			}, {
				value: "_300",
				label: "2"
			}],
	  	defaultValue: "_300"	  
	};	
	var ChartTrellisType = {
		ref: "ChartTrellisType",
		type: "string",
		component: "dropdown",
		label: "Chose a Chart",
		options: chartTypes,
		defaultValue : "barchart"		
	};
			
	var ChartTrellisDim = {
		ref: "ChartTrellisDim",
		type: "string",
		component: "dropdown",
		label: "Chose a Dimension",
		options: function () {
			return getMasterDimensionList().then( function ( items ) {
				return items;
			} );
		},
		show : function(data) {
			return data.ChartTrellisType != 'kpi' && data.ChartTrellisType != 'gauge';
		}
	};
	var ChartTrellisDim2 = {
		ref: "ChartTrellisDim2",
		type: "string",
		component: "dropdown",
		label: "Chose a Dimension",
		options: function () {
			return getMasterDimensionList().then( function ( items ) {
				return items;
			} );
		},
		show : function(data) {
			return (data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'table' ||data.ChartTrellisType == 'treemap') && data.ChartTrellisDim;
		}
	};
	var boolHelpLoopExpressions = {
		ref : "boolHelpLoopExpressions",
		type : "boolean",
		component : "switch",
		label : "Trellis loop",
		options: [{
			value: true,
			label: "Custom"
		}, {
			value: false,
			label: "Auto"
		}],
		defaultValue: false		
	};
	var symHelpLoopExpressions = {
		ref: "symHelpLoopExpressions",
		type: "string",
		label: "Replace that symbol",
		defaultValue : "?",
		show : function(data) {
			return data.boolHelpLoopExpressions;
		}
	};
	var ChartTrellisMeas1 = {
		ref: "ChartTrellisMeas1",
		type: "string",
		label: "Expression1 (don't start with =)",
		defaultValue : "",
		expression: "optional"
	};
	var LabelTrellisMeas1 = {
		ref: "LabelTrellisMeas1",
		type: "string",
		label: "Label Expression1",
		defaultValue : "",
		expression: "optional"
	};
	var numberFormatExpr1Type  = {
	    ref: "numberFormatExpr1Type",
	    type: "string",
	    component: "dropdown",
	    label: "Number formatting",
	    options: 
			[ {
				value: "auto",
				label: "auto"
			}, {
				value: "custom",
				label: "custom"
			}],
	  	defaultValue: "auto"	  
	};
	var numberFormatExpr1Dec = {
		ref: "numberFormatExpr1Dec",
		type: "integer",
		label: "Number of decimals",
		defaultValue : 2,
		expression: "optional",
		show : function(data) {
			return data.numberFormatExpr1Type == 'custom';
		}
	};
	var numberFormatExpr1Thou = {
	    ref: "numberFormatExpr1Thou",
	    type: "string",
	    component: "dropdown",
	    label: "Thousands as",
	    options: 
			[ {
				value: ",",
				label: ","
			}, {
				value: ".",
				label: "."
			}],
	  	defaultValue: ",",
	  	show : function(data) {
			return data.numberFormatExpr1Type == 'custom';
		}  
	};
	var numberFormatExpr1Sym = {
		ref: "numberFormatExpr1Sym",
		type: "string",
		label: "End symbol (%,€,$...)",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.numberFormatExpr1Type == 'custom';
		}
	};
	var TypeColorMeas1 = {
	    ref: "TypeColorMeas1",
	    type: "string",
	    component: "dropdown",
	    label: "Colors Custom",
	    options: vTypeColor,
	    defaultValue: "singleColor",
	    show : function(data) {
			return data.ChartTrellisType != 'kpi' && data.ChartTrellisType != 'gauge' && data.ChartTrellisType != 'table';
		}  						
    };    	
	var ExpressionColorMeas1 = {
		ref: "ExpressionColorMeas1",
		type: "string",
		label: "Color Expression",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.TypeColorMeas1 == 'byExpression' && data.ChartTrellisType != 'kpi' && data.ChartTrellisType != 'gauge' && data.ChartTrellisType != 'table';
		}
	};
	var SingleColorMeas1 = {
		ref: "SingleColorMeas1",
		label: "Color",
		type: "object",  
		component: "color-picker",  
		defaultValue: {  
			index: 3,  
			color: "#4477aa"  
		},
		show : function(data) {
			return data.TypeColorMeas1 == 'singleColor' && data.ChartTrellisType != 'kpi' && data.ChartTrellisType != 'gauge' && data.ChartTrellisType != 'table';
		}
	};
	var ChartTrellisMeas2 = {
		ref: "ChartTrellisMeas2",
		type: "string",
		label: "Expression2 (don't start with =)",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table';
		}
	};	
	var LabelTrellisMeas2 = {
		ref: "LabelTrellisMeas2",
		type: "string",
		label: "Label Expression2",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.ChartTrellisMeas2 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}
	};
	var numberFormatExpr2Type  = {
	    ref: "numberFormatExpr2Type",
	    type: "string",
	    component: "dropdown",
	    label: "Number formatting",
	    options: 
			[ {
				value: "auto",
				label: "auto"
			}, {
				value: "custom",
				label: "custom"
			}],
	  	defaultValue: "auto",
	  	show : function(data) {
			return data.ChartTrellisMeas2 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}  
	};
	var numberFormatExpr2Dec = {
		ref: "numberFormatExpr2Dec",
		type: "integer",
		label: "Number of decimals",
		defaultValue : 2,
		expression: "optional",
		show : function(data) {
			return data.numberFormatExpr2Type == 'custom' && data.ChartTrellisMeas2 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}
	};
	var numberFormatExpr2Thou = {
	    ref: "numberFormatExpr2Thou",
	    type: "string",
	    component: "dropdown",
	    label: "Thousands as",
	    options: 
			[ {
				value: ",",
				label: ","
			}, {
				value: ".",
				label: "."
			}],
	  	defaultValue: ",",
	  	show : function(data) {
			return data.numberFormatExpr2Type == 'custom' && data.ChartTrellisMeas2 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}  
	};
	var numberFormatExpr2Sym = {
		ref: "numberFormatExpr2Sym",
		type: "string",
		label: "End symbol (%,€,$...)",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.numberFormatExpr2Type == 'custom' && data.ChartTrellisMeas2 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}
	};
	var ExpressionColorMeas2 = {
		ref: "ExpressionColorMeas2",
		type: "string",
		label: "Color Expression",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.TypeColorMeas1 == 'byExpression' && data.ChartTrellisMeas2 && data.ChartTrellisType == 'pivot-table';
		}
	};
	var SingleColorMeas2 = {
		ref: "SingleColorMeas2",
		label: "Color",
		type: "object",  
		component: "color-picker",  
		defaultValue: {  
			index: 3,  
			color: "#4477aa"  
		},
		show : function(data) {
			return data.TypeColorMeas1 == 'singleColor' && data.ChartTrellisMeas2 && data.ChartTrellisType == 'pivot-table';
		}
	};
	var ChartTrellisMeas3 = {
		ref: "ChartTrellisMeas3",
		type: "string",
		label: "Expression3 (don't start with =)",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.ChartTrellisType == 'barchart' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table';
		}
	};	
	var LabelTrellisMeas3 = {
		ref: "LabelTrellisMeas3",
		type: "string",
		label: "Label Expression3",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.ChartTrellisMeas3 && (data.ChartTrellisType == 'barchart' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}
	};
	var numberFormatExpr3Type  = {
	    ref: "numberFormatExpr3Type",
	    type: "string",
	    component: "dropdown",
	    label: "Number formatting",
	    options: 
			[ {
				value: "auto",
				label: "auto"
			}, {
				value: "custom",
				label: "custom"
			}],
	  	defaultValue: "auto",
	  	show : function(data) {
			return data.ChartTrellisMeas3 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}  
	};
	var numberFormatExpr3Dec = {
		ref: "numberFormatExpr3Dec",
		type: "integer",
		label: "Number of decimals",
		defaultValue : 2,
		expression: "optional",
		show : function(data) {
			return data.numberFormatExpr3Type == 'custom' && data.ChartTrellisMeas3 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}
	};
	var numberFormatExpr3Thou = {
	    ref: "numberFormatExpr3Thou",
	    type: "string",
	    component: "dropdown",
	    label: "Thousands as",
	    options: 
			[ {
				value: ",",
				label: ","
			}, {
				value: ".",
				label: "."
			}],
	  	defaultValue: ",",
	  	show : function(data) {
			return data.numberFormatExpr3Type == 'custom' && data.ChartTrellisMeas3 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}  
	};
	var numberFormatExpr3Sym = {
		ref: "numberFormatExpr3Sym",
		type: "string",
		label: "End symbol (%,€,$...)",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.numberFormatExpr3Type == 'custom' && data.ChartTrellisMeas3 && (data.ChartTrellisType == 'barchart' ||  data.ChartTrellisType == 'kpi' || data.ChartTrellisType == 'combochart' || data.ChartTrellisType == 'linechart' || data.ChartTrellisType == 'pivot-table' || data.ChartTrellisType == 'scatterplot' || data.ChartTrellisType == 'table');
		}
	};
	var ExpressionColorMeas3 = {
		ref: "ExpressionColorMeas3",
		type: "string",
		label: "Color Expression",
		defaultValue : "",
		expression: "optional",
		show : function(data) {
			return data.TypeColorMeas1 == 'byExpression' && data.ChartTrellisMeas3 && data.ChartTrellisType == 'pivot-table';
		}
	};
	var SingleColorMeas3 = {
		ref: "SingleColorMeas3",
		label: "Color",
		type: "object",  
		component: "color-picker",  
		defaultValue: {  
			index: 3,  
			color: "#4477aa"  
		},
		show : function(data) {
			return data.TypeColorMeas1 == 'singleColor' && data.ChartTrellisMeas3 && data.ChartTrellisType == 'pivot-table';
		}
	};
	var boolglobaldynamicimageTrellis = {
		ref : "boolglobaldynamicimageTrellis",
		type : "boolean",
		component : "switch",
		label : "Use Dynamic Images",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false		
	};
	var path_img_app_or_extensionTrellis = {
		ref: "path_img_app_or_extensionTrellis",
		translation: "Image Origin",
		type: "string",
		component: "buttongroup",
		options: [ {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/appcontent/' + app.id + '/"'),
			label: "App"
		}, {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/content/Default/"'),
			label: "Default"
		}, {
			value: eval('"' + currentLocationP.substring(0, nposP) + '/Extensions/Infographics/img/Dim/"'),
			label: "Extension"
		}],
		defaultValue: eval('"' + currentLocationP.substring(0, nposP) + '/Extensions/Infographics/img/Dim/"'),
		show : function(data) {
			return data.boolglobaldynamicimageTrellis;
		}								
	};
	var globaldynamicimagedimExtensionTrellis = {
		ref : "globaldynamicimagedimExtensionTrellis",
		label : "Images extension (jpg,png,gif...)",
		type : "string",
		defaultValue : "png",
		show : function(data) {
			return data.boolglobaldynamicimageTrellis;
		}									
	};	    								
	var backgroundimagesizeTrellis = {
	  ref: "backgroundimagesizeTrellis",
	  type: "string",
	  component: "dropdown",
	  label: "Sizing",
	  options: vImageSize,
	  	defaultValue: "contain",
	  	show : function(data) {
			return data.boolglobaldynamicimageTrellis;
		}						
    };
    var backgroundalignTrellis = {
		type:"string",
		component:"align-matrix",
		icon:!0,
		horizontal:!0,
		label:"Position",
		translation:"Position",
		ref:"backgroundalignTrellis",
		defaultValue:"centerLeft",
		show : function(data) {
			return data.boolglobaldynamicimageTrellis;
		}	
	};
			
        							    	
	//Rows
	for (var vTab = 1;vTab <= vMaxTabs;vTab++){
		window['ContainerHeightSize_' + vTab]  = {
			type: "number",
			component: "slider",
			label: "Height",
			ref: eval('"ContainerHeightSize_' + vTab + '"'),
			min: 10,
			max: 100,
			step: 5,
			defaultValue: 20
		};
		window['numberofrowcols' + vTab]  = {
		  ref: eval('"numberofrowcols' + vTab + '"'),
		  type: "number",
		  component: "dropdown",
		  label: "Number of Columns",
		  options: 
			[ {
				value: 1,
				label: 1
			}, {
				value: 2,
				label: 2
			}, {
				value: 3,
				label: 3
			}, {
				value: 4,
				label: 4
			}, {
				value: 5,
				label: 5
			}, {
				value: 6,
				label: 6
			}, {
				value: 7,
				label: 7
			}, {
				value: 8,
				label: 8
			}	
			],
		  defaultValue: 4	  
	    };    	
	    										
		window['backgroundcolor_' + vTab]  = {
		  ref: eval('"backgroundcolor_' + vTab +'"'),
		  type: "string",
		  component: "dropdown",
		  label: "Background Color",
		  options: vColorOptions,
		  defaultValue: "rgb(225,90,37)",
		  show : function(data) {
				return !data.boolglobalbackground;
			}								  						  
	    };
	    //row1 Cols		
			
		    var showCol11 = {
				ref : "showCol11",
				type : "boolean",
				component : "switch",
				label : "Show Col 1 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 1;
				}					
			};			
			var col11width = {
				ref: "col11width",
				type: "string",
				component: "dropdown",
				label: "Cell 1 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}
		    };
			var backgroundcolorCol11 = {
				ref: "backgroundcolorCol11",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}							  	
			};
			var backgroundimageCol11 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol11",
				layoutRef: "backgroundimageCol11",
				type: "string",
				show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}
			};
			var backgroundimagesizeCol11 = {
			  ref: "backgroundimagesizeCol11",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}							  
		    };
		    var backgroundalignCol11 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol11",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}
			};
			var textchartCol11 = {
				ref : "textchartCol11",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}
			};
			var circleCol11 = {
				ref : "circleCol11",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol11 && data.backgroundimageCol11 && data.numberofrowcols1 >= 1;
				}								
			};	
			var ChartCol11 = {
				ref: "ChartCol11",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol11 && data.textchartCol11 && data.numberofrowcols1 >= 1;
				}							  	
			};
			var labelCol11 = {
				ref : "labelCol11",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol11 && !data.textchartCol11 && data.numberofrowcols1 >= 1;
				}									
			};
			var labelPaddingTopCol11 = {
				ref : "labelPaddingTopCol11",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol11 && !data.textchartCol11 && data.numberofrowcols1 >= 1;
				}
			};
			var FontFamilyCol11 = {
			  	ref: "FontFamilyCol11",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol11 && !data.textchartCol11 && data.numberofrowcols1 >= 1;
				}								  
		    };
			var lettersizeCol11 = {
				ref: "lettersizeCol11",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol11 && !data.textchartCol11 && data.numberofrowcols1 >= 1;
				}								
			};	
			var TitleTextColorCol11 = {
			  ref: "TitleTextColorCol11",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol11 && data.numberofrowcols1 >= 1;
				}	
		    };

		    var showCol12 = {
				ref : "showCol12",
				type : "boolean",
				component : "switch",
				label : "Show Col 2 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 2;
				}					
			};			
			var col12width = {
				ref: "col12width",
				type: "string",
				component: "dropdown",
				label: "Cell 2 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}
		    };
			var backgroundcolorCol12 = {
				ref: "backgroundcolorCol12",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}							  	
			};
			var backgroundimageCol12 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol12",
				layoutRef: "backgroundimageCol12",
				type: "string",
				show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}
			};
			var backgroundimagesizeCol12 = {
			  ref: "backgroundimagesizeCol12",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}							  
		    };
		    var backgroundalignCol12 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol12",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}
			};
			var textchartCol12 = {
				ref : "textchartCol12",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}
			};
			var circleCol12 = {
				ref : "circleCol12",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol12 && data.backgroundimageCol12 && data.numberofrowcols1 >= 2;
				}								
			};	
			var ChartCol12 = {
				ref: "ChartCol12",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol12 && data.textchartCol12 && data.numberofrowcols1 >= 2;
				}							  	
			};
			var labelCol12 = {
				ref : "labelCol12",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol12 && !data.textchartCol12 && data.numberofrowcols1 >= 2;
				}									
			};
			var labelPaddingTopCol12 = {
				ref : "labelPaddingTopCol12",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol12 && !data.textchartCol12 && data.numberofrowcols1 >= 2;
				}
			};
			var FontFamilyCol12 = {
			  	ref: "FontFamilyCol12",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol12 && !data.textchartCol12 && data.numberofrowcols1 >= 2;
				}								  
		    };
			var lettersizeCol12 = {
				ref: "lettersizeCol12",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol12 && !data.textchartCol12 && data.numberofrowcols1 >= 2;
				}								
			};	
			var TitleTextColorCol12 = {
			  ref: "TitleTextColorCol12",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol12 && data.numberofrowcols1 >= 2;
				}	
		    };


		    			var showCol13 = {
				ref : "showCol13",
				type : "boolean",
				component : "switch",
				label : "Show Col 3 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 3;
				}					
			};			
			var col13width = {
				ref: "col13width",
				type: "string",
				component: "dropdown",
				label: "Cell 3 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}
		    };
			var backgroundcolorCol13 = {
				ref: "backgroundcolorCol13",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}							  	
			};
			var backgroundimageCol13 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol13",
				layoutRef: "backgroundimageCol13",
				type: "string",
				show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}
			};
			var backgroundimagesizeCol13 = {
			  ref: "backgroundimagesizeCol13",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}							  
		    };
		    var backgroundalignCol13 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol13",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}
			};
			var textchartCol13 = {
				ref : "textchartCol13",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}
			};
			var circleCol13 = {
				ref : "circleCol13",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol13 && data.backgroundimageCol13 && data.numberofrowcols1 >= 3;
				}								
			};	
			var ChartCol13 = {
				ref: "ChartCol13",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol13 && data.textchartCol13 && data.numberofrowcols1 >= 3;
				}							  	
			};
			var labelCol13 = {
				ref : "labelCol13",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol13 && !data.textchartCol13 && data.numberofrowcols1 >= 3;
				}									
			};
			var labelPaddingTopCol13 = {
				ref : "labelPaddingTopCol13",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol13 && !data.textchartCol13 && data.numberofrowcols1 >= 3;
				}
			};
			var FontFamilyCol13 = {
			  	ref: "FontFamilyCol13",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol13 && !data.textchartCol13 && data.numberofrowcols1 >= 3;
				}								  
		    };
			var lettersizeCol13 = {
				ref: "lettersizeCol13",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol13 && !data.textchartCol13 && data.numberofrowcols1 >= 3;
				}								
			};	
			var TitleTextColorCol13 = {
			  ref: "TitleTextColorCol13",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol13 && data.numberofrowcols1 >= 3;
				}	
		    };

		    			var showCol14 = {
				ref : "showCol14",
				type : "boolean",
				component : "switch",
				label : "Show Col 4 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 4;
				}					
			};			
			var col14width = {
				ref: "col14width",
				type: "string",
				component: "dropdown",
				label: "Cell 4 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}
		    };
			var backgroundcolorCol14 = {
				ref: "backgroundcolorCol14",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}							  	
			};
			var backgroundimageCol14 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol14",
				layoutRef: "backgroundimageCol14",
				type: "string",
				show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}
			};
			var backgroundimagesizeCol14 = {
			  ref: "backgroundimagesizeCol14",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}							  
		    };
		    var backgroundalignCol14 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol14",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}
			};
			var textchartCol14 = {
				ref : "textchartCol14",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}
			};
			var circleCol14 = {
				ref : "circleCol14",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol14 && data.backgroundimageCol14 && data.numberofrowcols1 >= 4;
				}								
			};	
			var ChartCol14 = {
				ref: "ChartCol14",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol14 && data.textchartCol14 && data.numberofrowcols1 >= 4;
				}							  	
			};
			var labelCol14 = {
				ref : "labelCol14",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol14 && !data.textchartCol14 && data.numberofrowcols1 >= 4;
				}									
			};
			var labelPaddingTopCol14 = {
				ref : "labelPaddingTopCol14",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol14 && !data.textchartCol14 && data.numberofrowcols1 >= 4;
				}
			};
			var FontFamilyCol14 = {
			  	ref: "FontFamilyCol14",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol14 && !data.textchartCol14 && data.numberofrowcols1 >= 4;
				}								  
		    };
			var lettersizeCol14 = {
				ref: "lettersizeCol14",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol14 && !data.textchartCol14 && data.numberofrowcols1 >= 4;
				}								
			};	
			var TitleTextColorCol14 = {
			  ref: "TitleTextColorCol14",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol14 && data.numberofrowcols1 >= 4;
				}	
		    };

		    			var showCol15 = {
				ref : "showCol15",
				type : "boolean",
				component : "switch",
				label : "Show Col 5 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 5;
				}					
			};			
			var col15width = {
				ref: "col15width",
				type: "string",
				component: "dropdown",
				label: "Cell 5 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}
		    };
			var backgroundcolorCol15 = {
				ref: "backgroundcolorCol15",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}							  	
			};
			var backgroundimageCol15 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol15",
				layoutRef: "backgroundimageCol15",
				type: "string",
				show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}
			};
			var backgroundimagesizeCol15 = {
			  ref: "backgroundimagesizeCol15",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}							  
		    };
		    var backgroundalignCol15 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol15",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}
			};
			var textchartCol15 = {
				ref : "textchartCol15",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}
			};
			var circleCol15 = {
				ref : "circleCol15",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol15 && data.backgroundimageCol15 && data.numberofrowcols1 >= 5;
				}								
			};	
			var ChartCol15 = {
				ref: "ChartCol15",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol15 && data.textchartCol15 && data.numberofrowcols1 >= 5;
				}							  	
			};
			var labelCol15 = {
				ref : "labelCol15",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol15 && !data.textchartCol15 && data.numberofrowcols1 >= 5;
				}									
			};
			var labelPaddingTopCol15 = {
				ref : "labelPaddingTopCol15",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol15 && !data.textchartCol15 && data.numberofrowcols1 >= 5;
				}
			};
			var FontFamilyCol15 = {
			  	ref: "FontFamilyCol15",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol15 && !data.textchartCol15 && data.numberofrowcols1 >= 5;
				}								  
		    };
			var lettersizeCol15 = {
				ref: "lettersizeCol15",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol15 && !data.textchartCol15 && data.numberofrowcols1 >= 5;
				}								
			};	
			var TitleTextColorCol15 = {
			  ref: "TitleTextColorCol15",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol15 && data.numberofrowcols1 >= 5;
				}	
		    };

		    			var showCol16 = {
				ref : "showCol16",
				type : "boolean",
				component : "switch",
				label : "Show Col 6 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 6;
				}					
			};			
			var col16width = {
				ref: "col16width",
				type: "string",
				component: "dropdown",
				label: "Cell 6 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}
		    };
			var backgroundcolorCol16 = {
				ref: "backgroundcolorCol16",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}							  	
			};
			var backgroundimageCol16 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol16",
				layoutRef: "backgroundimageCol16",
				type: "string",
				show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}
			};
			var backgroundimagesizeCol16 = {
			  ref: "backgroundimagesizeCol16",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}							  
		    };
		    var backgroundalignCol16 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol16",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}
			};
			var textchartCol16 = {
				ref : "textchartCol16",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}
			};
			var circleCol16 = {
				ref : "circleCol16",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol16 && data.backgroundimageCol16 && data.numberofrowcols1 >= 6;
				}								
			};	
			var ChartCol16 = {
				ref: "ChartCol16",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol16 && data.textchartCol16 && data.numberofrowcols1 >= 6;
				}							  	
			};
			var labelCol16 = {
				ref : "labelCol16",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol16 && !data.textchartCol16 && data.numberofrowcols1 >= 6;
				}									
			};
			var labelPaddingTopCol16 = {
				ref : "labelPaddingTopCol16",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol16 && !data.textchartCol16 && data.numberofrowcols1 >= 6;
				}
			};
			var FontFamilyCol16 = {
			  	ref: "FontFamilyCol16",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol16 && !data.textchartCol16 && data.numberofrowcols1 >= 6;
				}								  
		    };
			var lettersizeCol16 = {
				ref: "lettersizeCol16",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol16 && !data.textchartCol16 && data.numberofrowcols1 >= 6;
				}								
			};	
			var TitleTextColorCol16 = {
			  ref: "TitleTextColorCol16",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol16 && data.numberofrowcols1 >= 6;
				}	
		    };

		    			var showCol17 = {
				ref : "showCol17",
				type : "boolean",
				component : "switch",
				label : "Show Col 7 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 7;
				}					
			};			
			var col17width = {
				ref: "col17width",
				type: "string",
				component: "dropdown",
				label: "Cell 7 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}
		    };
			var backgroundcolorCol17 = {
				ref: "backgroundcolorCol17",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}							  	
			};
			var backgroundimageCol17 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol17",
				layoutRef: "backgroundimageCol17",
				type: "string",
				show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}
			};
			var backgroundimagesizeCol17 = {
			  ref: "backgroundimagesizeCol17",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}							  
		    };
		    var backgroundalignCol17 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol17",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}
			};
			var textchartCol17 = {
				ref : "textchartCol17",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}
			};
			var circleCol17 = {
				ref : "circleCol17",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol17 && data.backgroundimageCol17 && data.numberofrowcols1 >= 7;
				}								
			};	
			var ChartCol17 = {
				ref: "ChartCol17",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol17 && data.textchartCol17 && data.numberofrowcols1 >= 7;
				}							  	
			};
			var labelCol17 = {
				ref : "labelCol17",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol17 && !data.textchartCol17 && data.numberofrowcols1 >= 7;
				}									
			};
			var labelPaddingTopCol17 = {
				ref : "labelPaddingTopCol17",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol17 && !data.textchartCol17 && data.numberofrowcols1 >= 7;
				}
			};
			var FontFamilyCol17 = {
			  	ref: "FontFamilyCol17",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol17 && !data.textchartCol17 && data.numberofrowcols1 >= 7;
				}								  
		    };
			var lettersizeCol17 = {
				ref: "lettersizeCol17",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol17 && !data.textchartCol17 && data.numberofrowcols1 >= 7;
				}								
			};	
			var TitleTextColorCol17 = {
			  ref: "TitleTextColorCol17",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol17 && data.numberofrowcols1 >= 7;
				}	
		    };

		    			var showCol18 = {
				ref : "showCol18",
				type : "boolean",
				component : "switch",
				label : "Show Col 8 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols1 >= 8;
				}					
			};			
			var col18width = {
				ref: "col18width",
				type: "string",
				component: "dropdown",
				label: "Cell 8 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}
		    };
			var backgroundcolorCol18 = {
				ref: "backgroundcolorCol18",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}							  	
			};
			var backgroundimageCol18 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol18",
				layoutRef: "backgroundimageCol18",
				type: "string",
				show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}
			};
			var backgroundimagesizeCol18 = {
			  ref: "backgroundimagesizeCol18",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}							  
		    };
		    var backgroundalignCol18 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol18",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}
			};
			var textchartCol18 = {
				ref : "textchartCol18",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}
			};
			var circleCol18 = {
				ref : "circleCol18",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol18 && data.backgroundimageCol18 && data.numberofrowcols1 >= 8;
				}								
			};	
			var ChartCol18 = {
				ref: "ChartCol18",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol18 && data.textchartCol18 && data.numberofrowcols1 >= 8;
				}							  	
			};
			var labelCol18 = {
				ref : "labelCol18",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol18 && !data.textchartCol18 && data.numberofrowcols1 >= 8;
				}									
			};
			var labelPaddingTopCol18 = {
				ref : "labelPaddingTopCol18",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol18 && !data.textchartCol18 && data.numberofrowcols1 >= 8;
				}
			};
			var FontFamilyCol18 = {
			  	ref: "FontFamilyCol18",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol18 && !data.textchartCol18 && data.numberofrowcols1 >= 8;
				}								  
		    };
			var lettersizeCol18 = {
				ref: "lettersizeCol18",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol18 && !data.textchartCol18 && data.numberofrowcols1 >= 8;
				}								
			};	
			var TitleTextColorCol18 = {
			  ref: "TitleTextColorCol18",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol18 && data.numberofrowcols1 >= 8;
				}	
		    };

		 	//row cols 2
		 	var showCol21 = {
				ref : "showCol21",
				type : "boolean",
				component : "switch",
				label : "Show Col 1 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 1;
				}					
			};			
			var col21width = {
				ref: "col21width",
				type: "string",
				component: "dropdown",
				label: "Cell 1 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}
		    };
			var backgroundcolorCol21 = {
				ref: "backgroundcolorCol21",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}							  	
			};
			var backgroundimageCol21 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol21",
				layoutRef: "backgroundimageCol21",
				type: "string",
				show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}
			};
			var backgroundimagesizeCol21 = {
			  ref: "backgroundimagesizeCol21",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}							  
		    };
		    var backgroundalignCol21 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol21",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}
			};
			var textchartCol21 = {
				ref : "textchartCol21",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}
			};
			var circleCol21 = {
				ref : "circleCol21",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol21 && data.backgroundimageCol21 && data.numberofrowcols2 >= 1;
				}								
			};	
			var ChartCol21 = {
				ref: "ChartCol21",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol21 && data.textchartCol21 && data.numberofrowcols2 >= 1;
				}							  	
			};
			var labelCol21 = {
				ref : "labelCol21",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol21 && !data.textchartCol21 && data.numberofrowcols2 >= 1;
				}									
			};
			var labelPaddingTopCol21 = {
				ref : "labelPaddingTopCol21",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol21 && !data.textchartCol21 && data.numberofrowcols2 >= 1;
				}
			};
			var FontFamilyCol21 = {
			  	ref: "FontFamilyCol21",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol21 && !data.textchartCol21 && data.numberofrowcols2 >= 1;
				}								  
		    };
			var lettersizeCol21 = {
				ref: "lettersizeCol21",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol21 && !data.textchartCol21 && data.numberofrowcols2 >= 1;
				}								
			};	
			var TitleTextColorCol21 = {
			  ref: "TitleTextColorCol21",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol21 && data.numberofrowcols2 >= 1;
				}	
		    };

		    var showCol22 = {
				ref : "showCol22",
				type : "boolean",
				component : "switch",
				label : "Show Col 2 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 2;
				}					
			};			
			var col22width = {
				ref: "col22width",
				type: "string",
				component: "dropdown",
				label: "Cell 2 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}
		    };
			var backgroundcolorCol22 = {
				ref: "backgroundcolorCol22",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}							  	
			};
			var backgroundimageCol22 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol22",
				layoutRef: "backgroundimageCol22",
				type: "string",
				show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}
			};
			var backgroundimagesizeCol22 = {
			  ref: "backgroundimagesizeCol22",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}							  
		    };
		    var backgroundalignCol22 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol22",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}
			};
			var textchartCol22 = {
				ref : "textchartCol22",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}
			};
			var circleCol22 = {
				ref : "circleCol22",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol22 && data.backgroundimageCol22 && data.numberofrowcols2 >= 2;
				}								
			};	
			var ChartCol22 = {
				ref: "ChartCol22",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol22 && data.textchartCol22 && data.numberofrowcols2 >= 2;
				}							  	
			};
			var labelCol22 = {
				ref : "labelCol22",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol22 && !data.textchartCol22 && data.numberofrowcols2 >= 2;
				}									
			};
			var labelPaddingTopCol22 = {
				ref : "labelPaddingTopCol22",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol22 && !data.textchartCol22 && data.numberofrowcols2 >= 2;
				}
			};
			var FontFamilyCol22 = {
			  	ref: "FontFamilyCol22",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol22 && !data.textchartCol22 && data.numberofrowcols2 >= 2;
				}								  
		    };
			var lettersizeCol22 = {
				ref: "lettersizeCol22",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol22 && !data.textchartCol22 && data.numberofrowcols2 >= 2;
				}								
			};	
			var TitleTextColorCol22 = {
			  ref: "TitleTextColorCol22",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol22 && data.numberofrowcols2 >= 2;
				}	
		    };


		    			var showCol23 = {
				ref : "showCol23",
				type : "boolean",
				component : "switch",
				label : "Show Col 3 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 3;
				}					
			};			
			var col23width = {
				ref: "col23width",
				type: "string",
				component: "dropdown",
				label: "Cell 3 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}
		    };
			var backgroundcolorCol23 = {
				ref: "backgroundcolorCol23",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}							  	
			};
			var backgroundimageCol23 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol23",
				layoutRef: "backgroundimageCol23",
				type: "string",
				show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}
			};
			var backgroundimagesizeCol23 = {
			  ref: "backgroundimagesizeCol23",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}							  
		    };
		    var backgroundalignCol23 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol23",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}
			};
			var textchartCol23 = {
				ref : "textchartCol23",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}
			};
			var circleCol23 = {
				ref : "circleCol23",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol23 && data.backgroundimageCol23 && data.numberofrowcols2 >= 3;
				}								
			};	
			var ChartCol23 = {
				ref: "ChartCol23",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol23 && data.textchartCol23 && data.numberofrowcols2 >= 3;
				}							  	
			};
			var labelCol23 = {
				ref : "labelCol23",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol23 && !data.textchartCol23 && data.numberofrowcols2 >= 3;
				}									
			};
			var labelPaddingTopCol23 = {
				ref : "labelPaddingTopCol23",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol23 && !data.textchartCol23 && data.numberofrowcols2 >= 3;
				}
			};
			var FontFamilyCol23 = {
			  	ref: "FontFamilyCol23",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol23 && !data.textchartCol23 && data.numberofrowcols2 >= 3;
				}								  
		    };
			var lettersizeCol23 = {
				ref: "lettersizeCol23",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol23 && !data.textchartCol23 && data.numberofrowcols2 >= 3;
				}								
			};	
			var TitleTextColorCol23 = {
			  ref: "TitleTextColorCol23",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol23 && data.numberofrowcols2 >= 3;
				}	
		    };

		    			var showCol24 = {
				ref : "showCol24",
				type : "boolean",
				component : "switch",
				label : "Show Col 4 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 4;
				}					
			};			
			var col24width = {
				ref: "col24width",
				type: "string",
				component: "dropdown",
				label: "Cell 4 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}
		    };
			var backgroundcolorCol24 = {
				ref: "backgroundcolorCol24",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}							  	
			};
			var backgroundimageCol24 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol24",
				layoutRef: "backgroundimageCol24",
				type: "string",
				show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}
			};
			var backgroundimagesizeCol24 = {
			  ref: "backgroundimagesizeCol24",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}							  
		    };
		    var backgroundalignCol24 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol24",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}
			};
			var textchartCol24 = {
				ref : "textchartCol24",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}
			};
			var circleCol24 = {
				ref : "circleCol24",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol24 && data.backgroundimageCol24 && data.numberofrowcols2 >= 4;
				}								
			};	
			var ChartCol24 = {
				ref: "ChartCol24",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol24 && data.textchartCol24 && data.numberofrowcols2 >= 4;
				}							  	
			};
			var labelCol24 = {
				ref : "labelCol24",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol24 && !data.textchartCol24 && data.numberofrowcols2 >= 4;
				}									
			};
			var labelPaddingTopCol24 = {
				ref : "labelPaddingTopCol24",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol24 && !data.textchartCol24 && data.numberofrowcols2 >= 4;
				}
			};
			var FontFamilyCol24 = {
			  	ref: "FontFamilyCol24",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol24 && !data.textchartCol24 && data.numberofrowcols2 >= 4;
				}								  
		    };
			var lettersizeCol24 = {
				ref: "lettersizeCol24",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol24 && !data.textchartCol24 && data.numberofrowcols2 >= 4;
				}								
			};	
			var TitleTextColorCol24 = {
			  ref: "TitleTextColorCol24",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol24 && data.numberofrowcols2 >= 4;
				}	
		    };

		    			var showCol25 = {
				ref : "showCol25",
				type : "boolean",
				component : "switch",
				label : "Show Col 5 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 5;
				}					
			};			
			var col25width = {
				ref: "col25width",
				type: "string",
				component: "dropdown",
				label: "Cell 5 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}
		    };
			var backgroundcolorCol25 = {
				ref: "backgroundcolorCol25",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}							  	
			};
			var backgroundimageCol25 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol25",
				layoutRef: "backgroundimageCol25",
				type: "string",
				show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}
			};
			var backgroundimagesizeCol25 = {
			  ref: "backgroundimagesizeCol25",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}							  
		    };
		    var backgroundalignCol25 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol25",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}
			};
			var textchartCol25 = {
				ref : "textchartCol25",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}
			};
			var circleCol25 = {
				ref : "circleCol25",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol25 && data.backgroundimageCol25 && data.numberofrowcols2 >= 5;
				}								
			};	
			var ChartCol25 = {
				ref: "ChartCol25",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol25 && data.textchartCol25 && data.numberofrowcols2 >= 5;
				}							  	
			};
			var labelCol25 = {
				ref : "labelCol25",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol25 && !data.textchartCol25 && data.numberofrowcols2 >= 5;
				}									
			};
			var labelPaddingTopCol25 = {
				ref : "labelPaddingTopCol25",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol25 && !data.textchartCol25 && data.numberofrowcols2 >= 5;
				}
			};
			var FontFamilyCol25 = {
			  	ref: "FontFamilyCol25",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol25 && !data.textchartCol25 && data.numberofrowcols2 >= 5;
				}								  
		    };
			var lettersizeCol25 = {
				ref: "lettersizeCol25",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol25 && !data.textchartCol25 && data.numberofrowcols2 >= 5;
				}								
			};	
			var TitleTextColorCol25 = {
			  ref: "TitleTextColorCol25",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol25 && data.numberofrowcols2 >= 5;
				}	
		    };

		    			var showCol26 = {
				ref : "showCol26",
				type : "boolean",
				component : "switch",
				label : "Show Col 6 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 6;
				}					
			};			
			var col26width = {
				ref: "col26width",
				type: "string",
				component: "dropdown",
				label: "Cell 6 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}
		    };
			var backgroundcolorCol26 = {
				ref: "backgroundcolorCol26",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}							  	
			};
			var backgroundimageCol26 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol26",
				layoutRef: "backgroundimageCol26",
				type: "string",
				show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}
			};
			var backgroundimagesizeCol26 = {
			  ref: "backgroundimagesizeCol26",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}							  
		    };
		    var backgroundalignCol26 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol26",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}
			};
			var textchartCol26 = {
				ref : "textchartCol26",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}
			};
			var circleCol26 = {
				ref : "circleCol26",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol26 && data.backgroundimageCol26 && data.numberofrowcols2 >= 6;
				}								
			};	
			var ChartCol26 = {
				ref: "ChartCol26",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol26 && data.textchartCol26 && data.numberofrowcols2 >= 6;
				}							  	
			};
			var labelCol26 = {
				ref : "labelCol26",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol26 && !data.textchartCol26 && data.numberofrowcols2 >= 6;
				}									
			};
			var labelPaddingTopCol26 = {
				ref : "labelPaddingTopCol26",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol26 && !data.textchartCol26 && data.numberofrowcols2 >= 6;
				}
			};
			var FontFamilyCol26 = {
			  	ref: "FontFamilyCol26",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol26 && !data.textchartCol26 && data.numberofrowcols2 >= 6;
				}								  
		    };
			var lettersizeCol26 = {
				ref: "lettersizeCol26",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol26 && !data.textchartCol26 && data.numberofrowcols2 >= 6;
				}								
			};	
			var TitleTextColorCol26 = {
			  ref: "TitleTextColorCol26",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol26 && data.numberofrowcols2 >= 6;
				}	
		    };

		    			var showCol27 = {
				ref : "showCol27",
				type : "boolean",
				component : "switch",
				label : "Show Col 7 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 7;
				}					
			};			
			var col27width = {
				ref: "col27width",
				type: "string",
				component: "dropdown",
				label: "Cell 7 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}
		    };
			var backgroundcolorCol27 = {
				ref: "backgroundcolorCol27",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}							  	
			};
			var backgroundimageCol27 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol27",
				layoutRef: "backgroundimageCol27",
				type: "string",
				show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}
			};
			var backgroundimagesizeCol27 = {
			  ref: "backgroundimagesizeCol27",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}							  
		    };
		    var backgroundalignCol27 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol27",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}
			};
			var textchartCol27 = {
				ref : "textchartCol27",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}
			};
			var circleCol27 = {
				ref : "circleCol27",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol27 && data.backgroundimageCol27 && data.numberofrowcols2 >= 7;
				}								
			};	
			var ChartCol27 = {
				ref: "ChartCol27",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol27 && data.textchartCol27 && data.numberofrowcols2 >= 7;
				}							  	
			};
			var labelCol27 = {
				ref : "labelCol27",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol27 && !data.textchartCol27 && data.numberofrowcols2 >= 7;
				}									
			};
			var labelPaddingTopCol27 = {
				ref : "labelPaddingTopCol27",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol27 && !data.textchartCol27 && data.numberofrowcols2 >= 7;
				}
			};
			var FontFamilyCol27 = {
			  	ref: "FontFamilyCol27",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol27 && !data.textchartCol27 && data.numberofrowcols2 >= 7;
				}								  
		    };
			var lettersizeCol27 = {
				ref: "lettersizeCol27",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol27 && !data.textchartCol27 && data.numberofrowcols2 >= 7;
				}								
			};	
			var TitleTextColorCol27 = {
			  ref: "TitleTextColorCol27",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol27 && data.numberofrowcols2 >= 7;
				}	
		    };

		    			var showCol28 = {
				ref : "showCol28",
				type : "boolean",
				component : "switch",
				label : "Show Col 8 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols2 >= 8;
				}					
			};			
			var col28width = {
				ref: "col28width",
				type: "string",
				component: "dropdown",
				label: "Cell 8 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}
		    };
			var backgroundcolorCol28 = {
				ref: "backgroundcolorCol28",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}							  	
			};
			var backgroundimageCol28 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol28",
				layoutRef: "backgroundimageCol28",
				type: "string",
				show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}
			};
			var backgroundimagesizeCol28 = {
			  ref: "backgroundimagesizeCol28",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}							  
		    };
		    var backgroundalignCol28 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol28",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}
			};
			var textchartCol28 = {
				ref : "textchartCol28",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}
			};
			var circleCol28 = {
				ref : "circleCol28",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol28 && data.backgroundimageCol28 && data.numberofrowcols2 >= 8;
				}								
			};	
			var ChartCol28 = {
				ref: "ChartCol28",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol28 && data.textchartCol28 && data.numberofrowcols2 >= 8;
				}							  	
			};
			var labelCol28 = {
				ref : "labelCol28",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol28 && !data.textchartCol28 && data.numberofrowcols2 >= 8;
				}									
			};
			var labelPaddingTopCol28 = {
				ref : "labelPaddingTopCol28",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol28 && !data.textchartCol28 && data.numberofrowcols2 >= 8;
				}
			};
			var FontFamilyCol28 = {
			  	ref: "FontFamilyCol28",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol28 && !data.textchartCol28 && data.numberofrowcols2 >= 8;
				}								  
		    };
			var lettersizeCol28 = {
				ref: "lettersizeCol28",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol28 && !data.textchartCol28 && data.numberofrowcols2 >= 8;
				}								
			};	
			var TitleTextColorCol28 = {
			  ref: "TitleTextColorCol28",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol28 && data.numberofrowcols2 >= 8;
				}	
		    };

		    //row col 3
		    			var showCol31 = {
				ref : "showCol31",
				type : "boolean",
				component : "switch",
				label : "Show Col 1 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 1;
				}					
			};			
			var col31width = {
				ref: "col31width",
				type: "string",
				component: "dropdown",
				label: "Cell 1 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}
		    };
			var backgroundcolorCol31 = {
				ref: "backgroundcolorCol31",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}							  	
			};
			var backgroundimageCol31 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol31",
				layoutRef: "backgroundimageCol31",
				type: "string",
				show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}
			};
			var backgroundimagesizeCol31 = {
			  ref: "backgroundimagesizeCol31",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}							  
		    };
		    var backgroundalignCol31 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol31",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}
			};
			var textchartCol31 = {
				ref : "textchartCol31",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}
			};
			var circleCol31 = {
				ref : "circleCol31",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol31 && data.backgroundimageCol31 && data.numberofrowcols3 >= 1;
				}								
			};	
			var ChartCol31 = {
				ref: "ChartCol31",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol31 && data.textchartCol31 && data.numberofrowcols3 >= 1;
				}							  	
			};
			var labelCol31 = {
				ref : "labelCol31",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol31 && !data.textchartCol31 && data.numberofrowcols3 >= 1;
				}									
			};
			var labelPaddingTopCol31 = {
				ref : "labelPaddingTopCol31",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol31 && !data.textchartCol31 && data.numberofrowcols3 >= 1;
				}
			};
			var FontFamilyCol31 = {
			  	ref: "FontFamilyCol31",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol31 && !data.textchartCol31 && data.numberofrowcols3 >= 1;
				}								  
		    };
			var lettersizeCol31 = {
				ref: "lettersizeCol31",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol31 && !data.textchartCol31 && data.numberofrowcols3 >= 1;
				}								
			};	
			var TitleTextColorCol31 = {
			  ref: "TitleTextColorCol31",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol31 && data.numberofrowcols3 >= 1;
				}	
		    };

		    var showCol32 = {
				ref : "showCol32",
				type : "boolean",
				component : "switch",
				label : "Show Col 2 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 2;
				}					
			};			
			var col32width = {
				ref: "col32width",
				type: "string",
				component: "dropdown",
				label: "Cell 2 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}
		    };
			var backgroundcolorCol32 = {
				ref: "backgroundcolorCol32",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}							  	
			};
			var backgroundimageCol32 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol32",
				layoutRef: "backgroundimageCol32",
				type: "string",
				show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}
			};
			var backgroundimagesizeCol32 = {
			  ref: "backgroundimagesizeCol32",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}							  
		    };
		    var backgroundalignCol32 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol32",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}
			};
			var textchartCol32 = {
				ref : "textchartCol32",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}
			};
			var circleCol32 = {
				ref : "circleCol32",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol32 && data.backgroundimageCol32 && data.numberofrowcols3 >= 2;
				}								
			};	
			var ChartCol32 = {
				ref: "ChartCol32",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol32 && data.textchartCol32 && data.numberofrowcols3 >= 2;
				}							  	
			};
			var labelCol32 = {
				ref : "labelCol32",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol32 && !data.textchartCol32 && data.numberofrowcols3 >= 2;
				}									
			};
			var labelPaddingTopCol32 = {
				ref : "labelPaddingTopCol32",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol32 && !data.textchartCol32 && data.numberofrowcols3 >= 2;
				}
			};
			var FontFamilyCol32 = {
			  	ref: "FontFamilyCol32",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol32 && !data.textchartCol32 && data.numberofrowcols3 >= 2;
				}								  
		    };
			var lettersizeCol32 = {
				ref: "lettersizeCol32",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol32 && !data.textchartCol32 && data.numberofrowcols3 >= 2;
				}								
			};	
			var TitleTextColorCol32 = {
			  ref: "TitleTextColorCol32",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol32 && data.numberofrowcols3 >= 2;
				}	
		    };


		    			var showCol33 = {
				ref : "showCol33",
				type : "boolean",
				component : "switch",
				label : "Show Col 3 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 3;
				}					
			};			
			var col33width = {
				ref: "col33width",
				type: "string",
				component: "dropdown",
				label: "Cell 3 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}
		    };
			var backgroundcolorCol33 = {
				ref: "backgroundcolorCol33",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}							  	
			};
			var backgroundimageCol33 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol33",
				layoutRef: "backgroundimageCol33",
				type: "string",
				show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}
			};
			var backgroundimagesizeCol33 = {
			  ref: "backgroundimagesizeCol33",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}							  
		    };
		    var backgroundalignCol33 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol33",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}
			};
			var textchartCol33 = {
				ref : "textchartCol33",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}
			};
			var circleCol33 = {
				ref : "circleCol33",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol33 && data.backgroundimageCol33 && data.numberofrowcols3 >= 3;
				}								
			};	
			var ChartCol33 = {
				ref: "ChartCol33",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol33 && data.textchartCol33 && data.numberofrowcols3 >= 3;
				}							  	
			};
			var labelCol33 = {
				ref : "labelCol33",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol33 && !data.textchartCol33 && data.numberofrowcols3 >= 3;
				}									
			};
			var labelPaddingTopCol33 = {
				ref : "labelPaddingTopCol33",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol33 && !data.textchartCol33 && data.numberofrowcols3 >= 3;
				}
			};
			var FontFamilyCol33 = {
			  	ref: "FontFamilyCol33",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol33 && !data.textchartCol33 && data.numberofrowcols3 >= 3;
				}								  
		    };
			var lettersizeCol33 = {
				ref: "lettersizeCol33",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol33 && !data.textchartCol33 && data.numberofrowcols3 >= 3;
				}								
			};	
			var TitleTextColorCol33 = {
			  ref: "TitleTextColorCol33",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol33 && data.numberofrowcols3 >= 3;
				}	
		    };

		    			var showCol34 = {
				ref : "showCol34",
				type : "boolean",
				component : "switch",
				label : "Show Col 4 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 4;
				}					
			};			
			var col34width = {
				ref: "col34width",
				type: "string",
				component: "dropdown",
				label: "Cell 4 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}
		    };
			var backgroundcolorCol34 = {
				ref: "backgroundcolorCol34",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}							  	
			};
			var backgroundimageCol34 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol34",
				layoutRef: "backgroundimageCol34",
				type: "string",
				show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}
			};
			var backgroundimagesizeCol34 = {
			  ref: "backgroundimagesizeCol34",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}							  
		    };
		    var backgroundalignCol34 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol34",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}
			};
			var textchartCol34 = {
				ref : "textchartCol34",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}
			};
			var circleCol34 = {
				ref : "circleCol34",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol34 && data.backgroundimageCol34 && data.numberofrowcols3 >= 4;
				}								
			};	
			var ChartCol34 = {
				ref: "ChartCol34",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol34 && data.textchartCol34 && data.numberofrowcols3 >= 4;
				}							  	
			};
			var labelCol34 = {
				ref : "labelCol34",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol34 && !data.textchartCol34 && data.numberofrowcols3 >= 4;
				}									
			};
			var labelPaddingTopCol34 = {
				ref : "labelPaddingTopCol34",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol34 && !data.textchartCol34 && data.numberofrowcols3 >= 4;
				}
			};
			var FontFamilyCol34 = {
			  	ref: "FontFamilyCol34",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol34 && !data.textchartCol34 && data.numberofrowcols3 >= 4;
				}								  
		    };
			var lettersizeCol34 = {
				ref: "lettersizeCol34",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol34 && !data.textchartCol34 && data.numberofrowcols3 >= 4;
				}								
			};	
			var TitleTextColorCol34 = {
			  ref: "TitleTextColorCol34",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol34 && data.numberofrowcols3 >= 4;
				}	
		    };

		    			var showCol35 = {
				ref : "showCol35",
				type : "boolean",
				component : "switch",
				label : "Show Col 5 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 5;
				}					
			};			
			var col35width = {
				ref: "col35width",
				type: "string",
				component: "dropdown",
				label: "Cell 5 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}
		    };
			var backgroundcolorCol35 = {
				ref: "backgroundcolorCol35",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}							  	
			};
			var backgroundimageCol35 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol35",
				layoutRef: "backgroundimageCol35",
				type: "string",
				show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}
			};
			var backgroundimagesizeCol35 = {
			  ref: "backgroundimagesizeCol35",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}							  
		    };
		    var backgroundalignCol35 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol35",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}
			};
			var textchartCol35 = {
				ref : "textchartCol35",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}
			};
			var circleCol35 = {
				ref : "circleCol35",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol35 && data.backgroundimageCol35 && data.numberofrowcols3 >= 5;
				}								
			};	
			var ChartCol35 = {
				ref: "ChartCol35",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol35 && data.textchartCol35 && data.numberofrowcols3 >= 5;
				}							  	
			};
			var labelCol35 = {
				ref : "labelCol35",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol35 && !data.textchartCol35 && data.numberofrowcols3 >= 5;
				}									
			};
			var labelPaddingTopCol35 = {
				ref : "labelPaddingTopCol35",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol35 && !data.textchartCol35 && data.numberofrowcols3 >= 5;
				}
			};
			var FontFamilyCol35 = {
			  	ref: "FontFamilyCol35",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol35 && !data.textchartCol35 && data.numberofrowcols3 >= 5;
				}								  
		    };
			var lettersizeCol35 = {
				ref: "lettersizeCol35",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol35 && !data.textchartCol35 && data.numberofrowcols3 >= 5;
				}								
			};	
			var TitleTextColorCol35 = {
			  ref: "TitleTextColorCol35",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol35 && data.numberofrowcols3 >= 5;
				}	
		    };

		    			var showCol36 = {
				ref : "showCol36",
				type : "boolean",
				component : "switch",
				label : "Show Col 6 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 6;
				}					
			};			
			var col36width = {
				ref: "col36width",
				type: "string",
				component: "dropdown",
				label: "Cell 6 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}
		    };
			var backgroundcolorCol36 = {
				ref: "backgroundcolorCol36",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}							  	
			};
			var backgroundimageCol36 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol36",
				layoutRef: "backgroundimageCol36",
				type: "string",
				show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}
			};
			var backgroundimagesizeCol36 = {
			  ref: "backgroundimagesizeCol36",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}							  
		    };
		    var backgroundalignCol36 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol36",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}
			};
			var textchartCol36 = {
				ref : "textchartCol36",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}
			};
			var circleCol36 = {
				ref : "circleCol36",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol36 && data.backgroundimageCol36 && data.numberofrowcols3 >= 6;
				}								
			};	
			var ChartCol36 = {
				ref: "ChartCol36",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol36 && data.textchartCol36 && data.numberofrowcols3 >= 6;
				}							  	
			};
			var labelCol36 = {
				ref : "labelCol36",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol36 && !data.textchartCol36 && data.numberofrowcols3 >= 6;
				}									
			};
			var labelPaddingTopCol36 = {
				ref : "labelPaddingTopCol36",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol36 && !data.textchartCol36 && data.numberofrowcols3 >= 6;
				}
			};
			var FontFamilyCol36 = {
			  	ref: "FontFamilyCol36",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol36 && !data.textchartCol36 && data.numberofrowcols3 >= 6;
				}								  
		    };
			var lettersizeCol36 = {
				ref: "lettersizeCol36",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol36 && !data.textchartCol36 && data.numberofrowcols3 >= 6;
				}								
			};	
			var TitleTextColorCol36 = {
			  ref: "TitleTextColorCol36",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol36 && data.numberofrowcols3 >= 6;
				}	
		    };

		    			var showCol37 = {
				ref : "showCol37",
				type : "boolean",
				component : "switch",
				label : "Show Col 7 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 7;
				}					
			};			
			var col37width = {
				ref: "col37width",
				type: "string",
				component: "dropdown",
				label: "Cell 7 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}
		    };
			var backgroundcolorCol37 = {
				ref: "backgroundcolorCol37",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}							  	
			};
			var backgroundimageCol37 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol37",
				layoutRef: "backgroundimageCol37",
				type: "string",
				show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}
			};
			var backgroundimagesizeCol37 = {
			  ref: "backgroundimagesizeCol37",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}							  
		    };
		    var backgroundalignCol37 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol37",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}
			};
			var textchartCol37 = {
				ref : "textchartCol37",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}
			};
			var circleCol37 = {
				ref : "circleCol37",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol37 && data.backgroundimageCol37 && data.numberofrowcols3 >= 7;
				}								
			};	
			var ChartCol37 = {
				ref: "ChartCol37",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol37 && data.textchartCol37 && data.numberofrowcols3 >= 7;
				}							  	
			};
			var labelCol37 = {
				ref : "labelCol37",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol37 && !data.textchartCol37 && data.numberofrowcols3 >= 7;
				}									
			};
			var labelPaddingTopCol37 = {
				ref : "labelPaddingTopCol37",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol37 && !data.textchartCol37 && data.numberofrowcols3 >= 7;
				}
			};
			var FontFamilyCol37 = {
			  	ref: "FontFamilyCol37",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol37 && !data.textchartCol37 && data.numberofrowcols3 >= 7;
				}								  
		    };
			var lettersizeCol37 = {
				ref: "lettersizeCol37",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol37 && !data.textchartCol37 && data.numberofrowcols3 >= 7;
				}								
			};	
			var TitleTextColorCol37 = {
			  ref: "TitleTextColorCol37",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol37 && data.numberofrowcols3 >= 7;
				}	
		    };

		    			var showCol38 = {
				ref : "showCol38",
				type : "boolean",
				component : "switch",
				label : "Show Col 8 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols3 >= 8;
				}					
			};			
			var col38width = {
				ref: "col38width",
				type: "string",
				component: "dropdown",
				label: "Cell 8 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}
		    };
			var backgroundcolorCol38 = {
				ref: "backgroundcolorCol38",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}							  	
			};
			var backgroundimageCol38 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol38",
				layoutRef: "backgroundimageCol38",
				type: "string",
				show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}
			};
			var backgroundimagesizeCol38 = {
			  ref: "backgroundimagesizeCol38",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}							  
		    };
		    var backgroundalignCol38 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol38",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}
			};
			var textchartCol38 = {
				ref : "textchartCol38",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}
			};
			var circleCol38 = {
				ref : "circleCol38",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol38 && data.backgroundimageCol38 && data.numberofrowcols3 >= 8;
				}								
			};	
			var ChartCol38 = {
				ref: "ChartCol38",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol38 && data.textchartCol38 && data.numberofrowcols3 >= 8;
				}							  	
			};
			var labelCol38 = {
				ref : "labelCol38",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol38 && !data.textchartCol38 && data.numberofrowcols3 >= 8;
				}									
			};
			var labelPaddingTopCol38 = {
				ref : "labelPaddingTopCol38",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol38 && !data.textchartCol38 && data.numberofrowcols3 >= 8;
				}
			};
			var FontFamilyCol38 = {
			  	ref: "FontFamilyCol38",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol38 && !data.textchartCol38 && data.numberofrowcols3 >= 8;
				}								  
		    };
			var lettersizeCol38 = {
				ref: "lettersizeCol38",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol38 && !data.textchartCol38 && data.numberofrowcols3 >= 8;
				}								
			};	
			var TitleTextColorCol38 = {
			  ref: "TitleTextColorCol38",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol38 && data.numberofrowcols3 >= 8;
				}	
		    };

		    //row cols 4
		    			var showCol41 = {
				ref : "showCol41",
				type : "boolean",
				component : "switch",
				label : "Show Col 1 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 1;
				}					
			};			
			var col41width = {
				ref: "col41width",
				type: "string",
				component: "dropdown",
				label: "Cell 1 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}
		    };
			var backgroundcolorCol41 = {
				ref: "backgroundcolorCol41",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}							  	
			};
			var backgroundimageCol41 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol41",
				layoutRef: "backgroundimageCol41",
				type: "string",
				show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}
			};
			var backgroundimagesizeCol41 = {
			  ref: "backgroundimagesizeCol41",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}							  
		    };
		    var backgroundalignCol41 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol41",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}
			};
			var textchartCol41 = {
				ref : "textchartCol41",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}
			};
			var circleCol41 = {
				ref : "circleCol41",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol41 && data.backgroundimageCol41 && data.numberofrowcols4 >= 1;
				}								
			};	
			var ChartCol41 = {
				ref: "ChartCol41",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol41 && data.textchartCol41 && data.numberofrowcols4 >= 1;
				}							  	
			};
			var labelCol41 = {
				ref : "labelCol41",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol41 && !data.textchartCol41 && data.numberofrowcols4 >= 1;
				}									
			};
			var labelPaddingTopCol41 = {
				ref : "labelPaddingTopCol41",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol41 && !data.textchartCol41 && data.numberofrowcols4 >= 1;
				}
			};
			var FontFamilyCol41 = {
			  	ref: "FontFamilyCol41",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol41 && !data.textchartCol41 && data.numberofrowcols4 >= 1;
				}								  
		    };
			var lettersizeCol41 = {
				ref: "lettersizeCol41",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol41 && !data.textchartCol41 && data.numberofrowcols4 >= 1;
				}								
			};	
			var TitleTextColorCol41 = {
			  ref: "TitleTextColorCol41",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol41 && data.numberofrowcols4 >= 1;
				}	
		    };

		    var showCol42 = {
				ref : "showCol42",
				type : "boolean",
				component : "switch",
				label : "Show Col 2 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 2;
				}					
			};			
			var col42width = {
				ref: "col42width",
				type: "string",
				component: "dropdown",
				label: "Cell 2 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}
		    };
			var backgroundcolorCol42 = {
				ref: "backgroundcolorCol42",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}							  	
			};
			var backgroundimageCol42 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol42",
				layoutRef: "backgroundimageCol42",
				type: "string",
				show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}
			};
			var backgroundimagesizeCol42 = {
			  ref: "backgroundimagesizeCol42",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}							  
		    };
		    var backgroundalignCol42 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol42",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}
			};
			var textchartCol42 = {
				ref : "textchartCol42",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}
			};
			var circleCol42 = {
				ref : "circleCol42",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol42 && data.backgroundimageCol42 && data.numberofrowcols4 >= 2;
				}								
			};	
			var ChartCol42 = {
				ref: "ChartCol42",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol42 && data.textchartCol42 && data.numberofrowcols4 >= 2;
				}							  	
			};
			var labelCol42 = {
				ref : "labelCol42",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol42 && !data.textchartCol42 && data.numberofrowcols4 >= 2;
				}									
			};
			var labelPaddingTopCol42 = {
				ref : "labelPaddingTopCol42",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol42 && !data.textchartCol42 && data.numberofrowcols4 >= 2;
				}
			};
			var FontFamilyCol42 = {
			  	ref: "FontFamilyCol42",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol42 && !data.textchartCol42 && data.numberofrowcols4 >= 2;
				}								  
		    };
			var lettersizeCol42 = {
				ref: "lettersizeCol42",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol42 && !data.textchartCol42 && data.numberofrowcols4 >= 2;
				}								
			};	
			var TitleTextColorCol42 = {
			  ref: "TitleTextColorCol42",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol42 && data.numberofrowcols4 >= 2;
				}	
		    };


		    			var showCol43 = {
				ref : "showCol43",
				type : "boolean",
				component : "switch",
				label : "Show Col 3 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 3;
				}					
			};			
			var col43width = {
				ref: "col43width",
				type: "string",
				component: "dropdown",
				label: "Cell 3 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}
		    };
			var backgroundcolorCol43 = {
				ref: "backgroundcolorCol43",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}							  	
			};
			var backgroundimageCol43 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol43",
				layoutRef: "backgroundimageCol43",
				type: "string",
				show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}
			};
			var backgroundimagesizeCol43 = {
			  ref: "backgroundimagesizeCol43",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}							  
		    };
		    var backgroundalignCol43 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol43",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}
			};
			var textchartCol43 = {
				ref : "textchartCol43",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}
			};
			var circleCol43 = {
				ref : "circleCol43",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol43 && data.backgroundimageCol43 && data.numberofrowcols4 >= 3;
				}								
			};	
			var ChartCol43 = {
				ref: "ChartCol43",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol43 && data.textchartCol43 && data.numberofrowcols4 >= 3;
				}							  	
			};
			var labelCol43 = {
				ref : "labelCol43",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol43 && !data.textchartCol43 && data.numberofrowcols4 >= 3;
				}									
			};
			var labelPaddingTopCol43 = {
				ref : "labelPaddingTopCol43",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol43 && !data.textchartCol43 && data.numberofrowcols4 >= 3;
				}
			};
			var FontFamilyCol43 = {
			  	ref: "FontFamilyCol43",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol43 && !data.textchartCol43 && data.numberofrowcols4 >= 3;
				}								  
		    };
			var lettersizeCol43 = {
				ref: "lettersizeCol43",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol43 && !data.textchartCol43 && data.numberofrowcols4 >= 3;
				}								
			};	
			var TitleTextColorCol43 = {
			  ref: "TitleTextColorCol43",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol43 && data.numberofrowcols4 >= 3;
				}	
		    };

		    			var showCol44 = {
				ref : "showCol44",
				type : "boolean",
				component : "switch",
				label : "Show Col 4 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 4;
				}					
			};			
			var col44width = {
				ref: "col44width",
				type: "string",
				component: "dropdown",
				label: "Cell 4 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}
		    };
			var backgroundcolorCol44 = {
				ref: "backgroundcolorCol44",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}							  	
			};
			var backgroundimageCol44 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol44",
				layoutRef: "backgroundimageCol44",
				type: "string",
				show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}
			};
			var backgroundimagesizeCol44 = {
			  ref: "backgroundimagesizeCol44",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}							  
		    };
		    var backgroundalignCol44 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol44",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}
			};
			var textchartCol44 = {
				ref : "textchartCol44",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}
			};
			var circleCol44 = {
				ref : "circleCol44",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol44 && data.backgroundimageCol44 && data.numberofrowcols4 >= 4;
				}								
			};	
			var ChartCol44 = {
				ref: "ChartCol44",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol44 && data.textchartCol44 && data.numberofrowcols4 >= 4;
				}							  	
			};
			var labelCol44 = {
				ref : "labelCol44",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol44 && !data.textchartCol44 && data.numberofrowcols4 >= 4;
				}									
			};
			var labelPaddingTopCol44 = {
				ref : "labelPaddingTopCol44",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol44 && !data.textchartCol44 && data.numberofrowcols4 >= 4;
				}
			};
			var FontFamilyCol44 = {
			  	ref: "FontFamilyCol44",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol44 && !data.textchartCol44 && data.numberofrowcols4 >= 4;
				}								  
		    };
			var lettersizeCol44 = {
				ref: "lettersizeCol44",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol44 && !data.textchartCol44 && data.numberofrowcols4 >= 4;
				}								
			};	
			var TitleTextColorCol44 = {
			  ref: "TitleTextColorCol44",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol44 && data.numberofrowcols4 >= 4;
				}	
		    };

		    			var showCol45 = {
				ref : "showCol45",
				type : "boolean",
				component : "switch",
				label : "Show Col 5 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 5;
				}					
			};			
			var col45width = {
				ref: "col45width",
				type: "string",
				component: "dropdown",
				label: "Cell 5 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}
		    };
			var backgroundcolorCol45 = {
				ref: "backgroundcolorCol45",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}							  	
			};
			var backgroundimageCol45 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol45",
				layoutRef: "backgroundimageCol45",
				type: "string",
				show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}
			};
			var backgroundimagesizeCol45 = {
			  ref: "backgroundimagesizeCol45",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}							  
		    };
		    var backgroundalignCol45 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol45",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}
			};
			var textchartCol45 = {
				ref : "textchartCol45",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}
			};
			var circleCol45 = {
				ref : "circleCol45",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol45 && data.backgroundimageCol45 && data.numberofrowcols4 >= 5;
				}								
			};	
			var ChartCol45 = {
				ref: "ChartCol45",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol45 && data.textchartCol45 && data.numberofrowcols4 >= 5;
				}							  	
			};
			var labelCol45 = {
				ref : "labelCol45",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol45 && !data.textchartCol45 && data.numberofrowcols4 >= 5;
				}									
			};
			var labelPaddingTopCol45 = {
				ref : "labelPaddingTopCol45",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol45 && !data.textchartCol45 && data.numberofrowcols4 >= 5;
				}
			};
			var FontFamilyCol45 = {
			  	ref: "FontFamilyCol45",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol45 && !data.textchartCol45 && data.numberofrowcols4 >= 5;
				}								  
		    };
			var lettersizeCol45 = {
				ref: "lettersizeCol45",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol45 && !data.textchartCol45 && data.numberofrowcols4 >= 5;
				}								
			};	
			var TitleTextColorCol45 = {
			  ref: "TitleTextColorCol45",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol45 && data.numberofrowcols4 >= 5;
				}	
		    };

		    			var showCol46 = {
				ref : "showCol46",
				type : "boolean",
				component : "switch",
				label : "Show Col 6 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 6;
				}					
			};			
			var col46width = {
				ref: "col46width",
				type: "string",
				component: "dropdown",
				label: "Cell 6 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}
		    };
			var backgroundcolorCol46 = {
				ref: "backgroundcolorCol46",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}							  	
			};
			var backgroundimageCol46 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol46",
				layoutRef: "backgroundimageCol46",
				type: "string",
				show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}
			};
			var backgroundimagesizeCol46 = {
			  ref: "backgroundimagesizeCol46",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}							  
		    };
		    var backgroundalignCol46 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol46",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}
			};
			var textchartCol46 = {
				ref : "textchartCol46",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}
			};
			var circleCol46 = {
				ref : "circleCol46",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol46 && data.backgroundimageCol46 && data.numberofrowcols4 >= 6;
				}								
			};	
			var ChartCol46 = {
				ref: "ChartCol46",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol46 && data.textchartCol46 && data.numberofrowcols4 >= 6;
				}							  	
			};
			var labelCol46 = {
				ref : "labelCol46",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol46 && !data.textchartCol46 && data.numberofrowcols4 >= 6;
				}									
			};
			var labelPaddingTopCol46 = {
				ref : "labelPaddingTopCol46",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol46 && !data.textchartCol46 && data.numberofrowcols4 >= 6;
				}
			};
			var FontFamilyCol46 = {
			  	ref: "FontFamilyCol46",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol46 && !data.textchartCol46 && data.numberofrowcols4 >= 6;
				}								  
		    };
			var lettersizeCol46 = {
				ref: "lettersizeCol46",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol46 && !data.textchartCol46 && data.numberofrowcols4 >= 6;
				}								
			};	
			var TitleTextColorCol46 = {
			  ref: "TitleTextColorCol46",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol46 && data.numberofrowcols4 >= 6;
				}	
		    };

		    			var showCol47 = {
				ref : "showCol47",
				type : "boolean",
				component : "switch",
				label : "Show Col 7 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 7;
				}					
			};			
			var col47width = {
				ref: "col47width",
				type: "string",
				component: "dropdown",
				label: "Cell 7 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}
		    };
			var backgroundcolorCol47 = {
				ref: "backgroundcolorCol47",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}							  	
			};
			var backgroundimageCol47 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol47",
				layoutRef: "backgroundimageCol47",
				type: "string",
				show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}
			};
			var backgroundimagesizeCol47 = {
			  ref: "backgroundimagesizeCol47",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}							  
		    };
		    var backgroundalignCol47 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol47",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}
			};
			var textchartCol47 = {
				ref : "textchartCol47",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}
			};
			var circleCol47 = {
				ref : "circleCol47",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol47 && data.backgroundimageCol47 && data.numberofrowcols4 >= 7;
				}								
			};	
			var ChartCol47 = {
				ref: "ChartCol47",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol47 && data.textchartCol47 && data.numberofrowcols4 >= 7;
				}							  	
			};
			var labelCol47 = {
				ref : "labelCol47",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol47 && !data.textchartCol47 && data.numberofrowcols4 >= 7;
				}									
			};
			var labelPaddingTopCol47 = {
				ref : "labelPaddingTopCol47",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol47 && !data.textchartCol47 && data.numberofrowcols4 >= 7;
				}
			};
			var FontFamilyCol47 = {
			  	ref: "FontFamilyCol47",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol47 && !data.textchartCol47 && data.numberofrowcols4 >= 7;
				}								  
		    };
			var lettersizeCol47 = {
				ref: "lettersizeCol47",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol47 && !data.textchartCol47 && data.numberofrowcols4 >= 7;
				}								
			};	
			var TitleTextColorCol47 = {
			  ref: "TitleTextColorCol47",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol47 && data.numberofrowcols4 >= 7;
				}	
		    };

		    			var showCol48 = {
				ref : "showCol48",
				type : "boolean",
				component : "switch",
				label : "Show Col 8 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols4 >= 8;
				}					
			};			
			var col48width = {
				ref: "col48width",
				type: "string",
				component: "dropdown",
				label: "Cell 8 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}
		    };
			var backgroundcolorCol48 = {
				ref: "backgroundcolorCol48",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}							  	
			};
			var backgroundimageCol48 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol48",
				layoutRef: "backgroundimageCol48",
				type: "string",
				show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}
			};
			var backgroundimagesizeCol48 = {
			  ref: "backgroundimagesizeCol48",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}							  
		    };
		    var backgroundalignCol48 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol48",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}
			};
			var textchartCol48 = {
				ref : "textchartCol48",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}
			};
			var circleCol48 = {
				ref : "circleCol48",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol48 && data.backgroundimageCol48 && data.numberofrowcols4 >= 8;
				}								
			};	
			var ChartCol48 = {
				ref: "ChartCol48",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol48 && data.textchartCol48 && data.numberofrowcols4 >= 8;
				}							  	
			};
			var labelCol48 = {
				ref : "labelCol48",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol48 && !data.textchartCol48 && data.numberofrowcols4 >= 8;
				}									
			};
			var labelPaddingTopCol48 = {
				ref : "labelPaddingTopCol48",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol48 && !data.textchartCol48 && data.numberofrowcols4 >= 8;
				}
			};
			var FontFamilyCol48 = {
			  	ref: "FontFamilyCol48",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol48 && !data.textchartCol48 && data.numberofrowcols4 >= 8;
				}								  
		    };
			var lettersizeCol48 = {
				ref: "lettersizeCol48",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol48 && !data.textchartCol48 && data.numberofrowcols4 >= 8;
				}								
			};	
			var TitleTextColorCol48 = {
			  ref: "TitleTextColorCol48",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol48 && data.numberofrowcols4 >= 8;
				}	
		    };

		    //row cols 5
		    			var showCol51 = {
				ref : "showCol51",
				type : "boolean",
				component : "switch",
				label : "Show Col 1 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 1;
				}					
			};			
			var col51width = {
				ref: "col51width",
				type: "string",
				component: "dropdown",
				label: "Cell 1 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}
		    };
			var backgroundcolorCol51 = {
				ref: "backgroundcolorCol51",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}							  	
			};
			var backgroundimageCol51 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol51",
				layoutRef: "backgroundimageCol51",
				type: "string",
				show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}
			};
			var backgroundimagesizeCol51 = {
			  ref: "backgroundimagesizeCol51",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}							  
		    };
		    var backgroundalignCol51 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol51",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}
			};
			var textchartCol51 = {
				ref : "textchartCol51",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}
			};
			var circleCol51 = {
				ref : "circleCol51",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol51 && data.backgroundimageCol51 && data.numberofrowcols5 >= 1;
				}								
			};	
			var ChartCol51 = {
				ref: "ChartCol51",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol51 && data.textchartCol51 && data.numberofrowcols5 >= 1;
				}							  	
			};
			var labelCol51 = {
				ref : "labelCol51",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol51 && !data.textchartCol51 && data.numberofrowcols5 >= 1;
				}									
			};
			var labelPaddingTopCol51 = {
				ref : "labelPaddingTopCol51",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol51 && !data.textchartCol51 && data.numberofrowcols5 >= 1;
				}
			};
			var FontFamilyCol51 = {
			  	ref: "FontFamilyCol51",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol51 && !data.textchartCol51 && data.numberofrowcols5 >= 1;
				}								  
		    };
			var lettersizeCol51 = {
				ref: "lettersizeCol51",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol51 && !data.textchartCol51 && data.numberofrowcols5 >= 1;
				}								
			};	
			var TitleTextColorCol51 = {
			  ref: "TitleTextColorCol51",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol51 && data.numberofrowcols5 >= 1;
				}	
		    };

		    var showCol52 = {
				ref : "showCol52",
				type : "boolean",
				component : "switch",
				label : "Show Col 2 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 2;
				}					
			};			
			var col52width = {
				ref: "col52width",
				type: "string",
				component: "dropdown",
				label: "Cell 2 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}
		    };
			var backgroundcolorCol52 = {
				ref: "backgroundcolorCol52",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}							  	
			};
			var backgroundimageCol52 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol52",
				layoutRef: "backgroundimageCol52",
				type: "string",
				show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}
			};
			var backgroundimagesizeCol52 = {
			  ref: "backgroundimagesizeCol52",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}							  
		    };
		    var backgroundalignCol52 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol52",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}
			};
			var textchartCol52 = {
				ref : "textchartCol52",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}
			};
			var circleCol52 = {
				ref : "circleCol52",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol52 && data.backgroundimageCol52 && data.numberofrowcols5 >= 2;
				}								
			};	
			var ChartCol52 = {
				ref: "ChartCol52",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol52 && data.textchartCol52 && data.numberofrowcols5 >= 2;
				}							  	
			};
			var labelCol52 = {
				ref : "labelCol52",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol52 && !data.textchartCol52 && data.numberofrowcols5 >= 2;
				}									
			};
			var labelPaddingTopCol52 = {
				ref : "labelPaddingTopCol52",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol52 && !data.textchartCol52 && data.numberofrowcols5 >= 2;
				}
			};
			var FontFamilyCol52 = {
			  	ref: "FontFamilyCol52",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol52 && !data.textchartCol52 && data.numberofrowcols5 >= 2;
				}								  
		    };
			var lettersizeCol52 = {
				ref: "lettersizeCol52",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol52 && !data.textchartCol52 && data.numberofrowcols5 >= 2;
				}								
			};	
			var TitleTextColorCol52 = {
			  ref: "TitleTextColorCol52",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol52 && data.numberofrowcols5 >= 2;
				}	
		    };


		    			var showCol53 = {
				ref : "showCol53",
				type : "boolean",
				component : "switch",
				label : "Show Col 3 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 3;
				}					
			};			
			var col53width = {
				ref: "col53width",
				type: "string",
				component: "dropdown",
				label: "Cell 3 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}
		    };
			var backgroundcolorCol53 = {
				ref: "backgroundcolorCol53",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}							  	
			};
			var backgroundimageCol53 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol53",
				layoutRef: "backgroundimageCol53",
				type: "string",
				show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}
			};
			var backgroundimagesizeCol53 = {
			  ref: "backgroundimagesizeCol53",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}							  
		    };
		    var backgroundalignCol53 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol53",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}
			};
			var textchartCol53 = {
				ref : "textchartCol53",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}
			};
			var circleCol53 = {
				ref : "circleCol53",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol53 && data.backgroundimageCol53 && data.numberofrowcols5 >= 3;
				}								
			};	
			var ChartCol53 = {
				ref: "ChartCol53",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol53 && data.textchartCol53 && data.numberofrowcols5 >= 3;
				}							  	
			};
			var labelCol53 = {
				ref : "labelCol53",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol53 && !data.textchartCol53 && data.numberofrowcols5 >= 3;
				}									
			};
			var labelPaddingTopCol53 = {
				ref : "labelPaddingTopCol53",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol53 && !data.textchartCol53 && data.numberofrowcols5 >= 3;
				}
			};
			var FontFamilyCol53 = {
			  	ref: "FontFamilyCol53",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol53 && !data.textchartCol53 && data.numberofrowcols5 >= 3;
				}								  
		    };
			var lettersizeCol53 = {
				ref: "lettersizeCol53",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol53 && !data.textchartCol53 && data.numberofrowcols5 >= 3;
				}								
			};	
			var TitleTextColorCol53 = {
			  ref: "TitleTextColorCol53",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol53 && data.numberofrowcols5 >= 3;
				}	
		    };

		    			var showCol54 = {
				ref : "showCol54",
				type : "boolean",
				component : "switch",
				label : "Show Col 4 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 4;
				}					
			};			
			var col54width = {
				ref: "col54width",
				type: "string",
				component: "dropdown",
				label: "Cell 4 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}
		    };
			var backgroundcolorCol54 = {
				ref: "backgroundcolorCol54",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}							  	
			};
			var backgroundimageCol54 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol54",
				layoutRef: "backgroundimageCol54",
				type: "string",
				show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}
			};
			var backgroundimagesizeCol54 = {
			  ref: "backgroundimagesizeCol54",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}							  
		    };
		    var backgroundalignCol54 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol54",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}
			};
			var textchartCol54 = {
				ref : "textchartCol54",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}
			};
			var circleCol54 = {
				ref : "circleCol54",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol54 && data.backgroundimageCol54 && data.numberofrowcols5 >= 4;
				}								
			};	
			var ChartCol54 = {
				ref: "ChartCol54",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol54 && data.textchartCol54 && data.numberofrowcols5 >= 4;
				}							  	
			};
			var labelCol54 = {
				ref : "labelCol54",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol54 && !data.textchartCol54 && data.numberofrowcols5 >= 4;
				}									
			};
			var labelPaddingTopCol54 = {
				ref : "labelPaddingTopCol54",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol54 && !data.textchartCol54 && data.numberofrowcols5 >= 4;
				}
			};
			var FontFamilyCol54 = {
			  	ref: "FontFamilyCol54",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol54 && !data.textchartCol54 && data.numberofrowcols5 >= 4;
				}								  
		    };
			var lettersizeCol54 = {
				ref: "lettersizeCol54",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol54 && !data.textchartCol54 && data.numberofrowcols5 >= 4;
				}								
			};	
			var TitleTextColorCol54 = {
			  ref: "TitleTextColorCol54",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol54 && data.numberofrowcols5 >= 4;
				}	
		    };

		    			var showCol55 = {
				ref : "showCol55",
				type : "boolean",
				component : "switch",
				label : "Show Col 5 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 5;
				}					
			};			
			var col55width = {
				ref: "col55width",
				type: "string",
				component: "dropdown",
				label: "Cell 5 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}
		    };
			var backgroundcolorCol55 = {
				ref: "backgroundcolorCol55",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}							  	
			};
			var backgroundimageCol55 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol55",
				layoutRef: "backgroundimageCol55",
				type: "string",
				show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}
			};
			var backgroundimagesizeCol55 = {
			  ref: "backgroundimagesizeCol55",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}							  
		    };
		    var backgroundalignCol55 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol55",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}
			};
			var textchartCol55 = {
				ref : "textchartCol55",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}
			};
			var circleCol55 = {
				ref : "circleCol55",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol55 && data.backgroundimageCol55 && data.numberofrowcols5 >= 5;
				}								
			};	
			var ChartCol55 = {
				ref: "ChartCol55",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol55 && data.textchartCol55 && data.numberofrowcols5 >= 5;
				}							  	
			};
			var labelCol55 = {
				ref : "labelCol55",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol55 && !data.textchartCol55 && data.numberofrowcols5 >= 5;
				}									
			};
			var labelPaddingTopCol55 = {
				ref : "labelPaddingTopCol55",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol55 && !data.textchartCol55 && data.numberofrowcols5 >= 5;
				}
			};
			var FontFamilyCol55 = {
			  	ref: "FontFamilyCol55",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol55 && !data.textchartCol55 && data.numberofrowcols5 >= 5;
				}								  
		    };
			var lettersizeCol55 = {
				ref: "lettersizeCol55",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol55 && !data.textchartCol55 && data.numberofrowcols5 >= 5;
				}								
			};	
			var TitleTextColorCol55 = {
			  ref: "TitleTextColorCol55",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol55 && data.numberofrowcols5 >= 5;
				}	
		    };

		    			var showCol56 = {
				ref : "showCol56",
				type : "boolean",
				component : "switch",
				label : "Show Col 6 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 6;
				}					
			};			
			var col56width = {
				ref: "col56width",
				type: "string",
				component: "dropdown",
				label: "Cell 6 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}
		    };
			var backgroundcolorCol56 = {
				ref: "backgroundcolorCol56",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}							  	
			};
			var backgroundimageCol56 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol56",
				layoutRef: "backgroundimageCol56",
				type: "string",
				show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}
			};
			var backgroundimagesizeCol56 = {
			  ref: "backgroundimagesizeCol56",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}							  
		    };
		    var backgroundalignCol56 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol56",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}
			};
			var textchartCol56 = {
				ref : "textchartCol56",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}
			};
			var circleCol56 = {
				ref : "circleCol56",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol56 && data.backgroundimageCol56 && data.numberofrowcols5 >= 6;
				}								
			};	
			var ChartCol56 = {
				ref: "ChartCol56",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol56 && data.textchartCol56 && data.numberofrowcols5 >= 6;
				}							  	
			};
			var labelCol56 = {
				ref : "labelCol56",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol56 && !data.textchartCol56 && data.numberofrowcols5 >= 6;
				}									
			};
			var labelPaddingTopCol56 = {
				ref : "labelPaddingTopCol56",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol56 && !data.textchartCol56 && data.numberofrowcols5 >= 6;
				}
			};
			var FontFamilyCol56 = {
			  	ref: "FontFamilyCol56",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol56 && !data.textchartCol56 && data.numberofrowcols5 >= 6;
				}								  
		    };
			var lettersizeCol56 = {
				ref: "lettersizeCol56",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol56 && !data.textchartCol56 && data.numberofrowcols5 >= 6;
				}								
			};	
			var TitleTextColorCol56 = {
			  ref: "TitleTextColorCol56",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol56 && data.numberofrowcols5 >= 6;
				}	
		    };

		    			var showCol57 = {
				ref : "showCol57",
				type : "boolean",
				component : "switch",
				label : "Show Col 7 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 7;
				}					
			};			
			var col57width = {
				ref: "col57width",
				type: "string",
				component: "dropdown",
				label: "Cell 7 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}
		    };
			var backgroundcolorCol57 = {
				ref: "backgroundcolorCol57",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}							  	
			};
			var backgroundimageCol57 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol57",
				layoutRef: "backgroundimageCol57",
				type: "string",
				show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}
			};
			var backgroundimagesizeCol57 = {
			  ref: "backgroundimagesizeCol57",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}							  
		    };
		    var backgroundalignCol57 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol57",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}
			};
			var textchartCol57 = {
				ref : "textchartCol57",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}
			};
			var circleCol57 = {
				ref : "circleCol57",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol57 && data.backgroundimageCol57 && data.numberofrowcols5 >= 7;
				}								
			};	
			var ChartCol57 = {
				ref: "ChartCol57",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol57 && data.textchartCol57 && data.numberofrowcols5 >= 7;
				}							  	
			};
			var labelCol57 = {
				ref : "labelCol57",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol57 && !data.textchartCol57 && data.numberofrowcols5 >= 7;
				}									
			};
			var labelPaddingTopCol57 = {
				ref : "labelPaddingTopCol57",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol57 && !data.textchartCol57 && data.numberofrowcols5 >= 7;
				}
			};
			var FontFamilyCol57 = {
			  	ref: "FontFamilyCol57",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol57 && !data.textchartCol57 && data.numberofrowcols5 >= 7;
				}								  
		    };
			var lettersizeCol57 = {
				ref: "lettersizeCol57",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol57 && !data.textchartCol57 && data.numberofrowcols5 >= 7;
				}								
			};	
			var TitleTextColorCol57 = {
			  ref: "TitleTextColorCol57",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol57 && data.numberofrowcols5 >= 7;
				}	
		    };

		    			var showCol58 = {
				ref : "showCol58",
				type : "boolean",
				component : "switch",
				label : "Show Col 8 Properties",
				options: [{
					value: true,
					label: "On"
				}, {
					value: false,
					label: "Off"
				}],
				defaultValue: false,
				show : function(data) {
					return data.numberofrowcols5 >= 8;
				}					
			};			
			var col58width = {
				ref: "col58width",
				type: "string",
				component: "dropdown",
				label: "Cell 8 width",
				options: vColumnsWidth,
				defaultValue: "Original Size",
				show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}
		    };
			var backgroundcolorCol58 = {
				ref: "backgroundcolorCol58",
				type: "string",
				component: "dropdown",
				label: "Background Color",
				options: vColorOptions,
				defaultValue: "transparent",
				show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}							  	
			};
			var backgroundimageCol58 = {
				label:"Background Image",
				component: "media",
				ref: "backgroundimageCol58",
				layoutRef: "backgroundimageCol58",
				type: "string",
				show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}
			};
			var backgroundimagesizeCol58 = {
			  ref: "backgroundimagesizeCol58",
			  type: "string",
			  component: "dropdown",
			  label: "Sizing",
			  options: vImageSize,
			  	defaultValue: "cover",
			  	show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}							  
		    };
		    var backgroundalignCol58 = {
				type:"string",
				component:"align-matrix",
				icon:!0,
				horizontal:!0,
				label:"Position",
				translation:"Position",
				ref:"backgroundalignCol58",
				defaultValue:"centerLeft",
				show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}
			};
			var textchartCol58 = {
				ref : "textchartCol58",
				type : "boolean",
				component : "switch",
				label : "Use Chart or Text",
				options: [{
					value: true,
					label: "Chart"
				}, {
					value: false,
					label: "Text"
				}],
				defaultValue: false,
				show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}
			};
			var circleCol58 = {
				ref : "circleCol58",
				translation: "Circle or Square",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 50,
					label: "Circle"
				}, {
					value: 0,
					label: "Square"
				}],
				defaultValue: 0,
				show : function(data) {
					return data.showCol58 && data.backgroundimageCol58 && data.numberofrowcols5 >= 8;
				}								
			};	
			var ChartCol58 = {
				ref: "ChartCol58",
				type: "string",
				component: "dropdown",
				label: "Chose a Chart",
				options: function () {
					return getMasterObjectList().then( function ( items ) {
						return items;
					} );
				},										
				show : function(data) {
					return data.showCol58 && data.textchartCol58 && data.numberofrowcols5 >= 8;
				}							  	
			};
			var labelCol58 = {
				ref : "labelCol58",
				label : "Title", expression : "optional",
				type : "string",
				defaultValue : '',
				show : function(data) {
					return data.showCol58 && !data.textchartCol58 && data.numberofrowcols5 >= 8;
				}									
			};
			var labelPaddingTopCol58 = {
				ref : "labelPaddingTopCol58",
				label : "Padding Top",
				type : "string",
				defaultValue : '3%',
				show : function(data) {
					return data.showCol58 && !data.textchartCol58 && data.numberofrowcols5 >= 8;
				}
			};
			var FontFamilyCol58 = {
			  	ref: "FontFamilyCol58",
				type: "string",
				component: "dropdown",
				label: "FontFamily",
				options: optionsFontFamily,
			    defaultValue: "QlikView Sans",
			    show : function(data) {
					return data.showCol58 && !data.textchartCol58 && data.numberofrowcols5 >= 8;
				}								  
		    };
			var lettersizeCol58 = {
				ref: "lettersizeCol58",
				translation: "Font Size",
				type: "number",
				component: "buttongroup",
				options: [ {
					value: 20,
					label: "Small"
				}, {
					value: 24,
					label: "Medium"
				}, { 
					value: 30,
					label: "Large"
				}],
				defaultValue: 24,
				show : function(data) {
					return data.showCol58 && !data.textchartCol58 && data.numberofrowcols5 >= 8;
				}								
			};	
			var TitleTextColorCol58 = {
			  ref: "TitleTextColorCol58",
			  type: "string",
			  component: "dropdown",
			  label: "Title Text Color",
			  options: vColorOptions,
			  defaultValue: "White",
			  show : function(data) {
					return data.showCol58 && data.numberofrowcols5 >= 8;
				}	
		    };

	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************
	// Settings -Properties			
	var myCustomSection = {
		component : "expandable-items",
		label : "Settings",
		items : {			
			generalsettings : {
				type : "items",
				label : "General Settings",
				items : {
					infogtabs : infogtabs, 
					defaultImagesPath : defaultImagesPath,
					boolglobalbackground : boolglobalbackground, 
					backgroundcolorglobal : backgroundcolorglobal,
					backgroundimageopacity : backgroundimageopacity,					
					boolglobaldynamicimage : boolglobaldynamicimage,
					//globaldynamicimagedim : globaldynamicimagedim,
					path_img_app_or_extension : path_img_app_or_extension,
					globaldynamicimagedimExtension : globaldynamicimagedimExtension,
					backgroundimage : backgroundimage,					
					backgroundimagesize : backgroundimagesize,
					backgroundimagesizemanual : backgroundimagesizemanual,
					backgroundalignglobal : backgroundalignglobal,
					boolglobalimageSec : boolglobalimageSec,
					//backgroundimageopacitysec : backgroundimageopacitysec,
					boolglobaldynamicimageSec : boolglobaldynamicimageSec,
					path_img_app_or_extensionSec : path_img_app_or_extensionSec,
					globaldynamicimagedimExtensionSec : globaldynamicimagedimExtensionSec,
					backgroundimageSec : backgroundimageSec,
					backgroundimagesizeSec : backgroundimagesizeSec,
					backgroundimagesizemanualSec : backgroundimagesizemanualSec,
					backgroundalignglobalSec : backgroundalignglobalSec,
					boolQSchartstextcolor : boolQSchartstextcolor,
					qschartstextcolor : qschartstextcolor				
				}
			},
			header : {
				type : "items",
				label : "Header",
				items : {
					boolheader : boolheader,
					backgroundcolor1 : backgroundcolor1,
					boolbanner1 : boolbanner1,
					banner1 : banner1,
					banner1slider : banner1slider,
					bannerwidth : bannerwidth,
					title1 : title1,
					text1slider : text1slider,
					FontFamily1 : FontFamily1,
					lettersize1 : lettersize1, 
					TitleTextColor1 : TitleTextColor1,
					booltitle2 : booltitle2,
					title2 : title2,
					FontFamily2 : FontFamily2,
					lettersize2 : lettersize2,
					TitleTextColor2 : TitleTextColor2,
					title2Leftslider : title2Leftslider,
					title2Topslider : title2Topslider					
				}
			},
			trellis : {
				type : "items",
				label : "Trellis",
				items : {
					NumberOfColumnsTrellis : NumberOfColumnsTrellis,
					NumberOfRowsTrellis : NumberOfRowsTrellis,
					ChartTrellisType : ChartTrellisType,
					ChartTrellisDim : ChartTrellisDim,
					ChartTrellisDim2 : ChartTrellisDim2,
					boolHelpLoopExpressions : boolHelpLoopExpressions,
					symHelpLoopExpressions : symHelpLoopExpressions,
					ChartTrellisMeas1 : ChartTrellisMeas1,
					LabelTrellisMeas1 : LabelTrellisMeas1,
					numberFormatExpr1Type : numberFormatExpr1Type,
					numberFormatExpr1Dec : numberFormatExpr1Dec,
					numberFormatExpr1Thou : numberFormatExpr1Thou,
					numberFormatExpr1Sym : numberFormatExpr1Sym,
					TypeColorMeas1 : TypeColorMeas1,
					ExpressionColorMeas1 : ExpressionColorMeas1,				
					SingleColorMeas1 : SingleColorMeas1,
					ChartTrellisMeas2 : ChartTrellisMeas2,
					LabelTrellisMeas2 : LabelTrellisMeas2,
					numberFormatExpr2Type : numberFormatExpr2Type,
					numberFormatExpr2Dec : numberFormatExpr2Dec,
					numberFormatExpr2Thou : numberFormatExpr2Thou,
					numberFormatExpr2Sym : numberFormatExpr2Sym,
					ExpressionColorMeas2 : ExpressionColorMeas2,
					SingleColorMeas2 : SingleColorMeas2,
					ChartTrellisMeas3 : ChartTrellisMeas3,
					LabelTrellisMeas3 : LabelTrellisMeas3,
					numberFormatExpr3Type : numberFormatExpr3Type,
					numberFormatExpr3Dec : numberFormatExpr3Dec,
					numberFormatExpr3Thou : numberFormatExpr3Thou,
					numberFormatExpr3Sym : numberFormatExpr3Sym,
					ExpressionColorMeas3 : ExpressionColorMeas3,
					SingleColorMeas3 : SingleColorMeas3,
					boolglobaldynamicimageTrellis : boolglobaldynamicimageTrellis,
					path_img_app_or_extensionTrellis : path_img_app_or_extensionTrellis,
					globaldynamicimagedimExtensionTrellis : globaldynamicimagedimExtensionTrellis,
					backgroundimagesizeTrellis : backgroundimagesizeTrellis,
					backgroundalignTrellis : backgroundalignTrellis					
				},
				show : function(data) {
					return data.infogtabs == 0;
				}
			},
			row1 : {
				type : "items",
				label : "Row 1",
				items : {},
				show : function(data) {
					return data.infogtabs >= 1;
				}
			},
			row2 : {
				type : "items",
				label : "Row 2",
				items : {},
				show : function(data) {
					return data.infogtabs >= 2;
				}
			},
			row3 : {
				type : "items",
				label : "Row 3",
				items : {},
				show : function(data) {
					return data.infogtabs >= 3;
				}
			},
			row4 : {
				type : "items",
				label : "Row 4",
				items : {},
				show : function(data) {
					return data.infogtabs >= 4;
				}
			},
			row5 : {
				type : "items",
				label : "Row 5",
				items : {},
				show : function(data) {
					return data.infogtabs >= 5;
				}
			}
		}
	};
	
	
	for (var vCol = 1;vCol <= vMaxCols;vCol++){
	
		myCustomSection.items.row1.items['ContainerHeightSize_1'] 			= eval('ContainerHeightSize_1');
		myCustomSection.items.row1.items['numberofrowcols1'] 				= eval('numberofrowcols1');
		myCustomSection.items.row1.items['backgroundcolor_1'] 				= eval('backgroundcolor_1');			
		myCustomSection.items.row1.items['showCol1' + vCol] 				= eval('showCol1' + vCol);
		myCustomSection.items.row1.items['col1' + vCol + 'width'] 			= eval('col1' + vCol + 'width');
		myCustomSection.items.row1.items['backgroundcolorCol1' + vCol] 		= eval('backgroundcolorCol1' + vCol);
		myCustomSection.items.row1.items['backgroundimageCol1' + vCol] 		= eval('backgroundimageCol1' + vCol);
		myCustomSection.items.row1.items['backgroundimagesizeCol1' + vCol]	= eval('backgroundimagesizeCol1' + vCol);
		myCustomSection.items.row1.items['backgroundalignCol1' + vCol] 		= eval('backgroundalignCol1' + vCol);
		myCustomSection.items.row1.items['textchartCol1' + vCol] 			= eval('textchartCol1' + vCol);
		myCustomSection.items.row1.items['circleCol1' + vCol] 				= eval('circleCol1' + vCol);
		myCustomSection.items.row1.items['ChartCol1' + vCol] 				= eval('ChartCol1' + vCol);
		myCustomSection.items.row1.items['labelCol1' + vCol] 				= eval('labelCol1' + vCol);
		myCustomSection.items.row1.items['labelPaddingTopCol1' + vCol] 		= eval('labelPaddingTopCol1' + vCol);
		myCustomSection.items.row1.items['FontFamilyCol1' + vCol] 			= eval('FontFamilyCol1' + vCol);
		myCustomSection.items.row1.items['lettersizeCol1' + vCol] 			= eval('lettersizeCol1' + vCol);
		myCustomSection.items.row1.items['TitleTextColorCol1' + vCol] 		= eval('TitleTextColorCol1' + vCol);
		
		myCustomSection.items.row2.items['ContainerHeightSize_2'] 			= eval('ContainerHeightSize_2');
		myCustomSection.items.row2.items['numberofrowcols2'] 				= eval('numberofrowcols2');
		myCustomSection.items.row2.items['backgroundcolor_2'] 				= eval('backgroundcolor_2');			
		myCustomSection.items.row2.items['showCol2' + vCol] 				= eval('showCol2' + vCol);
		myCustomSection.items.row2.items['col2' + vCol + 'width'] 			= eval('col2' + vCol + 'width');
		myCustomSection.items.row2.items['backgroundcolorCol2' + vCol] 		= eval('backgroundcolorCol2' + vCol);
		myCustomSection.items.row2.items['backgroundimageCol2' + vCol] 		= eval('backgroundimageCol2' + vCol);
		myCustomSection.items.row2.items['backgroundimagesizeCol2' + vCol]	= eval('backgroundimagesizeCol2' + vCol);
		myCustomSection.items.row2.items['backgroundalignCol2' + vCol] 		= eval('backgroundalignCol2' + vCol);
		myCustomSection.items.row2.items['textchartCol2' + vCol] 			= eval('textchartCol2' + vCol);
		myCustomSection.items.row2.items['circleCol2' + vCol] 				= eval('circleCol2' + vCol);
		myCustomSection.items.row2.items['ChartCol2' + vCol] 				= eval('ChartCol2' + vCol);
		myCustomSection.items.row2.items['labelCol2' + vCol] 				= eval('labelCol2' + vCol);
		myCustomSection.items.row2.items['labelPaddingTopCol2' + vCol] 		= eval('labelPaddingTopCol2' + vCol);
		myCustomSection.items.row2.items['FontFamilyCol2' + vCol] 			= eval('FontFamilyCol2' + vCol);
		myCustomSection.items.row2.items['lettersizeCol2' + vCol] 			= eval('lettersizeCol2' + vCol);
		myCustomSection.items.row2.items['TitleTextColorCol2' + vCol] 		= eval('TitleTextColorCol2' + vCol);
		
		myCustomSection.items.row3.items['ContainerHeightSize_3'] 			= eval('ContainerHeightSize_3');
		myCustomSection.items.row3.items['numberofrowcols3'] 				= eval('numberofrowcols3');
		myCustomSection.items.row3.items['backgroundcolor_3'] 				= eval('backgroundcolor_3');			
		myCustomSection.items.row3.items['showCol3' + vCol] 				= eval('showCol3' + vCol);
		myCustomSection.items.row3.items['col3' + vCol + 'width'] 			= eval('col3' + vCol + 'width');
		myCustomSection.items.row3.items['backgroundcolorCol3' + vCol] 		= eval('backgroundcolorCol3' + vCol);
		myCustomSection.items.row3.items['backgroundimageCol3' + vCol] 		= eval('backgroundimageCol3' + vCol);
		myCustomSection.items.row3.items['backgroundimagesizeCol3' + vCol]	= eval('backgroundimagesizeCol3' + vCol);
		myCustomSection.items.row3.items['backgroundalignCol3' + vCol] 		= eval('backgroundalignCol3' + vCol);
		myCustomSection.items.row3.items['textchartCol3' + vCol] 			= eval('textchartCol3' + vCol);
		myCustomSection.items.row3.items['circleCol3' + vCol] 				= eval('circleCol3' + vCol);
		myCustomSection.items.row3.items['ChartCol3' + vCol] 				= eval('ChartCol3' + vCol);
		myCustomSection.items.row3.items['labelCol3' + vCol] 				= eval('labelCol3' + vCol);
		myCustomSection.items.row3.items['labelPaddingTopCol3' + vCol] 		= eval('labelPaddingTopCol3' + vCol);
		myCustomSection.items.row3.items['FontFamilyCol3' + vCol] 			= eval('FontFamilyCol3' + vCol);
		myCustomSection.items.row3.items['lettersizeCol3' + vCol] 			= eval('lettersizeCol3' + vCol);
		myCustomSection.items.row3.items['TitleTextColorCol3' + vCol] 		= eval('TitleTextColorCol3' + vCol);
	
		myCustomSection.items.row4.items['ContainerHeightSize_4'] 			= eval('ContainerHeightSize_4');
		myCustomSection.items.row4.items['numberofrowcols4'] 				= eval('numberofrowcols4');
		myCustomSection.items.row4.items['backgroundcolor_4'] 				= eval('backgroundcolor_4');			
		myCustomSection.items.row4.items['showCol4' + vCol] 				= eval('showCol4' + vCol);
		myCustomSection.items.row4.items['col4' + vCol + 'width'] 			= eval('col4' + vCol + 'width');
		myCustomSection.items.row4.items['backgroundcolorCol4' + vCol] 		= eval('backgroundcolorCol4' + vCol);
		myCustomSection.items.row4.items['backgroundimageCol4' + vCol] 		= eval('backgroundimageCol4' + vCol);
		myCustomSection.items.row4.items['backgroundimagesizeCol4' + vCol]	= eval('backgroundimagesizeCol4' + vCol);
		myCustomSection.items.row4.items['backgroundalignCol4' + vCol] 		= eval('backgroundalignCol4' + vCol);
		myCustomSection.items.row4.items['textchartCol4' + vCol] 			= eval('textchartCol4' + vCol);
		myCustomSection.items.row4.items['circleCol4' + vCol] 				= eval('circleCol4' + vCol);
		myCustomSection.items.row4.items['ChartCol4' + vCol] 				= eval('ChartCol4' + vCol);
		myCustomSection.items.row4.items['labelCol4' + vCol] 				= eval('labelCol4' + vCol);
		myCustomSection.items.row4.items['labelPaddingTopCol4' + vCol] 		= eval('labelPaddingTopCol4' + vCol);
		myCustomSection.items.row4.items['FontFamilyCol4' + vCol] 			= eval('FontFamilyCol4' + vCol);
		myCustomSection.items.row4.items['lettersizeCol4' + vCol] 			= eval('lettersizeCol4' + vCol);
		myCustomSection.items.row4.items['TitleTextColorCol4' + vCol] 		= eval('TitleTextColorCol4' + vCol);
	
		myCustomSection.items.row5.items['ContainerHeightSize_5'] 			= eval('ContainerHeightSize_5');
		myCustomSection.items.row5.items['numberofrowcols5'] 				= eval('numberofrowcols5');
		myCustomSection.items.row5.items['backgroundcolor_5'] 				= eval('backgroundcolor_5');			
		myCustomSection.items.row5.items['showCol5' + vCol] 				= eval('showCol5' + vCol);
		myCustomSection.items.row5.items['col5' + vCol + 'width'] 			= eval('col5' + vCol + 'width');
		myCustomSection.items.row5.items['backgroundcolorCol5' + vCol] 		= eval('backgroundcolorCol5' + vCol);
		myCustomSection.items.row5.items['backgroundimageCol5' + vCol] 		= eval('backgroundimageCol5' + vCol);
		myCustomSection.items.row5.items['backgroundimagesizeCol5' + vCol]	= eval('backgroundimagesizeCol5' + vCol);
		myCustomSection.items.row5.items['backgroundalignCol5' + vCol] 		= eval('backgroundalignCol5' + vCol);
		myCustomSection.items.row5.items['textchartCol5' + vCol] 			= eval('textchartCol5' + vCol);
		myCustomSection.items.row5.items['circleCol5' + vCol] 				= eval('circleCol5' + vCol);
		myCustomSection.items.row5.items['ChartCol5' + vCol] 				= eval('ChartCol5' + vCol);
		myCustomSection.items.row5.items['labelCol5' + vCol] 				= eval('labelCol5' + vCol);
		myCustomSection.items.row5.items['labelPaddingTopCol5' + vCol] 		= eval('labelPaddingTopCol5' + vCol);
		myCustomSection.items.row5.items['FontFamilyCol5' + vCol] 			= eval('FontFamilyCol5' + vCol);
		myCustomSection.items.row5.items['lettersizeCol5' + vCol] 			= eval('lettersizeCol5' + vCol);
		myCustomSection.items.row5.items['TitleTextColorCol5' + vCol] 		= eval('TitleTextColorCol5' + vCol);
	
	}	
				
	//Return values
	return {
		type : "items",
		component : "accordion",
		items : {
			dimensions : {
					uses : "dimensions",
					min : 0,
					max : 1
			},
			customSection : myCustomSection
		}
	};
});
