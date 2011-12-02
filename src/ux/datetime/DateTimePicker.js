Ext.define('Ext.ux.datetime.DateTimePicker', {
	  extend: 'Ext.picker.Date',
	  alias: 'widget.datetimepicker',
	  timeFormat: 'H:i:s',
	  timeLabel: '时间',
	  requires: ['Ext.ux.form.TimePickerField'],
	  
	  initComponent: function() {
		  // keep time part for value
		  var value = this.value || new Date();
		  this.callParent();
		  this.value = value;
	  },
	  onRender: function(container, position) {
		  if (!this.timefield) {
			  this.timefield = Ext.create('Ext.ux.form.TimePickerField', {
				    fieldLabel: this.timeLabel,
				    labelWidth: 40,
				    value: Ext.Date.format(this.value, this.timeFormat)
			    });
		  }
		  this.timefield.ownerCt = this;
		  this.timefield.on('change', this.timeChange, this);
		  this.callParent(arguments);
		  
		  var table = Ext.get(Ext.DomQuery.selectNode('table', this.el.dom));
		  var tfEl = Ext.core.DomHelper.insertAfter(table, {
			    tag: 'div',
			    style: 'border:0px;',
			    children: [{
				      tag: 'div',
				      cls: 'x-datepicker-footer ux-timefield'
			      }]
		    }, true);
		  this.timefield.render(this.el.child('div div.ux-timefield'));
		  
		  var p = this.getEl().parent('div.x-layer');
		  if (p) {
			  p.setStyle("height", p.getHeight() + 31);
		  }
	  },
	  // listener 时间域修改,  timefield change
	  timeChange: function(tf, time, rawtime) {
		  if (this.todayKeyListener) { // after initEvent
			  this.setValue(this.value);
		  } else {
			  this.value = this.getDateTime(this.value);
		  }
	  },
	  getDateTime: function(value) {
		  if (this.timefield) {
			  var rawtime = this.timefield.getRawValue();
			  value.setHours(rawtime.h);
			  value.setMinutes(rawtime.m);
			  value.setSeconds(rawtime.s);
		  }
		  return value;
	  },
	  // overwrite
	  setValue: function(value) {
		  this.value = value;
		  this.value = this.getDateTime(this.value);
		  return this.update(this.value);
	  },
	  // overwrite
	  getValue: function() {
		  return this.getDateTime(this.value);
	  }
  });