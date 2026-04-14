/**
 * --------------------------------------------------------------------
 * B.Muthukumaraswamy for 2adpro
 * Copyright (c) 2012  Oct
 * Modified in Nov
 * --------------------------------------------------------------------
**/

var Matrix = {
  
};
Matrix = function() {};

Matrix.create = function(elements) {
    var M = new Matrix();
    return M.setElements(elements);
};
var $M = Matrix.create;


Matrix.prototype = { 

    map: function(fn, context) {
        if (this.elements.length === 0) {
            return Matrix.create([]);
        }
        var els = [], i = this.elements.length, nj = this.elements[0].length, j;
        while (i--) {
            j = nj;
            els[i] = [];
            while (j--) {
                els[i][j] = fn.call(context, this.elements[i][j], i + 1, j + 1);
            }
        }
        return Matrix.create(els);
    },

    isSameSizeAs: function(matrix) {
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') {
            M = Matrix.create(M).elements;
        }
        if (this.elements.length === 0) {
            return M.length === 0;
        }
        return (this.elements.length === M.length &&
            this.elements[0].length === M[0].length);
    },

    add: function(matrix) {
        if (this.elements.length === 0) return this.map(function(x) {
            return x
        });
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') {
            M = Matrix.create(M).elements;
        }
        if (!this.isSameSizeAs(M)) {
            return null;
        }
        return this.map(function(x, i, j) {
            return x + M[i-1][j-1];
        });
    },
    setElements: function(els) {
        var i, j, elements = els.elements || els;
        if (elements[0] && typeof(elements[0][0]) !== 'undefined') {
            i = elements.length;
            this.elements = [];
            while (i--) {
                j = elements[i].length;
                this.elements[i] = [];
                while (j--) {
                    this.elements[i][j] = elements[i][j];
                }
            }
            return this;
        }
        var n = elements.length;
        this.elements = [];
        for (i = 0; i < n; i++) {
            this.elements.push([elements[i]]);
        }
        return this;
    }  
};