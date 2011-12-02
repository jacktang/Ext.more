Ext.define('Ext.ux.form.DateTimeField', {
	  extend: 'Ext.form.field.Date',
	  alias: 'widget.datetimefield',
	  dateFormat: 'Y-m-d',
	  timeFormat: 'H:i:s',
	  requires: ['Ext.ux.datetime.DateTimePicker'],
	  
	  initComponent: function() {
		  this.callParent();
		  this.format = this.dateFormat + ' ' + this.timeFormat;
	  },
	  // overwrite
	  createPicker: function() {
		  var me = this, format = Ext.String.format;
		  
		  return Ext.create('Ext.ux.datetime.DateTimePicker', {
			    ownerCt: me.ownerCt,
			    renderTo: document.body,
			    floating: true,
			    hidden: true,
			    focusOnShow: true,
			    minDate: me.minValue,
			    maxDate: me.maxValue,
			    disabledDatesRE: me.disabledDatesRE,
			    disabledDatesText: me.disabledDatesText,
			    disabledDays: me.disabledDays,
			    disabledDaysText: me.disabledDaysText,
			    format: me.format,
			    timeFormat: this.timeFormat,
			    dateFormat: this.dateFormat,
			    showToday: me.showToday,
			    startDay: me.startDay,
			    minText: format(me.minText, me.formatDate(me.minValue)),
			    maxText: format(me.maxText, me.formatDate(me.maxValue)),
			    listeners: {
				    scope: me,
				    select: me.onSelect
			    },
			    keyNavConfig: {
				    esc: function() {
					    me.collapse();
				    }
			    }
		    });
	  }
  });