/**
 * Module dependencies
 */
var btoa = require("base64-encode")
  , atob = require("base64-decode")
  , objUtil = require("object")
  , emitter = require("emitter")
  , type = require("type")
  , pageFormats = require("./page-formats")
  , joinStyles = require("./join-styles");

/**
 * Defines
 */
var PDF_VERSION = '1.3'
  , VERSION = '20120619';


/**
 * jsPDF
 * 
 * @param orientation {String}
 * @param unit {String}
 * @param format {String}
 * @constructor
 */
exports = module.exports = function jsPDF(orientation, unit, format) {
  // Defaults
  if(type(orientation) === "undefined") orientation = "p";
  if(type(unit) === "undefined") unit = "mm";
  if(type(format) === "undefined") format = "a4";

  this.orientation = orientation.toString().toLowerCase();
  this.unit = unit.toString().toLowerCase();
  this.format = format.toString().toLowerCase();

  this.content = [];
  this.contentLength = 0;
  this.textColor = '0 g';
  this.drawColor = '0 G';
  this.page = 0;
  this.pages = [];
  this.objectNumber = 2; // 'n' Current object number
  this.outOfPages = false; // switches where out() prints. outToPages true = push to pages obj. outToPages false = doc builder content
  this.offsets = []; // List of offsets. Activated and reset by buildDocument(). Pupulated by various calls buildDocument makes.
  this.fonts = {}; // collection of font objects, where key is fontKey - a dynamically created label for a given font.
  this.fontmap = {}; // mapping structure fontName > fontStyle > font key - performance layer. See addFont()
  this.activeFontSize = 16;
  this.activeFontKey; // will be string representing the KEY of the font as combination of fontName + fontStyle
  this.lineWidth = 0.200025; // 2mm
  this.documentProperties = {'title':'','subject':'','author':'','keywords':'','creator':''};
  this.lineCapID = 0;
  this.lineJoinID = 0;
  this.k = chooseScale(unit);

  // Dimensions are stored as user units and converted to points on output
  if(pageFormats[this.format]) {
    this.pageHeight = pageFormats[this.format][1] / this.k;
    this.pageWidth = pageFormats[this.format][0] / this.k;
  }
  else {
    try {
      this.pageHeight = format[1];
      this.pageWidth = format[0];
    }
    catch (e) {
      throw new Error("Invalid format: "+format);
    }
  }

  if(this.orientation === "p" || orientation === "portrait") {
    this.orientation = "p";
    if(this.pageWidth > this.pageHeight) {
      swapValues.call(this, "pageWidth", "pageHeight");
    }
  }
  else if (this.orientation === 'l' || this.orientation === 'landscape') {
    this.orientation = 'l';
    if(this.pageWidth < this.pageHeight) {
      swapValues.call(this, "pageWidth", "pageHeight");
    }
  }
  else {
    throw new Error("Invalid orientation: "+this.orientation);
  };
};

/**
 * Inherit from emitter
 */
emitter(jsPDF.prototype);


/**
 * Expose the prototype
 */
jsPDF.API = jsPDF.prototype;


/**
 * Adds (and transfers the focus to) new page to the PDF document.
 *
 * @returns {jsPDF}
 */
jsPDF.prototype.addPage = function addPage() {
  // TODO
  return this;
};


/**
 * Adds text to page. Supports adding multiline text when 'text' argument is an Array of Strings. 
 *
 * @param {String|Array} text String or array of strings to be added to the page. Each line is shifted one line down per font, spacing settings declared before this call.
 * @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {Object} flags Collection of settings signalling how the text must be encoded. Defaults are sane. If you think you want to pass some flags, you likely can read the source.
 * @returns {jsPDF}
 */

jsPDF.prototype.text = function text(text, x, y, flags) {
  // TODO
  return this;
};


/**
 *
 */
jsPDF.prototype.line = function line() {
  // TODO
  return this;
};


/**
 * Adds series of curves (straight lines or cubic bezier curves) to canvas, starting at `x`, `y` coordinates.
 * All data points in `lines` are relative to last line origin.
 * `x`, `y` become x1,y1 for first line / curve in the set.
 * For lines you only need to specify [x2, y2] - (ending point) vector against x1, y1 starting point.
 * For bezier curves you need to specify [x2,y2,x3,y3,x4,y4] - vectors to control points 1, 2, ending point. All vectors are against the start of the curve - x1,y1.
 *
 * @example .lines([[2,2],[-2,2],[1,1,2,2,3,3],[2,1]], 212,110, 10) // line, line, bezier curve, line 
 * @param {Array} lines Array of *vector* shifts as pairs (lines) or sextets (cubic bezier curves).
 * @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {Number} scale (Defaults to [1.0,1.0]) x,y Scaling factor for all vectors. Elements can be any floating number Sub-one makes drawing smaller. Over-one grows the drawing. Negative flips the direction.   
 * @returns {jsPDF}
 */
jsPDF.prototype.lines = function lines(lines, x, y, scale, style) {
  // TODO
  return this;
};


/**
 * Adds a rectangle to PDF
 *
 * @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {Number} w Width (in units declared at inception of PDF document) 
 * @param {Number} h Height (in units declared at inception of PDF document) 
 * @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
 * @returns {jsPDF}
 */
jsPDF.prototype.rect = function rect(x, y, w, h, style) {
  // TODO
  return this;
};


/**
 * Adds a triangle to PDF
 *
 * @param {Number} x1 Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {Number} y1 Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {Number} x2 Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {Number} y2 Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {Number} x3 Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {Number} y3 Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
 * @returns {jsPDF}
 */
jsPDF.prototype.triangle = function triangle(x1, y1, x2, y2, x3, y3, style) {
  // TODO
  return this;
};


jsPDF.prototype.roundedRect = function roundedRect(x, y, w, h, rx, ry, style) {
  // TODO
  return this;
};


jsPDF.prototype.ellipse = function ellipse(x, y, rx, ry, style) {
  // TODO
  return this;
};


jsPDF.prototype.circle = function circle(x, y, r, style) {
  // TODO
  return this;
};


jsPDF.prototype.setProperties = function setProperties(properties) {
  // TODO
  return this;
};


jsPDF.prototype.setFontSize = function setFontSize(size) {
  this.activeFontSize = size;
  return this;
};


jsPDF.prototype.setFont = function setFont(fontName, fontStyle) {
  // TODO
  return this;
};


jsPDF.prototype.setFontStyle =
jsPDF.prototype.setFontType = function setFontStyle(style) {
  // TODO
  return this;
};


jsPDF.prototype.getFontList = function getFontList() {
  // TODO
  return this;
};


jsPDF.prototype.setLineWidth = function setLineWidth(width) {
  // TODO
  return this;
};


jsPDF.prototype.setDrawColor = function setDrawColor(ch1, ch2, ch3, ch4) {
  // TODO
  return this;
};


jsPDF.prototype.setFillColor = function setFillColor(ch1, ch2, ch3, ch4) {
  // TODO
  return this;
};


jsPDF.prototype.setTextColor = function setTextColor(r, g, b) {
  // TODO
  return this;
};


jsPDF.prototype.setLineCap = function setLineCap(style) {
  // TODO
  return this;
};


jsPDF.prototype.setLineJoin = function setLineJoin(style) {
  // TODO
  return this;
};


jsPDF.prototype.output = function setLineJoin(type, options) {
  // TODO
  return this;
};


jsPDF.prototype.save = function save(filename) {
  // TODO
  return this;
};


/**
 * Chooses scale given the unit selected
 *
 * @return {Number}
 * @api private
 */
function chooseScale (unit) {
  if(unit === 'pt') return 1;
  if(unit === 'mm') return 72/25.4;
  if(unit === 'cm') return 72/2.54;
  if(unit === 'in') return 72;
  throw new Error("Invalid unit: "+unit);
}

/**
 * Swap values on an object
 */
function swapValues (prop1, prop2) {
  var tmp = this[prop1];
  this[prop1] = this[prop2];
  this[prop2] = tmp;
}