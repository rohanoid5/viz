let VIZ = (function() {
  let Column = function(...args) {
    this.num = args.length;
    this.arrColumn = [];
    for(let i = 0; i < this.num; i++) {
      this.arrColumn.push(new ColumnItem(args[i][0], args[i][1]));
    }

    this.displayColumns = function() {
      for (var i = 0; i < this.num; i++) {
        console.log(this.arrColumn[i]);
      }
    }

    this.render = function(id, width, height) {
      let elm = document.getElementById(id);
      elm.style.width = (width) + 'px';
      elm.style.height = height + 'px';
      elm.style.display = 'flex';
      elm.style.justifyContent = 'space-between';
      elm.style.alignItems = 'flex-end';

      let totalHeight = 0;
      for (var i = 0; i < this.arrColumn.length; i++) {
        totalHeight += this.arrColumn[i].val;
      }

      let divider = document.createElement('div');
      divider.style.height = '100%';
      divider.style.width = '2px';
      divider.style.backgroundColor = '#000000'

      let axis = document.createElement('div');
      axis.style.display = 'flex';
      axis.style.flexDirection = 'column-reverse';
      axis.style.height = '100%';
      axis.style.justifyContent = 'space-between';

      let range = [];
      let v = Math.round(totalHeight / this.arrColumn.length);
      let firstVal = 0;
      for (var i = 0; i < this.arrColumn.length; i++) {
        if(firstVal < totalHeight) {
          range.push(firstVal);
          firstVal += v;
        }
      }
      range.push(totalHeight);
      // console.log(range);

      for (var i = 0; i < range.length; i++) {
        let axisVal = document.createElement('div');
        axisVal.style.textAlign = 'center';
        axisVal.appendChild(document.createTextNode(range[i]));
        axis.appendChild(axisVal);
      }

      elm.appendChild(axis);
      elm.appendChild(divider);

      for (let i = 0; i < this.num; i++) {
        let mainDiv = document.createElement('div');
        let name = document.createElement('div');
        name.appendChild(document.createTextNode(this.arrColumn[i].name + "(" + this.arrColumn[i].val + ")"));
        name.style.textAlign = 'center'

        let col = document.createElement('div');
        col.style.backgroundColor = random_rgba();
        col.style.height = (this.arrColumn[i].val / totalHeight * height) + 'px';
        col.style.width = ((width / this.num) - 20) + 'px';

        mainDiv.appendChild(name)
        mainDiv.appendChild(col);
        elm.appendChild(mainDiv);
      }
      return this;
    }
  }


  function ColumnItem(name, val) {
    this.name = name;
    this.val = val;
  }

  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
  }

  return {
    Column: Column
  };
}());
